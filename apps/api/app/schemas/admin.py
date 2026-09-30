from typing import Optional, List, Dict, Any
from datetime import datetime
from pydantic import BaseModel


class SourceHealthResponse(BaseModel):
    id: str
    code: str
    name: str
    url: Optional[str]
    update_frequency: str
    last_run_at: Optional[datetime]
    status: str
    error_count: int
    record_count: int

    class Config:
        from_attributes = True


class IngestionRunResponse(BaseModel):
    id: str
    source_name: str
    started_at: datetime
    completed_at: Optional[datetime]
    status: str
    records_ingested: int
    errors_log: Optional[str]

    class Config:
        from_attributes = True


class AuditLogResponse(BaseModel):
    id: str
    user_id: Optional[str]
    user_name: Optional[str]
    user_email: Optional[str]
    action: str
    resource: str
    details: Optional[str]
    ip_address: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class SystemStatusResponse(BaseModel):
    database: str
    cache_redis: str
    storage_minio: str
    environment: str
    feature_simulator_mode: bool
    active_stations: int
    active_reservoirs: int
    total_observations: int
    open_alerts: int
    reported_issues: int
    uptime_seconds: float
