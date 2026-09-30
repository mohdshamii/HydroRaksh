import os
from typing import List, Union
from pydantic import AnyHttpUrl, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    ENVIRONMENT: str = "development"
    LOG_LEVEL: str = "INFO"
    SECRET_KEY: str = "jalsuraksha-super-secret-development-key-change-in-production-min32chars"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440
    ALGORITHM: str = "HS256"

    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "JalSuraksha — AI Water Resource Intelligence"

    # CORS
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
    ]

    # Database
    DATABASE_URL: str = "sqlite:///./jalsuraksha_local.db"
    POSTGRES_DB: str = "jalsuraksha_db"

    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"

    # MinIO / S3
    S3_ENDPOINT: str = "http://localhost:9000"
    S3_ACCESS_KEY: str = "minioadmin"
    S3_SECRET_KEY: str = "minioadmin"
    S3_BUCKET_NAME: str = "jalsuraksha-storage"
    S3_REGION: str = "ap-south-1"

    # Feature Flags
    FEATURE_SIMULATOR_MODE: bool = False
    FEATURE_LIVE_STREAMING: bool = True
    FEATURE_AI_ASSISTANT: bool = True
    FEATURE_SMS_ALERTS: bool = False

    # External APIs
    DATA_GOV_IN_API_KEY: str = ""
    IMD_API_KEY: str = ""
    INDIA_WRIS_TOKEN: str = ""
    CPCB_API_KEY: str = ""
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""

    @field_validator("DATABASE_URL", mode="before")
    def assemble_db_connection(cls, v: str | None) -> str:
        if not v or v.strip() == "":
            return "sqlite:///./jalsuraksha_local.db"
        return v


settings = Settings()
