import random
from typing import List, Optional
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status, Query, Request
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.rbac import get_current_user, get_optional_current_user, require_roles, log_audit
from app.models.users import User
from app.models.intelligence import IssueReport, Alert
from app.models.geo import Station
from app.models.telemetry import Observation

router = APIRouter(tags=["Citizen & Field Officer Operations"])


class CitizenReportCreate(BaseModel):
    reporter_name: str = Field(..., min_length=2)
    reporter_phone: str = Field(..., min_length=10)
    category: str = Field(..., min_length=3)
    address: str = Field(..., min_length=3)
    description: str = Field(..., min_length=5)
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    photo_url: Optional[str] = None


class CitizenReportResponse(BaseModel):
    ticket_no: str
    reporter_name: str
    category: str
    address: str
    description: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class FieldReadingInput(BaseModel):
    station_code: str
    depth_m: float = Field(..., ge=0, le=250)
    observed_at: Optional[datetime] = None
    notes: Optional[str] = None


@router.post("/citizen/report", response_model=CitizenReportResponse)
def submit_citizen_report(
    payload: CitizenReportCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    ticket_no = f"JS-{random.randint(1000, 9999)}"
    
    report = IssueReport(
        ticket_no=ticket_no,
        reporter_name=payload.reporter_name,
        reporter_phone=payload.reporter_phone,
        category=payload.category,
        address=payload.address,
        description=payload.description,
        latitude=payload.latitude,
        longitude=payload.longitude,
        photo_url=payload.photo_url,
        status="reported"
    )
    db.add(report)

    # Trigger alert for field officers
    alert = Alert(
        severity="warning" if "Contamination" in payload.category else "info",
        title=f"New Citizen Grievance: {payload.category} at {payload.address}",
        description=f"Ticket {ticket_no}: {payload.description[:120]}...",
        triggered_at=datetime.now(timezone.utc),
        status="open"
    )
    db.add(alert)
    db.commit()
    db.refresh(report)

    client_ip = request.client.host if request.client else "unknown"
    log_audit(db, None, "CITIZEN_GRIEVANCE_SUBMITTED", "ISSUE_REPORT", f"Ticket {ticket_no} created", client_ip)

    return CitizenReportResponse.model_validate(report)


@router.get("/citizen/track/{ticket_no}", response_model=CitizenReportResponse)
def track_citizen_report(ticket_no: str, db: Session = Depends(get_db)):
    report = db.query(IssueReport).filter(IssueReport.ticket_no == ticket_no).first()
    if not report:
        raise HTTPException(status_code=404, detail="Grievance ticket not found")
    return CitizenReportResponse.model_validate(report)


@router.get("/field/issues", response_model=List[CitizenReportResponse])
def list_field_issues(
    status_filter: Optional[str] = None,
    current_user: User = Depends(require_roles(["Field Officer", "District Officer", "Super Admin"])),
    db: Session = Depends(get_db)
):
    query = db.query(IssueReport)
    if status_filter:
        query = query.filter(IssueReport.status == status_filter)
    reports = query.order_by(IssueReport.created_at.desc()).limit(50).all()
    return [CitizenReportResponse.model_validate(r) for r in reports]


@router.patch("/field/issues/{ticket_no}/status")
def update_issue_status(
    ticket_no: str,
    new_status: str = Query(..., enum=["investigating", "in_progress", "resolved"]),
    resolution_notes: Optional[str] = None,
    current_user: User = Depends(require_roles(["Field Officer", "District Officer", "Super Admin"])),
    db: Session = Depends(get_db)
):
    report = db.query(IssueReport).filter(IssueReport.ticket_no == ticket_no).first()
    if not report:
        raise HTTPException(status_code=404, detail="Grievance ticket not found")

    report.status = new_status
    if new_status == "resolved":
        report.resolved_at = datetime.now(timezone.utc)
    db.commit()
    return {"ticket_no": ticket_no, "status": new_status, "updated_by": current_user.full_name}


@router.post("/field/reading")
def submit_manual_field_reading(
    payload: FieldReadingInput,
    current_user: User = Depends(require_roles(["Field Officer", "District Officer", "Super Admin"])),
    db: Session = Depends(get_db)
):
    station = db.query(Station).filter(Station.code == payload.station_code).first()
    if not station:
        raise HTTPException(status_code=404, detail=f"Station code {payload.station_code} not found")

    obs_time = payload.observed_at or datetime.now(timezone.utc)
    obs = Observation(
        station_id=station.id,
        observed_at=obs_time,
        metric="groundwater_depth_m",
        value=payload.depth_m,
        unit="m bgl",
        quality_flag="good",
        source_id=f"field_officer_{current_user.id[:8]}",
        raw_payload=f"Manual field observation by {current_user.full_name}. Notes: {payload.notes or 'None'}"
    )
    db.add(obs)
    
    # Update station live reading
    station.depth_m = payload.depth_m
    db.commit()

    return {
        "status": "success",
        "station_code": payload.station_code,
        "recorded_depth_m": payload.depth_m,
        "observed_at": obs_time.isoformat(),
        "officer": current_user.full_name
    }
