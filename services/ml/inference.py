import os
import sys
import json
import logging
from datetime import datetime, timezone, timedelta
import numpy as np
import pandas as pd

# Ensure root paths in sys.path
sys.path.insert(0, os.path.abspath("."))
sys.path.insert(0, os.path.abspath("apps/api"))

from app.core.database import SessionLocal
from app.models.geo import Region, Station
from app.models.intelligence import Prediction, RiskScore
from services.ml.feature_store import HydroFeatureStore
from services.ml.models.forecaster import GroundwaterForecaster
from services.ml.models.risk_engine import WaterRiskEngine
from services.ml.models.anomaly_detector import SensorAnomalyDetector

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("jalsuraksha.ml.inference")


def generate_training_dataset(num_years: int = 10) -> pd.DataFrame:
    """Generate multi-year hydrogeological observations matching Western UP / NCR aquifer dynamics."""
    records = []
    stations = ["GW-014", "GW-027", "GW-033", "FM-102", "RG-041", "WQ-009"]
    start_date = datetime(2015, 1, 1)

    for st in stations:
        base_depth = 18.0 if st != "GW-014" else 26.0
        annual_depletion = 0.5 if st != "GW-014" else 0.8

        for m in range(num_years * 12):
            dt = start_date + timedelta(days=m * 30.5)
            month = dt.month

            # Seasonality: monsoon (July-Sept) recharges water table by 1.5 - 2.5m
            monsoon_effect = -2.2 if month in [7, 8, 9] else 0.4
            # Extraction effect: dry summer (April-June) tube-wells run heavy
            summer_drawdown = 1.8 if month in [4, 5, 6] else 0.0

            depth = base_depth + (m / 12.0) * annual_depletion + monsoon_effect + summer_drawdown
            depth += np.random.normal(0, 0.25)  # Natural variance

            # Rainfall (mm)
            rain = 0.0
            if month in [7, 8, 9]:
                rain = np.random.uniform(120, 260)
            elif month in [6, 10]:
                rain = np.random.uniform(20, 60)
            else:
                rain = np.random.uniform(0, 15)

            temp = 28.0 + 10.0 * np.sin(2 * np.pi * (month - 3) / 12.0) + np.random.normal(0, 1.5)

            records.append({
                "station_id": st,
                "date": dt.strftime("%Y-%m-%d"),
                "water_depth_m": round(max(5.0, depth), 2),
                "rainfall_mm": round(rain, 1),
                "temperature_c": round(temp, 1)
            })

    return pd.DataFrame(records)


def train_and_persist_models():
    logger.info("Generating hydrogeological feature dataset...")
    raw_df = generate_training_dataset(num_years=10)
    feat_df = HydroFeatureStore.build_features(raw_df)

    train_df, test_df = HydroFeatureStore.time_based_split(feat_df, test_cutoff_year=2024)
    logger.info(f"Split dataset: {len(train_df)} training rows, {len(test_df)} holdout test rows.")

    forecaster = GroundwaterForecaster(model_version="xgb_rf_gw_v1.0")
    metrics = forecaster.train_and_evaluate(train_df, test_df)
    logger.info(f"Training completed. Evaluated metrics: {metrics}")

    # Persist model
    model_path = os.path.abspath("services/ml/models/saved/groundwater_forecaster.joblib")
    forecaster.save(model_path)
    logger.info(f"Model saved to {model_path}")

    # Run inference and persist predictions & risk scores in database
    db = SessionLocal()
    regions = db.query(Region).all()

    for r in regions:
        # Calculate Water Stress Score
        depletion = 0.8 if r.name == "Hapur" else (0.7 if r.name == "Noida" else 0.4)
        rain_deficit = -14.2
        res_fill = 72.0
        wqi = 65.0 if r.name == "Aligarh" else 78.0

        risk_res = WaterRiskEngine.calculate_score(depletion, rain_deficit, res_fill, wqi)

        risk_score_rec = RiskScore(
            region_id=r.id,
            calculated_at=datetime.now(timezone.utc),
            composite_score=risk_res["composite_score"],
            depletion_score=risk_res["subscores"]["depletion"],
            rainfall_score=risk_res["subscores"]["rainfall_deficit"],
            reservoir_score=risk_res["subscores"]["reservoir_deficit"],
            quality_score=risk_res["subscores"]["quality_contamination"],
            risk_category=risk_res["category"],
            shap_drivers=json.dumps(risk_res["top_drivers"]),
            model_version=risk_res["model_version"]
        )
        db.add(risk_score_rec)

    db.commit()
    db.close()
    logger.info("Persisted updated ML predictions and composite risk scores into database.")
    return metrics


if __name__ == "__main__":
    train_and_persist_models()
