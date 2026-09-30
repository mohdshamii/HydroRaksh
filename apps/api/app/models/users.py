import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, Text, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin


class User(Base, TimestampMixin):
    __tablename__ = "users"

    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="Citizen")  # Super Admin, State Admin, District Officer, Field Officer, Analyst, Citizen
    department = Column(String(100), nullable=True)
    jurisdiction_state = Column(String(100), nullable=True, default="All")
    jurisdiction_district = Column(String(100), nullable=True, default="All")
    phone = Column(String(20), nullable=True)
    is_active = Column(Boolean, default=True)
    is_verified = Column(Boolean, default=False)

    audit_logs = relationship("AuditLog", back_populates="user", cascade="all, delete-orphan")


class AuditLog(Base, TimestampMixin):
    __tablename__ = "audit_logs"

    user_id = Column(String(36), ForeignKey("users.id"), nullable=True)
    action = Column(String(100), nullable=False)  # CREATE, UPDATE, DELETE, EXPORT, RETRAIN
    resource = Column(String(100), nullable=False)
    details = Column(Text, nullable=True)
    ip_address = Column(String(50), nullable=True)

    user = relationship("User", back_populates="audit_logs")


class APIKey(Base, TimestampMixin):
    __tablename__ = "api_keys"

    name = Column(String(100), nullable=False)
    key_hash = Column(String(255), unique=True, index=True, nullable=False)
    owner_id = Column(String(36), ForeignKey("users.id"), nullable=False)
    rate_limit_per_min = Column(Integer, default=60)
    is_active = Column(Boolean, default=True)
    expires_at = Column(DateTime, nullable=True)
