import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.db.init_db import init_db
from app.api.v1.auth import router as auth_router
from app.api.v1.admin import router as admin_router

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("jalsuraksha")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing JalSuraksha database and foundational seeds...")
    init_db()
    logger.info("JalSuraksha API is ready and listening.")
    yield
    logger.info("Shutting down JalSuraksha API.")


app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Authoritative, real-time water resource intelligence, ML forecasting, and decision support platform for India.",
    version="1.0.0",
    lifespan=lifespan,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Routers
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(admin_router, prefix=settings.API_V1_STR)


@app.get("/")
def root():
    return {
        "service": "JalSuraksha API",
        "motto": "Predict • Protect • Preserve",
        "version": "1.0.0",
        "docs": f"{settings.API_V1_STR}/docs",
        "health": f"{settings.API_V1_STR}/health",
    }


@app.get(f"{settings.API_V1_STR}/health")
def healthcheck():
    return {
        "status": "healthy",
        "environment": settings.ENVIRONMENT,
        "feature_simulator_mode": settings.FEATURE_SIMULATOR_MODE,
        "database": "connected",
        "version": "1.0.0"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
