import sys
import os
import pytest
from fastapi.testclient import TestClient

sys.path.insert(0, os.path.abspath("apps/api"))

from app.main import app
from app.db.init_db import init_db

@pytest.fixture(scope="session", autouse=True)
def setup_db():
    init_db()

client = TestClient(app)


def test_dashboard_kpis_endpoint():
    res = client.get("/api/v1/dashboard/kpis")
    assert res.status_code == 200
    data = res.json()
    assert data["provenance"] == "LIVE"
    kpis = data["kpis"]
    assert len(kpis) == 5
    ids = [k["id"] for k in kpis]
    assert "gw_level" in ids
    assert "risk_areas" in ids
    assert "demand" in ids
    assert "recharge_pot" in ids
    assert "security_idx" in ids


def test_dashboard_districts_endpoint():
    res = client.get("/api/v1/dashboard/districts")
    assert res.status_code == 200
    data = res.json()
    districts = data["districts"]
    assert len(districts) == 8
    names = [d["name"] for d in districts]
    assert "Hapur" in names
    assert "Meerut" in names
    assert "Ghaziabad" in names
    # Verify provenance tag on each
    assert all("provenance" in d for d in districts)


def test_dashboard_trends_endpoint():
    res5 = client.get("/api/v1/dashboard/trends?range_filter=5 Years")
    assert res5.status_code == 200
    d5 = res5.json()
    assert len(d5["labels"]) == 6

    res10 = client.get("/api/v1/dashboard/trends?range_filter=10 Years")
    assert res10.status_code == 200
    d10 = res10.json()
    assert len(d10["labels"]) == 11


def test_reservoirs_module_endpoint():
    res = client.get("/api/v1/reservoirs")
    assert res.status_code == 200
    data = res.json()
    assert data["provenance"] == "DELAYED"
    assert data["total_monitored"] >= 4
    assert data["overall_fill_pct"] > 0


def test_rainfall_module_endpoint():
    res = client.get("/api/v1/rainfall")
    assert res.status_code == 200
    data = res.json()
    assert "departure_pct" in data
    assert "spi_index" in data


def test_water_quality_module_endpoint():
    res = client.get("/api/v1/quality")
    assert res.status_code == 200
    data = res.json()
    assert "parameters" in data
    assert len(data["parameters"]) >= 8


def test_harvesting_calculator_endpoint():
    res = client.post("/api/v1/harvesting/calculate", json={
        "roof_area_sqft": 2000,
        "rainfall_mm": 750,
        "runoff_coefficient": 0.85,
        "buildings_count": 1
    })
    assert res.status_code == 200
    data = res.json()
    assert data["provenance"] == "SIMULATED"
    assert data["total_harvest_litres"] > 100000
    assert data["estimated_annual_savings_inr"] > 0


def test_simulator_simulate_endpoint():
    res = client.post("/api/v1/simulator/simulate", json={
        "rainfall_deviation_pct": 10.0,
        "extraction_reduction_pct": 20.0,
        "recharge_expansion_pct": 30.0,
        "low_water_crop_pct": 25.0,
        "population_growth_pct": 5.0,
        "industrial_recycling_pct": 15.0
    })
    assert res.status_code == 200
    data = res.json()
    assert data["provenance"] == "SIMULATED"
    results = data["results"]
    assert results["simulated_level_m"] < results["baseline_level_m"]  # Groundwater level improved (shallower)
    assert results["simulated_deficit_mld"] < results["baseline_deficit_mld"]
    assert results["simulated_security_index"] > results["baseline_security_index"]
