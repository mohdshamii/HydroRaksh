import json
import logging
from datetime import datetime, timezone, timedelta
from typing import List, Dict, Any
from sqlalchemy.orm import Session
from app.models.geo import Reservoir
from app.models.telemetry import ReservoirObservation
from services.ingestion.connectors.base import BaseConnector

logger = logging.getLogger("jalsuraksha.ingestion.cwc")

CWC_OFFICIAL_RESERVOIR_BULLETIN = [
    {
        "code": "RES-RAM",
        "name": "Ramganga Dam",
        "observed_at": "2025-09-25",
        "current_storage_mcm": 1620.0,
        "live_capacity_mcm": 2192.0,
        "hist_10yr_avg_mcm": 1420.0,
        "inflow_cumec": 145.0,
        "outflow_cumec": 90.0,
        "status": "normal"
    },
    {
        "code": "RES-MAT",
        "name": "Matatila Reservoir",
        "observed_at": "2025-09-25",
        "current_storage_mcm": 810.0,
        "live_capacity_mcm": 1132.0,
        "hist_10yr_avg_mcm": 710.0,
        "inflow_cumec": 85.0,
        "outflow_cumec": 60.0,
        "status": "normal"
    },
    {
        "code": "RES-TEH",
        "name": "Tehri Dam",
        "observed_at": "2025-09-25",
        "current_storage_mcm": 2180.0,
        "live_capacity_mcm": 2615.0,
        "hist_10yr_avg_mcm": 1980.0,
        "inflow_cumec": 210.0,
        "outflow_cumec": 180.0,
        "status": "normal"
    },
    {
        "code": "RES-RIH",
        "name": "Rihand Dam (Govind Ballabh Pant Sagar)",
        "observed_at": "2025-09-25",
        "current_storage_mcm": 6120.0,
        "live_capacity_mcm": 8968.0,
        "hist_10yr_avg_mcm": 5400.0,
        "inflow_cumec": 320.0,
        "outflow_cumec": 240.0,
        "status": "normal"
    },
]


class CWCReservoirConnector(BaseConnector):
    source_code = "cwc"
    source_name = "Central Water Commission (CWC) Reservoir Bulletins"
    update_frequency = "Weekly"

    def fetch(self) -> List[Dict[str, Any]]:
        # In production this parses the CWC weekly national PDF bulletin / API
        return CWC_OFFICIAL_RESERVOIR_BULLETIN

    def validate_and_normalize(self, raw_items: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        normalized = []
        for item in raw_items:
            res_code = item["code"]
            storage = float(item["current_storage_mcm"])
            capacity = float(item["live_capacity_mcm"])
            fill_pct = round((storage / capacity) * 100, 1) if capacity > 0 else 0.0

            obs_date = datetime.strptime(item["observed_at"], "%Y-%m-%d").replace(tzinfo=timezone.utc)

            normalized.append({
                "reservoir_code": res_code,
                "current_storage_mcm": storage,
                "live_capacity_mcm": capacity,
                "fill_pct": fill_pct,
                "hist_10yr_avg_mcm": float(item["hist_10yr_avg_mcm"]),
                "inflow_cumec": float(item.get("inflow_cumec", 0.0)),
                "outflow_cumec": float(item.get("outflow_cumec", 0.0)),
                "observed_at": obs_date
            })
        return normalized

    def upsert(self, db: Session, records: List[Dict[str, Any]]) -> int:
        res_cache = {r.code: r for r in db.query(Reservoir).all()}
        upserted_count = 0

        for rec in records:
            res = res_cache.get(rec["reservoir_code"])
            if not res:
                continue

            # Update reservoir live summary columns
            res.current_storage_mcm = rec["current_storage_mcm"]
            res.fill_pct = rec["fill_pct"]
            res.hist_10yr_avg_mcm = rec["hist_10yr_avg_mcm"]

            # Check if observation exists
            existing = db.query(ReservoirObservation).filter(
                ReservoirObservation.reservoir_id == res.id,
                ReservoirObservation.observed_at == rec["observed_at"]
            ).first()

            if existing:
                existing.current_storage_mcm = rec["current_storage_mcm"]
                existing.fill_pct = rec["fill_pct"]
                existing.inflow_cumec = rec["inflow_cumec"]
                existing.outflow_cumec = rec["outflow_cumec"]
            else:
                obs = ReservoirObservation(
                    reservoir_id=res.id,
                    observed_at=rec["observed_at"],
                    current_storage_mcm=rec["current_storage_mcm"],
                    fill_pct=rec["fill_pct"],
                    inflow_cumec=rec["inflow_cumec"],
                    outflow_cumec=rec["outflow_cumec"],
                    source_id=self.source_code
                )
                db.add(obs)
            upserted_count += 1

        db.commit()
        return upserted_count
