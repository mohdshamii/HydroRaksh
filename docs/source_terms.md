# JalSuraksha — Data Sources, Licensing & Provenance Registry

**Platform:** JalSuraksha — National AI Groundwater Intelligence & Decision-Support System  
**Guiding Policy:** National Water Data Policy, National Data Sharing and Accessibility Policy (NDSAP) of India, and Bureau of Indian Standards (BIS 10500:2012)  

JalSuraksha operates on an **Empirical-First, Zero-Fabrication Architecture**. All displayed telemetry, historical trajectories, chemical flags, and geospatial boundaries derive from validated government repositories and official open science portals.

---

## 1. Primary Empirical Government Datasets

### A. Central Ground Water Board (CGWB) — Groundwater Levels
- **Authority:** Ministry of Jal Shakti, Department of Water Resources, River Development & Ganga Rejuvenation, Government of India.
- **Data Repository:** `data/CGWG/*.csv` (54 State & Regional CSV Files).
- **Observation Volume:** **1,152,078 validated observations** spanning **1991 to 2025**.
- **Geographic Coverage:** 638 administrative districts across 36 States and Union Territories.
- **Fields Extracted:** State Name, District Name, Station Code, Station Name, Latitude, Longitude, Observation Date, Water Table Depth (meters below ground level — $m\text{ bgl}$), and Monitoring Season (Pre-monsoon, Post-monsoon, Kharif, Rabi).
- **Quality Rule:** Missing values are explicitly distinguished from artesian or zero-depth conditions. Never treated as zero groundwater depth.

---

### B. CGWB — Groundwater Chemical Quality
- **Authority:** Central Ground Water Board, Central Chemical Laboratories & Regional Directorates.
- **Data Repository:** `data/Ground Water Quality/*.csv` (33 State & UT CSV Files).
- **Observation Volume:** **185,660 chemical assays** spanning **1961 to 2025**.
- **Geographic Coverage:** 598 administrative districts.
- **Parameters Measured & BIS 10500:2012 Standards:**

| Chemical Parameter | Measured Unit | BIS 10500 Acceptable Limit | BIS 10500 Permissible Limit | Health Significance / Pathology |
| :--- | :---: | :---: | :---: | :--- |
| **pH** | Standard pH scale | 6.5 – 8.5 | No relaxation | Acidic corrosion vs scale-forming alkalinity |
| **Electrical Conductivity (EC)** | $\mu\text{S/cm at } 25^\circ\text{C}$ | 750 | 2,250 | General dissolved mineralization & salinity |
| **Total Dissolved Solids (TDS)** | $\text{mg/L}$ | 500 | 2,000 | Palatability, gastrointestinal irritation |
| **Fluoride ($F^-$)** | $\text{mg/L}$ | 1.0 | 1.5 | Dental & skeletal fluorosis |
| **Nitrate ($NO_3^-$)** | $\text{mg/L}$ | 45 | No relaxation | Methemoglobinemia ("blue baby" syndrome) |
| **Arsenic ($As$)** | $\text{mg/L}$ | 0.01 | 0.05 | Arsenicosis, hyperkeratosis, carcinogenic |
| **Uranium ($U$)** | $\text{mg/L}$ | 0.03 (30 ppb) | No relaxation | WHO/AERB guidance limit; chemical nephrotoxicity |
| **Total Hardness ($CaCO_3$)** | $\text{mg/L}$ | 200 | 600 | Pipe encrustation, soap consumption |
| **Chloride ($Cl^-$)** | $\text{mg/L}$ | 250 | 1,000 | Saline intrusion & taste deterioration |
| **Sulphate ($SO_4^{2-}$)** | $\text{mg/L}$ | 200 | 400 | Cathartic action & gastrointestinal distress |

- **Quality Rule:** Parameters are categorized as **Safe (Within Acceptable)**, **Tolerable (Between Acceptable and Permissible)**, or **Exceeded (Contaminated)**. Samples are never labeled potable by default.

---

