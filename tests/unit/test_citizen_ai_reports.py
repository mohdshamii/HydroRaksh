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


def test_citizen_report_submission_and_tracking():
    # Submit report
    res = client.post("/api/v1/citizen/report", json={
        "reporter_name": "Ramesh Patel",
        "reporter_phone": "+919876543210",
        "category": "Dried Borewell",
        "address": "Sector 4, Hapur Rural",
        "description": "Tube-well motor dried out after water table declined past 35m.",
        "latitude": 28.7306,
        "longitude": 77.7759
    })
    assert res.status_code == 200
    data = res.json()
    assert "ticket_no" in data
    assert data["ticket_no"].startswith("JS-")
    assert data["status"] == "reported"

    # Track report
    track_res = client.get(f"/api/v1/citizen/track/{data['ticket_no']}")
    assert track_res.status_code == 200
    assert track_res.json()["reporter_name"] == "Ramesh Patel"


def test_field_officer_manual_reading():
    # Login as Field Officer
    login_res = client.post("/api/v1/auth/login", json={
        "email": "sunil.verma@up.gov.in",
        "password": "FieldOfficer123!"
    })
    assert login_res.status_code == 200
    token = login_res.json()["access_token"]

    # Submit manual reading for GW-014
    reading_res = client.post(
        "/api/v1/field/reading",
        headers={"Authorization": f"Bearer {token}"},
        json={
            "station_code": "GW-014",
            "depth_m": 32.8,
            "notes": "Post-monsoon physical tape measurement verified."
        }
    )
    assert reading_res.status_code == 200
    r_data = reading_res.json()
    assert r_data["recorded_depth_m"] == 32.8
    assert r_data["station_code"] == "GW-014"


def test_ai_assistant_grounded_response():
    # Query AI about Hapur groundwater decline
    ai_res = client.post("/api/v1/ai/chat", json={
        "query": "Why is groundwater declining in Hapur?"
    })
    assert ai_res.status_code == 200
    data = ai_res.json()
    assert "Hapur" in data["answer"]
    assert "Over-exploited" in data["answer"]
    assert len(data["sources_cited"]) > 0
    assert data["confidence_pct"] >= 90
    assert data["recommended_action"] is not None


def test_reports_export_csv_and_json():
    # Test CSV export
    csv_res = client.get("/api/v1/reports/export?report_type=District%20Water%20Report&format=csv")
    assert csv_res.status_code == 200
    assert "text/csv" in csv_res.headers["content-type"]
    assert "Station Code" in csv_res.text
    assert "GW-014" in csv_res.text

    # Test JSON export
    json_res = client.get("/api/v1/reports/export?report_type=Groundwater%20Report&format=json")
    assert json_res.status_code == 200
    j_data = json_res.json()
    assert j_data["provenance"] == "OFFICIAL_GOVERNMENT_RECORD"
    assert len(j_data["records"]) > 0


def test_public_districts_api():
    pub_res = client.get("/api/v1/public/districts")
    assert pub_res.status_code == 200
    data = pub_res.json()
    assert data["status"] == "success"
    assert data["districts_count"] >= 8
    districts = data["data"]
    names = [d["district"] for d in districts]
    assert "Hapur" in names
    assert "Meerut" in names
