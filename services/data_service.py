"""
JalSuraksha Unified Data Service.
Loads, validates, indexes, enriches, and serves all hydrological datasets across Pan-India:
- 75 Uttar Pradesh Reference Districts (authentic Survey of India boundaries, calibrated metrics)
- 700+ Pan-India Districts across 36 States & Union Territories
- 36 Administrative States & UT metadata
- Real CGWB Groundwater Levels (1,152,078 empirical observations)
- Real CGWB Water Quality (185,660 chemical laboratory assays with BIS 10500 standards)
- Real IMD Daily & Cumulative Rainfall (61,834 daily records)
- 43 Major & Principal Aquifer Systems from CGWB/NWIC shapefiles
- 8 Authoritative Open Data Ingestion Sources
"""

import os
import json
import logging
import re
from typing import List, Dict, Any, Optional

logger = logging.getLogger("jalsuraksha.data_service")

# Resolve root data directory
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DATA_DIR = os.path.join(BASE_DIR, "data")
CACHE_DIR = os.path.join(DATA_DIR, "cache")


class DataService:
    _instance: Optional["DataService"] = None

    def __init__(self):
        self.up_districts: List[Dict[str, Any]] = []
        self.pan_india_districts: Dict[str, List[Dict[str, Any]]] = {}
        self.states_and_uts: List[Dict[str, Any]] = []
        self.data_sources: List[Dict[str, Any]] = []
        self.authentic_svg_boundaries: Dict[str, List[Dict[str, Any]]] = {}
        
        # Fast lookup maps
        self.districts_by_id: Dict[str, Dict[str, Any]] = {}
        self.states_by_code: Dict[str, Dict[str, Any]] = {}
        
        self._load_datasets()
        self._enrich_with_real_data()

    @classmethod
    def get_instance(cls) -> "DataService":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def _load_datasets(self):
        # 1. Load authentic Survey of India SVG boundaries if cached
        svg_cache_path = os.path.join(CACHE_DIR, "state_svg_boundaries.json")
        if os.path.exists(svg_cache_path):
            try:
                with open(svg_cache_path, "r", encoding="utf-8") as f:
                    self.authentic_svg_boundaries = json.load(f)
                logger.info(f"Loaded authentic Survey of India boundaries across {len(self.authentic_svg_boundaries)} states.")
            except Exception as e:
                logger.warning(f"Failed to load state_svg_boundaries.json: {e}")

        # 2. Load UP 75 Districts
        up_path = os.path.join(DATA_DIR, "up_75_districts.json")
        if os.path.exists(up_path):
            try:
                with open(up_path, "r", encoding="utf-8") as f:
                    self.up_districts = json.load(f)
                    for d in self.up_districts:
                        d["stateCode"] = "UP"
                        d["stateName"] = "Uttar Pradesh"
                        self.districts_by_id[d["id"]] = d
                logger.info(f"Loaded {len(self.up_districts)} UP districts.")
            except Exception as e:
                logger.error(f"Failed to load up_75_districts.json: {e}")

        # 3. Load Pan-India All Districts
        pi_path = os.path.join(DATA_DIR, "pan_india_all_districts.json")
        if os.path.exists(pi_path):
            try:
                with open(pi_path, "r", encoding="utf-8") as f:
                    self.pan_india_districts = json.load(f)
                    for sc, dist_list in self.pan_india_districts.items():
                        for d in dist_list:
                            d["stateCode"] = sc
                            self.districts_by_id[d["id"]] = d
                # Ensure UP is also represented in pan_india_districts dictionary
                self.pan_india_districts["UP"] = self.up_districts
                logger.info(f"Loaded Pan-India districts across {len(self.pan_india_districts)} states.")
            except Exception as e:
                logger.error(f"Failed to load pan_india_all_districts.json: {e}")

        # 4. Load Indian States & UTs
        states_path = os.path.join(DATA_DIR, "indian_states_uts.json")
        if os.path.exists(states_path):
            try:
                with open(states_path, "r", encoding="utf-8") as f:
                    self.states_and_uts = json.load(f)
                    for s in self.states_and_uts:
                        self.states_by_code[s["code"]] = s
                logger.info(f"Loaded {len(self.states_and_uts)} States & UTs.")
            except Exception as e:
                logger.error(f"Failed to load indian_states_uts.json: {e}")

        # 5. Load Data Sources
        sources_path = os.path.join(DATA_DIR, "data_sources.json")
        if os.path.exists(sources_path):
            try:
                with open(sources_path, "r", encoding="utf-8") as f:
                    self.data_sources = json.load(f)
                logger.info(f"Loaded {len(self.data_sources)} data source definitions.")
            except Exception as e:
                logger.error(f"Failed to load data_sources.json: {e}")

    def _enrich_with_real_data(self):
        """Enrich loaded districts with real empirical records and authentic SOI geometry."""
        try:
            from services.real_data_service import real_data_service
        except ImportError:
            logger.warning("real_data_service not available for enrichment.")
            return

        all_districts_list = list(self.districts_by_id.values())
        for d in all_districts_list:
            sc = d.get("stateCode", "UP").upper().replace("IN-", "")
            d_id = d.get("id", "")
            d_name = d.get("name", "")
            norm_id = re.sub(r"[^a-z0-9]", "", d_name.lower())

            # 1. Authentic Survey of India SVG Boundary
            if sc in self.authentic_svg_boundaries:
                svg_list = self.authentic_svg_boundaries[sc]
                matched_svg = next((s for s in svg_list if s["norm_id"] == norm_id or s["norm_id"] in norm_id or norm_id in s["norm_id"]), None)
                if matched_svg and matched_svg.get("svgPath"):
                    d["svgPath"] = matched_svg["svgPath"]
                    if matched_svg.get("centroid"):
                        d["centroid"] = matched_svg["centroid"]
                        d["projected"] = matched_svg["centroid"]

            # 2. Real CGWB Groundwater Levels
            gw = real_data_service.get_groundwater_data(d_id, sc)
            if gw:
                mwm = d.setdefault("modernWaterMetrics", {})
                mwm["groundwaterDepthM"] = gw["mean_depth_mbgl"]
                mwm["groundwaterTrendAnnualCm"] = gw["ten_year_trend_annual_cm"]
                mwm["empiricalObservationsCount"] = gw["total_observations"]
                mwm["monitoringStationsCount"] = gw["stations_count"]
                mwm["observationPeriod"] = gw["observation_period"]
                mwm["provenance"] = gw["provenance"]
                mwm["isEmpiricalCGWB"] = True

            # 3. Real CGWB Chemical Water Quality (BIS 10500)
            wq = real_data_service.get_water_quality_data(d_id, sc)
            if wq:
                d["waterQuality"] = {
                    "wqi": wq["wqi"],
                    "status": wq["status"],
                    "ph": wq["ph"],
                    "tdsMgL": wq["tds_mg_l"],
                    "ecUsCm": wq["ec_us_cm"],
                    "fluorideMgL": wq["fluoride_mg_l"],
                    "arsenicMgL": wq["arsenic_mg_l"],
                    "nitrateMgL": wq["nitrate_mg_l"],
                    "uraniumMgL": wq["uranium_mg_l"],
                    "chlorideMgL": wq["chloride_mg_l"],
                    "totalHardnessMgL": wq["total_hardness_mg_l"],
                    "exceedances": wq.get("exceedances", []),
                    "samplesAnalyzed": wq.get("samples_analyzed", 1),
                    "testingLab": wq.get("testing_agency", "CGWB Regional Laboratory"),
                    "provenance": "Empirical CGWB Chemical Laboratory Assays",
                    "standard": "BIS 10500:2012 Drinking Water Specification"
                }

            # 4. Real IMD Daily & Cumulative Rainfall
            rf = real_data_service.get_rainfall_data(d_id, sc)
            if rf:
                mwm = d.setdefault("modernWaterMetrics", {})
                mwm["avgRainfallMm"] = rf["normal_rainfall_mm"]
                mwm["rainfallActualMm"] = rf["actual_rainfall_mm"]
                mwm["rainfallDeparturePct"] = rf["departure_pct"]
                mwm["monsoonCategory"] = rf["monsoon_category"]
                mwm["rainfallProvenance"] = rf["provenance"]

        logger.info(f"Enriched {len(all_districts_list)} districts with empirical CGWB and IMD records.")

    # Accessor APIs
    def get_states(self) -> List[Dict[str, Any]]:
        return self.states_and_uts

    def get_state(self, state_code: str) -> Optional[Dict[str, Any]]:
        clean_code = state_code.upper().replace("IN-", "")
        return self.states_by_code.get(clean_code) or self.states_by_code.get(f"IN-{clean_code}")

    def get_districts_for_state(self, state_code: str) -> List[Dict[str, Any]]:
        clean_code = state_code.upper().replace("IN-", "")
        if clean_code == "UP":
            return self.up_districts
        return self.pan_india_districts.get(clean_code, [])

    def get_district(self, district_id: str) -> Optional[Dict[str, Any]]:
        if district_id in self.districts_by_id:
            return self.districts_by_id[district_id]
        
        # Case-insensitive or normalized fallback
        norm_id = district_id.lower().replace("-", "_").replace(" ", "_")
        for k, v in self.districts_by_id.items():
            if k.lower().replace("-", "_") == norm_id:
                return v
        return None

    def search_districts(self, query: str, state_code: Optional[str] = None, limit: int = 10) -> List[Dict[str, Any]]:
        q = query.strip().lower()
        if not q:
            return []

        search_pool = self.get_districts_for_state(state_code) if state_code else list(self.districts_by_id.values())
        results = []
        for d in search_pool:
            name = d.get("name", "").lower()
            division = d.get("division", "").lower()
            basin = d.get("modernWaterMetrics", {}).get("majorRiverBasin", "").lower()
            if q in name or q in division or q in basin:
                results.append(d)
                if len(results) >= limit:
                    break
        return results

    def get_data_sources(self) -> List[Dict[str, Any]]:
        return self.data_sources

    def get_rivers_for_state(self, state_code: str) -> List[Dict[str, Any]]:
        from services.geospatial_engine import geospatial_engine
        return geospatial_engine.get_rivers_for_state(state_code)

    def get_hotspots_for_state(self, state_code: str, districts: Optional[List[Dict[str, Any]]] = None) -> List[Dict[str, float]]:
        from services.geospatial_engine import geospatial_engine
        dists = districts if districts is not None else self.get_districts_for_state(state_code)
        return geospatial_engine.get_hotspots_for_state(state_code, dists)

    def get_iot_sensors_for_state(self, state_code: str, districts: Optional[List[Dict[str, Any]]] = None) -> List[Dict[str, float]]:
        from services.geospatial_engine import geospatial_engine
        dists = districts if districts is not None else self.get_districts_for_state(state_code)
        return geospatial_engine.get_iot_sensors_for_state(state_code, dists)


# Global singleton instance
data_service = DataService.get_instance()
