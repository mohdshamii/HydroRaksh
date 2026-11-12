"""
Authentication & Role-Based Access Control Blueprint for Flask.
Supports JSON user store and database authentication fallback.
"""

from flask import Blueprint, jsonify, request
from app.core.json_user_store import JsonUserStore
from app.core.security import create_access_token, verify_password
from app.core.config import settings

bp = Blueprint("auth", __name__, url_prefix="/api/v1/auth")


@bp.route("/status", methods=["GET"])
def get_auth_status():
    """Returns authentication configuration and active storage mode."""
    return jsonify({
        "auth_enabled": settings.AUTH_ENABLED,
        "auth_storage_mode": settings.AUTH_STORAGE_MODE,
        "anonymous_allowed": True,
        "registration_open": True,
        "active_storage": (
            "JSON Local Store (data/private/users.json)"
            if settings.AUTH_STORAGE_MODE == "json"
            else "Relational Database (SQLAlchemy)"
        )
    })


@bp.route("/login", methods=["POST"])
def login():
    """Authenticates credentials against JSON user store or database."""
    payload = request.get_json(silent=True) or {}
    email = payload.get("email", "").lower().strip()
    password = payload.get("password", "")
    client_ip = request.remote_addr or "127.0.0.1"

    if not email or not password:
        return jsonify({"status": "error", "message": "email and password required"}), 400

    user_dict = None
    try:
        user_dict = JsonUserStore.authenticate(email, password, client_ip=client_ip)
    except PermissionError as pe:
        return jsonify({"status": "error", "message": str(pe)}), 429
    except Exception:
        pass

    if user_dict:
        token = create_access_token(
            subject=user_dict["id"],
            role=user_dict.get("role", "Citizen"),
            jurisdiction=user_dict.get("jurisdiction_district") or user_dict.get("jurisdiction_state")
        )
        return jsonify({
            "access_token": token,
            "token_type": "bearer",
            "user": user_dict
        })

    return jsonify({"status": "error", "message": "Invalid email or password"}), 401


@bp.route("/register", methods=["POST"])
def register():
    """Register a new user in JSON user store or fallback."""
    payload = request.get_json(silent=True) or {}
    email = payload.get("email", "").lower().strip()
    password = payload.get("password", "")
    full_name = payload.get("full_name", "")
    role = payload.get("role", "Citizen")
    department = payload.get("department", "Public Citizen")
    jurisdiction_state = payload.get("jurisdiction_state")
    jurisdiction_district = payload.get("jurisdiction_district")

    if not email or not password or not full_name:
        return jsonify({"status": "error", "message": "email, password, and full_name required"}), 400

    try:
        created_user = JsonUserStore.create_user(
            email=email,
            password=password,
            full_name=full_name,
            role=role if role in ["Citizen", "Analyst", "public_user", "scientist"] else "Citizen",
            department=department,
            jurisdiction_state=jurisdiction_state,
            jurisdiction_district=jurisdiction_district,
        )
        return jsonify(created_user), 201
    except ValueError as ve:
        return jsonify({"status": "error", "message": str(ve)}), 400
    except Exception as e:
        return jsonify({"status": "error", "message": f"Registration error: {str(e)}"}), 500


@bp.route("/roles", methods=["GET"])
def get_roles():
    """Return list of standard RBAC roles."""
    return jsonify([
        {"role": "public_user", "display": "Citizen / Public Analyst", "description": "National public read-only telemetry, water quality lookup, citizen reports"},
        {"role": "scientist", "display": "Hydrogeologist / Research Scientist", "description": "Full ML analytics, SHAP XAI models, ANOVA, raw scientific CSV exports"},
        {"role": "admin", "display": "Groundwater Board Administrator", "description": "Full administrative control, pipeline triggers, user authorization, telemetry settings"},
    ])


@bp.route("/logout", methods=["POST"])
def logout():
    """Terminate user session."""
    return jsonify({"status": "success", "message": "User session invalidated successfully"})

