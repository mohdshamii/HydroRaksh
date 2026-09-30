import time
from typing import List, Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.core.config import settings
from app.core.security import hash_password
from app.core.rbac import require_roles, log_audit
from app.models.users import User, AuditLog
from app.models.geo import Region, Station, Reservoir
from app.models.telemetry import Observation, DataSource, IngestionRun
from app.models.intelligence import Alert, IssueReport
from app.schemas.auth import UserResponse, RegisterRequest
from app.schemas.admin import SourceHealthResponse, IngestionRunResponse, AuditLogResponse, SystemStatusResponse

router = APIRouter(prefix="/admin", tags=["Admin Console"])
APP_START_TIME = time.time()


@router.get("/system-status", response_model=SystemStatusResponse)
def get_system_status(
    current_user: User = Depends(require_roles(["Super Admin", "State Admin", "Analyst"])),
    db: Session = Depends(get_db)
):
    stations_count = db.query(Station).count()
    reservoirs_count = db.query(Reservoir).count()
    obs_count = db.query(Observation).count()
    alerts_count = db.query(Alert).filter(Alert.status == "open").count()
    issues_count = db.query(IssueReport).filter(IssueReport.status.in_(["reported", "investigating"])).count()

    return SystemStatusResponse(
        database="healthy",
        cache_redis="connected",
        storage_minio="available",
        environment=settings.ENVIRONMENT,
        feature_simulator_mode=settings.FEATURE_SIMULATOR_MODE,
        active_stations=stations_count,
        active_reservoirs=reservoirs_count,
        total_observations=obs_count,
        open_alerts=alerts_count,
        reported_issues=issues_count,
        uptime_seconds=round(time.time() - APP_START_TIME, 1)
    )


@router.get("/users", response_model=List[UserResponse])
def list_users(
    skip: int = 0,
    limit: int = 50,
    role: Optional[str] = None,
    current_user: User = Depends(require_roles(["Super Admin", "State Admin"])),
    db: Session = Depends(get_db)
):
    query = db.query(User)
    if role:
        query = query.filter(User.role == role)
    if current_user.role == "State Admin" and current_user.jurisdiction_state != "All":
        query = query.filter(User.jurisdiction_state == current_user.jurisdiction_state)
    users = query.offset(skip).limit(limit).all()
    return [UserResponse.model_validate(u) for u in users]


@router.post("/users", response_model=UserResponse)
def create_user_by_admin(
    payload: RegisterRequest,
    request: Request,
    current_user: User = Depends(require_roles(["Super Admin"])),
    db: Session = Depends(get_db)
):
    existing = db.query(User).filter(User.email == payload.email.lower().strip()).first()
    if existing:
        raise HTTPException(status_code=400, detail="User already exists")

    user = User(
        email=payload.email.lower().strip(),
        hashed_password=hash_password(payload.password),
        full_name=payload.full_name,
        role=payload.role,
        department=payload.department,
        jurisdiction_state=payload.jurisdiction_state,
        jurisdiction_district=payload.jurisdiction_district,
        phone=payload.phone,
        is_active=True,
        is_verified=True
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    client_ip = request.client.host if request.client else "unknown"
    log_audit(db, current_user, "CREATE_USER", "USER", f"Admin created user {user.email} with role {user.role}", client_ip)
    return UserResponse.model_validate(user)


@router.patch("/users/{user_id}/status", response_model=UserResponse)
def update_user_status(
    user_id: str,
    is_active: bool,
    request: Request,
    current_user: User = Depends(require_roles(["Super Admin"])),
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user.is_active = is_active
    db.commit()
    db.refresh(user)

    client_ip = request.client.host if request.client else "unknown"
    log_audit(db, current_user, "UPDATE_USER_STATUS", "USER", f"Set is_active={is_active} for {user.email}", client_ip)
    return UserResponse.model_validate(user)


@router.get("/sources", response_model=List[SourceHealthResponse])
def get_data_sources(
    current_user: User = Depends(require_roles(["Super Admin", "State Admin", "Analyst"])),
    db: Session = Depends(get_db)
):
    sources = db.query(DataSource).all()
    return [SourceHealthResponse.model_validate(s) for s in sources]


@router.get("/ingestion-runs", response_model=List[IngestionRunResponse])
def get_ingestion_runs(
    limit: int = 20,
    current_user: User = Depends(require_roles(["Super Admin", "State Admin", "Analyst"])),
    db: Session = Depends(get_db)
):
    runs = db.query(IngestionRun).order_by(IngestionRun.started_at.desc()).limit(limit).all()
    results = []
    for r in runs:
        results.append(IngestionRunResponse(
            id=r.id,
            source_name=r.data_source.name if r.data_source else "Unknown",
            started_at=r.started_at,
            completed_at=r.completed_at,
            status=r.status,
            records_ingested=r.records_ingested,
            errors_log=r.errors_log
        ))
    return results


@router.get("/audit-logs", response_model=List[AuditLogResponse])
def get_audit_logs(
    limit: int = 50,
    current_user: User = Depends(require_roles(["Super Admin", "State Admin"])),
    db: Session = Depends(get_db)
):
    logs = db.query(AuditLog).order_by(AuditLog.created_at.desc()).limit(limit).all()
    results = []
    for l in logs:
        results.append(AuditLogResponse(
            id=l.id,
            user_id=l.user_id,
            user_name=l.user.full_name if l.user else "System",
            user_email=l.user.email if l.user else "system@jalsuraksha.gov.in",
            action=l.action,
            resource=l.resource,
            details=l.details,
            ip_address=l.ip_address,
            created_at=l.created_at
        ))
    return results
