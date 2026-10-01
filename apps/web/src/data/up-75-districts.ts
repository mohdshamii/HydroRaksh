/**
 * JalRakshak AI — 75 Uttar Pradesh Districts Hydrological & Planning Horizons Dataset
 * B.Tech CSE (Data Science + AI) Major Project Engine
 * Covers all 75 UP districts with temporal trajectories (2000 to 2035),
 * CGWB extraction stage, recharge suitability, soil, slope, and recommended structures.
 */

export interface TemporalDataPoint {
  year: number;
  depth_m: number;
  stress_score: number;
  category: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited";
  phase: string;
}

export interface RecommendedStructureItem {
  structure: string;
  capacity_m3_yr: number;
  unit_cost_inr: number;
  suitability: number;
  target: string;
}

export interface ModernWaterMetrics {
  groundwaterDepthM: number;
  groundwaterTrendAnnualCm: number;
  cgwbCategory: "Safe" | "Semi-Critical" | "Critical" | "Over-Exploited";
  cgwbStageExtractionPct: number;
  waterStressScore: number;
  majorRiverBasin: string;
  avgRainfallMm: number;
  annualDemandMcm: number;
  rainfallDeparturePct: number;
}

export interface DistrictWaterEntity {
  id: string;
  name: string;
  division?: string;
  region?: string;
  coordinates?: { lat: number; lng: number };
  waterStatus?: "good" | "critical" | "warning";
  centroid?: [number, number]; // [lat, lng]
  projected?: [number, number]; // [svgX, svgY]
  svgPath?: string;
  areaKm2?: number;
  soilType?: string;
  slopePct?: number;
  rechargeSuitabilityScore?: number;
  temporalTrajectory?: TemporalDataPoint[];
  modernWaterMetrics?: ModernWaterMetrics;
  recommendedRechargeStructures?: RecommendedStructureItem[];
}

