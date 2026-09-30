import sys
import os
import pytest
from datetime import datetime, timezone

sys.path.insert(0, os.path.abspath("."))
sys.path.insert(0, os.path.abspath("apps/api"))

from app.core.database import SessionLocal
from app.db.init_db import init_db
from app.models.telemetry import Observation, ReservoirObservation, DataSource, IngestionRun
from app.models.geo import Station, Reservoir
from services.ingestion.connectors.open_meteo import OpenMeteoConnector
from services.ingestion.connectors.cgwb import CGWBConnector
from services.ingestion.connectors.cwc_reservoirs import CWCReservoirConnector


@pytest.fixture(scope="session", autouse=True)
def setup_db():
    init_db()


def test_open_meteo_validation():
    conn = OpenMeteoConnector()
    mock_raw = [{
        "district": "Hapur",
        "station_code": "GW-014",
        "lat": 28.7306,
        "lon": 77.7759,
        "payload": {
            "hourly": {
                "time": ["2026-09-30T10:00"],
                "precipitation": [5.4],
                "soil_moisture_0_to_1cm": [0.24]
            }
        }
    }]
    normalized = conn.validate_and_normalize(mock_raw)
    assert len(normalized) == 2  # rainfall + soil moisture
    assert normalized[0]["metric"] == "rainfall_hourly_mm"
    assert normalized[0]["value"] == 5.4
    assert normalized[0]["quality_flag"] == "good"
    assert normalized[1]["metric"] == "soil_moisture_m3_m3"
    assert normalized[1]["value"] == 0.24


def test_open_meteo_implausible_rainfall_flagged():
    conn = OpenMeteoConnector()
    mock_raw = [{
        "district": "Hapur",
        "station_code": "GW-014",
        "lat": 28.7306,
        "lon": 77.7759,
        "payload": {
            "hourly": {
                "time": ["2026-09-30T10:00"],
                "precipitation": [-10.0],  # Impossible negative rainfall
                "soil_moisture_0_to_1cm": [0.24]
            }
        }
    }]
    normalized = conn.validate_and_normalize(mock_raw)
    assert normalized[0]["quality_flag"] == "rejected"


def test_cgwb_connector_lifecycle():
    db = SessionLocal()
    conn = CGWBConnector()
    res = conn.run(db)
    assert res["status"] == "success"
    assert res["count"] > 0

    # Verify records in database
    gw_obs = db.query(Observation).filter(Observation.source_id == "cgwb").all()
    assert len(gw_obs) > 0
    for obs in gw_obs:
        assert obs.value > 0
        assert obs.unit == "m bgl"
        assert obs.quality_flag in ["good", "suspect"]
    db.close()


def test_cwc_reservoir_bulletin_calculations():
    db = SessionLocal()
    conn = CWCReservoirConnector()
    res = conn.run(db)
    assert res["status"] == "success"
    assert res["count"] > 0

    # Verify reservoir live storage and percentage
    ramganga = db.query(Reservoir).filter(Reservoir.code == "RES-RAM").first()
    assert ramganga is not None
    assert ramganga.current_storage_mcm == 1620.0
    assert ramganga.fill_pct == round((1620.0 / 2192.0) * 100, 1)

    obs = db.query(ReservoirObservation).filter(ReservoirObservation.reservoir_id == ramganga.id).first()
    assert obs is not None
    assert obs.current_storage_mcm == 1620.0
    assert obs.inflow_cumec == 145.0
    db.close()
