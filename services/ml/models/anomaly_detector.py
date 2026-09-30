from typing import Dict, Any, List
import numpy as np


class SensorAnomalyDetector:
    """Distinguishes genuine hydrological events (recharge, extraction) from sensor faults."""

    @staticmethod
    def inspect_observation(
        current_value: float,
        rolling_mean: float,
        rolling_std: float,
        metric: str = "water_depth_m",
        battery_pct: int = 100
    ) -> Dict[str, Any]:
        """
        Evaluates whether a newly received observation is normal, a real natural event, or a sensor fault.
        """
        # 1. Physics Range Checks
        if metric == "water_depth_m":
            if current_value < 0 or current_value > 250:
                return {
                    "is_anomaly": True,
                    "classification": "SENSOR_FAULT",
                    "reason": f"Physical impossible water table depth: {current_value}m",
                    "action": "Suppress from ML training, notify field officer"
                }

        if metric == "rainfall_hourly_mm":
            if current_value < 0:
                return {
                    "is_anomaly": True,
                    "classification": "SENSOR_FAULT",
                    "reason": f"Negative rainfall value: {current_value}mm",
                    "action": "Reject record"
                }
            if current_value > 120:
                return {
                    "is_anomaly": True,
                    "classification": "EXTREME_WEATHER_EVENT",
                    "reason": f"Cloudburst event detected: {current_value}mm/hr",
                    "action": "Trigger high-priority flood alert"
                }

        # 2. Battery health correlation
        if battery_pct < 10:
            return {
                "is_anomaly": True,
                "classification": "SENSOR_FAULT_LOW_BATTERY",
                "reason": f"Sensor battery critical ({battery_pct}%), readings prone to voltage drop distortion",
                "action": "Flag maintenance ticket"
            }

        # 3. Statistical Z-Score Check
        if rolling_std > 0:
            z_score = abs(current_value - rolling_mean) / rolling_std
            if z_score > 3.5:
                # Sudden deviation
                if current_value < rolling_mean:
                    return {
                        "is_anomaly": True,
                        "classification": "HYDROLOGICAL_RECHARGE_EVENT",
                        "reason": f"Rapid water table rise of {rolling_mean - current_value:.2f}m (Z={z_score:.2f})",
                        "action": "Correlate with rainfall station"
                    }
                else:
                    return {
                        "is_anomaly": True,
                        "classification": "HEAVY_EXTRACTION_PUMPING",
                        "reason": f"Rapid water drawdown spike of {current_value - rolling_mean:.2f}m (Z={z_score:.2f})",
                        "action": "Notify district enforcement"
                    }

        return {
            "is_anomaly": False,
            "classification": "NORMAL_OBSERVATION",
            "reason": "Within expected historical baseline envelope",
            "action": "Accept"
        }