export const UP_75_WATER_DISTRICTS: DistrictWaterEntity[] = [
  {
    "id": "saharanpur",
    "name": "Saharanpur",
    "division": "Saharanpur",
    "region": "Upper Doab",
    "coordinates": {
      "lat": 29.96,
      "lng": 77.55
    },
    "waterStatus": "warning",
    "centroid": [
      29.96,
      77.55
    ],
    "projected": [
      119.5,
      111.6
    ],
    "svgPath": "M 143.2,111.6 L 139.3,128.5 L 119.5,132.6 L 98.9,129.1 L 93.7,111.6 L 103.6,98.1 L 119.5,88.8 L 136.1,97.5 Z",
    "areaKm2": 3689,
    "soilType": "Alluvial Sandy Loam",
    "slopePct": 1.4,
    "rechargeSuitabilityScore": 91.8,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 8.48,
        "stress_score": 36.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 9.58,
        "stress_score": 39.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 10.68,
        "stress_score": 42.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 11.78,
        "stress_score": 44.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 12.88,
        "stress_score": 47.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 13.76,
        "stress_score": 49.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 14.2,
        "stress_score": 50.9,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 14.64,
        "stress_score": 52.0,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 15.08,
        "stress_score": 53.1,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 16.18,
        "stress_score": 55.9,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 14.2,
      "groundwaterTrendAnnualCm": -22,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 86.4,
      "waterStressScore": 38.0,
      "majorRiverBasin": "Yamuna & Hindon",
      "avgRainfallMm": 980,
      "annualDemandMcm": 412,
      "rainfallDeparturePct": 3.2
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "shamli",
    "name": "Shamli",
    "division": "Saharanpur",
    "region": "Upper Doab",
    "coordinates": {
      "lat": 29.45,
      "lng": 77.31
    },
    "waterStatus": "critical",
    "centroid": [
      29.45,
      77.31
    ],
    "projected": [
      93.5,
      160.3
    ],
    "svgPath": "M 107.0,160.3 L 104.8,169.9 L 93.5,172.3 L 84.9,167.6 L 78.9,160.3 L 84.5,152.6 L 93.5,147.4 L 102.9,152.3 Z",
    "areaKm2": 1167,
    "soilType": "Deep Sandy Alluvium",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 80.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 14.92,
        "stress_score": 63.9,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 16.82,
        "stress_score": 68.6,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 18.72,
        "stress_score": 73.4,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 20.62,
        "stress_score": 78.2,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 22.52,
        "stress_score": 82.9,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 24.04,
        "stress_score": 86.7,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 24.8,
        "stress_score": 88.6,
        "category": "Over-Exploited",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 25.56,
        "stress_score": 90.5,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 26.32,
        "stress_score": 92.4,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 28.22,
        "stress_score": 97.1,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 24.8,
      "groundwaterTrendAnnualCm": -38,
      "cgwbCategory": "Over-Exploited",
      "cgwbStageExtractionPct": 138.2,
      "waterStressScore": 80.4,
      "majorRiverBasin": "Yamuna Basin",
      "avgRainfallMm": 760,
      "annualDemandMcm": 380,
      "rainfallDeparturePct": -20.0
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "muzaffarnagar",
    "name": "Muzaffarnagar",
    "division": "Saharanpur",
    "region": "Upper Doab",
    "coordinates": {
      "lat": 29.47,
      "lng": 77.7
    },
    "waterStatus": "critical",
    "centroid": [
      29.47,
      77.7
    ],
    "projected": [
      135.7,
      158.4
    ],
    "svgPath": "M 155.1,158.4 L 152.1,172.4 L 135.7,175.6 L 118.6,172.9 L 114.5,158.4 L 118.0,143.3 L 135.7,139.6 L 154.1,142.8 Z",
    "areaKm2": 2945,
    "soilType": "Alluvial Silt Loam",
    "slopePct": 1.0,
    "rechargeSuitabilityScore": 93.0,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 13.0,
        "stress_score": 57.0,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 14.75,
        "stress_score": 61.4,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 16.5,
        "stress_score": 65.8,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 18.25,
        "stress_score": 70.1,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 20.0,
        "stress_score": 74.5,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 21.4,
        "stress_score": 78.0,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 22.1,
        "stress_score": 79.8,
        "category": "Over-Exploited",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 22.8,
        "stress_score": 81.5,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 23.5,
        "stress_score": 83.2,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 25.25,
        "stress_score": 87.6,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 22.1,
      "groundwaterTrendAnnualCm": -35,
      "cgwbCategory": "Over-Exploited",
      "cgwbStageExtractionPct": 124.5,
      "waterStressScore": 70.3,
      "majorRiverBasin": "Ganga & Kali",
      "avgRainfallMm": 820,
      "annualDemandMcm": 590,
      "rainfallDeparturePct": -13.7
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "baghpat",
    "name": "Baghpat",
    "division": "Meerut",
    "region": "Upper Doab",
    "coordinates": {
      "lat": 28.94,
      "lng": 77.22
    },
    "waterStatus": "critical",
    "centroid": [
      28.94,
      77.22
    ],
    "projected": [
      83.8,
      209.0
    ],
    "svgPath": "M 100.3,209.0 L 94.1,217.7 L 83.8,223.5 L 73.1,218.1 L 70.7,209.0 L 72.7,199.5 L 83.8,197.3 L 95.3,199.2 Z",
    "areaKm2": 1321,
    "soilType": "Sandy Loam Alluvium",
    "slopePct": 0.9,
    "rechargeSuitabilityScore": 81.3,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 15.58,
        "stress_score": 68.3,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 17.68,
        "stress_score": 73.6,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 19.78,
        "stress_score": 78.8,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 21.88,
        "stress_score": 84.1,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 23.98,
        "stress_score": 89.3,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 25.66,
        "stress_score": 93.6,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 26.5,
        "stress_score": 95.7,
        "category": "Over-Exploited",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 27.34,
        "stress_score": 97.8,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 28.18,
        "stress_score": 99.8,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 30.28,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 26.5,
      "groundwaterTrendAnnualCm": -42,
      "cgwbCategory": "Over-Exploited",
      "cgwbStageExtractionPct": 145.8,
      "waterStressScore": 89.3,
      "majorRiverBasin": "Yamuna Basin",
      "avgRainfallMm": 690,
      "annualDemandMcm": 340,
      "rainfallDeparturePct": -27.4
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "meerut",
    "name": "Meerut",
    "division": "Meerut",
    "region": "Upper Doab",
    "coordinates": {
      "lat": 28.98,
      "lng": 77.7
    },
    "waterStatus": "warning",
    "centroid": [
      28.98,
      77.7
    ],
    "projected": [
      135.7,
      205.2
    ],
    "svgPath": "M 159.5,205.2 L 150.6,217.8 L 135.7,220.7 L 120.2,218.4 L 116.6,205.2 L 119.6,191.5 L 135.7,188.2 L 152.4,191.0 Z",
    "areaKm2": 2559,
    "soilType": "Fine Alluvial Silt",
    "slopePct": 1.2,
    "rechargeSuitabilityScore": 92.4,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 13.34,
        "stress_score": 55.0,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 14.89,
        "stress_score": 58.9,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 16.44,
        "stress_score": 62.8,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 17.99,
        "stress_score": 66.7,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 19.54,
        "stress_score": 70.5,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 20.78,
        "stress_score": 73.7,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 21.4,
        "stress_score": 75.2,
        "category": "Over-Exploited",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 22.02,
        "stress_score": 76.8,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 22.64,
        "stress_score": 78.3,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 24.19,
        "stress_score": 82.2,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 21.4,
      "groundwaterTrendAnnualCm": -31,
      "cgwbCategory": "Critical",
      "cgwbStageExtractionPct": 98.4,
      "waterStressScore": 65.0,
      "majorRiverBasin": "Hindon & Kali",
      "avgRainfallMm": 840,
      "annualDemandMcm": 620,
      "rainfallDeparturePct": -11.6
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "ghaziabad",
    "name": "Ghaziabad",
    "division": "Meerut",
    "region": "Upper Doab",
    "coordinates": {
      "lat": 28.67,
      "lng": 77.45
    },
    "waterStatus": "critical",
    "centroid": [
      28.67,
      77.45
    ],
    "projected": [
      108.6,
      234.8
    ],
    "svgPath": "M 118.9,234.8 L 117.3,242.2 L 108.6,244.0 L 99.6,242.5 L 97.4,234.8 L 99.2,226.8 L 108.6,224.8 L 115.8,228.7 Z",
    "areaKm2": 777,
    "soilType": "Deep Sandy Alluvium",
    "slopePct": 0.8,
    "rechargeSuitabilityScore": 81.6,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 16.72,
        "stress_score": 75.4,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 19.12,
        "stress_score": 81.4,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 21.52,
        "stress_score": 87.4,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 23.92,
        "stress_score": 93.4,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 26.32,
        "stress_score": 99.4,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 28.24,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 29.2,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 30.16,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 31.12,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 33.52,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 29.2,
      "groundwaterTrendAnnualCm": -48,
      "cgwbCategory": "Over-Exploited",
      "cgwbStageExtractionPct": 154.2,
      "waterStressScore": 98,
      "majorRiverBasin": "Hindon Basin",
      "avgRainfallMm": 710,
      "annualDemandMcm": 480,
      "rainfallDeparturePct": -25.3
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "hapur",
    "name": "Hapur",
    "division": "Meerut",
    "region": "Upper Doab",
    "coordinates": {
      "lat": 28.73,
      "lng": 77.78
    },
    "waterStatus": "warning",
    "centroid": [
      28.73,
      77.78
    ],
    "projected": [
      144.3,
      229.1
    ],
    "svgPath": "M 159.2,229.1 L 153.6,237.0 L 144.3,242.3 L 134.6,237.3 L 128.2,229.1 L 134.2,220.6 L 144.3,218.6 L 154.8,220.2 Z",
    "areaKm2": 1124,
    "soilType": "Alluvial Loam",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 92.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 12.52,
        "stress_score": 50.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 13.92,
        "stress_score": 54.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 15.32,
        "stress_score": 57.9,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 16.72,
        "stress_score": 61.4,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 18.12,
        "stress_score": 64.9,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 19.24,
        "stress_score": 67.7,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 19.8,
        "stress_score": 69.1,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 20.36,
        "stress_score": 70.5,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 20.92,
        "stress_score": 71.9,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 22.32,
        "stress_score": 75.4,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 19.8,
      "groundwaterTrendAnnualCm": -28,
      "cgwbCategory": "Critical",
      "cgwbStageExtractionPct": 94.6,
      "waterStressScore": 60.5,
      "majorRiverBasin": "Ganga Basin",
      "avgRainfallMm": 790,
      "annualDemandMcm": 310,
      "rainfallDeparturePct": -16.8
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "gautam-buddha-nagar",
    "name": "Gautam Buddha Nagar",
    "division": "Meerut",
    "region": "Upper Doab",
    "coordinates": {
      "lat": 28.35,
      "lng": 77.55
    },
    "waterStatus": "critical",
    "centroid": [
      28.35,
      77.55
    ],
    "projected": [
      119.5,
      265.4
    ],
    "svgPath": "M 133.7,265.4 L 131.5,275.6 L 119.5,278.0 L 107.1,275.9 L 104.0,265.4 L 106.6,254.5 L 119.5,251.7 L 129.4,257.0 Z",
    "areaKm2": 1442,
    "soilType": "Sandy Alluvium",
    "slopePct": 0.7,
    "rechargeSuitabilityScore": 81.9,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 16.9,
        "stress_score": 73.8,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 19.15,
        "stress_score": 79.4,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 21.4,
        "stress_score": 85.0,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 23.65,
        "stress_score": 90.6,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 25.9,
        "stress_score": 96.2,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 27.7,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 28.6,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 29.5,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 30.4,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 32.65,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 28.6,
      "groundwaterTrendAnnualCm": -45,
      "cgwbCategory": "Over-Exploited",
      "cgwbStageExtractionPct": 142.1,
      "waterStressScore": 96.6,
      "majorRiverBasin": "Yamuna Basin",
      "avgRainfallMm": 680,
      "annualDemandMcm": 510,
      "rainfallDeparturePct": -28.4
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "bulandshahr",
    "name": "Bulandshahr",
    "division": "Meerut",
    "region": "Upper Doab",
    "coordinates": {
      "lat": 28.4,
      "lng": 77.85
    },
    "waterStatus": "warning",
    "centroid": [
      28.4,
      77.85
    ],
    "projected": [
      151.9,
      260.6
    ],
    "svgPath": "M 179.5,260.6 L 168.9,275.0 L 151.9,285.1 L 134.1,275.7 L 122.0,260.6 L 133.3,244.8 L 151.9,234.2 L 171.3,244.2 Z",
    "areaKm2": 4512,
    "soilType": "Alluvial Loam",
    "slopePct": 1.3,
    "rechargeSuitabilityScore": 92.1,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 11.7,
        "stress_score": 46.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 12.95,
        "stress_score": 49.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 14.2,
        "stress_score": 53.0,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 15.45,
        "stress_score": 56.1,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 16.7,
        "stress_score": 59.2,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 17.7,
        "stress_score": 61.8,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 18.2,
        "stress_score": 63.0,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 18.7,
        "stress_score": 64.2,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 19.2,
        "stress_score": 65.5,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 20.45,
        "stress_score": 68.6,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 18.2,
      "groundwaterTrendAnnualCm": -25,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 88.5,
      "waterStressScore": 55.8,
      "majorRiverBasin": "Ganga Basin",
      "avgRainfallMm": 750,
      "annualDemandMcm": 640,
      "rainfallDeparturePct": -21.1
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "amroha",
    "name": "Amroha",
    "division": "Moradabad",
    "region": "Rohilkhand",
    "coordinates": {
      "lat": 28.9,
      "lng": 78.47
    },
    "waterStatus": "warning",
    "centroid": [
      28.9,
      78.47
    ],
    "projected": [
      218.9,
      212.8
    ],
    "svgPath": "M 237.2,212.8 L 234.3,225.8 L 218.9,229.1 L 203.0,226.3 L 199.0,212.8 L 206.6,202.4 L 218.9,195.2 L 231.7,201.9 Z",
    "areaKm2": 2249,
    "soilType": "Silt Loam",
    "slopePct": 1.2,
    "rechargeSuitabilityScore": 80.4,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 10.4,
        "stress_score": 40.0,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 11.4,
        "stress_score": 42.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 12.4,
        "stress_score": 45.0,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 13.4,
        "stress_score": 47.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 14.4,
        "stress_score": 50.0,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 15.2,
        "stress_score": 52.0,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 15.6,
        "stress_score": 53.0,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 16.0,
        "stress_score": 54.0,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 16.4,
        "stress_score": 55.0,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 17.4,
        "stress_score": 57.5,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 15.6,
      "groundwaterTrendAnnualCm": -20,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 82.4,
      "waterStressScore": 42.0,
      "majorRiverBasin": "Ganga & Ban",
      "avgRainfallMm": 890,
      "annualDemandMcm": 390,
      "rainfallDeparturePct": -6.3
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "bijnor",
    "name": "Bijnor",
    "division": "Moradabad",
    "region": "Rohilkhand",
    "coordinates": {
      "lat": 29.37,
      "lng": 78.13
    },
    "waterStatus": "good",
    "centroid": [
      29.37,
      78.13
    ],
    "projected": [
      182.2,
      167.9
    ],
    "svgPath": "M 207.2,167.9 L 203.3,185.8 L 182.2,190.1 L 160.3,186.5 L 155.0,167.9 L 159.5,148.6 L 182.2,143.8 L 199.6,153.1 Z",
    "areaKm2": 4561,
    "soilType": "Coarse Alluvial Sand",
    "slopePct": 1.6,
    "rechargeSuitabilityScore": 91.2,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 8.08,
        "stress_score": 28.6,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 8.68,
        "stress_score": 30.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 9.28,
        "stress_score": 31.6,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 9.88,
        "stress_score": 33.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 10.48,
        "stress_score": 34.6,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 10.96,
        "stress_score": 35.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 11.2,
        "stress_score": 36.4,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 11.44,
        "stress_score": 37.0,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 11.68,
        "stress_score": 37.6,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 12.28,
        "stress_score": 39.1,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 11.2,
      "groundwaterTrendAnnualCm": -12,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 64.2,
      "waterStressScore": 21.4,
      "majorRiverBasin": "Ganga & Malin",
      "avgRainfallMm": 1050,
      "annualDemandMcm": 580,
      "rainfallDeparturePct": 10.5
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "moradabad",
    "name": "Moradabad",
    "division": "Moradabad",
    "region": "Rohilkhand",
    "coordinates": {
      "lat": 28.83,
      "lng": 78.78
    },
    "waterStatus": "warning",
    "centroid": [
      28.83,
      78.78
    ],
    "projected": [
      252.4,
      219.5
    ],
    "svgPath": "M 275.4,219.5 L 271.8,236.0 L 252.4,240.0 L 232.3,236.6 L 227.3,219.5 L 237.0,206.4 L 252.4,197.3 L 268.5,205.8 Z",
    "areaKm2": 3718,
    "soilType": "Ramganga Alluvium",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 80.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 10.16,
        "stress_score": 42.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 11.36,
        "stress_score": 45.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 12.56,
        "stress_score": 48.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 13.76,
        "stress_score": 51.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 14.96,
        "stress_score": 54.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 15.92,
        "stress_score": 56.6,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 16.4,
        "stress_score": 57.8,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 16.88,
        "stress_score": 59.0,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 17.36,
        "stress_score": 60.2,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 18.56,
        "stress_score": 63.2,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 16.4,
      "groundwaterTrendAnnualCm": -24,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 86.8,
      "waterStressScore": 46.1,
      "majorRiverBasin": "Ramganga Basin",
      "avgRainfallMm": 920,
      "annualDemandMcm": 540,
      "rainfallDeparturePct": -3.2
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "rampur",
    "name": "Rampur",
    "division": "Moradabad",
    "region": "Rohilkhand",
    "coordinates": {
      "lat": 28.81,
      "lng": 79.02
    },
    "waterStatus": "good",
    "centroid": [
      28.81,
      79.02
    ],
    "projected": [
      278.4,
      221.4
    ],
    "svgPath": "M 300.9,221.4 L 292.4,233.3 L 278.4,241.2 L 263.8,233.8 L 260.4,221.4 L 263.2,208.5 L 278.4,205.4 L 294.1,208.0 Z",
    "areaKm2": 2367,
    "soilType": "Fine Silt",
    "slopePct": 1.0,
    "rechargeSuitabilityScore": 81.0,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 8.9,
        "stress_score": 32.8,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 9.65,
        "stress_score": 34.6,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 10.4,
        "stress_score": 36.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 11.15,
        "stress_score": 38.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 11.9,
        "stress_score": 40.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 12.5,
        "stress_score": 41.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 12.8,
        "stress_score": 42.5,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 13.1,
        "stress_score": 43.2,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 13.4,
        "stress_score": 44.0,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 14.15,
        "stress_score": 45.9,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 12.8,
      "groundwaterTrendAnnualCm": -15,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 68.5,
      "waterStressScore": 29.9,
      "majorRiverBasin": "Kosi & Ramganga",
      "avgRainfallMm": 960,
      "annualDemandMcm": 380,
      "rainfallDeparturePct": 1.1
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "sambhal",
    "name": "Sambhal",
    "division": "Moradabad",
    "region": "Rohilkhand",
    "coordinates": {
      "lat": 28.58,
      "lng": 78.57
    },
    "waterStatus": "warning",
    "centroid": [
      28.58,
      78.57
    ],
    "projected": [
      229.7,
      243.4
    ],
    "svgPath": "M 248.8,243.4 L 245.7,257.0 L 229.7,260.4 L 213.1,257.5 L 208.9,243.4 L 216.9,232.5 L 229.7,225.0 L 243.1,232.0 Z",
    "areaKm2": 2453,
    "soilType": "Sandy Loam",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 80.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 11.78,
        "stress_score": 51.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 13.38,
        "stress_score": 55.9,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 14.98,
        "stress_score": 59.9,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 16.58,
        "stress_score": 63.8,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 18.18,
        "stress_score": 67.8,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 19.46,
        "stress_score": 71.1,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 20.1,
        "stress_score": 72.7,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 20.74,
        "stress_score": 74.2,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 21.38,
        "stress_score": 75.8,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 22.98,
        "stress_score": 79.8,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 20.1,
      "groundwaterTrendAnnualCm": -32,
      "cgwbCategory": "Critical",
      "cgwbStageExtractionPct": 96.2,
      "waterStressScore": 63.8,
      "majorRiverBasin": "Sot & Ganga",
      "avgRainfallMm": 810,
      "annualDemandMcm": 410,
      "rainfallDeparturePct": -14.7
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "bareilly",
    "name": "Bareilly",
    "division": "Bareilly",
    "region": "Rohilkhand",
    "coordinates": {
      "lat": 28.36,
      "lng": 79.41
    },
    "waterStatus": "good",
    "centroid": [
      28.36,
      79.41
    ],
    "projected": [
      320.5,
      264.4
    ],
    "svgPath": "M 346.4,264.4 L 342.0,282.7 L 320.5,287.3 L 303.9,278.5 L 292.5,264.4 L 303.2,249.7 L 320.5,239.7 L 338.6,249.0 Z",
    "areaKm2": 4120,
    "soilType": "Fine Alluvial Silt",
    "slopePct": 1.3,
    "rechargeSuitabilityScore": 92.1,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 9.22,
        "stress_score": 35.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 10.12,
        "stress_score": 37.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 11.02,
        "stress_score": 40.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 11.92,
        "stress_score": 42.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 12.82,
        "stress_score": 44.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 13.54,
        "stress_score": 46.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 13.9,
        "stress_score": 47.4,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 14.26,
        "stress_score": 48.2,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 14.62,
        "stress_score": 49.1,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 15.52,
        "stress_score": 51.4,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 13.9,
      "groundwaterTrendAnnualCm": -18,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 69.4,
      "waterStressScore": 33.0,
      "majorRiverBasin": "Ramganga Basin",
      "avgRainfallMm": 1020,
      "annualDemandMcm": 620,
      "rainfallDeparturePct": 7.4
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "budaun",
    "name": "Budaun",
    "division": "Bareilly",
    "region": "Rohilkhand",
    "coordinates": {
      "lat": 28.03,
      "lng": 79.12
    },
    "waterStatus": "warning",
    "centroid": [
      28.03,
      79.12
    ],
    "projected": [
      289.2,
      295.9
    ],
    "svgPath": "M 316.4,295.9 L 312.0,315.3 L 289.2,320.0 L 265.5,316.0 L 259.6,295.9 L 271.1,280.5 L 289.2,269.7 L 308.2,279.7 Z",
    "areaKm2": 5168,
    "soilType": "Loamy Sand",
    "slopePct": 1.2,
    "rechargeSuitabilityScore": 80.4,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 10.74,
        "stress_score": 45.0,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 12.04,
        "stress_score": 48.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 13.34,
        "stress_score": 51.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 14.64,
        "stress_score": 54.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 15.94,
        "stress_score": 58.0,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 16.98,
        "stress_score": 60.7,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 17.5,
        "stress_score": 62.0,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 18.02,
        "stress_score": 63.2,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 18.54,
        "stress_score": 64.5,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 19.84,
        "stress_score": 67.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 17.5,
      "groundwaterTrendAnnualCm": -26,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 87.1,
      "waterStressScore": 52.7,
      "majorRiverBasin": "Sot & Ganga",
      "avgRainfallMm": 830,
      "annualDemandMcm": 590,
      "rainfallDeparturePct": -12.6
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "pilibhit",
    "name": "Pilibhit",
    "division": "Bareilly",
    "region": "Rohilkhand",
    "coordinates": {
      "lat": 28.63,
      "lng": 79.8
    },
    "waterStatus": "good",
    "centroid": [
      28.63,
      79.8
    ],
    "projected": [
      362.7,
      238.6
    ],
    "svgPath": "M 391.3,238.6 L 380.6,253.8 L 362.7,257.2 L 344.1,254.4 L 339.8,238.6 L 343.4,222.2 L 362.7,218.2 L 382.7,221.6 Z",
    "areaKm2": 3686,
    "soilType": "Terai Alluvium",
    "slopePct": 0.8,
    "rechargeSuitabilityScore": 81.6,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 6.1,
        "stress_score": 18.8,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 6.35,
        "stress_score": 19.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 6.6,
        "stress_score": 20.0,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 6.85,
        "stress_score": 20.6,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 7.1,
        "stress_score": 21.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 7.3,
        "stress_score": 21.8,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 7.4,
        "stress_score": 22.0,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 7.5,
        "stress_score": 22.2,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 7.6,
        "stress_score": 22.5,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 7.85,
        "stress_score": 23.1,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 7.4,
      "groundwaterTrendAnnualCm": -5,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 48.6,
      "waterStressScore": 12,
      "majorRiverBasin": "Gomti & Sharda",
      "avgRainfallMm": 1250,
      "annualDemandMcm": 460,
      "rainfallDeparturePct": 31.6
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "shahjahanpur",
    "name": "Shahjahanpur",
    "division": "Bareilly",
    "region": "Rohilkhand",
    "coordinates": {
      "lat": 27.88,
      "lng": 79.91
    },
    "waterStatus": "good",
    "centroid": [
      27.88,
      79.91
    ],
    "projected": [
      374.6,
      310.3
    ],
    "svgPath": "M 401.9,310.3 L 391.3,324.5 L 374.6,334.4 L 357.1,325.2 L 345.1,310.3 L 356.3,294.7 L 374.6,284.3 L 393.7,294.1 Z",
    "areaKm2": 4388,
    "soilType": "Clayey Silt",
    "slopePct": 1.0,
    "rechargeSuitabilityScore": 81.0,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 8.46,
        "stress_score": 31.0,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 9.16,
        "stress_score": 32.7,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 9.86,
        "stress_score": 34.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 10.56,
        "stress_score": 36.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 11.26,
        "stress_score": 37.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 11.82,
        "stress_score": 39.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 12.1,
        "stress_score": 40.0,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 12.38,
        "stress_score": 40.8,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 12.66,
        "stress_score": 41.4,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 13.36,
        "stress_score": 43.2,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 12.1,
      "groundwaterTrendAnnualCm": -14,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 65.3,
      "waterStressScore": 27.0,
      "majorRiverBasin": "Garra & Ramganga",
      "avgRainfallMm": 980,
      "annualDemandMcm": 510,
      "rainfallDeparturePct": 3.2
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "aligarh",
    "name": "Aligarh",
    "division": "Aligarh",
    "region": "Braj",
    "coordinates": {
      "lat": 27.89,
      "lng": 78.08
    },
    "waterStatus": "critical",
    "centroid": [
      27.89,
      78.08
    ],
    "projected": [
      176.8,
      309.3
    ],
    "svgPath": "M 200.3,309.3 L 196.5,326.0 L 176.8,330.1 L 156.4,326.7 L 151.3,309.3 L 161.1,295.9 L 176.8,286.7 L 193.2,295.3 Z",
    "areaKm2": 3700,
    "soilType": "Saline / Silt Loam",
    "slopePct": 1.2,
    "rechargeSuitabilityScore": 80.4,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 14.04,
        "stress_score": 60.3,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 15.84,
        "stress_score": 64.8,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 17.64,
        "stress_score": 69.3,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 19.44,
        "stress_score": 73.8,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 21.24,
        "stress_score": 78.3,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 22.68,
        "stress_score": 81.9,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 23.4,
        "stress_score": 83.7,
        "category": "Over-Exploited",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 24.12,
        "stress_score": 85.5,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 24.84,
        "stress_score": 87.3,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 26.64,
        "stress_score": 91.8,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 23.4,
      "groundwaterTrendAnnualCm": -36,
      "cgwbCategory": "Over-Exploited",
      "cgwbStageExtractionPct": 118.4,
      "waterStressScore": 76.9,
      "majorRiverBasin": "Yamuna & Karwan",
      "avgRainfallMm": 720,
      "annualDemandMcm": 560,
      "rainfallDeparturePct": -24.2
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "etah",
    "name": "Etah",
    "division": "Aligarh",
    "region": "Braj / Doab",
    "coordinates": {
      "lat": 27.56,
      "lng": 78.66
    },
    "waterStatus": "warning",
    "centroid": [
      27.56,
      78.66
    ],
    "projected": [
      239.5,
      340.8
    ],
    "svgPath": "M 258.9,340.8 L 255.7,354.6 L 239.5,358.0 L 222.7,355.1 L 218.5,340.8 L 226.5,329.8 L 239.5,322.2 L 253.0,329.3 Z",
    "areaKm2": 2456,
    "soilType": "Alluvial Loam",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 92.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 11.18,
        "stress_score": 43.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 12.28,
        "stress_score": 46.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 13.38,
        "stress_score": 48.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 14.48,
        "stress_score": 51.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 15.58,
        "stress_score": 54.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 16.46,
        "stress_score": 56.6,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 16.9,
        "stress_score": 57.6,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 17.34,
        "stress_score": 58.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 17.78,
        "stress_score": 59.9,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 18.88,
        "stress_score": 62.6,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 16.9,
      "groundwaterTrendAnnualCm": -22,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 84.2,
      "waterStressScore": 50.8,
      "majorRiverBasin": "Isan & Kali",
      "avgRainfallMm": 740,
      "annualDemandMcm": 380,
      "rainfallDeparturePct": -22.1
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "hathras",
    "name": "Hathras",
    "division": "Aligarh",
    "region": "Braj",
    "coordinates": {
      "lat": 27.6,
      "lng": 78.05
    },
    "waterStatus": "critical",
    "centroid": [
      27.6,
      78.05
    ],
    "projected": [
      173.5,
      337.0
    ],
    "svgPath": "M 190.8,337.0 L 187.9,349.2 L 173.5,352.3 L 162.4,346.4 L 154.8,337.0 L 161.9,327.1 L 173.5,320.5 L 185.6,326.7 Z",
    "areaKm2": 1840,
    "soilType": "Sandy Alluvium",
    "slopePct": 1.0,
    "rechargeSuitabilityScore": 81.0,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 14.48,
        "stress_score": 62.1,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 16.33,
        "stress_score": 66.7,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 18.18,
        "stress_score": 71.3,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 20.03,
        "stress_score": 76.0,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 21.88,
        "stress_score": 80.6,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 23.36,
        "stress_score": 84.3,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 24.1,
        "stress_score": 86.2,
        "category": "Over-Exploited",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 24.84,
        "stress_score": 88.0,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 25.58,
        "stress_score": 89.8,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 27.43,
        "stress_score": 94.5,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 24.1,
      "groundwaterTrendAnnualCm": -37,
      "cgwbCategory": "Over-Exploited",
      "cgwbStageExtractionPct": 128.6,
      "waterStressScore": 80.0,
      "majorRiverBasin": "Karwan Basin",
      "avgRainfallMm": 690,
      "annualDemandMcm": 350,
      "rainfallDeparturePct": -27.4
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "kasganj",
    "name": "Kasganj",
    "division": "Aligarh",
    "region": "Braj / Doab",
    "coordinates": {
      "lat": 27.8,
      "lng": 78.64
    },
    "waterStatus": "good",
    "centroid": [
      27.8,
      78.64
    ],
    "projected": [
      237.3,
      317.9
    ],
    "svgPath": "M 256.2,317.9 L 249.0,327.8 L 237.3,334.6 L 225.1,328.3 L 216.9,317.9 L 224.6,307.1 L 237.3,299.9 L 250.6,306.6 Z",
    "areaKm2": 1955,
    "soilType": "Alluvial Silt",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 92.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 10.36,
        "stress_score": 39.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 11.31,
        "stress_score": 41.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 12.26,
        "stress_score": 43.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 13.21,
        "stress_score": 46.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 14.16,
        "stress_score": 48.7,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 14.92,
        "stress_score": 50.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 15.3,
        "stress_score": 51.5,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 15.68,
        "stress_score": 52.5,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 16.06,
        "stress_score": 53.4,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 17.01,
        "stress_score": 55.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 15.3,
      "groundwaterTrendAnnualCm": -19,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 69.8,
      "waterStressScore": 43.7,
      "majorRiverBasin": "Ganga & Kali",
      "avgRainfallMm": 780,
      "annualDemandMcm": 310,
      "rainfallDeparturePct": -17.9
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "agra",
    "name": "Agra",
    "division": "Agra",
    "region": "Braj",
    "coordinates": {
      "lat": 27.18,
      "lng": 78.0
    },
    "waterStatus": "critical",
    "centroid": [
      27.18,
      78.0
    ],
    "projected": [
      168.1,
      377.1
    ],
    "svgPath": "M 191.3,377.1 L 187.7,393.8 L 168.1,397.8 L 147.7,394.4 L 142.7,377.1 L 147.0,359.1 L 168.1,354.6 L 184.3,363.3 Z",
    "areaKm2": 4041,
    "soilType": "Alluvial Sandy Loam",
    "slopePct": 1.8,
    "rechargeSuitabilityScore": 90.6,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 16.36,
        "stress_score": 71.7,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 18.56,
        "stress_score": 77.2,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 20.76,
        "stress_score": 82.7,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 22.96,
        "stress_score": 88.2,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 25.16,
        "stress_score": 93.7,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 26.92,
        "stress_score": 98.1,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 27.8,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 28.68,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 29.56,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 31.76,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 27.8,
      "groundwaterTrendAnnualCm": -44,
      "cgwbCategory": "Over-Exploited",
      "cgwbStageExtractionPct": 134.5,
      "waterStressScore": 94.4,
      "majorRiverBasin": "Yamuna & Utangan",
      "avgRainfallMm": 670,
      "annualDemandMcm": 680,
      "rainfallDeparturePct": -29.5
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "firozabad",
    "name": "Firozabad",
    "division": "Agra",
    "region": "Braj",
    "coordinates": {
      "lat": 27.15,
      "lng": 78.39
    },
    "waterStatus": "critical",
    "centroid": [
      27.15,
      78.39
    ],
    "projected": [
      210.3,
      380.0
    ],
    "svgPath": "M 228.4,380.0 L 225.6,393.0 L 210.3,396.1 L 194.4,393.5 L 190.5,380.0 L 193.8,366.0 L 210.3,362.5 L 223.0,369.2 Z",
    "areaKm2": 2407,
    "soilType": "Sandy Silt",
    "slopePct": 1.5,
    "rechargeSuitabilityScore": 79.5,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 15.2,
        "stress_score": 66.0,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 17.2,
        "stress_score": 71.0,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 19.2,
        "stress_score": 76.0,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 21.2,
        "stress_score": 81.0,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 23.2,
        "stress_score": 86.0,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 24.8,
        "stress_score": 90.0,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 25.6,
        "stress_score": 92.0,
        "category": "Over-Exploited",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 26.4,
        "stress_score": 94.0,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 27.2,
        "stress_score": 96.0,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 29.2,
        "stress_score": 100,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 25.6,
      "groundwaterTrendAnnualCm": -40,
      "cgwbCategory": "Over-Exploited",
      "cgwbStageExtractionPct": 126.8,
      "waterStressScore": 85.7,
      "majorRiverBasin": "Yamuna & Sirsa",
      "avgRainfallMm": 690,
      "annualDemandMcm": 420,
      "rainfallDeparturePct": -27.4
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "mainpuri",
    "name": "Mainpuri",
    "division": "Agra",
    "region": "Braj / Doab",
    "coordinates": {
      "lat": 27.23,
      "lng": 79.02
    },
    "waterStatus": "warning",
    "centroid": [
      27.23,
      79.02
    ],
    "projected": [
      278.4,
      372.4
    ],
    "svgPath": "M 303.3,372.4 L 294.0,385.7 L 278.4,388.7 L 262.2,386.2 L 258.3,372.4 L 261.5,358.1 L 278.4,354.6 L 295.9,357.5 Z",
    "areaKm2": 2760,
    "soilType": "Alluvial Loam",
    "slopePct": 1.2,
    "rechargeSuitabilityScore": 92.4,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 11.74,
        "stress_score": 44.0,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 12.79,
        "stress_score": 46.7,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 13.84,
        "stress_score": 49.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 14.89,
        "stress_score": 51.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 15.94,
        "stress_score": 54.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 16.78,
        "stress_score": 56.7,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 17.2,
        "stress_score": 57.7,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 17.62,
        "stress_score": 58.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 18.04,
        "stress_score": 59.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 19.09,
        "stress_score": 62.4,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 17.2,
      "groundwaterTrendAnnualCm": -21,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 86.4,
      "waterStressScore": 50.1,
      "majorRiverBasin": "Isan & Arind",
      "avgRainfallMm": 760,
      "annualDemandMcm": 390,
      "rainfallDeparturePct": -20.0
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "mathura",
    "name": "Mathura",
    "division": "Agra",
    "region": "Braj",
    "coordinates": {
      "lat": 27.49,
      "lng": 77.67
    },
    "waterStatus": "warning",
    "centroid": [
      27.49,
      77.67
    ],
    "projected": [
      132.4,
      347.5
    ],
    "svgPath": "M 155.7,347.5 L 151.8,364.0 L 132.4,368.1 L 117.5,360.2 L 107.2,347.5 L 116.8,334.2 L 132.4,325.3 L 148.7,333.7 Z",
    "areaKm2": 3329,
    "soilType": "Saline Sandy Loam",
    "slopePct": 1.4,
    "rechargeSuitabilityScore": 79.8,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 14.06,
        "stress_score": 58.9,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 15.76,
        "stress_score": 63.2,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 17.46,
        "stress_score": 67.5,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 19.16,
        "stress_score": 71.7,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 20.86,
        "stress_score": 75.9,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 22.22,
        "stress_score": 79.3,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 22.9,
        "stress_score": 81.0,
        "category": "Over-Exploited",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 23.58,
        "stress_score": 82.8,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 24.26,
        "stress_score": 84.5,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 25.96,
        "stress_score": 88.7,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 22.9,
      "groundwaterTrendAnnualCm": -34,
      "cgwbCategory": "Critical",
      "cgwbStageExtractionPct": 98.7,
      "waterStressScore": 77.3,
      "majorRiverBasin": "Yamuna Basin",
      "avgRainfallMm": 610,
      "annualDemandMcm": 540,
      "rainfallDeparturePct": -35.8
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "auraiya",
    "name": "Auraiya",
    "division": "Kanpur",
    "region": "Doab",
    "coordinates": {
      "lat": 26.46,
      "lng": 79.51
    },
    "waterStatus": "warning",
    "centroid": [
      26.46,
      79.51
    ],
    "projected": [
      331.4,
      445.9
    ],
    "svgPath": "M 349.1,445.9 L 346.2,458.5 L 331.4,461.6 L 320.1,455.5 L 312.2,445.9 L 319.5,435.8 L 331.4,428.9 L 343.8,435.4 Z",
    "areaKm2": 2016,
    "soilType": "Ravine Silt Alluvium",
    "slopePct": 2.2,
    "rechargeSuitabilityScore": 77.4,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 11.3,
        "stress_score": 42.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 12.3,
        "stress_score": 44.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 13.3,
        "stress_score": 47.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 14.3,
        "stress_score": 49.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 15.3,
        "stress_score": 52.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 16.1,
        "stress_score": 54.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 16.5,
        "stress_score": 55.2,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 16.9,
        "stress_score": 56.2,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 17.3,
        "stress_score": 57.2,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 18.3,
        "stress_score": 59.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 16.5,
      "groundwaterTrendAnnualCm": -20,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 81.5,
      "waterStressScore": 47.2,
      "majorRiverBasin": "Yamuna & Sengar",
      "avgRainfallMm": 780,
      "annualDemandMcm": 320,
      "rainfallDeparturePct": -17.9
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "etawah",
    "name": "Etawah",
    "division": "Kanpur",
    "region": "Doab",
    "coordinates": {
      "lat": 26.78,
      "lng": 79.03
    },
    "waterStatus": "warning",
    "centroid": [
      26.78,
      79.03
    ],
    "projected": [
      279.5,
      415.3
    ],
    "svgPath": "M 299.5,415.3 L 291.8,425.7 L 279.5,433.0 L 266.7,426.2 L 257.9,415.3 L 266.1,403.9 L 279.5,396.3 L 293.5,403.4 Z",
    "areaKm2": 2311,
    "soilType": "Chambal Ravine Silt",
    "slopePct": 2.5,
    "rechargeSuitabilityScore": 76.5,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 12.16,
        "stress_score": 47.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 13.36,
        "stress_score": 50.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 14.56,
        "stress_score": 53.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 15.76,
        "stress_score": 56.2,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 16.96,
        "stress_score": 59.2,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 17.92,
        "stress_score": 61.6,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 18.4,
        "stress_score": 62.8,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 18.88,
        "stress_score": 64.0,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 19.36,
        "stress_score": 65.2,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 20.56,
        "stress_score": 68.2,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 18.4,
      "groundwaterTrendAnnualCm": -24,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 84.8,
      "waterStressScore": 55.4,
      "majorRiverBasin": "Chambal & Yamuna",
      "avgRainfallMm": 750,
      "annualDemandMcm": 360,
      "rainfallDeparturePct": -21.1
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "farrukhabad",
    "name": "Farrukhabad",
    "division": "Kanpur",
    "region": "Doab",
    "coordinates": {
      "lat": 27.38,
      "lng": 79.58
    },
    "waterStatus": "good",
    "centroid": [
      27.38,
      79.58
    ],
    "projected": [
      338.9,
      358.0
    ],
    "svgPath": "M 361.3,358.0 L 352.9,369.9 L 338.9,372.7 L 324.3,370.4 L 320.8,358.0 L 323.8,345.1 L 338.9,342.0 L 354.6,344.7 Z",
    "areaKm2": 2183,
    "soilType": "Alluvial Fine Sand",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 92.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 9.34,
        "stress_score": 34.5,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 10.14,
        "stress_score": 36.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 10.94,
        "stress_score": 38.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 11.74,
        "stress_score": 40.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 12.54,
        "stress_score": 42.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 13.18,
        "stress_score": 44.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 13.5,
        "stress_score": 45.0,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 13.82,
        "stress_score": 45.8,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 14.14,
        "stress_score": 46.5,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 14.94,
        "stress_score": 48.5,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 13.5,
      "groundwaterTrendAnnualCm": -16,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 67.2,
      "waterStressScore": 36.2,
      "majorRiverBasin": "Ganga & Ramganga",
      "avgRainfallMm": 820,
      "annualDemandMcm": 370,
      "rainfallDeparturePct": -13.7
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "kannauj",
    "name": "Kannauj",
    "division": "Kanpur",
    "region": "Doab",
    "coordinates": {
      "lat": 27.05,
      "lng": 79.91
    },
    "waterStatus": "good",
    "centroid": [
      27.05,
      79.91
    ],
    "projected": [
      374.6,
      389.6
    ],
    "svgPath": "M 392.9,389.6 L 389.8,402.5 L 374.6,405.8 L 362.9,399.5 L 354.8,389.6 L 362.4,379.2 L 374.6,372.1 L 387.4,378.7 Z",
    "areaKm2": 2093,
    "soilType": "Alluvial Loam",
    "slopePct": 1.2,
    "rechargeSuitabilityScore": 92.4,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 10.12,
        "stress_score": 37.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 11.02,
        "stress_score": 40.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 11.92,
        "stress_score": 42.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 12.82,
        "stress_score": 44.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 13.72,
        "stress_score": 46.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 14.44,
        "stress_score": 48.7,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 14.8,
        "stress_score": 49.6,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 15.16,
        "stress_score": 50.5,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 15.52,
        "stress_score": 51.4,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 16.42,
        "stress_score": 53.7,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 14.8,
      "groundwaterTrendAnnualCm": -18,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 69.5,
      "waterStressScore": 40.1,
      "majorRiverBasin": "Ganga & Kali",
      "avgRainfallMm": 840,
      "annualDemandMcm": 350,
      "rainfallDeparturePct": -11.6
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "kanpur-dehat",
    "name": "Kanpur Dehat",
    "division": "Kanpur",
    "region": "Doab",
    "coordinates": {
      "lat": 26.44,
      "lng": 79.95
    },
    "waterStatus": "warning",
    "centroid": [
      26.44,
      79.95
    ],
    "projected": [
      378.9,
      447.8
    ],
    "svgPath": "M 399.4,447.8 L 396.2,462.5 L 378.9,466.0 L 360.9,463.1 L 356.5,447.8 L 360.3,432.0 L 378.9,428.0 L 393.3,435.6 Z",
    "areaKm2": 3021,
    "soilType": "Indo-Gangetic Alluvium",
    "slopePct": 1.3,
    "rechargeSuitabilityScore": 80.1,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 11.82,
        "stress_score": 45.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 12.97,
        "stress_score": 48.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 14.12,
        "stress_score": 51.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 15.27,
        "stress_score": 54.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 16.42,
        "stress_score": 57.2,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 17.34,
        "stress_score": 59.5,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 17.8,
        "stress_score": 60.6,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 18.26,
        "stress_score": 61.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 18.72,
        "stress_score": 62.9,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 19.87,
        "stress_score": 65.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 17.8,
      "groundwaterTrendAnnualCm": -23,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 86.0,
      "waterStressScore": 51.6,
      "majorRiverBasin": "Yamuna & Rind",
      "avgRainfallMm": 810,
      "annualDemandMcm": 410,
      "rainfallDeparturePct": -14.7
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "kanpur-nagar",
    "name": "Kanpur Nagar",
    "division": "Kanpur",
    "region": "Doab",
    "coordinates": {
      "lat": 26.45,
      "lng": 80.33
    },
    "waterStatus": "warning",
    "centroid": [
      26.45,
      80.33
    ],
    "projected": [
      420.0,
      446.9
    ],
    "svgPath": "M 444.1,446.9 L 434.8,459.5 L 420.0,468.2 L 404.5,460.1 L 394.0,446.9 L 403.8,433.1 L 420.0,424.0 L 436.8,432.6 Z",
    "areaKm2": 3155,
    "soilType": "Alluvial Heavy Clay",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 92.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 14.16,
        "stress_score": 62.7,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 16.11,
        "stress_score": 67.6,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 18.06,
        "stress_score": 72.4,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 20.01,
        "stress_score": 77.3,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 21.96,
        "stress_score": 82.2,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 23.52,
        "stress_score": 86.1,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 24.3,
        "stress_score": 88.0,
        "category": "Over-Exploited",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 25.08,
        "stress_score": 90.0,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 25.86,
        "stress_score": 92.0,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 27.81,
        "stress_score": 96.8,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 24.3,
      "groundwaterTrendAnnualCm": -39,
      "cgwbCategory": "Critical",
      "cgwbStageExtractionPct": 98.2,
      "waterStressScore": 78.4,
      "majorRiverBasin": "Ganga & Pandu",
      "avgRainfallMm": 820,
      "annualDemandMcm": 780,
      "rainfallDeparturePct": -13.7
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "hardoi",
    "name": "Hardoi",
    "division": "Lucknow",
    "region": "Awadh",
    "coordinates": {
      "lat": 27.39,
      "lng": 80.13
    },
    "waterStatus": "good",
    "centroid": [
      27.39,
      80.13
    ],
    "projected": [
      398.4,
      357.1
    ],
    "svgPath": "M 434.8,357.1 L 421.1,376.4 L 398.4,380.9 L 374.7,377.2 L 369.2,357.1 L 373.8,336.2 L 398.4,331.1 L 423.9,335.4 Z",
    "areaKm2": 5986,
    "soilType": "Alluvial Loam",
    "slopePct": 1.0,
    "rechargeSuitabilityScore": 93.0,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 8.26,
        "stress_score": 30.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 8.96,
        "stress_score": 32.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 9.66,
        "stress_score": 33.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 10.36,
        "stress_score": 35.7,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 11.06,
        "stress_score": 37.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 11.62,
        "stress_score": 38.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 11.9,
        "stress_score": 39.5,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 12.18,
        "stress_score": 40.2,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 12.46,
        "stress_score": 41.0,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 13.16,
        "stress_score": 42.7,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 11.9,
      "groundwaterTrendAnnualCm": -14,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 62.4,
      "waterStressScore": 28.5,
      "majorRiverBasin": "Gomti & Sai",
      "avgRainfallMm": 910,
      "annualDemandMcm": 620,
      "rainfallDeparturePct": -4.2
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "kheri",
    "name": "Lakhimpur Kheri",
    "division": "Lucknow",
    "region": "Terai / Awadh",
    "coordinates": {
      "lat": 27.94,
      "lng": 80.77
    },
    "waterStatus": "good",
    "centroid": [
      27.94,
      80.77
    ],
    "projected": [
      467.6,
      304.5
    ],
    "svgPath": "M 501.5,304.5 L 496.0,328.6 L 467.6,334.5 L 438.2,329.5 L 430.8,304.5 L 445.0,285.3 L 467.6,272.0 L 491.3,284.4 Z",
    "areaKm2": 7680,
    "soilType": "Terai Clayey Loam",
    "slopePct": 0.6,
    "rechargeSuitabilityScore": 82.2,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 5.76,
        "stress_score": 17.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 5.96,
        "stress_score": 17.7,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 6.16,
        "stress_score": 18.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 6.36,
        "stress_score": 18.7,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 6.56,
        "stress_score": 19.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 6.72,
        "stress_score": 19.6,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 6.8,
        "stress_score": 19.8,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 6.88,
        "stress_score": 20.0,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 6.96,
        "stress_score": 20.2,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 7.16,
        "stress_score": 20.7,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 6.8,
      "groundwaterTrendAnnualCm": -4,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 38.5,
      "waterStressScore": 12,
      "majorRiverBasin": "Sharda & Ghaghara",
      "avgRainfallMm": 1280,
      "annualDemandMcm": 590,
      "rainfallDeparturePct": 34.7
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "lucknow",
    "name": "Lucknow",
    "division": "Lucknow",
    "region": "Awadh",
    "coordinates": {
      "lat": 26.84,
      "lng": 80.94
    },
    "waterStatus": "warning",
    "centroid": [
      26.84,
      80.94
    ],
    "projected": [
      485.9,
      409.6
    ],
    "svgPath": "M 505.1,409.6 L 502.0,423.3 L 485.9,426.7 L 469.2,423.8 L 465.0,409.6 L 473.1,398.7 L 485.9,391.1 L 499.3,398.2 Z",
    "areaKm2": 2528,
    "soilType": "Gomti Alluvial Silt",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 92.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 12.24,
        "stress_score": 55.8,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 14.04,
        "stress_score": 60.3,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 15.84,
        "stress_score": 64.8,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 17.64,
        "stress_score": 69.3,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 19.44,
        "stress_score": 73.8,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 20.88,
        "stress_score": 77.4,
        "category": "Over-Exploited",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 21.6,
        "stress_score": 79.2,
        "category": "Over-Exploited",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 22.32,
        "stress_score": 81.0,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 23.04,
        "stress_score": 82.8,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 24.84,
        "stress_score": 87.3,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 21.6,
      "groundwaterTrendAnnualCm": -36,
      "cgwbCategory": "Critical",
      "cgwbStageExtractionPct": 97.4,
      "waterStressScore": 68.0,
      "majorRiverBasin": "Gomti Basin",
      "avgRainfallMm": 890,
      "annualDemandMcm": 690,
      "rainfallDeparturePct": -6.3
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "raebareli",
    "name": "Raebareli",
    "division": "Lucknow",
    "region": "Awadh",
    "coordinates": {
      "lat": 26.22,
      "lng": 81.24
    },
    "waterStatus": "warning",
    "centroid": [
      26.22,
      81.24
    ],
    "projected": [
      518.4,
      468.8
    ],
    "svgPath": "M 546.6,468.8 L 535.7,483.5 L 518.4,493.8 L 500.3,484.2 L 487.9,468.8 L 499.4,452.7 L 518.4,441.9 L 538.2,452.0 Z",
    "areaKm2": 4609,
    "soilType": "Alluvial Clay Loam",
    "slopePct": 1.2,
    "rechargeSuitabilityScore": 92.4,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 10.16,
        "stress_score": 38.7,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 11.11,
        "stress_score": 41.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 12.06,
        "stress_score": 43.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 13.01,
        "stress_score": 45.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 13.96,
        "stress_score": 48.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 14.72,
        "stress_score": 50.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 15.1,
        "stress_score": 51.0,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 15.48,
        "stress_score": 52.0,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 15.86,
        "stress_score": 52.9,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 16.81,
        "stress_score": 55.3,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 15.1,
      "groundwaterTrendAnnualCm": -19,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 79.2,
      "waterStressScore": 40.7,
      "majorRiverBasin": "Ganga & Sai",
      "avgRainfallMm": 870,
      "annualDemandMcm": 480,
      "rainfallDeparturePct": -8.4
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "sitapur",
    "name": "Sitapur",
    "division": "Lucknow",
    "region": "Awadh",
    "coordinates": {
      "lat": 27.56,
      "lng": 80.68
    },
    "waterStatus": "good",
    "centroid": [
      27.56,
      80.68
    ],
    "projected": [
      457.8,
      340.8
    ],
    "svgPath": "M 488.4,340.8 L 483.2,362.4 L 457.8,367.9 L 438.2,357.4 L 424.7,340.8 L 437.3,323.4 L 457.8,311.6 L 479.2,322.6 Z",
    "areaKm2": 5743,
    "soilType": "Alluvial Silt",
    "slopePct": 0.9,
    "rechargeSuitabilityScore": 93.3,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 7.12,
        "stress_score": 23.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 7.52,
        "stress_score": 24.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 7.92,
        "stress_score": 25.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 8.32,
        "stress_score": 26.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 8.72,
        "stress_score": 27.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 9.04,
        "stress_score": 28.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 9.2,
        "stress_score": 28.6,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 9.36,
        "stress_score": 29.0,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 9.52,
        "stress_score": 29.4,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 9.92,
        "stress_score": 30.4,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 9.2,
      "groundwaterTrendAnnualCm": -8,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 54.1,
      "waterStressScore": 13.8,
      "majorRiverBasin": "Gomti & Sarayan",
      "avgRainfallMm": 1050,
      "annualDemandMcm": 560,
      "rainfallDeparturePct": 10.5
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "unnao",
    "name": "Unnao",
    "division": "Lucknow",
    "region": "Awadh",
    "coordinates": {
      "lat": 26.54,
      "lng": 80.49
    },
    "waterStatus": "warning",
    "centroid": [
      26.54,
      80.49
    ],
    "projected": [
      437.3,
      438.3
    ],
    "svgPath": "M 468.2,438.3 L 456.5,454.7 L 437.3,465.5 L 417.2,455.3 L 412.6,438.3 L 416.4,420.6 L 437.3,416.4 L 459.0,419.9 Z",
    "areaKm2": 4558,
    "soilType": "Alluvial Silt Loam",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 92.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 10.74,
        "stress_score": 41.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 11.79,
        "stress_score": 44.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 12.84,
        "stress_score": 46.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 13.89,
        "stress_score": 49.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 14.94,
        "stress_score": 52.0,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 15.78,
        "stress_score": 54.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 16.2,
        "stress_score": 55.2,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 16.62,
        "stress_score": 56.2,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 17.04,
        "stress_score": 57.3,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 18.09,
        "stress_score": 59.9,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 16.2,
      "groundwaterTrendAnnualCm": -21,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 83.5,
      "waterStressScore": 45.3,
      "majorRiverBasin": "Ganga & Sai",
      "avgRainfallMm": 850,
      "annualDemandMcm": 510,
      "rainfallDeparturePct": -10.5
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "amethi",
    "name": "Amethi",
    "division": "Ayodhya",
    "region": "Awadh",
    "coordinates": {
      "lat": 26.15,
      "lng": 81.81
    },
    "waterStatus": "good",
    "centroid": [
      26.15,
      81.81
    ],
    "projected": [
      580.0,
      475.5
    ],
    "svgPath": "M 597.8,475.5 L 595.0,488.3 L 580.0,491.4 L 564.4,488.8 L 560.5,475.5 L 563.8,461.7 L 580.0,458.3 L 592.5,464.9 Z",
    "areaKm2": 2329,
    "soilType": "Alluvial Loam",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 92.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 9.78,
        "stress_score": 36.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 10.63,
        "stress_score": 38.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 11.48,
        "stress_score": 40.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 12.33,
        "stress_score": 42.7,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 13.18,
        "stress_score": 44.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 13.86,
        "stress_score": 46.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 14.2,
        "stress_score": 47.4,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 14.54,
        "stress_score": 48.2,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 14.88,
        "stress_score": 49.1,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 15.73,
        "stress_score": 51.2,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 14.2,
      "groundwaterTrendAnnualCm": -17,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 68.2,
      "waterStressScore": 35.4,
      "majorRiverBasin": "Gomti & Sai",
      "avgRainfallMm": 930,
      "annualDemandMcm": 340,
      "rainfallDeparturePct": -2.1
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "ayodhya",
    "name": "Ayodhya",
    "division": "Ayodhya",
    "region": "Awadh",
    "coordinates": {
      "lat": 26.79,
      "lng": 82.19
    },
    "waterStatus": "good",
    "centroid": [
      26.79,
      82.19
    ],
    "projected": [
      621.1,
      414.4
    ],
    "svgPath": "M 639.6,414.4 L 636.6,427.6 L 621.1,430.8 L 605.0,428.1 L 601.0,414.4 L 608.7,403.9 L 621.1,396.6 L 634.0,403.4 Z",
    "areaKm2": 2341,
    "soilType": "Saryu Alluvium",
    "slopePct": 1.0,
    "rechargeSuitabilityScore": 81.0,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 7.8,
        "stress_score": 26.5,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 8.3,
        "stress_score": 27.8,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 8.8,
        "stress_score": 29.0,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 9.3,
        "stress_score": 30.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 9.8,
        "stress_score": 31.5,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 10.2,
        "stress_score": 32.5,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 10.4,
        "stress_score": 33.0,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 10.6,
        "stress_score": 33.5,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 10.8,
        "stress_score": 34.0,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 11.3,
        "stress_score": 35.2,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 10.4,
      "groundwaterTrendAnnualCm": -10,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 58.4,
      "waterStressScore": 18.3,
      "majorRiverBasin": "Saryu (Ghaghara)",
      "avgRainfallMm": 1040,
      "annualDemandMcm": 410,
      "rainfallDeparturePct": 9.5
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "barabanki",
    "name": "Barabanki",
    "division": "Ayodhya",
    "region": "Awadh",
    "coordinates": {
      "lat": 26.92,
      "lng": 81.18
    },
    "waterStatus": "good",
    "centroid": [
      26.92,
      81.18
    ],
    "projected": [
      511.9,
      402.0
    ],
    "svgPath": "M 537.8,402.0 L 533.6,420.4 L 511.9,425.0 L 489.4,421.1 L 483.8,402.0 L 494.6,387.3 L 511.9,377.1 L 530.0,386.6 Z",
    "areaKm2": 4402,
    "soilType": "Alluvial Loam",
    "slopePct": 1.0,
    "rechargeSuitabilityScore": 93.0,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 8.5,
        "stress_score": 31.8,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 9.25,
        "stress_score": 33.6,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 10.0,
        "stress_score": 35.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 10.75,
        "stress_score": 37.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 11.5,
        "stress_score": 39.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 12.1,
        "stress_score": 40.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 12.4,
        "stress_score": 41.5,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 12.7,
        "stress_score": 42.2,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 13.0,
        "stress_score": 43.0,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 13.75,
        "stress_score": 44.9,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 12.4,
      "groundwaterTrendAnnualCm": -15,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 64.8,
      "waterStressScore": 28.7,
      "majorRiverBasin": "Ghaghara & Gomti",
      "avgRainfallMm": 970,
      "annualDemandMcm": 490,
      "rainfallDeparturePct": 2.1
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "sultanpur",
    "name": "Sultanpur",
    "division": "Ayodhya",
    "region": "Awadh",
    "coordinates": {
      "lat": 26.26,
      "lng": 82.07
    },
    "waterStatus": "good",
    "centroid": [
      26.26,
      82.07
    ],
    "projected": [
      608.1,
      465.0
    ],
    "svgPath": "M 629.2,465.0 L 625.6,479.9 L 608.1,483.6 L 594.6,476.5 L 585.3,465.0 L 594.0,453.0 L 608.1,444.9 L 622.8,452.5 Z",
    "areaKm2": 2673,
    "soilType": "Gomti Alluvium",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 80.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 9.64,
        "stress_score": 35.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 10.44,
        "stress_score": 37.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 11.24,
        "stress_score": 39.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 12.04,
        "stress_score": 41.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 12.84,
        "stress_score": 43.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 13.48,
        "stress_score": 44.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 13.8,
        "stress_score": 45.7,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 14.12,
        "stress_score": 46.5,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 14.44,
        "stress_score": 47.3,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 15.24,
        "stress_score": 49.3,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 13.8,
      "groundwaterTrendAnnualCm": -16,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 67.5,
      "waterStressScore": 33.2,
      "majorRiverBasin": "Gomti Basin",
      "avgRainfallMm": 950,
      "annualDemandMcm": 390,
      "rainfallDeparturePct": 0.0
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "ambedkar-nagar",
    "name": "Ambedkar Nagar",
    "division": "Ayodhya",
    "region": "Awadh",
    "coordinates": {
      "lat": 26.44,
      "lng": 82.69
    },
    "waterStatus": "good",
    "centroid": [
      26.44,
      82.69
    ],
    "projected": [
      675.1,
      447.8
    ],
    "svgPath": "M 697.7,447.8 L 689.2,459.8 L 675.1,462.5 L 660.4,460.3 L 657.0,447.8 L 659.8,434.8 L 675.1,431.7 L 690.9,434.3 Z",
    "areaKm2": 2350,
    "soilType": "Alluvial Silt",
    "slopePct": 1.0,
    "rechargeSuitabilityScore": 93.0,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 8.38,
        "stress_score": 29.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 8.98,
        "stress_score": 30.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 9.58,
        "stress_score": 32.3,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 10.18,
        "stress_score": 33.8,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 10.78,
        "stress_score": 35.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 11.26,
        "stress_score": 36.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 11.5,
        "stress_score": 37.1,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 11.74,
        "stress_score": 37.8,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 11.98,
        "stress_score": 38.4,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 12.58,
        "stress_score": 39.8,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 11.5,
      "groundwaterTrendAnnualCm": -12,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 61.2,
      "waterStressScore": 23.8,
      "majorRiverBasin": "Ghaghara & Majhoi",
      "avgRainfallMm": 990,
      "annualDemandMcm": 360,
      "rainfallDeparturePct": 4.2
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "bahraich",
    "name": "Bahraich",
    "division": "Devipatan",
    "region": "Terai",
    "coordinates": {
      "lat": 27.57,
      "lng": 81.59
    },
    "waterStatus": "good",
    "centroid": [
      27.57,
      81.59
    ],
    "projected": [
      556.2,
      339.9
    ],
    "svgPath": "M 581.8,339.9 L 577.8,358.2 L 556.2,362.7 L 533.8,358.9 L 528.3,339.9 L 533.0,320.2 L 556.2,315.2 L 574.1,324.7 Z",
    "areaKm2": 4697,
    "soilType": "Terai Silt",
    "slopePct": 0.7,
    "rechargeSuitabilityScore": 81.9,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 6.34,
        "stress_score": 20.0,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 6.64,
        "stress_score": 20.8,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 6.94,
        "stress_score": 21.6,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 7.24,
        "stress_score": 22.3,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 7.54,
        "stress_score": 23.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 7.78,
        "stress_score": 23.6,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 7.9,
        "stress_score": 23.9,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 8.02,
        "stress_score": 24.2,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 8.14,
        "stress_score": 24.6,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 8.44,
        "stress_score": 25.3,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 7.9,
      "groundwaterTrendAnnualCm": -6,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 44.8,
      "waterStressScore": 12,
      "majorRiverBasin": "Ghaghara & Saryu",
      "avgRainfallMm": 1210,
      "annualDemandMcm": 470,
      "rainfallDeparturePct": 27.4
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "balrampur",
    "name": "Balrampur",
    "division": "Devipatan",
    "region": "Terai",
    "coordinates": {
      "lat": 27.43,
      "lng": 82.18
    },
    "waterStatus": "good",
    "centroid": [
      27.43,
      82.18
    ],
    "projected": [
      620.0,
      353.3
    ],
    "svgPath": "M 646.3,353.3 L 636.3,367.2 L 620.0,376.4 L 603.0,367.8 L 599.1,353.3 L 602.3,338.3 L 620.0,334.7 L 638.4,337.7 Z",
    "areaKm2": 3349,
    "soilType": "Terai Clay",
    "slopePct": 0.8,
    "rechargeSuitabilityScore": 81.6,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 5.46,
        "stress_score": 16.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 5.66,
        "stress_score": 16.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 5.86,
        "stress_score": 17.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 6.06,
        "stress_score": 17.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 6.26,
        "stress_score": 18.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 6.42,
        "stress_score": 18.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 6.5,
        "stress_score": 19.1,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 6.58,
        "stress_score": 19.2,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 6.66,
        "stress_score": 19.4,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 6.86,
        "stress_score": 20.0,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 6.5,
      "groundwaterTrendAnnualCm": -4,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 36.2,
      "waterStressScore": 12,
      "majorRiverBasin": "Rapti Basin",
      "avgRainfallMm": 1320,
      "annualDemandMcm": 380,
      "rainfallDeparturePct": 38.9
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "gonda",
    "name": "Gonda",
    "division": "Devipatan",
    "region": "Terai",
    "coordinates": {
      "lat": 27.13,
      "lng": 81.96
    },
    "waterStatus": "good",
    "centroid": [
      27.13,
      81.96
    ],
    "projected": [
      596.2,
      381.9
    ],
    "svgPath": "M 622.7,381.9 L 612.7,395.9 L 596.2,405.2 L 579.0,396.5 L 575.1,381.9 L 578.4,366.7 L 596.2,363.2 L 614.7,366.1 Z",
    "areaKm2": 3404,
    "soilType": "Alluvial Loam",
    "slopePct": 0.9,
    "rechargeSuitabilityScore": 93.3,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 7.46,
        "stress_score": 24.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 7.91,
        "stress_score": 26.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 8.36,
        "stress_score": 27.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 8.81,
        "stress_score": 28.3,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 9.26,
        "stress_score": 29.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 9.62,
        "stress_score": 30.3,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 9.8,
        "stress_score": 30.8,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 9.98,
        "stress_score": 31.3,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 10.16,
        "stress_score": 31.7,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 10.61,
        "stress_score": 32.8,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 9.8,
      "groundwaterTrendAnnualCm": -9,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 52.6,
      "waterStressScore": 14.5,
      "majorRiverBasin": "Ghaghara & Kuwana",
      "avgRainfallMm": 1100,
      "annualDemandMcm": 440,
      "rainfallDeparturePct": 15.8
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "shravasti",
    "name": "Shravasti",
    "division": "Devipatan",
    "region": "Terai",
    "coordinates": {
      "lat": 27.5,
      "lng": 82.03
    },
    "waterStatus": "good",
    "centroid": [
      27.5,
      82.03
    ],
    "projected": [
      603.8,
      346.6
    ],
    "svgPath": "M 619.1,346.6 L 616.7,357.5 L 603.8,360.2 L 590.5,357.9 L 587.1,346.6 L 593.6,337.9 L 603.8,331.9 L 614.5,337.5 Z",
    "areaKm2": 1640,
    "soilType": "Terai Alluvium",
    "slopePct": 0.8,
    "rechargeSuitabilityScore": 81.6,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 5.6,
        "stress_score": 17.5,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 5.85,
        "stress_score": 18.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 6.1,
        "stress_score": 18.8,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 6.35,
        "stress_score": 19.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 6.6,
        "stress_score": 20.0,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 6.8,
        "stress_score": 20.5,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 6.9,
        "stress_score": 20.8,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 7.0,
        "stress_score": 21.0,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 7.1,
        "stress_score": 21.2,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 7.35,
        "stress_score": 21.9,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 6.9,
      "groundwaterTrendAnnualCm": -5,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 39.4,
      "waterStressScore": 12,
      "majorRiverBasin": "Rapti Basin",
      "avgRainfallMm": 1290,
      "annualDemandMcm": 240,
      "rainfallDeparturePct": 35.8
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "basti",
    "name": "Basti",
    "division": "Basti",
    "region": "Purvanchal",
    "coordinates": {
      "lat": 26.8,
      "lng": 82.76
    },
    "waterStatus": "good",
    "centroid": [
      26.8,
      82.76
    ],
    "projected": [
      682.7,
      413.4
    ],
    "svgPath": "M 703.4,413.4 L 699.9,428.1 L 682.7,431.7 L 669.5,424.7 L 660.3,413.4 L 668.8,401.6 L 682.7,393.6 L 697.2,401.1 Z",
    "areaKm2": 2688,
    "soilType": "Alluvial Silt",
    "slopePct": 1.0,
    "rechargeSuitabilityScore": 93.0,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 7.74,
        "stress_score": 27.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 8.29,
        "stress_score": 28.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 8.84,
        "stress_score": 29.8,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 9.39,
        "stress_score": 31.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 9.94,
        "stress_score": 32.5,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 10.38,
        "stress_score": 33.7,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 10.6,
        "stress_score": 34.2,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 10.82,
        "stress_score": 34.8,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 11.04,
        "stress_score": 35.3,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 11.59,
        "stress_score": 36.7,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 10.6,
      "groundwaterTrendAnnualCm": -11,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 56.8,
      "waterStressScore": 19.0,
      "majorRiverBasin": "Kuwano & Manorama",
      "avgRainfallMm": 1060,
      "annualDemandMcm": 420,
      "rainfallDeparturePct": 11.6
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "sant-kabir-nagar",
    "name": "Sant Kabir Nagar",
    "division": "Basti",
    "region": "Purvanchal",
    "coordinates": {
      "lat": 26.77,
      "lng": 83.03
    },
    "waterStatus": "good",
    "centroid": [
      26.77,
      83.03
    ],
    "projected": [
      711.9,
      416.3
    ],
    "svgPath": "M 730.6,416.3 L 723.6,426.2 L 711.9,432.8 L 699.7,426.6 L 696.9,416.3 L 699.2,405.5 L 711.9,403.0 L 725.0,405.1 Z",
    "areaKm2": 1646,
    "soilType": "Alluvial Loam",
    "slopePct": 0.9,
    "rechargeSuitabilityScore": 93.3,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 7.76,
        "stress_score": 25.7,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 8.21,
        "stress_score": 26.8,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 8.66,
        "stress_score": 27.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 9.11,
        "stress_score": 29.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 9.56,
        "stress_score": 30.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 9.92,
        "stress_score": 31.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 10.1,
        "stress_score": 31.6,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 10.28,
        "stress_score": 32.0,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 10.46,
        "stress_score": 32.5,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 10.91,
        "stress_score": 33.6,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 10.1,
      "groundwaterTrendAnnualCm": -9,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 53.4,
      "waterStressScore": 15.4,
      "majorRiverBasin": "Ami & Kuwano",
      "avgRainfallMm": 1090,
      "annualDemandMcm": 280,
      "rainfallDeparturePct": 14.7
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "siddharthnagar",
    "name": "Siddharthnagar",
    "division": "Basti",
    "region": "Terai",
    "coordinates": {
      "lat": 27.29,
      "lng": 82.81
    },
    "waterStatus": "good",
    "centroid": [
      27.29,
      82.81
    ],
    "projected": [
      688.1,
      366.6
    ],
    "svgPath": "M 713.2,366.6 L 703.8,379.9 L 688.1,382.9 L 671.8,380.5 L 668.0,366.6 L 671.2,352.2 L 688.1,348.7 L 705.7,351.7 Z",
    "areaKm2": 2895,
    "soilType": "Terai Clay",
    "slopePct": 0.7,
    "rechargeSuitabilityScore": 81.9,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 5.12,
        "stress_score": 14.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 5.27,
        "stress_score": 15.3,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 5.42,
        "stress_score": 15.7,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 5.57,
        "stress_score": 16.0,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 5.72,
        "stress_score": 16.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 5.84,
        "stress_score": 16.7,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 5.9,
        "stress_score": 16.9,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 5.96,
        "stress_score": 17.0,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 6.02,
        "stress_score": 17.1,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 6.17,
        "stress_score": 17.5,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 5.9,
      "groundwaterTrendAnnualCm": -3,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 32.5,
      "waterStressScore": 12,
      "majorRiverBasin": "Rapti & Banganga",
      "avgRainfallMm": 1340,
      "annualDemandMcm": 360,
      "rainfallDeparturePct": 41.1
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "deoria",
    "name": "Deoria",
    "division": "Gorakhpur",
    "region": "Purvanchal",
    "coordinates": {
      "lat": 26.5,
      "lng": 83.78
    },
    "waterStatus": "good",
    "centroid": [
      26.5,
      83.78
    ],
    "projected": [
      793.0,
      442.1
    ],
    "svgPath": "M 814.0,442.1 L 805.9,453.0 L 793.0,460.6 L 779.5,453.6 L 770.4,442.1 L 778.9,430.1 L 793.0,422.1 L 807.7,429.6 Z",
    "areaKm2": 2540,
    "soilType": "Gandak Alluvium",
    "slopePct": 0.9,
    "rechargeSuitabilityScore": 81.3,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 6.62,
        "stress_score": 22.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 7.02,
        "stress_score": 23.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 7.42,
        "stress_score": 24.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 7.82,
        "stress_score": 25.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 8.22,
        "stress_score": 26.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 8.54,
        "stress_score": 26.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 8.7,
        "stress_score": 27.4,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 8.86,
        "stress_score": 27.8,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 9.02,
        "stress_score": 28.1,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 9.42,
        "stress_score": 29.1,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 8.7,
      "groundwaterTrendAnnualCm": -8,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 49.2,
      "waterStressScore": 12,
      "majorRiverBasin": "Ghaghara & Little Gandak",
      "avgRainfallMm": 1140,
      "annualDemandMcm": 440,
      "rainfallDeparturePct": 20.0
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "gorakhpur",
    "name": "Gorakhpur",
    "division": "Gorakhpur",
    "region": "Purvanchal",
    "coordinates": {
      "lat": 26.76,
      "lng": 83.37
    },
    "waterStatus": "good",
    "centroid": [
      26.76,
      83.37
    ],
    "projected": [
      748.6,
      417.3
    ],
    "svgPath": "M 774.7,417.3 L 764.9,431.1 L 748.6,440.3 L 731.7,431.7 L 727.8,417.3 L 731.0,402.3 L 748.6,398.8 L 766.9,401.7 Z",
    "areaKm2": 3321,
    "soilType": "Rapti Silt Loam",
    "slopePct": 0.8,
    "rechargeSuitabilityScore": 81.6,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 6.28,
        "stress_score": 20.6,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 6.63,
        "stress_score": 21.5,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 6.98,
        "stress_score": 22.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 7.33,
        "stress_score": 23.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 7.68,
        "stress_score": 24.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 7.96,
        "stress_score": 24.8,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 8.1,
        "stress_score": 25.1,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 8.24,
        "stress_score": 25.5,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 8.38,
        "stress_score": 25.9,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 8.73,
        "stress_score": 26.7,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 8.1,
      "groundwaterTrendAnnualCm": -7,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 46.5,
      "waterStressScore": 12,
      "majorRiverBasin": "Rapti & Rohini",
      "avgRainfallMm": 1210,
      "annualDemandMcm": 580,
      "rainfallDeparturePct": 27.4
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "kushinagar",
    "name": "Kushinagar",
    "division": "Gorakhpur",
    "region": "Purvanchal",
    "coordinates": {
      "lat": 26.74,
      "lng": 83.89
    },
    "waterStatus": "good",
    "centroid": [
      26.74,
      83.89
    ],
    "projected": [
      804.9,
      419.2
    ],
    "svgPath": "M 828.9,419.2 L 819.8,431.9 L 804.9,440.4 L 789.4,432.4 L 779.1,419.2 L 788.7,405.5 L 804.9,402.3 L 821.7,404.9 Z",
    "areaKm2": 2905,
    "soilType": "Gandak Alluvium",
    "slopePct": 0.8,
    "rechargeSuitabilityScore": 81.6,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 5.9,
        "stress_score": 18.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 6.15,
        "stress_score": 18.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 6.4,
        "stress_score": 19.5,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 6.65,
        "stress_score": 20.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 6.9,
        "stress_score": 20.8,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 7.1,
        "stress_score": 21.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 7.2,
        "stress_score": 21.5,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 7.3,
        "stress_score": 21.8,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 7.4,
        "stress_score": 22.0,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 7.65,
        "stress_score": 22.6,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 7.2,
      "groundwaterTrendAnnualCm": -5,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 42.1,
      "waterStressScore": 12,
      "majorRiverBasin": "Great Gandak & Little Gandak",
      "avgRainfallMm": 1220,
      "annualDemandMcm": 460,
      "rainfallDeparturePct": 28.4
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "maharajganj",
    "name": "Maharajganj",
    "division": "Gorakhpur",
    "region": "Terai",
    "coordinates": {
      "lat": 27.14,
      "lng": 83.56
    },
    "waterStatus": "good",
    "centroid": [
      27.14,
      83.56
    ],
    "projected": [
      769.2,
      381.0
    ],
    "svgPath": "M 790.0,381.0 L 786.6,395.8 L 769.2,399.4 L 751.1,396.4 L 746.6,381.0 L 755.3,369.2 L 769.2,361.0 L 783.7,368.7 Z",
    "areaKm2": 2952,
    "soilType": "Terai Alluvium",
    "slopePct": 0.7,
    "rechargeSuitabilityScore": 81.9,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 5.06,
        "stress_score": 15.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 5.26,
        "stress_score": 15.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 5.46,
        "stress_score": 16.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 5.66,
        "stress_score": 16.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 5.86,
        "stress_score": 17.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 6.02,
        "stress_score": 17.8,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 6.1,
        "stress_score": 18.1,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 6.18,
        "stress_score": 18.2,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 6.26,
        "stress_score": 18.4,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 6.46,
        "stress_score": 18.9,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 6.1,
      "groundwaterTrendAnnualCm": -4,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 34.0,
      "waterStressScore": 12,
      "majorRiverBasin": "Rohini & Gandak",
      "avgRainfallMm": 1390,
      "annualDemandMcm": 390,
      "rainfallDeparturePct": 46.3
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "azamgarh",
    "name": "Azamgarh",
    "division": "Azamgarh",
    "region": "Purvanchal",
    "coordinates": {
      "lat": 26.06,
      "lng": 83.18
    },
    "waterStatus": "good",
    "centroid": [
      26.06,
      83.18
    ],
    "projected": [
      728.1,
      484.1
    ],
    "svgPath": "M 757.8,484.1 L 746.6,499.9 L 728.1,503.4 L 708.8,500.5 L 704.3,484.1 L 708.1,467.1 L 728.1,463.0 L 748.9,466.4 Z",
    "areaKm2": 4054,
    "soilType": "Alluvial Clay Loam",
    "slopePct": 1.0,
    "rechargeSuitabilityScore": 93.0,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 8.8,
        "stress_score": 32.5,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 9.55,
        "stress_score": 34.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 10.3,
        "stress_score": 36.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 11.05,
        "stress_score": 38.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 11.8,
        "stress_score": 40.0,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 12.4,
        "stress_score": 41.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 12.7,
        "stress_score": 42.2,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 13.0,
        "stress_score": 43.0,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 13.3,
        "stress_score": 43.8,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 14.05,
        "stress_score": 45.6,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 12.7,
      "groundwaterTrendAnnualCm": -15,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 66.8,
      "waterStressScore": 28.2,
      "majorRiverBasin": "Tons & Ghaghara",
      "avgRainfallMm": 1010,
      "annualDemandMcm": 590,
      "rainfallDeparturePct": 6.3
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "ballia",
    "name": "Ballia",
    "division": "Azamgarh",
    "region": "Purvanchal",
    "coordinates": {
      "lat": 25.76,
      "lng": 84.15
    },
    "waterStatus": "good",
    "centroid": [
      25.76,
      84.15
    ],
    "projected": [
      833.0,
      512.8
    ],
    "svgPath": "M 854.3,512.8 L 850.8,528.0 L 833.0,531.7 L 814.5,528.5 L 809.8,512.8 L 818.7,500.7 L 833.0,492.3 L 847.9,500.1 Z",
    "areaKm2": 2981,
    "soilType": "Floodplain Silt",
    "slopePct": 0.8,
    "rechargeSuitabilityScore": 81.6,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 7.06,
        "stress_score": 23.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 7.51,
        "stress_score": 25.1,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 7.96,
        "stress_score": 26.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 8.41,
        "stress_score": 27.3,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 8.86,
        "stress_score": 28.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 9.22,
        "stress_score": 29.4,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 9.4,
        "stress_score": 29.8,
        "category": "Safe",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 9.58,
        "stress_score": 30.2,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 9.76,
        "stress_score": 30.7,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 10.21,
        "stress_score": 31.8,
        "category": "Safe",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 9.4,
      "groundwaterTrendAnnualCm": -9,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 52.4,
      "waterStressScore": 15.0,
      "majorRiverBasin": "Ganga & Ghaghara Confluence",
      "avgRainfallMm": 1050,
      "annualDemandMcm": 470,
      "rainfallDeparturePct": 10.5
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "mau",
    "name": "Mau",
    "division": "Azamgarh",
    "region": "Purvanchal",
    "coordinates": {
      "lat": 26.0,
      "lng": 83.56
    },
    "waterStatus": "good",
    "centroid": [
      26.0,
      83.56
    ],
    "projected": [
      769.2,
      489.9
    ],
    "svgPath": "M 785.5,489.9 L 782.8,501.5 L 769.2,504.4 L 758.8,498.8 L 751.5,489.9 L 758.3,480.6 L 769.2,474.2 L 780.6,480.2 Z",
    "areaKm2": 1713,
    "soilType": "Alluvial Loam",
    "slopePct": 1.0,
    "rechargeSuitabilityScore": 93.0,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 7.82,
        "stress_score": 28.6,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 8.47,
        "stress_score": 30.3,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 9.12,
        "stress_score": 31.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 9.77,
        "stress_score": 33.5,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 10.42,
        "stress_score": 35.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 10.94,
        "stress_score": 36.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 11.2,
        "stress_score": 37.1,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 11.46,
        "stress_score": 37.8,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 11.72,
        "stress_score": 38.4,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 12.37,
        "stress_score": 40.0,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 11.2,
      "groundwaterTrendAnnualCm": -13,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 59.8,
      "waterStressScore": 22.8,
      "majorRiverBasin": "Tons Basin",
      "avgRainfallMm": 1030,
      "annualDemandMcm": 310,
      "rainfallDeparturePct": 8.4
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "chandauli",
    "name": "Chandauli",
    "division": "Varanasi",
    "region": "Purvanchal",
    "coordinates": {
      "lat": 25.26,
      "lng": 83.27
    },
    "waterStatus": "good",
    "centroid": [
      25.26,
      83.27
    ],
    "projected": [
      737.8,
      560.5
    ],
    "svgPath": "M 756.2,560.5 L 753.4,573.7 L 737.8,576.9 L 721.6,574.2 L 717.7,560.5 L 721.0,546.2 L 737.8,542.7 L 750.7,549.6 Z",
    "areaKm2": 2541,
    "soilType": "Rice Bowl Heavy Clay",
    "slopePct": 1.3,
    "rechargeSuitabilityScore": 80.1,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 8.94,
        "stress_score": 33.5,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 9.74,
        "stress_score": 35.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 10.54,
        "stress_score": 37.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 11.34,
        "stress_score": 39.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 12.14,
        "stress_score": 41.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 12.78,
        "stress_score": 43.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 13.1,
        "stress_score": 44.0,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 13.42,
        "stress_score": 44.8,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 13.74,
        "stress_score": 45.5,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 14.54,
        "stress_score": 47.5,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 13.1,
      "groundwaterTrendAnnualCm": -16,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 65.4,
      "waterStressScore": 27.9,
      "majorRiverBasin": "Ganga & Karamnasa",
      "avgRainfallMm": 1080,
      "annualDemandMcm": 410,
      "rainfallDeparturePct": 13.7
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "ghazipur",
    "name": "Ghazipur",
    "division": "Varanasi",
    "region": "Purvanchal",
    "coordinates": {
      "lat": 25.58,
      "lng": 83.57
    },
    "waterStatus": "good",
    "centroid": [
      25.58,
      83.57
    ],
    "projected": [
      770.3,
      530.0
    ],
    "svgPath": "M 794.5,530.0 L 785.1,542.6 L 770.3,551.4 L 754.8,543.2 L 744.2,530.0 L 754.1,516.2 L 770.3,507.0 L 787.2,515.6 Z",
    "areaKm2": 3377,
    "soilType": "Ganga Alluvial Silt",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 92.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 8.16,
        "stress_score": 30.2,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 8.86,
        "stress_score": 31.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 9.56,
        "stress_score": 33.7,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 10.26,
        "stress_score": 35.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 10.96,
        "stress_score": 37.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 11.52,
        "stress_score": 38.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 11.8,
        "stress_score": 39.3,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 12.08,
        "stress_score": 40.0,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 12.36,
        "stress_score": 40.7,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 13.06,
        "stress_score": 42.4,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 11.8,
      "groundwaterTrendAnnualCm": -14,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 62.0,
      "waterStressScore": 24.9,
      "majorRiverBasin": "Ganga & Gomti",
      "avgRainfallMm": 1030,
      "annualDemandMcm": 480,
      "rainfallDeparturePct": 8.4
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "jaunpur",
    "name": "Jaunpur",
    "division": "Varanasi",
    "region": "Purvanchal",
    "coordinates": {
      "lat": 25.75,
      "lng": 82.68
    },
    "waterStatus": "good",
    "centroid": [
      25.75,
      82.68
    ],
    "projected": [
      674.1,
      513.7
    ],
    "svgPath": "M 697.9,513.7 L 694.1,530.7 L 674.1,534.8 L 653.3,531.3 L 648.2,513.7 L 652.6,495.4 L 674.1,490.8 L 690.7,499.6 Z",
    "areaKm2": 4038,
    "soilType": "Alluvial Silt",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 92.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 9.82,
        "stress_score": 37.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 10.72,
        "stress_score": 39.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 11.62,
        "stress_score": 41.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 12.52,
        "stress_score": 43.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 13.42,
        "stress_score": 46.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 14.14,
        "stress_score": 48.0,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 14.5,
        "stress_score": 48.9,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 14.86,
        "stress_score": 49.8,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 15.22,
        "stress_score": 50.7,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 16.12,
        "stress_score": 52.9,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 14.5,
      "groundwaterTrendAnnualCm": -18,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 71.5,
      "waterStressScore": 35.4,
      "majorRiverBasin": "Gomti & Sai",
      "avgRainfallMm": 980,
      "annualDemandMcm": 560,
      "rainfallDeparturePct": 3.2
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "varanasi",
    "name": "Varanasi",
    "division": "Varanasi",
    "region": "Purvanchal",
    "coordinates": {
      "lat": 25.32,
      "lng": 82.97
    },
    "waterStatus": "warning",
    "centroid": [
      25.32,
      82.97
    ],
    "projected": [
      705.4,
      554.8
    ],
    "svgPath": "M 723.0,554.8 L 716.3,564.1 L 705.4,570.3 L 694.0,564.5 L 691.4,554.8 L 693.5,544.7 L 705.4,542.4 L 717.7,544.3 Z",
    "areaKm2": 1535,
    "soilType": "Ganga Silt Loam",
    "slopePct": 1.4,
    "rechargeSuitabilityScore": 79.8,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 11.88,
        "stress_score": 48.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 13.23,
        "stress_score": 52.0,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 14.58,
        "stress_score": 55.4,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 15.93,
        "stress_score": 58.7,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 17.28,
        "stress_score": 62.1,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 18.36,
        "stress_score": 64.8,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 18.9,
        "stress_score": 66.2,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 19.44,
        "stress_score": 67.5,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 19.98,
        "stress_score": 68.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 21.33,
        "stress_score": 72.2,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 18.9,
      "groundwaterTrendAnnualCm": -27,
      "cgwbCategory": "Critical",
      "cgwbStageExtractionPct": 92.4,
      "waterStressScore": 51.5,
      "majorRiverBasin": "Ganga, Varuna & Assi",
      "avgRainfallMm": 1010,
      "annualDemandMcm": 540,
      "rainfallDeparturePct": 6.3
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "mirzapur",
    "name": "Mirzapur",
    "division": "Mirzapur",
    "region": "Vindhya",
    "coordinates": {
      "lat": 25.15,
      "lng": 82.57
    },
    "waterStatus": "warning",
    "centroid": [
      25.15,
      82.57
    ],
    "projected": [
      662.2,
      571.0
    ],
    "svgPath": "M 687.3,571.0 L 683.3,588.9 L 662.2,593.3 L 640.3,589.6 L 634.9,571.0 L 645.4,556.8 L 662.2,546.8 L 679.7,556.1 Z",
    "areaKm2": 4405,
    "soilType": "Vindhyan Red Clay & Rock",
    "slopePct": 3.4,
    "rechargeSuitabilityScore": 73.8,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 11.74,
        "stress_score": 44.0,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 12.79,
        "stress_score": 46.7,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 13.84,
        "stress_score": 49.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 14.89,
        "stress_score": 51.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 15.94,
        "stress_score": 54.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 16.78,
        "stress_score": 56.7,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 17.2,
        "stress_score": 57.7,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 17.62,
        "stress_score": 58.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 18.04,
        "stress_score": 59.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 19.09,
        "stress_score": 62.4,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 17.2,
      "groundwaterTrendAnnualCm": -21,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 81.2,
      "waterStressScore": 44.9,
      "majorRiverBasin": "Ganga & Belan",
      "avgRainfallMm": 940,
      "annualDemandMcm": 460,
      "rainfallDeparturePct": -1.1
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 95,
        "target": "Impounds seasonal storm discharge along stream beds."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      }
    ]
  },
  {
    "id": "bhadohi",
    "name": "Sant Ravidas Nagar (Bhadohi)",
    "division": "Mirzapur",
    "region": "Purvanchal",
    "coordinates": {
      "lat": 25.39,
      "lng": 82.57
    },
    "waterStatus": "good",
    "centroid": [
      25.39,
      82.57
    ],
    "projected": [
      662.2,
      548.1
    ],
    "svgPath": "M 675.2,548.1 L 673.0,557.3 L 662.2,559.6 L 653.9,555.2 L 648.2,548.1 L 653.5,540.7 L 662.2,535.7 L 671.3,540.4 Z",
    "areaKm2": 1015,
    "soilType": "Alluvial Silt",
    "slopePct": 1.2,
    "rechargeSuitabilityScore": 92.4,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 9.68,
        "stress_score": 36.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 10.53,
        "stress_score": 38.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 11.38,
        "stress_score": 40.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 12.23,
        "stress_score": 42.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 13.08,
        "stress_score": 44.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 13.76,
        "stress_score": 46.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 14.1,
        "stress_score": 47.1,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 14.44,
        "stress_score": 48.0,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 14.78,
        "stress_score": 48.8,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 15.63,
        "stress_score": 51.0,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 14.1,
      "groundwaterTrendAnnualCm": -17,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 69.8,
      "waterStressScore": 34.0,
      "majorRiverBasin": "Ganga & Varuna",
      "avgRainfallMm": 970,
      "annualDemandMcm": 260,
      "rainfallDeparturePct": 2.1
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "sonbhadra",
    "name": "Sonbhadra",
    "division": "Mirzapur",
    "region": "Vindhya",
    "coordinates": {
      "lat": 24.68,
      "lng": 83.06
    },
    "waterStatus": "good",
    "centroid": [
      24.68,
      83.06
    ],
    "projected": [
      715.1,
      615.9
    ],
    "svgPath": "M 746.2,615.9 L 741.3,638.2 L 715.1,643.5 L 687.9,639.0 L 681.2,615.9 L 694.3,598.2 L 715.1,585.9 L 736.9,597.4 Z",
    "areaKm2": 6788,
    "soilType": "Hard Rock Sandstone",
    "slopePct": 4.8,
    "rechargeSuitabilityScore": 69.6,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 8.86,
        "stress_score": 31.9,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 9.56,
        "stress_score": 33.7,
        "category": "Safe",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 10.26,
        "stress_score": 35.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 10.96,
        "stress_score": 37.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 11.66,
        "stress_score": 38.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 12.22,
        "stress_score": 40.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 12.5,
        "stress_score": 41.0,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 12.78,
        "stress_score": 41.8,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 13.06,
        "stress_score": 42.4,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 13.76,
        "stress_score": 44.2,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 12.5,
      "groundwaterTrendAnnualCm": -14,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 58.2,
      "waterStressScore": 24.7,
      "majorRiverBasin": "Son & Rihand",
      "avgRainfallMm": 1090,
      "annualDemandMcm": 510,
      "rainfallDeparturePct": 14.7
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 95,
        "target": "Impounds seasonal storm discharge along stream beds."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      }
    ]
  },
  {
    "id": "fatehpur",
    "name": "Fatehpur",
    "division": "Prayagraj",
    "region": "Doab",
    "coordinates": {
      "lat": 25.93,
      "lng": 80.81
    },
    "waterStatus": "warning",
    "centroid": [
      25.93,
      80.81
    ],
    "projected": [
      471.9,
      496.5
    ],
    "svgPath": "M 498.7,496.5 L 488.4,510.5 L 471.9,520.2 L 454.7,511.1 L 442.9,496.5 L 453.9,481.2 L 471.9,471.0 L 490.7,480.6 Z",
    "areaKm2": 4152,
    "soilType": "Doab Alluvium",
    "slopePct": 1.2,
    "rechargeSuitabilityScore": 80.4,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 11.08,
        "stress_score": 43.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 12.18,
        "stress_score": 45.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 13.28,
        "stress_score": 48.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 14.38,
        "stress_score": 51.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 15.48,
        "stress_score": 54.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 16.36,
        "stress_score": 56.3,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 16.8,
        "stress_score": 57.4,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 17.24,
        "stress_score": 58.5,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 17.68,
        "stress_score": 59.6,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 18.78,
        "stress_score": 62.4,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 16.8,
      "groundwaterTrendAnnualCm": -22,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 83.1,
      "waterStressScore": 47.1,
      "majorRiverBasin": "Ganga & Yamuna",
      "avgRainfallMm": 860,
      "annualDemandMcm": 470,
      "rainfallDeparturePct": -9.5
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "kaushambi",
    "name": "Kaushambi",
    "division": "Prayagraj",
    "region": "Doab",
    "coordinates": {
      "lat": 25.53,
      "lng": 81.38
    },
    "waterStatus": "warning",
    "centroid": [
      25.53,
      81.38
    ],
    "projected": [
      533.5,
      534.7
    ],
    "svgPath": "M 550.8,534.7 L 548.0,547.0 L 533.5,550.1 L 518.4,547.5 L 514.7,534.7 L 521.9,524.8 L 533.5,518.0 L 545.6,524.4 Z",
    "areaKm2": 2012,
    "soilType": "Sandy Alluvium",
    "slopePct": 1.3,
    "rechargeSuitabilityScore": 80.1,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 11.42,
        "stress_score": 44.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 12.57,
        "stress_score": 47.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 13.72,
        "stress_score": 50.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 14.87,
        "stress_score": 53.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 16.02,
        "stress_score": 56.1,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 16.94,
        "stress_score": 58.5,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 17.4,
        "stress_score": 59.6,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 17.86,
        "stress_score": 60.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 18.32,
        "stress_score": 61.9,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 19.47,
        "stress_score": 64.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 17.4,
      "groundwaterTrendAnnualCm": -23,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 85.6,
      "waterStressScore": 48.4,
      "majorRiverBasin": "Yamuna & Sasur Khaderi",
      "avgRainfallMm": 890,
      "annualDemandMcm": 330,
      "rainfallDeparturePct": -6.3
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "pratapgarh",
    "name": "Pratapgarh",
    "division": "Prayagraj",
    "region": "Awadh / Purvanchal",
    "coordinates": {
      "lat": 25.9,
      "lng": 81.99
    },
    "waterStatus": "good",
    "centroid": [
      25.9,
      81.99
    ],
    "projected": [
      599.5,
      499.4
    ],
    "svgPath": "M 624.6,499.4 L 614.9,512.5 L 599.5,521.6 L 583.4,513.1 L 572.4,499.4 L 582.7,485.1 L 599.5,475.5 L 617.1,484.5 Z",
    "areaKm2": 3717,
    "soilType": "Alluvial Loam",
    "slopePct": 1.1,
    "rechargeSuitabilityScore": 92.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 9.64,
        "stress_score": 35.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 10.44,
        "stress_score": 37.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 11.24,
        "stress_score": 39.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 12.04,
        "stress_score": 41.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 12.84,
        "stress_score": 43.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 13.48,
        "stress_score": 44.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 13.8,
        "stress_score": 45.7,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 14.12,
        "stress_score": 46.5,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 14.44,
        "stress_score": 47.3,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 15.24,
        "stress_score": 49.3,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 13.8,
      "groundwaterTrendAnnualCm": -16,
      "cgwbCategory": "Safe",
      "cgwbStageExtractionPct": 68.4,
      "waterStressScore": 33.4,
      "majorRiverBasin": "Sai & Bakulahi",
      "avgRainfallMm": 940,
      "annualDemandMcm": 460,
      "rainfallDeparturePct": -1.1
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "prayagraj",
    "name": "Prayagraj",
    "division": "Prayagraj",
    "region": "Doab / Sangam",
    "coordinates": {
      "lat": 25.43,
      "lng": 81.84
    },
    "waterStatus": "warning",
    "centroid": [
      25.43,
      81.84
    ],
    "projected": [
      583.2,
      544.3
    ],
    "svgPath": "M 611.2,544.3 L 606.7,564.3 L 583.2,569.1 L 558.8,565.0 L 552.7,544.3 L 564.5,528.4 L 583.2,517.3 L 602.8,527.7 Z",
    "areaKm2": 5482,
    "soilType": "Sangam Silt Alluvium",
    "slopePct": 1.3,
    "rechargeSuitabilityScore": 80.1,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 11.76,
        "stress_score": 49.7,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 13.21,
        "stress_score": 53.3,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 14.66,
        "stress_score": 56.9,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 16.11,
        "stress_score": 60.6,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 17.56,
        "stress_score": 64.2,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 18.72,
        "stress_score": 67.1,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 19.3,
        "stress_score": 68.5,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 19.88,
        "stress_score": 70.0,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 20.46,
        "stress_score": 71.5,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 21.91,
        "stress_score": 75.1,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 19.3,
      "groundwaterTrendAnnualCm": -29,
      "cgwbCategory": "Critical",
      "cgwbStageExtractionPct": 94.2,
      "waterStressScore": 55.4,
      "majorRiverBasin": "Ganga & Yamuna Confluence",
      "avgRainfallMm": 960,
      "annualDemandMcm": 740,
      "rainfallDeparturePct": 1.1
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 94,
        "target": "Replenishes deep unconfined aquifer zone."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 50,
        "target": "Impounds seasonal storm discharge along stream beds."
      }
    ]
  },
  {
    "id": "banda",
    "name": "Banda",
    "division": "Chitrakoot",
    "region": "Bundelkhand",
    "coordinates": {
      "lat": 25.48,
      "lng": 80.33
    },
    "waterStatus": "warning",
    "centroid": [
      25.48,
      80.33
    ],
    "projected": [
      420.0,
      539.5
    ],
    "svgPath": "M 444.0,539.5 L 440.3,556.8 L 420.0,560.8 L 398.9,557.4 L 393.8,539.5 L 398.1,520.9 L 420.0,516.3 L 436.8,525.3 Z",
    "areaKm2": 4408,
    "soilType": "Mixed Red & Black Soil",
    "slopePct": 3.2,
    "rechargeSuitabilityScore": 74.4,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 12.36,
        "stress_score": 47.7,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 13.56,
        "stress_score": 50.7,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 14.76,
        "stress_score": 53.7,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 15.96,
        "stress_score": 56.7,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 17.16,
        "stress_score": 59.7,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 18.12,
        "stress_score": 62.1,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 18.6,
        "stress_score": 63.3,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 19.08,
        "stress_score": 64.5,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 19.56,
        "stress_score": 65.7,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 20.76,
        "stress_score": 68.7,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 18.6,
      "groundwaterTrendAnnualCm": -24,
      "cgwbCategory": "Critical",
      "cgwbStageExtractionPct": 91.5,
      "waterStressScore": 52.4,
      "majorRiverBasin": "Ken & Baghein",
      "avgRainfallMm": 870,
      "annualDemandMcm": 450,
      "rainfallDeparturePct": -8.4
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 95,
        "target": "Impounds seasonal storm discharge along stream beds."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      }
    ]
  },
  {
    "id": "chitrakoot",
    "name": "Chitrakoot",
    "division": "Chitrakoot",
    "region": "Bundelkhand",
    "coordinates": {
      "lat": 25.2,
      "lng": 80.92
    },
    "waterStatus": "warning",
    "centroid": [
      25.2,
      80.92
    ],
    "projected": [
      483.8,
      566.3
    ],
    "svgPath": "M 504.5,566.3 L 501.3,581.2 L 483.8,584.7 L 465.6,581.8 L 461.2,566.3 L 464.9,550.3 L 483.8,546.3 L 498.3,554.0 Z",
    "areaKm2": 3216,
    "soilType": "Bundelkhand Gneiss / Granite",
    "slopePct": 3.6,
    "rechargeSuitabilityScore": 73.2,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 10.46,
        "stress_score": 39.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 11.41,
        "stress_score": 41.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 12.36,
        "stress_score": 44.2,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 13.31,
        "stress_score": 46.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 14.26,
        "stress_score": 48.9,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 15.02,
        "stress_score": 50.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 15.4,
        "stress_score": 51.8,
        "category": "Semi-Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 15.78,
        "stress_score": 52.7,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 16.16,
        "stress_score": 53.7,
        "category": "Semi-Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 17.11,
        "stress_score": 56.1,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 15.4,
      "groundwaterTrendAnnualCm": -19,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 78.4,
      "waterStressScore": 39.7,
      "majorRiverBasin": "Mandakini & Paisuni",
      "avgRainfallMm": 930,
      "annualDemandMcm": 340,
      "rainfallDeparturePct": -2.1
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 95,
        "target": "Impounds seasonal storm discharge along stream beds."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      }
    ]
  },
  {
    "id": "hamirpur",
    "name": "Hamirpur",
    "division": "Chitrakoot",
    "region": "Bundelkhand",
    "coordinates": {
      "lat": 25.95,
      "lng": 80.15
    },
    "waterStatus": "warning",
    "centroid": [
      25.95,
      80.15
    ],
    "projected": [
      400.5,
      494.6
    ],
    "svgPath": "M 431.0,494.6 L 419.6,510.8 L 400.5,514.5 L 380.7,511.5 L 376.0,494.6 L 379.9,477.1 L 400.5,472.8 L 421.9,476.5 Z",
    "areaKm2": 4121,
    "soilType": "Black Cotton Soil",
    "slopePct": 2.8,
    "rechargeSuitabilityScore": 75.6,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 12.6,
        "stress_score": 49.0,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 13.85,
        "stress_score": 52.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 15.1,
        "stress_score": 55.2,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 16.35,
        "stress_score": 58.4,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 17.6,
        "stress_score": 61.5,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 18.6,
        "stress_score": 64.0,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 19.1,
        "stress_score": 65.2,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 19.6,
        "stress_score": 66.5,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 20.1,
        "stress_score": 67.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 21.35,
        "stress_score": 70.9,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 19.1,
      "groundwaterTrendAnnualCm": -25,
      "cgwbCategory": "Critical",
      "cgwbStageExtractionPct": 92.8,
      "waterStressScore": 55.7,
      "majorRiverBasin": "Yamuna & Betwa Confluence",
      "avgRainfallMm": 820,
      "annualDemandMcm": 410,
      "rainfallDeparturePct": -13.7
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 95,
        "target": "Impounds seasonal storm discharge along stream beds."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      }
    ]
  },
  {
    "id": "mahoba",
    "name": "Mahoba",
    "division": "Chitrakoot",
    "region": "Bundelkhand",
    "coordinates": {
      "lat": 25.29,
      "lng": 79.87
    },
    "waterStatus": "warning",
    "centroid": [
      25.29,
      79.87
    ],
    "projected": [
      370.3,
      557.7
    ],
    "svgPath": "M 395.0,557.7 L 385.6,570.7 L 370.3,579.5 L 354.3,571.3 L 343.7,557.7 L 353.6,543.5 L 370.3,540.3 L 387.6,543.0 Z",
    "areaKm2": 3144,
    "soilType": "Granitic Hard Rock",
    "slopePct": 3.8,
    "rechargeSuitabilityScore": 72.6,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 12.74,
        "stress_score": 53.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 14.29,
        "stress_score": 57.4,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 15.84,
        "stress_score": 61.3,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 17.39,
        "stress_score": 65.2,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 18.94,
        "stress_score": 69.0,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 20.18,
        "stress_score": 72.2,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 20.8,
        "stress_score": 73.7,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 21.42,
        "stress_score": 75.2,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 22.04,
        "stress_score": 76.8,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 23.59,
        "stress_score": 80.7,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 20.8,
      "groundwaterTrendAnnualCm": -31,
      "cgwbCategory": "Critical",
      "cgwbStageExtractionPct": 96.0,
      "waterStressScore": 64.6,
      "majorRiverBasin": "Dhasan & Chandela Lakes",
      "avgRainfallMm": 810,
      "annualDemandMcm": 350,
      "rainfallDeparturePct": -14.7
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 95,
        "target": "Impounds seasonal storm discharge along stream beds."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      }
    ]
  },
  {
    "id": "jalaun",
    "name": "Jalaun",
    "division": "Jhansi",
    "region": "Bundelkhand",
    "coordinates": {
      "lat": 26.15,
      "lng": 79.35
    },
    "waterStatus": "warning",
    "centroid": [
      26.15,
      79.35
    ],
    "projected": [
      314.1,
      475.5
    ],
    "svgPath": "M 338.5,475.5 L 334.8,493.1 L 314.1,497.2 L 292.6,493.7 L 287.4,475.5 L 291.8,456.6 L 314.1,451.9 L 331.2,461.0 Z",
    "areaKm2": 4565,
    "soilType": "Mixed Red Soil",
    "slopePct": 2.6,
    "rechargeSuitabilityScore": 76.2,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 12.22,
        "stress_score": 46.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 13.37,
        "stress_score": 49.5,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 14.52,
        "stress_score": 52.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 15.67,
        "stress_score": 55.3,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 16.82,
        "stress_score": 58.1,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 17.74,
        "stress_score": 60.4,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 18.2,
        "stress_score": 61.6,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 18.66,
        "stress_score": 62.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 19.12,
        "stress_score": 63.9,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 20.27,
        "stress_score": 66.8,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 18.2,
      "groundwaterTrendAnnualCm": -23,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 86.4,
      "waterStressScore": 53.6,
      "majorRiverBasin": "Yamuna & Betwa",
      "avgRainfallMm": 770,
      "annualDemandMcm": 430,
      "rainfallDeparturePct": -18.9
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 95,
        "target": "Impounds seasonal storm discharge along stream beds."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      }
    ]
  },
  {
    "id": "jhansi",
    "name": "Jhansi",
    "division": "Jhansi",
    "region": "Bundelkhand",
    "coordinates": {
      "lat": 25.44,
      "lng": 78.56
    },
    "waterStatus": "warning",
    "centroid": [
      25.44,
      78.56
    ],
    "projected": [
      228.6,
      543.3
    ],
    "svgPath": "M 261.6,543.3 L 249.2,560.8 L 228.6,564.8 L 207.1,561.6 L 202.1,543.3 L 206.3,524.3 L 228.6,519.8 L 251.8,523.6 Z",
    "areaKm2": 5024,
    "soilType": "Bundelkhand Granitic Complex",
    "slopePct": 4.5,
    "rechargeSuitabilityScore": 70.5,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 13.92,
        "stress_score": 54.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 15.32,
        "stress_score": 57.9,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 16.72,
        "stress_score": 61.4,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 18.12,
        "stress_score": 64.9,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 19.52,
        "stress_score": 68.4,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 20.64,
        "stress_score": 71.2,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 21.2,
        "stress_score": 72.6,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 21.76,
        "stress_score": 74.0,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 22.32,
        "stress_score": 75.4,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 23.72,
        "stress_score": 78.9,
        "category": "Over-Exploited",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 21.2,
      "groundwaterTrendAnnualCm": -28,
      "cgwbCategory": "Critical",
      "cgwbStageExtractionPct": 95.8,
      "waterStressScore": 62.2,
      "majorRiverBasin": "Betwa & Pahuj",
      "avgRainfallMm": 840,
      "annualDemandMcm": 560,
      "rainfallDeparturePct": -11.6
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 95,
        "target": "Impounds seasonal storm discharge along stream beds."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      }
    ]
  },
  {
    "id": "lalitpur",
    "name": "Lalitpur",
    "division": "Jhansi",
    "region": "Bundelkhand",
    "coordinates": {
      "lat": 24.69,
      "lng": 78.41
    },
    "waterStatus": "warning",
    "centroid": [
      24.69,
      78.41
    ],
    "projected": [
      212.4,
      615.0
    ],
    "svgPath": "M 242.2,615.0 L 230.7,630.6 L 212.4,641.4 L 193.2,631.3 L 180.2,615.0 L 192.4,598.0 L 212.4,586.6 L 233.3,597.3 Z",
    "areaKm2": 5039,
    "soilType": "Hard Rock / Basalt",
    "slopePct": 4.1,
    "rechargeSuitabilityScore": 71.7,
    "temporalTrajectory": [
      {
        "year": 2000,
        "depth_m": 12.18,
        "stress_score": 45.8,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2005,
        "depth_m": 13.28,
        "stress_score": 48.6,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2010,
        "depth_m": 14.38,
        "stress_score": 51.4,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2015,
        "depth_m": 15.48,
        "stress_score": 54.1,
        "category": "Semi-Critical",
        "phase": "Historical"
      },
      {
        "year": 2020,
        "depth_m": 16.58,
        "stress_score": 56.8,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2024,
        "depth_m": 17.46,
        "stress_score": 59.1,
        "category": "Critical",
        "phase": "Historical"
      },
      {
        "year": 2026,
        "depth_m": 17.9,
        "stress_score": 60.1,
        "category": "Critical",
        "phase": "Current Baseline"
      },
      {
        "year": 2028,
        "depth_m": 18.34,
        "stress_score": 61.2,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2030,
        "depth_m": 18.78,
        "stress_score": 62.4,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      },
      {
        "year": 2035,
        "depth_m": 19.88,
        "stress_score": 65.1,
        "category": "Critical",
        "phase": "AI Projected Horizon"
      }
    ],
    "modernWaterMetrics": {
      "groundwaterDepthM": 17.9,
      "groundwaterTrendAnnualCm": -22,
      "cgwbCategory": "Semi-Critical",
      "cgwbStageExtractionPct": 84.5,
      "waterStressScore": 49.0,
      "majorRiverBasin": "Betwa & Jamni",
      "avgRainfallMm": 880,
      "annualDemandMcm": 480,
      "rainfallDeparturePct": -7.4
    },
    "recommendedRechargeStructures": [
      {
        "structure": "Check Dam / Gully Plug",
        "capacity_m3_yr": 9200,
        "unit_cost_inr": 380000,
        "suitability": 95,
        "target": "Impounds seasonal storm discharge along stream beds."
      },
      {
        "structure": "Multi-Layered Filter Recharge Pit",
        "capacity_m3_yr": 550,
        "unit_cost_inr": 35000,
        "suitability": 90,
        "target": "Captures urban & institutional rooftop runoff."
      },
      {
        "structure": "Amrit Sarovar / Percolation Pond Renovation",
        "capacity_m3_yr": 5400,
        "unit_cost_inr": 240000,
        "suitability": 86,
        "target": "Village community depression revival and silt removal."
      },
      {
        "structure": "Deep Injection Well with Desilting Chamber",
        "capacity_m3_yr": 1250,
        "unit_cost_inr": 85000,
        "suitability": 68,
        "target": "Replenishes deep unconfined aquifer zone."
      }
    ]
  }
];

