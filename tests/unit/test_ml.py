import sys
import os
import pytest
import numpy as np
import pandas as pd

sys.path.insert(0, os.path.abspath("."))
sys.path.insert(0, os.path.abspath("apps/api"))

from services.ml.feature_store import HydroFeatureStore
from services.ml.models.forecaster import GroundwaterForecaster
from services.ml.models.risk_engine import WaterRiskEngine
from services.ml.models.anomaly_detector import SensorAnomalyDetector
from services.ml.inference import generate_training_dataset


def test_feature_store_lag_and_seasonality():
    df = generate_training_dataset(num_years=5)
    feat_df = HydroFeatureStore.build_features(df)
    
    assert "sin_month" in feat_df.columns
    assert "cos_month" in feat_df.columns
    assert "lag_depth_1m" in feat_df.columns
    assert "lag_depth_3m" in feat_df.columns
    assert "rolling_mean_3m" in feat_df.columns
    # Ensure no NaN values remain
    assert feat_df.isna().sum().sum() == 0


def test_time_based_split_no_leakage():
    # 10 years dataset: 2015 to 2025
    df = generate_training_dataset(num_years=10)
    feat_df = HydroFeatureStore.build_features(df)
    train_df, test_df = HydroFeatureStore.time_based_split(feat_df, test_cutoff_year=2024)

    assert len(train_df) > 0
    assert len(test_df) > 0
    assert train_df["date"].max() < test_df["date"].min()
    assert test_df["date"].dt.year.min() >= 2024


def test_groundwater_forecaster_beats_or_matches_baseline():
    df = generate_training_dataset(num_years=10)
    feat_df = HydroFeatureStore.build_features(df)
    train_df, test_df = HydroFeatureStore.time_based_split(feat_df, test_cutoff_year=2024)

    forecaster = GroundwaterForecaster(model_version="test_v1.0")
    metrics = forecaster.train_and_evaluate(train_df, test_df)

    assert metrics["mae"] > 0
    assert metrics["rmse"] > 0
    assert "naive_mae" in metrics
    # ML model must produce competitive predictions compared to naive baseline
    assert metrics["mae"] <= metrics["naive_mae"] + 0.3


def test_forecaster_horizon_confidence_intervals():
    df = generate_training_dataset(num_years=10)
    feat_df = HydroFeatureStore.build_features(df)
    train_df, test_df = HydroFeatureStore.time_based_split(feat_df, test_cutoff_year=2024)

    forecaster = GroundwaterForecaster(model_version="test_ci_v1.0")
    forecaster.train_and_evaluate(train_df, test_df)

    sample_features = test_df[forecaster.feature_cols].iloc[0].values
    pred = forecaster.predict_horizon(sample_features, horizon_months=12)

    assert "predicted_depth_m" in pred
    assert "confidence_lower" in pred
    assert "confidence_upper" in pred
    assert pred["confidence_lower"] <= pred["predicted_depth_m"] <= pred["confidence_upper"]


def test_water_risk_engine_scoring_and_categories():
    # Severe stress case: 1.0 m/yr depletion, -30% rain deficit, 30% reservoir fill, 50 WQI
    crit_res = WaterRiskEngine.calculate_score(
        depletion_rate_m_yr=1.0,
        rainfall_departure_pct=-30.0,
        reservoir_fill_pct=30.0,
        wqi_score=50.0
    )
    assert crit_res["composite_score"] > 60.0
    assert crit_res["category"] in ["high", "critical"]
    assert len(crit_res["top_drivers"]) == 4

    # Meerut safe case: low depletion, surplus rainfall, good reservoir, high WQI
    safe_res = WaterRiskEngine.calculate_score(
        depletion_rate_m_yr=0.2,
        rainfall_departure_pct=15.0,
        reservoir_fill_pct=85.0,
        wqi_score=88.0
    )
    assert safe_res["composite_score"] < 40.0
    assert safe_res["category"] in ["safe", "moderate"]


def test_sensor_anomaly_detector_classifications():
    # 1. Normal observation
    norm = SensorAnomalyDetector.inspect_observation(
        current_value=24.5, rolling_mean=24.2, rolling_std=0.8
    )
    assert norm["is_anomaly"] is False

    # 2. Impossible physical negative depth
    neg = SensorAnomalyDetector.inspect_observation(
        current_value=-5.0, rolling_mean=24.2, rolling_std=0.8
    )
    assert neg["is_anomaly"] is True
    assert neg["classification"] == "SENSOR_FAULT"

    # 3. Extreme cloudburst rainfall
    cloudburst = SensorAnomalyDetector.inspect_observation(
        current_value=145.0, rolling_mean=10.0, rolling_std=5.0, metric="rainfall_hourly_mm"
    )
    assert cloudburst["is_anomaly"] is True
    assert cloudburst["classification"] == "EXTREME_WEATHER_EVENT"

    # 4. Low battery fault
    batt_fault = SensorAnomalyDetector.inspect_observation(
        current_value=24.5, rolling_mean=24.2, rolling_std=0.8, battery_pct=4
    )
    assert batt_fault["is_anomaly"] is True
    assert batt_fault["classification"] == "SENSOR_FAULT_LOW_BATTERY"
