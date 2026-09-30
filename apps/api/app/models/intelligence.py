import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Integer, DateTime, Text, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin


class Prediction(Base, TimestampMixin):
    __tablename__ = "predictions"

    station_id = Column(String(36), ForeignKey("stations.id"), nullable=True)
    region_id = Column(String(36), ForeignKey("regions.id"), nullable=True)
    metric = Column(String(50), nullable=False)
    horizon_months = Column(Integer, nullable=False)  # 3, 6, 12, 60, 120
    predicted_value = Column(Float, nullable=False)
    confidence_lower = Column(Float, nullable=True)
    confidence_upper = Column(Float, nullable=True)
    model_version = Column(String(50), nullable=False)
    generated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))


class RiskScore(Base, TimestampMixin):
    __tablename__ = "risk_scores"

    region_id = Column(String(36), ForeignKey("regions.id"), nullable=False, index=True)
    calculated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), index=True)
    composite_score = Column(Float, nullable=False)  # 0 to 100
    depletion_score = Column(Float, nullable=False)
    rainfall_score = Column(Float, nullable=False)
    reservoir_score = Column(Float, nullable=False)
    quality_score = Column(Float, nullable=False)
    risk_category = Column(String(20), nullable=False)  # safe, moderate, high, critical
    shap_drivers = Column(Text, nullable=True)  # JSON-encoded key feature importances
    model_version = Column(String(50), default="xgb_water_risk_v1.0")

    region = relationship("Region", back_populates="risk_scores")


class AlertRule(Base, TimestampMixin):
    __tablename__ = "alert_rules"

    name = Column(String(100), nullable=False)
    metric = Column(String(50), nullable=False)
    condition = Column(String(20), nullable=False)  # gt, lt, delta_gt
    threshold = Column(Float, nullable=False)
    severity = Column(String(20), default="warning")  # info, warning, critical
    is_active = Column(Boolean, default=True)


class Alert(Base, TimestampMixin):
    __tablename__ = "alerts"

    rule_id = Column(String(36), ForeignKey("alert_rules.id"), nullable=True)
    region_id = Column(String(36), ForeignKey("regions.id"), nullable=True)
    station_id = Column(String(36), ForeignKey("stations.id"), nullable=True)
    severity = Column(String(20), nullable=False)  # info, warning, critical
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    triggered_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    status = Column(String(20), default="open")  # open, acknowledged, resolved
    acknowledged_by = Column(String(255), nullable=True)
    resolved_by = Column(String(255), nullable=True)


class IssueReport(Base, TimestampMixin):
    __tablename__ = "issue_reports"

    ticket_no = Column(String(30), unique=True, index=True, nullable=False)
    reporter_name = Column(String(100), nullable=False)
    reporter_phone = Column(String(20), nullable=False)
    category = Column(String(100), nullable=False)  # Dried Borewell, Contamination, Leakage, Over-extraction, Broken Structure
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    address = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    photo_url = Column(String(255), nullable=True)
    status = Column(String(20), default="reported")  # reported, investigating, in_progress, resolved
    assigned_to_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    resolved_at = Column(DateTime, nullable=True)
