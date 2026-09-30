from typing import Dict, Any, List


class WaterRiskEngine:
    """Composite Water Stress Score Engine (0-100) combining depletion, climate deficit, storage, and quality."""

    WEIGHT_DEPLETION = 0.35
    WEIGHT_RAINFALL = 0.25
    WEIGHT_RESERVOIR = 0.20
    WEIGHT_QUALITY = 0.20

    @classmethod
    def calculate_score(
        cls,
        depletion_rate_m_yr: float,
        rainfall_departure_pct: float,
        reservoir_fill_pct: float,
        wqi_score: float,
    ) -> Dict[str, Any]:
        """
        - depletion_rate_m_yr: e.g. 0.8 m/yr
        - rainfall_departure_pct: e.g. -20% (deficit) to +20% (surplus)
        - reservoir_fill_pct: e.g. 45% (lower is worse)
        - wqi_score: 0 to 100 (lower quality score means worse water)
        """
        # 1. Normalize Depletion Score (0 to 100): 0m/yr -> 0, >=1.2m/yr -> 100
        depletion_subscore = min(100.0, max(0.0, (depletion_rate_m_yr / 1.2) * 100.0))

        # 2. Normalize Rainfall Deficit Score (0 to 100): +20% -> 0, -40% deficit -> 100
        # If departure is -20%, deficit is 20%.
        rainfall_subscore = min(100.0, max(0.0, (-rainfall_departure_pct + 10.0) * 2.0))

        # 3. Normalize Reservoir Deficit Score (0 to 100): 100% full -> 0, <=20% full -> 100
        reservoir_subscore = min(100.0, max(0.0, (100.0 - reservoir_fill_pct)))

        # 4. Normalize Water Quality Contamination Score (0 to 100)
        quality_subscore = min(100.0, max(0.0, 100.0 - wqi_score))

        # Composite Weighted Score
        composite = (
            cls.WEIGHT_DEPLETION * depletion_subscore
            + cls.WEIGHT_RAINFALL * rainfall_subscore
            + cls.WEIGHT_RESERVOIR * reservoir_subscore
            + cls.WEIGHT_QUALITY * quality_subscore
        )
        composite = round(min(100.0, max(0.0, composite)), 1)

        # Risk Classification Band
        if composite < 30.0:
            category = "safe"
        elif composite < 60.0:
            category = "moderate"
        elif composite < 80.0:
            category = "high"
        else:
            category = "critical"

        # Feature Drivers Attribution (SHAP-style explainability percentages)
        total_sub = depletion_subscore + rainfall_subscore + reservoir_subscore + quality_subscore + 1e-6
        drivers = [
            {"driver": "Groundwater Over-Extraction Rate", "contribution_pct": round((depletion_subscore / total_sub) * 100, 1), "impact": "+High"},
            {"driver": "Monsoon Rainfall Deficit", "contribution_pct": round((rainfall_subscore / total_sub) * 100, 1), "impact": "+Medium"},
            {"driver": "Surface Reservoir Depletion", "contribution_pct": round((reservoir_subscore / total_sub) * 100, 1), "impact": "+Medium"},
            {"driver": "Water Quality / Contamination Load", "contribution_pct": round((quality_subscore / total_sub) * 100, 1), "impact": "+Low"},
        ]
        drivers.sort(key=lambda x: x["contribution_pct"], reverse=True)

        return {
            "composite_score": composite,
            "category": category,
            "subscores": {
                "depletion": round(depletion_subscore, 1),
                "rainfall_deficit": round(rainfall_subscore, 1),
                "reservoir_deficit": round(reservoir_subscore, 1),
                "quality_contamination": round(quality_subscore, 1)
            },
            "top_drivers": drivers,
            "model_version": "jalsuraksha_composite_v1.0"
        }
