# JalSuraksha Prototype Analysis & Gap Assessment

**Source Prototype Analyzed:** [https://mohdshamii.github.io/water/](https://mohdshamii.github.io/water/)  
**Branding Motto:** "Predict • Protect • Preserve"  
**Identity:** 💧 JalSuraksha — AI Water Resource Intelligence  
**Visual Style:** Deep navy `#062A4D` sidebar and headers, oceanic blue `#1683D8`, soft blue `#EAF5FF`, alert red `#EB5757`, warning orange `#F2994A`, caution yellow `#F2C94C`, eco green `#27AE60`, clean card surfaces `#FFFFFF` over background `#F4F7FA`.

---

## 1. Global Shell & Navigation Architecture

### Global Layout Components
1. **Sidebar Navigation (Responsive Collapsible):**
   - **Brand Header:** 💧 icon inside cyan badge, bold title `JalSuraksha`, subtitle `Predict • Protect • Preserve`.
   - **Navigation Items (18 modules):**
     1. Dashboard (`layout-dashboard`)
     2. Groundwater Analysis (`droplets`)
     3. Risk & Forecasting (`trending-down`)
     4. GIS & Mapping (`map`)
     5. Recharge Planning (`sprout`)
     6. Rainwater Harvesting (`cloud-rain`)
     7. Water Demand (`gauge`)
     8. Crop & Irrigation (`wheat`)
     9. Water Quality (`flask-conical`)
     10. Water Budget (`pie-chart`)
     11. What-If Simulator (`sliders-horizontal`)
     12. Cost-Benefit Analysis (`calculator`)
     13. IoT Monitoring (`radio`)
     14. Reports (`file-text`)
     15. Citizen Portal (`users`)
     16. AI Assistant (`bot`)
     17. User Management (`user-cog`)
     18. Settings (`settings`)
   - **Footer Banner:** Inspiring visual card with "Save Water, Secure Tomorrow".
   - **Mobile Drawer:** Overlay backdrop and slide-over transition for screens $<1024\text{px}$.

2. **Top Header Bar:**
   - Sidebar collapse toggle button.
   - Global search input ("Search location: city, district, village...").
   - Demo Mode indicator pill badge (pulsing orange dot with hover explanation).
   - Notification Bell icon with active unread badge counter (`3`), triggers All Alerts modal/drawer.
   - User Profile Chip: Avatar `AM` (Aman Malik), role badge (`Admin`), dropdown chevron.
   - Sub-header Bar: Dynamic breadcrumb trail & real-time clock (`DD MMMM YYYY, HH:MM:SS`).

3. **Floating AI Assistant & Drawer:**
   - Floating Action Button (FAB) at bottom-right (`#aiFab`) with sparkles/bot icon.
   - Collapsible AI Chat Window (`#aiChatPanel`) featuring suggested query pills, conversational bubble thread, data citations, confidence scores, and real-time prompt input.

4. **Global Feedback Systems:**
   - Toast notification stack at bottom-left (`#toastHost`) with info, success, and error styling.
   - Modal host (`#modalHost`) with blurred backdrop for detailed drill-downs.

---

## 2. Catalog of Prototype Pages & Components

### 1. Dashboard (`renderDashboard`)
- **Quick Action Bar:** "Run Prediction", "Add Sensor", "Export Data", "Configure Layers".
- **KPI Summary Cards (5 Key Metrics):**
  1. *Current Avg. Groundwater Level:* $24.8\text{ m}$ (+5% vs last year, negative trend, blue).
  2. *High Risk Areas:* $12$ (-3 vs last month, positive trend, red).
  3. *Total Water Demand (Annual):* $482\text{ MLD}$ (+12% vs last year, negative trend, blue).
  4. *Recharge Potential:* $310\text{ MLD}$ (+28% with recommended structures, positive trend, green).
  5. *Overall Water Security Index:* $68/100$ (Moderate, yellow).
- **Interactive Geospatial District Map:**
  - Scaled polygon vector map of 8 NCR/Western UP districts (Meerut, Ghaziabad, Hapur, Noida, Greater Noida, Bulandshahr, Mathura, Aligarh).
  - Color-coded by risk category (`safe` green, `moderate` yellow, `high` orange, `critical` red).
  - Hover highlights, district selection state, centroid labels with depth in meters.
  - Layer overlay toggle button ("Map Layers" modal: Satellite, Terrain, Risk, GW Level, Rainfall, Recharge Suitability, Water Quality).
- **Selected District Detail Card:**
  - Shows district name, risk tag, current level, 1-year ML predicted level, annual depletion rate, and recharge potential.
  - Drill-down button opening modal with root-cause issues and targeted recommendations.
- **Groundwater Level Trend Chart:**
  - 5-year vs 10-year projection toggle.
  - Actual historical levels vs ML forecast line with spline interpolation.
- **Water Demand & Supply Bar Chart:**
  - Sector filters: All, Domestic, Agriculture, Industrial.
  - Yearly comparison of rising demand vs recharge capacity.
- **Annual Water Budget Doughnut Chart:**
  - Rainfall Input ($620\text{ MLD}$), Natural Recharge ($310\text{ MLD}$), Extraction ($482\text{ MLD}$), Net Deficit ($172\text{ MLD}$).
- **AI Strategic Recommendations (Top 5):**
  - Priority badges (High/Medium), problem statement, estimated impact, cost, water saved, and model confidence rating ($74\%-91\%$).
- **Live Alerts Feed (Recent 6):**
  - Severity-coded chips (Critical, Warning, Info), description, and relative timestamp.

### 2. Groundwater Analysis (`renderGroundwater`)
- Filter bar (District selector, Season selector: Pre-monsoon / Post-monsoon / All, Year range).
- 4 Key Metrics: Avg Depth to Water Table, 5-Year Depletion Rate, Over-exploited Blocks count, Monitoring Wells Reporting.
- Historical trend chart (2015–2025 actual + 2026–2030 projected).
- Comparative table across all 8 districts with extraction stage, CGWB categorization, and water-table depth.

### 3. Risk & Forecasting (`renderRisk`)
- Composite Water Risk Index matrix (Vulnerability, Depletion, Aridity, Stress).
- 3/6/12-Month forward projection graph with upper/lower confidence bands.
- Key Risk Drivers decomposition (Extraction rate $38\%$, Rainfall deficit $26\%$, Low recharge $21\%$, Soil runoff $15\%$).
- Early warning threshold trigger list.

### 4. GIS & Mapping (`renderGIS`)
- Fullscreen geospatial workbench.
- Multi-layer controls: Aquifer boundaries, CGWB monitoring well clusters, watershed lines, recharge zones, rainfall contours.
- Spatial coordinate inspection tool.

### 5. Recharge Planning (`renderRecharge`)
- Geospatial multi-criteria suitability map.
- Candidate intervention site ranking table:
  - Hapur Block (94% suitability, Recharge Well, $+38\text{ MLD}$)
  - Bulandshahr (89% suitability, Check Dam, $+18\text{ MLD}$)
  - Aligarh (84% suitability, Percolation Pond, $+11\text{ MLD}$)
  - Greater Noida (77% suitability, Recharge Shaft, $+14\text{ MLD}$)
  - Noida Sector 62 (71% suitability, Rooftop Cluster, $+12\text{ MLD}$)
- Filter by structure type and minimum suitability threshold.

### 6. Rainwater Harvesting Calculator (`renderHarvesting`)
- Interactive parameter inputs:
  - Rooftop area (sq. ft.)
  - Annual rainfall (mm)
  - Runoff coefficient (Concrete roof 0.85, Tiles 0.75, Metal 0.90)
  - Number of buildings in cluster
- Instant computed results:
  - Total harvestable rainwater ($kL$ & $ML$)
  - Recommended storage tank capacity ($kL$)
  - Groundwater recharge potential ($kL$)
  - Estimated municipal water cost savings ($\text{₹/year}$)
  - Estimated capital payback period (months).

### 7. Water Demand Modeling (`renderDemand`)
- Sectoral consumption breakdown: Domestic ($40\%$), Agriculture ($42\%$), Industrial ($18\%$).
- Per capita domestic consumption metrics ($135\text{ LPCD}$ benchmark vs actuals).
- Growth trajectory model with population projection sliders.

### 8. Crop & Irrigation Intelligence (`renderCrop`)
- Agro-climatic water optimization matrix.
- Crop recommendation table:
  - Millet (Bajra): Low water, High efficiency, $94\%$ suitability, $2.1\text{ t/ha}$.
  - Chickpea (Chana): Low water, High efficiency, $89\%$ suitability, $1.6\text{ t/ha}$.
  - Mustard: Low-Medium water, $82\%$ suitability, $1.8\text{ t/ha}$.
  - Wheat: Medium water, $68\%$ suitability, $3.4\text{ t/ha}$.
  - Sugarcane: Very High water, $52\%$ suitability, water-stressed warning.
  - Rice (Paddy): Very High water, $41\%$ suitability, negative sustainability score.
- Irrigation scheduling guidelines (frequency in days, drip vs flood comparison).

### 9. Water Quality Monitoring (`renderQuality`)
- Key chemical & physical parameters vs BIS 10500:2012 / WHO standards:
  - pH: $7.4$ (Safe: 6.5–8.5)
  - TDS: $890\text{ mg/L}$ (High: Safe limit 500)
  - EC: $1120\text{ µS/cm}$ (High: Safe limit 750)
  - Hardness: $340\text{ mg/L}$ (Moderate: Safe limit 300)
  - Nitrate: $38\text{ mg/L}$ (Moderate: Safe limit 45)
  - Fluoride: $0.9\text{ mg/L}$ (Safe: Safe limit 1.5)
  - Arsenic: $0.008\text{ mg/L}$ (Safe: Safe limit 0.010)
  - Turbidity: $3.1\text{ NTU}$ (Safe: Safe limit 5.0)
- Water Quality Index (WQI) score calculation.
- Contamination hotspot indicators.

### 10. Water Budget (`renderBudget`)
- Macro-level water balance equation:
  $$\text{Rainfall Input} (620) + \text{Surface Inflow} (140) - \text{Evapotranspiration} (210) - \text{Extraction} (482) = \text{Deficit} (-172\text{ MLD})$$
- Sankey / flow balance diagram representation.
- District-level balance ledger.

### 11. What-If Scenario Simulator (`renderSimulator`)
- Interactive policy and climate variable sliders:
  1. Rainfall deviation ($-40\%$ to $+40\%$)
  2. Groundwater extraction reduction ($0\%$ to $50\%$)
  3. Recharge structure implementation ($0\%$ to $+100\%$)
  4. Low-water crop adoption rate ($0\%$ to $80\%$)
  5. Population growth rate ($0\%$ to $+25\%$)
  6. Industrial water recycling rate ($0\%$ to $60\%$)
- Dynamic recalculated outputs:
  - Water table depth change ($\Delta\text{ meters}$)
  - Net annual deficit reduction ($\%$)
  - Water Security Index change ($+/\-$ points)
  - 5-year trajectory comparison (Baseline vs Simulated).

### 12. Cost-Benefit Analysis (`renderCostBenefit`)
- Economic analysis of recharge and conservation structures:
  - Recharge Well: Capital $\text{₹}12\text{L}$, Maintenance $\text{₹}40\text{k/yr}$, $+8.5\text{ MLD}$, Payback $3.2\text{ yrs}$.
  - Check Dam: Capital $\text{₹}35\text{L}$, Maintenance $\text{₹}1.1\text{L/yr}$, $+22\text{ MLD}$, Payback $4.1\text{ yrs}$.
  - Percolation Pond: Capital $\text{₹}18\text{L}$, Maintenance $\text{₹}60\text{k/yr}$, $+11\text{ MLD}$, Payback $3.6\text{ yrs}$.
  - Rooftop Harvesting Cluster: Capital $\text{₹}6\text{L}$, Maintenance $\text{₹}15\text{k/yr}$, $+3.2\text{ MLD}$, Payback $2.4\text{ yrs}$.
- Net Present Value (NPV), Internal Rate of Return (IRR), and Water Cost per Kilolitre.

### 13. IoT Sensor Network (`renderIoT`)
- Real-time telemetry monitoring table and card grid:
  - `GW-014`: Groundwater Piezometer (Hapur Block A, $32.4\text{ m}$, battery $78\%$, Online)
  - `FM-102`: Ultrasonic Flow Meter (Ghaziabad Stn 3, $1,240\text{ L/min}$, battery $91\%$, Online)
  - `RG-041`: Tipping Bucket Rain Gauge (Meerut Sector 7, $4.2\text{ mm/hr}$, battery $64\%$, Online)
  - `WQ-009`: Water Quality Probe (Aligarh Ward 12, TDS $890\text{ mg/L}$, battery $22\%$, Warning)
  - `GW-027`: Groundwater Piezometer (Bulandshahr Block C, $20.3\text{ m}$, battery $55\%$, Online)
  - `FM-058`: Ultrasonic Flow Meter (Noida Sector 62, battery $0\%$, Offline)
- Battery health, packet arrival latency, alert state.

### 14. Reports & Exports (`renderReports`)
- Report types: District Water Report, Groundwater Report, Water Quality Report, Risk Assessment, Recharge Planning, Annual Water Budget, AI Recommendations.
- Format selection: PDF, Excel (`.xlsx`), CSV.
- Automated email schedule configuration.

### 15. Citizen Portal (`renderCitizen`)
- "My-Area Water Status" search for public citizens.
- Water conservation guide & advisories.
- Citizen Water Grievance / Issue Reporter:
  - Issue type (Borewell dried, Water contamination, Pipeline leak, Illegal extraction, Broken recharge structure)
  - Location / Geotag (GPS auto-detect or manual address)
  - Description and contact number
  - Image upload
  - Issue tracking ticket generator (`JS-XXXX`).

### 16. AI Assistant (`renderAIPage` & Global Chat Panel)
- Conversational RAG system over water data, CGWB guidelines, and CWC bulletins.
- Recommended quick prompt pills.
- Grounded answers with data lineage, confidence score, and recommended administrative action.

### 17. User & Access Management (`renderUsers`)
- User table with Name, Email, Role, Department, Jurisdiction, Status, and Action.
- Invite user modal with role assignment.

### 18. Settings (`renderSettings`)
- Preference toggles: SMS alerts, Email alerts, Auto-sync, Low-bandwidth mode, High-contrast mode.
- Units selection (Metric vs Imperial).
- Language switcher (English, Hindi, Urdu).
- API Key management & webhook endpoints.

---

## 3. Data Entities in the Prototype

| Entity | Attributes in Prototype | Real Production Attributes Needed |
| :--- | :--- | :--- |
| **District** | `name`, `risk`, `level`, `predicted`, `depletion`, `recharge`, `issues`, `recommended`, `path` | `id`, `census_code`, `state_id`, `geom` (MultiPolygon PostGIS), `area_km2`, `population`, `soil_type`, `climate_zone` |
| **Groundwater Observation** | `year`, `actual`, `predicted` | `station_id`, `observed_at` (TIMESTAMPTZ), `metric`, `value` (m bgl), `unit`, `quality_flag`, `source_id`, `ingested_at` |
| **Station / Well** | `id`, `type`, `loc`, `level`, `battery`, `status` | `id`, `code`, `name`, `type` (piezometer, manual dug well, rain gauge, telemetry), `geom` (Point), `depth_m`, `aquifer_type`, `source_id` |
| **Alert** | `sev`, `text`, `time` | `id`, `rule_id`, `severity` (Critical, Warning, Advisory), `title`, `description`, `geom`, `triggered_at`, `status` (Open, Acknowledged, Resolved), `assigned_to` |
| **Recharge Site** | `site`, `suitability`, `structure`, `x`, `y` | `id`, `name`, `district_id`, `geom`, `suitability_score`, `structure_type`, `est_capacity_mld`, `est_cost_inr`, `status` |
| **Water Quality** | `name`, `value`, `unit`, `safe`, `status` | `sample_id`, `station_id`, `sampled_at`, `parameter`, `value`, `unit`, `method`, `bis_limit`, `who_limit`, `wqi_contribution` |
| **Reservoir (Missing in prototype)** | *None* | `id`, `name`, `river_basin`, `full_reservoir_level_m`, `live_capacity_mcm`, `current_storage_mcm`, `fill_pct`, `historical_10yr_avg_mcm`, `inflow_cumec`, `outflow_cumec` |
| **User & RBAC** | `name`, `role`, `email`, `dept` | `id`, `username`, `email`, `password_hash`, `role` (Super Admin, State Admin, District Officer, Field Officer, Analyst, Citizen), `jurisdiction_geom`, `is_active` |
| **Issue Report** | Random `JS-XXXX` | `id`, `ticket_no`, `reporter_phone`, `category`, `description`, `geom`, `photo_url`, `status`, `assigned_officer_id`, `resolved_at` |

---

## 4. User Roles & RBAC Matrix

| Feature / Action | Super Admin | State Admin | District Officer | Field Officer | Analyst | Citizen (Public) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **National / State Dashboard** | Read / Write | Read | Read (Own State) | Read (Own District) | Read | Read (Aggregated) |
| **Live Map & Layers** | Full Access | Full Access | Full Access | Full Access | Full Access | Public Layers |
| **Groundwater & Reservoirs** | Full Access | Full Access | District Scope | District Scope | Read / Export | View Status |
| **ML Forecasts & Explainability** | Retrain / Deploy | View / Audit | View District | View District | Train / Validate | View Predictions |
| **Alerts Management** | Create / Edit Rules | Configure | Acknowledge | Resolve | Analyze | Receive Public Alerts |
| **Citizen Issue Reporting** | Manage All | View State | View District | Field Verification | Trend Analysis | Submit & Track |
| **Field Manual Entry & Sync** | System View | System View | Monitor | **Primary Entry** | Read | No Access |
| **User & Role Management** | **Full Admin** | State Users | District Users | Self Profile | Self Profile | Anonymous / OTP |
| **Public API & Keys** | Create / Revoke | View Keys | Rate-limited | No Access | Read API Key | No Access |

---

## 5. Critical Gaps in Prototype vs Production Specification

1. **Simulated vs Real Data:**
   - *Prototype:* All values are in-memory JS constants with hardcoded numbers.
   - *Production:* Pluggable ingestion framework connecting to real sources (India-WRIS, CGWB, CWC, IMD, CPCB, Open-Meteo). Real data stored with lineage: `source`, `fetched_at`, `observed_at`, `quality_flag`, `raw_payload`.
2. **Provenance & Badging:**
   - *Prototype:* Single top "DEMO MODE" banner for the entire app.
   - *Production:* Replace with per-widget and per-metric badges: `LIVE` (green), `DELAYED` (yellow with latency), `SIMULATED` (orange for what-if scenarios), `STALE` (gray with last-observed timestamp).
3. **Missing Reservoir Module:**
   - *Prototype:* Groundwater only; zero reservoir data.
   - *Production:* Dedicated Reservoir Monitor module integrating CWC weekly bulletins, reservoir storage vs capacity, 10-year averages, and dam inflow/outflow.
4. **Geospatial Capabilities:**
   - *Prototype:* Stylized static SVG path coordinates for 8 NCR districts.
   - *Production:* Real MapLibre GL map with GeoJSON/vector tiles, PostGIS admin boundaries for all India states/districts, point clusters for monitoring stations, and raster overlays.
5. **Machine Learning:**
   - *Prototype:* Naive arithmetic extrapolation (`d.level + d.depletion * yrs`).
   - *Production:* Real ML models (XGBoost, Prophet, LSTM/TFT, Isolation Forest for anomaly detection) with feature store, time-series cross validation, metrics (MAE, RMSE, MAPE), and SHAP explainability.
6. **Real-Time Data Streaming:**
   - *Prototype:* None; static DOM re-rendering.
   - *Production:* TimescaleDB continuous aggregates, Redis pub/sub, WebSocket / SSE real-time gateway with reconnection backoff and polling fallback.
7. **Citizen & Field Officer Workflows:**
   - *Prototype:* Dummy toast on click.
   - *Production:* Mobile-first citizen reporting with geotagging, file upload, status progression; offline-capable PWA field tool for manual well measurements with background sync.
8. **Internationalization & Accessibility:**
   - *Prototype:* English only; standard contrast.
   - *Production:* English, Hindi (हिन्दी), and Urdu (اردو) with RTL support via `next-intl`; WCAG 2.2 AA compliance, color-blind-safe palettes, high-contrast and low-bandwidth toggles.
9. **Security & Governance:**
   - *Prototype:* No auth, no backend.
   - *Production:* JWT/OIDC authentication with RBAC, geographic row-level security, OWASP top 10 protection, rate limiting, and India DPDP compliance.