export const PLANNING_HORIZONS = [
  { id: "h_2000", label: "2000 Baseline", year: 2000, desc: "Pre-Tubewell Boom Baseline: Shallow water table, stable unconfined aquifers." },
  { id: "h_2010", label: "2010 Tubewell Surge", year: 2010, desc: "Rapid agricultural electrification; initial overdraft in Upper Doab & Braj." },
  { id: "h_2020", label: "2020 Stress Surge", year: 2020, desc: "Emergence of over-exploited blocks across NCR, Western UP & Bundelkhand." },
  { id: "h_2026", label: "2026 Live Telemetry", year: 2026, desc: "Current real-time observation horizon with CGWB & IoT monitoring nodes." },
  { id: "h_2028", label: "2028 +2Y ML Forecast", year: 2028, desc: "XGBoost + LSTM multi-horizon prediction under existing extraction rates." },
  { id: "h_2030", label: "2030 +4Y Decadal Target", year: 2030, desc: "Critical planning threshold for Atal Bhujal Yojana & Amrit Sarovar impact." },
  { id: "h_2035", label: "2035 Climate Horizon", year: 2035, desc: "Long-term climate change projection without intervention mitigation." }
];

export const UP_75_DISTRICTS = UP_75_WATER_DISTRICTS;
export type DistrictAtlasEntity = DistrictWaterEntity;
export const ERA_PRESETS = PLANNING_HORIZONS;
