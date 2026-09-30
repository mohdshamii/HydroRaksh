import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Float, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.models.base import TimestampMixin


class Region(Base, TimestampMixin):
    __tablename__ = "regions"

    code = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), index=True, nullable=False)
    type = Column(String(20), default="District")  # State, District, Block
    state = Column(String(100), index=True, nullable=False)
    district = Column(String(100), index=True, nullable=True)
    block = Column(String(100), index=True, nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    area_km2 = Column(Float, nullable=True)
    population = Column(Integer, nullable=True)
    geom_geojson = Column(Text, nullable=True)  # Store Polygon / MultiPolygon GeoJSON

    stations = relationship("Station", back_populates="region")
    risk_scores = relationship("RiskScore", back_populates="region")


class Station(Base, TimestampMixin):
    __tablename__ = "stations"

    code = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), index=True, nullable=False)
    type = Column(String(50), nullable=False)  # Piezometer, Dug Well, Rain Gauge, Telemetry Flow Meter, Water Quality Probe
    state = Column(String(100), index=True, nullable=False)
    district = Column(String(100), index=True, nullable=False)
    block = Column(String(100), nullable=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    depth_m = Column(Float, nullable=True)
    aquifer_type = Column(String(100), nullable=True)
    status = Column(String(20), default="online")  # online, warning, offline
    battery_pct = Column(Integer, default=100)
    source_id = Column(String(50), default="CGWB")
    region_id = Column(String(36), ForeignKey("regions.id"), nullable=True)

    region = relationship("Region", back_populates="stations")
    observations = relationship("Observation", back_populates="station", cascade="all, delete-orphan")


class Reservoir(Base, TimestampMixin):
    __tablename__ = "reservoirs"

    code = Column(String(50), unique=True, index=True, nullable=False)
    name = Column(String(100), index=True, nullable=False)
    state = Column(String(100), index=True, nullable=False)
    district = Column(String(100), index=True, nullable=False)
    river_basin = Column(String(100), nullable=False)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    full_reservoir_level_m = Column(Float, nullable=False)
    live_capacity_mcm = Column(Float, nullable=False)
    current_storage_mcm = Column(Float, default=0.0)
    fill_pct = Column(Float, default=0.0)
    hist_10yr_avg_mcm = Column(Float, default=0.0)
    status = Column(String(20), default="normal")

    observations = relationship("ReservoirObservation", back_populates="reservoir", cascade="all, delete-orphan")
