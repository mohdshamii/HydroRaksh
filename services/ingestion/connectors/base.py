import abc
import json
import logging
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.telemetry import DataSource, IngestionRun

logger = logging.getLogger("jalsuraksha.ingestion")


class BaseConnector(abc.ABC):
    source_code: str
    source_name: str
    update_frequency: str = "Daily"

    def __init__(self, db: Optional[Session] = None):
        self.db = db

    @abc.abstractmethod
    def fetch(self) -> List[Dict[str, Any]]:
        """Fetch raw data payload from authoritative remote API or scraping endpoint."""
        pass

    @abc.abstractmethod
    def validate_and_normalize(self, raw_items: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Validate ranges and convert to canonical schema with quality flags."""
        pass

    @abc.abstractmethod
    def upsert(self, db: Session, records: List[Dict[str, Any]]) -> int:
        """Idempotently insert or update records in the database."""
        pass

    def run(self, db: Session) -> Dict[str, Any]:
        """Execute full connector lifecycle: fetch -> validate -> normalize -> upsert -> log lineage."""
        logger.info(f"Starting ingestion run for [{self.source_code}] - {self.source_name}...")
        
        # Ensure DataSource record exists
        source_rec = db.query(DataSource).filter(DataSource.code == self.source_code).first()
        if not source_rec:
            source_rec = DataSource(
                code=self.source_code,
                name=self.source_name,
                update_frequency=self.update_frequency,
                status="healthy"
            )
            db.add(source_rec)
            db.commit()
            db.refresh(source_rec)

        run_rec = IngestionRun(
            source_id=source_rec.id,
            status="running",
            started_at=datetime.now(timezone.utc)
        )
        db.add(run_rec)
        db.commit()
        db.refresh(run_rec)

        try:
            raw_items = self.fetch()
            normalized = self.validate_and_normalize(raw_items)
            count = self.upsert(db, normalized)

            run_rec.status = "success"
            run_rec.completed_at = datetime.now(timezone.utc)
            run_rec.records_ingested = count
            
            source_rec.last_run_at = datetime.now(timezone.utc)
            source_rec.status = "healthy"
            source_rec.record_count = (source_rec.record_count or 0) + count
            db.commit()

            logger.info(f"Ingestion for [{self.source_code}] succeeded. Ingested: {count} records.")
            return {
                "source": self.source_code,
                "status": "success",
                "count": count,
                "started_at": run_rec.started_at.isoformat(),
                "completed_at": run_rec.completed_at.isoformat()
            }
        except Exception as e:
            db.rollback()
            logger.error(f"Ingestion for [{self.source_code}] failed: {str(e)}", exc_info=True)
            run_rec.status = "failed"
            run_rec.completed_at = datetime.now(timezone.utc)
            run_rec.errors_log = str(e)
            
            source_rec.status = "degraded"
            source_rec.error_count = (source_rec.error_count or 0) + 1
            db.commit()

            return {
                "source": self.source_code,
                "status": "failed",
                "error": str(e),
                "started_at": run_rec.started_at.isoformat()
            }
