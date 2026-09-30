import math
from typing import List, Dict, Any, Tuple
import numpy as np
import pandas as pd


class HydroFeatureStore:
    """Hydrogeological feature store generating lag features, seasonality encodings, and rolling statistics."""

    @staticmethod
    def build_features(df: pd.DataFrame) -> pd.DataFrame:
        """
        Input DataFrame must contain:
        ['station_id', 'date', 'water_depth_m', 'rainfall_mm', 'temperature_c']
        """
        df = df.copy()
        df["date"] = pd.to_datetime(df["date"])
        df = df.sort_values(by=["station_id", "date"]).reset_index(drop=True)

        # 1. Cyclical Month Encodings (Seasonality)
        months = df["date"].dt.month
        df["sin_month"] = np.sin(2 * np.pi * months / 12.0)
        df["cos_month"] = np.cos(2 * np.pi * months / 12.0)

        # 2. Lag Features
        for lag in [1, 2, 3, 6, 12]:
            df[f"lag_depth_{lag}m"] = df.groupby("station_id")["water_depth_m"].shift(lag)
            df[f"lag_rain_{lag}m"] = df.groupby("station_id")["rainfall_mm"].shift(lag)

        # 3. Rolling Statistics
        df["rolling_mean_3m"] = (
            df.groupby("station_id")["water_depth_m"]
            .shift(1)
            .rolling(window=3, min_periods=1)
            .mean()
        )
        df["rolling_mean_6m"] = (
            df.groupby("station_id")["water_depth_m"]
            .shift(1)
            .rolling(window=6, min_periods=1)
            .mean()
        )
        df["rolling_rain_sum_3m"] = (
            df.groupby("station_id")["rainfall_mm"]
            .shift(1)
            .rolling(window=3, min_periods=1)
            .sum()
        )

        # 4. Fill forward / backward for initial lag boundary points
        df = df.bfill().ffill()
        return df

    @staticmethod
    def time_based_split(
        df: pd.DataFrame, test_cutoff_year: int = 2024
    ) -> Tuple[pd.DataFrame, pd.DataFrame]:
        """Strict time-based train/test split to guarantee zero lookahead leakage."""
        train_df = df[df["date"].dt.year < test_cutoff_year].copy()
        test_df = df[df["date"].dt.year >= test_cutoff_year].copy()
        return train_df, test_df
