import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Integer, DateTime, Text, ForeignKey, Index
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin


class Observation(Base, TimestampMixin):
    __tablename__ = "observations"

    station_id = Column(String(36), ForeignKey("stations.id"), nullable=False, index=True)
    observed_at = Column(DateTime, nullable=False, index=True)
    metric = Column(String(50), nullable=False, index=True)  # water_depth_m, rainfall_mm, flow_lpm, tds_mg_l, ph, etc.
    value = Column(Float, nullable=False)
    unit = Column(String(20), nullable=False)
    quality_flag = Column(String(20), default="good")  # good, suspect, rejected
    source_id = Column(String(50), nullable=False, index=True)
    fetched_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    raw_payload = Column(Text, nullable=True)

    station = relationship("Station", back_populates="observations")

    __table_args__ = (
        Index("ix_obs_station_metric_time", "station_id", "metric", "observed_at"),
    )


class ReservoirObservation(Base, TimestampMixin):
    __tablename__ = "reservoir_observations"

    reservoir_id = Column(String(36), ForeignKey("reservoirs.id"), nullable=False, index=True)
    observed_at = Column(DateTime, nullable=False, index=True)
    current_storage_mcm = Column(Float, nullable=False)
    fill_pct = Column(Float, nullable=False)
    inflow_cumec = Column(Float, default=0.0)
    outflow_cumec = Column(Float, default=0.0)
    source_id = Column(String(50), default="CWC")
    fetched_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    reservoir = relationship("Reservoir", back_populates="observations")


class DataSource(Base, TimestampMixin):
    __tablename__ = "data_sources"

    code = Column(String(50), unique=True, index=True, nullable=False)  # open_meteo, india_wris, cgwb, cwc, cpcb
    name = Column(String(100), nullable=False)
    url = Column(String(255), nullable=True)
    update_frequency = Column(String(50), default="Hourly")  # Realtime, Hourly, Daily, Weekly
    last_run_at = Column(DateTime, nullable=True)
    status = Column(String(20), default="healthy")  # healthy, degraded, offline
    error_count = Column(Integer, default=0)
    record_count = Column(Integer, default=0)

    runs = relationship("IngestionRun", back_populates="data_source", cascade="all, delete-orphan")


class IngestionRun(Base, TimestampMixin):
    __tablename__ = "ingestion_runs"

    source_id = Column(String(36), ForeignKey("data_sources.id"), nullable=False)
    started_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    completed_at = Column(DateTime, nullable=True)
    status = Column(String(20), default="running")  # running, success, partial, failed
    records_ingested = Column(Integer, default=0)
    errors_log = Column(Text, nullable=True)

    data_source = relationship("DataSource", back_populates="runs")
