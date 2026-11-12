"""
Regression Test Suite for JalSuraksha Real Data Integration & Government Portal Services.
Validates:
1. Empirical CGWB Groundwater Observations Ingestion (1.15M records across 54 state CSVs)
2. Empirical CGWB Chemical Water Quality Assays & BIS 10500 Compliance (185K records)
3. IMD Daily District-Wise Rainfall Integration (61K records)
4. Principal Aquifer Geological Formations Catalog (42 systems)
5. Authentic Survey of India (SOI) District Boundaries Geometry
6. Flask Telemetry Endpoints & RBAC Role Aliases
"""

import sys
import os
import pytest

sys.path.insert(0, os.path.abspath("."))
sys.path.insert(0, os.path.abspath("apps/api"))

from services.real_data_service import real_data_service
from services.data_service import data_service
from apps.flask_app import create_app


@pytest.fixture
def client():
    app = create_app()
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_real_data_service_groundwater_indexing():
    """Verify CGWB groundwater levels are parsed and indexed across 500+ districts."""
    gw_dict = real_data_service.groundwater_by_district
    assert len(gw_dict) >= 500, f"Expected at least 500 districts in CGWB index, found {len(gw_dict)}"
    
    # Check Agra UP real groundwater data
    agra_gw = real_data_service.get_groundwater_data("agra", "UP")
    assert agra_gw is not None
    assert agra_gw["state_code"] == "UP"
    assert agra_gw["mean_depth_mbgl"] > 0
    assert agra_gw["total_observations"] > 500
    assert agra_gw["stations_count"] >= 10
    assert "CGWB" in agra_gw["provenance"]


def test_real_data_service_water_quality_and_bis10500():
    """Verify CGWB chemical assays are parsed and evaluated against BIS 10500 standards."""
    wq_dict = real_data_service.water_quality_by_district
    assert len(wq_dict) >= 400, f"Expected at least 400 districts in GW Quality index, found {len(wq_dict)}"
    
    agra_wq = real_data_service.get_water_quality_data("agra", "UP")
    assert agra_wq is not None
    assert agra_wq["ph"] > 6.0 and agra_wq["ph"] < 9.5
    assert agra_wq["tds_mg_l"] > 100.0
    assert agra_wq["wqi"] >= 0 and agra_wq["wqi"] <= 100
    assert agra_wq["samples_analyzed"] >= 1
    assert "exceedances" in agra_wq


def test_real_data_service_rainfall():
    """Verify IMD daily district-wise rainfall data integration."""
    rf_dict = real_data_service.rainfall_by_district
    assert len(rf_dict) >= 500, f"Expected at least 500 districts in Rainfall index, found {len(rf_dict)}"
    
    agra_rf = real_data_service.get_rainfall_data("agra", "UP")
    assert agra_rf is not None
    assert agra_rf["normal_rainfall_mm"] > 0
    assert "monsoon_category" in agra_rf
    assert "IMD" in agra_rf["provenance"]


def test_real_data_service_aquifer_systems():
    """Verify 42+ principal aquifer formations loaded from Major_Principal_Aquifer.dbf."""
    aquifers = real_data_service.get_aquifers()
    assert len(aquifers) >= 40, f"Expected at least 40 aquifer systems, found {len(aquifers)}"
    
    names = [a["name"] for a in aquifers]
    assert any("Alluvium" in n for n in names)
    assert any("Basalt" in n for n in names)
    assert any("Gneiss" in n for n in names)


def test_real_data_service_provenance_registry():
    """Verify provenance metadata registry records source organizations, coverage, and license."""
    prov = real_data_service.get_provenance()
    assert "cgwb_groundwater_levels" in prov
    assert "cgwb_water_quality" in prov
    assert "imd_rainfall" in prov
    assert "aquifer_systems" in prov
    assert "district_boundaries" in prov
    
    gw_prov = prov["cgwb_groundwater_levels"]
    assert "Central Ground Water Board" in gw_prov["organization"]
    assert "GODL-India" in gw_prov["license"]


def test_data_service_enrichment_and_authentic_soi_geometry():
    """Verify districts in data_service are enriched with real empirical metrics and SOI vector paths."""
    up_districts = data_service.get_districts_for_state("UP")
    assert len(up_districts) == 75
    
    agra = data_service.get_district("agra")
    assert agra is not None
    mwm = agra.get("modernWaterMetrics", {})
    assert mwm.get("isEmpiricalCGWB") is True
    assert mwm.get("groundwaterDepthM") == 16.25
    assert mwm.get("empiricalObservationsCount") == 1140
    
    # Authentic Survey of India SVG Path
    assert "svgPath" in agra
    assert len(agra["svgPath"]) > 200
    assert agra["svgPath"].startswith("M")


def test_api_water_levels_endpoint(client):
    """Verify /api/v1/water-levels returns empirical depth, stations, and provenance."""
    resp = client.get("/api/v1/water-levels?district_id=agra")
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["status"] == "success"
    assert data["district_id"] == "agra"
    assert data["current_depth_m_bgl"] == 16.25
    assert data["empirical_observations_count"] == 1140
    assert data["monitoring_stations_count"] == 39
    assert "CGWB" in data["provenance"]


def test_api_water_quality_endpoint(client):
    """Verify /api/v1/water-quality returns real chemical assay and BIS 10500 standards."""
    resp = client.get("/api/v1/water-quality?district_id=agra")
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["status"] == "success"
    assert "metrics" in data
    assert "standards" in data
    assert data["metrics"]["ph"] == 8.07
    assert data["metrics"]["tdsMgL"] == 1706.5
    assert "standards" in data
    assert "fluoride_mg_l" in data["standards"]


def test_api_rainfall_endpoint(client):
    """Verify /api/v1/rainfall returns IMD rainfall and departure."""
    resp = client.get("/api/v1/rainfall?district_id=agra")
    assert resp.status_code == 200
    data = resp.get_json()
    assert data["status"] == "success"
    assert data["actual_rainfall_mm"] > 0
    assert "departure_pct" in data
    assert data["status_label"] in ["Normal", "Deficit", "Large Deficit", "Excess", "Large Excess"]


def test_rbac_role_aliases():
    """Verify role aliases mapping public_user, scientist, and admin."""
    from app.core.rbac import ROLE_ALIASES, require_roles
    assert "Citizen" in ROLE_ALIASES["public_user"]
    assert "Analyst" in ROLE_ALIASES["scientist"]
    assert "Super Admin" in ROLE_ALIASES["admin"]

