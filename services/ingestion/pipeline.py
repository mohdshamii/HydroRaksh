import sys
import os
import time
import logging

# Ensure project root is in sys.path
sys.path.insert(0, os.path.abspath("."))
sys.path.insert(0, os.path.abspath("apps/api"))

from app.core.database import SessionLocal
from services.ingestion.connectors.open_meteo import OpenMeteoConnector
from services.ingestion.connectors.cgwb import CGWBConnector
from services.ingestion.connectors.cwc_reservoirs import CWCReservoirConnector

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [%(name)s] %(message)s"
)
logger = logging.getLogger("jalsuraksha.ingestion.pipeline")


def run_all_connectors():
    logger.info("==================================================")
    logger.info("Starting JalSuraksha Data Ingestion Pipeline")
    logger.info("==================================================")
    
    db = SessionLocal()
    connectors = [
        OpenMeteoConnector(),
        CGWBConnector(),
        CWCReservoirConnector(),
    ]

    results = []
    for conn in connectors:
        try:
            res = conn.run(db)
            results.append(res)
        except Exception as e:
            logger.error(f"Error running connector {conn.source_code}: {e}", exc_info=True)
            results.append({"source": conn.source_code, "status": "failed", "error": str(e)})

    db.close()
    logger.info(f"Ingestion pipeline completed. Summary: {results}")
    return results


if __name__ == "__main__":
    run_all_connectors()