### C. India Meteorological Department (IMD) — Rainfall Telemetry
- **Authority:** India Meteorological Department, Ministry of Earth Sciences, Government of India.
- **Data Repository:** `data/Rainfall District wise Daily/*.csv`.
- **Observation Volume:** **61,834 daily and monthly rainfall records**.
- **Geographic Coverage:** 728 districts across India.
- **Departure Categories (IMD Protocol):**
  - **Large Excess (LE):** $+60\%$ or above normal
  - **Excess (E):** $+20\%$ to $+59\%$ above normal
  - **Normal (N):** $-19\%$ to $+19\%$ of long-period average
  - **Deficient (D):** $-59\%$ to $-20\%$ below normal
  - **Large Deficient (LD):** $-60\%$ to $-99\%$ below normal
  - **No Rain (NR):** $-100\%$ below normal

---

### D. Central Ground Water Board — Major & Principal Aquifers
- **Authority:** CGWB National Aquifer Mapping and Management (NAQUIM) Programme.
- **Data Repository:** `data/Aquifire Spread Data/Major_Principal_Aquifer.dbf`.
- **Systems Extracted:** **43 Principal & Major Aquifer Systems** across all physiographic provinces of India.
- **Key Lithological Classes:** Alluvium (Ganga/Brahmaputra), Deccan Traps Basalt, Pre-Cambrian Granites and Gneisses, Gondwana Sandstones, Bhander/Vindhyan Limestones, and Coastal Sedimentary Belts.
- **Usage:** Provides geological transmission parameters (hydraulic conductivity, specific yield, recharge suitability) to the JalRakshak Artificial Recharge and Borewell Diagnostics modules.

---

### E. Survey of India / NWIC — Administrative District Boundaries
- **Authority:** Survey of India & National Water Informatics Centre (NWIC), Ministry of Jal Shakti.
- **Data Repository:** `data/District Boundaries/district_nwic.GeoJSON`.
- **Cartographic Processing:**
  - Original source coordinates formatted in EPSG:7755 (India Lambert Conformal Conic in meters).
  - Normalization pipeline extracts **733 genuine administrative district boundaries** and compiles state-level SVG paths stored in `data/cache/state_svg_boundaries.json` (2.1 MB).
  - Completely eliminates synthetic Voronoi approximations in map generation workflows.

---

### F. Soil Texture & Infiltration Baseline
- **Authority:** ICAR - National Bureau of Soil Survey and Land Use Planning (NBSS&LUP) / SoilGrids.
- **Provenance Status:** Reference baseline data. Regional raster ingestion is staged; current district classifications record transparent provenance to prevent fabricating localized soil texture.

---

### G. Central Water Commission (CWC) — Reservoir Bulletins
- **Authority:** Central Water Commission, Ministry of Jal Shakti, Government of India.
- **Coverage:** Weekly National Reservoir Storage Bulletins across 150 major monitored reservoirs.
- **Metrics:** Live Storage (BCM/MCM), Full Reservoir Level (FRL), percentage of total live capacity, and 10-year historical comparison.

---

### H. Open-Meteo Weather & High-Resolution Precipitation
- **Endpoint:** `https://api.open-meteo.com/v1/forecast`
- **Licensing:** Open-Meteo is open-source under Attribution 4.0 International (CC BY 4.0).
- **Terms:** Rate limits respected ($<10,000$ calls/day). Exponential backoff implemented.
- **Metrics Extracted:** High-resolution precipitation, 7-day forecast rainfall sum (mm), and shallow root-zone soil moisture ($0-7\text{cm}$ and $7-28\text{cm}$).

---

## 2. Quality Flagging & Lineage Standards

Every ingested observation is assigned an immutable quality lineage record:
1. **`verified_empirical`:** Direct measurement from official government monitoring stations (CGWB, IMD, CWC).
2. **`derived_scientific`:** Scientifically derived metric (e.g., Water Stress Score, Departure Percentage, Water Balance deficit) calculated via published CGWB GEC-2015 methodologies.
3. **`reference_baseline`:** Standardized regional constant or geological formation attribute derived from NAQUIM literature.
4. **`suspect_flagged`:** Measurement violating physical thresholds (e.g., negative rainfall, water level $>350\text{ m}$ in alluvial terrain) retained for forensic audit but excluded from ML training.
