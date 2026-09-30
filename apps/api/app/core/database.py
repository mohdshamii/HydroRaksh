import os
import logging
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from app.core.config import settings

logger = logging.getLogger("jalsuraksha.database")

db_url = settings.DATABASE_URL

# Test if PostgreSQL driver is available, otherwise fallback to SQLite for local development
if db_url.startswith("postgresql"):
    try:
        import psycopg2  # type: ignore
    except ImportError:
        logger.warning("PostgreSQL driver (psycopg2) not detected in environment. Using SQLite fallback for local development.")
        db_url = "sqlite:///./jalsuraksha_local.db"

is_sqlite = db_url.startswith("sqlite")

engine_args = {}
if is_sqlite:
    engine_args["connect_args"] = {"check_same_thread": False}
else:
    engine_args["pool_pre_ping"] = True
    engine_args["pool_size"] = 10
    engine_args["max_overflow"] = 20

engine = create_engine(db_url, **engine_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
