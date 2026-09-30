import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_jalrakshak_forecast():
    response = client.get("/api/v1/jalrakshak/forecast/agra")
    assert response.status_code == 200
    data = response.json()
    assert data["district_id"] == "agra"
    assert "forecasts" in data
    assert len(data["forecasts"]) == 4
    assert "shap_drivers" in data
    assert len(data["shap_drivers"]) >= 3
    assert data["r2_score"] > 0.85

def test_jalrakshak_recharge_recommend():
    payload = {
        "district_id": "meerut",
        "area_type": "urban",
        "soil_type": "alluvial",
        "slope_pct": 1.5,
        "space_available_m2": 300.0
    }
    response = client.post("/api/v1/jalrakshak/recharge-recommend", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "overall_suitability_score" in data
    assert len(data["recommended_interventions"]) >= 4
    # Highest suitability structure
    first_item = data["recommended_interventions"][0]
    assert "annual_recharge_m3" in first_item
    assert "estimated_cost_inr" in first_item

def test_jalrakshak_budget_optimizer():
    payload = {
        "district_id": "ghaziabad",
        "total_budget_inr": 250000.0,
        "priority_focus": "max_recharge"
    }
    response = client.post("/api/v1/jalrakshak/optimize-budget", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["allocated_budget_inr"] <= 250000.0
    assert data["total_annual_recharge_m3"] > 0
    assert len(data["portfolio"]) > 0

def test_jalrakshak_what_if():
    payload = {
        "district_id": "varanasi",
        "rainfall_change_pct": 20.0,
        "extraction_change_pct": -15.0,
        "demand_change_pct": -5.0,
        "recharge_structures_added": 5
    }
    response = client.post("/api/v1/jalrakshak/what-if", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "baseline" in data
    assert "simulation" in data
    # Positive interventions should improve the situation (or lower stress)
    assert data["simulation"]["status"] == "Improved"

def test_jalrakshak_rwh_calculator():
    payload = {
        "roof_area_m2": 150.0,
        "roof_type": "concrete",
        "annual_rainfall_mm": 800.0,
        "daily_consumption_litres": 450.0
    }
    response = client.post("/api/v1/jalrakshak/rwh-calculator", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["annual_capturable_water_litres"] > 50000.0
    assert data["annual_capturable_water_m3"] > 50.0
    assert data["estimated_annual_savings_inr"] > 0

def test_jalrakshak_water_quality():
    response = client.get("/api/v1/jalrakshak/water-quality/agra")
    assert response.status_code == 200
    data = response.json()
    assert "water_quality_index" in data
    assert len(data["parameters"]) >= 5

def test_jalrakshak_iot_telemetry():
    payload = {
        "device_id": "ESP32-TEST-NODE",
        "district_id": "lucknow",
        "sensor_type": "water_level_ultrasonic",
        "reading_value": 31.5,  # Anomaly: > 30m
        "unit": "m bgl"
    }
    response = client.post("/api/v1/jalrakshak/iot/telemetry", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "ingested"
    assert data["is_anomaly"] is True

    # Check reading retrieval
    res_list = client.get("/api/v1/jalrakshak/iot/readings")
    assert res_list.status_code == 200
    readings = res_list.json()["readings"]
    assert any(r["device_id"] == "ESP32-TEST-NODE" for r in readings)
