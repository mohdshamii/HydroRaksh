import sys
import os
import pytest
from fastapi.testclient import TestClient

# Ensure apps/api is in python path
sys.path.insert(0, os.path.abspath("apps/api"))

from app.main import app
from app.core.security import verify_password, hash_password, create_access_token, decode_access_token
from app.db.init_db import init_db

@pytest.fixture(scope="session", autouse=True)
def setup_database():
    init_db()

client = TestClient(app)

def test_password_hashing():
    pw = "SecretPass123!"
    hashed = hash_password(pw)
    assert verify_password(pw, hashed) is True
    assert verify_password("WrongPassword", hashed) is False

def test_jwt_token_creation_and_decoding():
    token = create_access_token("test-user-id", role="District Officer", jurisdiction="Hapur")
    payload = decode_access_token(token)
    assert payload is not None
    assert payload["sub"] == "test-user-id"
    assert payload["role"] == "District Officer"
    assert payload["jurisdiction"] == "Hapur"

def test_login_success():
    response = client.post("/api/v1/auth/login", json={
        "email": "aman.malik@jalsuraksha.gov.in",
        "password": "AdminSecure123!"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["user"]["full_name"] == "Aman Malik"
    assert data["user"]["role"] == "Super Admin"

def test_login_failure_wrong_password():
    response = client.post("/api/v1/auth/login", json={
        "email": "aman.malik@jalsuraksha.gov.in",
        "password": "WrongPassword999!"
    })
    assert response.status_code == 401

def test_roles_listing():
    response = client.get("/api/v1/auth/roles")
    assert response.status_code == 200
    roles = response.json()
    role_names = [r["role"] for r in roles]
    assert "Super Admin" in role_names
    assert "Field Officer" in role_names
    assert "Citizen" in role_names

def test_admin_system_status():
    # Login as Super Admin
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "aman.malik@jalsuraksha.gov.in",
        "password": "AdminSecure123!"
    })
    token = login_resp.json()["access_token"]
    
    # Query system status
    status_resp = client.get("/api/v1/admin/system-status", headers={
        "Authorization": f"Bearer {token}"
    })
    assert status_resp.status_code == 200
    status_data = status_resp.json()
    assert status_data["database"] == "healthy"
    assert status_data["active_stations"] >= 8
    assert status_data["active_reservoirs"] >= 4

def test_rbac_citizen_forbidden_admin_endpoint():
    # Login as Citizen
    login_resp = client.post("/api/v1/auth/login", json={
        "email": "citizen.ramesh@gmail.com",
        "password": "Citizen123!"
    })
    token = login_resp.json()["access_token"]

    # Try to access admin system status
    status_resp = client.get("/api/v1/admin/system-status", headers={
        "Authorization": f"Bearer {token}"
    })
    assert status_resp.status_code == 403
