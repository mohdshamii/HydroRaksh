# Data Sources, Licensing & Terms of Use

JalSuraksha adheres strictly to ethical data harvesting, open government standards, and respectful automated collection policies.

---

## 1. Open-Meteo Weather & Precipitation API
- **Endpoint:** `https://api.open-meteo.com/v1/forecast`
- **Licensing:** Open-Meteo is open-source and free for non-commercial and public-service use under Attribution 4.0 International (CC BY 4.0).
- **Terms:** Rate limits respected ($<10,000$ calls/day). Exponential backoff implemented.
- **Data Extracted:** Hourly precipitation, rain sum (mm), soil moisture ($0-7\text{cm}$ and $7-28\text{cm}$).

---

## 2. Central Ground Water Board (CGWB)
- **Authority:** Ministry of Jal Shakti, Department of Water Resources, RD & GR, Government of India.
- **Portals:** `cgwb.gov.in`, National Ground Water Information System (NGWIS).
- **Licensing & Policy:** National Water Data Policy & National Data Sharing and Accessibility Policy (NDSAP) of India.
- **Ingestion Strategy:** Automated quarterly monitoring bulletin ingestion and block-wise assessment (Safe, Semi-critical, Critical, Over-exploited).
- **Lineage:** Records station code, state, district, block, water table depth (meters below ground level - $m\text{ bgl}$), pre-monsoon and post-monsoon dates.

---

## 3. Central Water Commission (CWC)
- **Authority:** Ministry of Jal Shakti, Government of India.
- **Data:** Weekly National Reservoir Storage Bulletins across 150 major monitored reservoirs.
- **Licensing:** Public Information Disclosure / NDSAP.
- **Lineage:** Live storage (Billion Cubic Metres / Million Cubic Metres - MCM), percentage of capacity, comparison with 10-year historical average.

---

## 4. India-WRIS (Water Resources Information System)
- **Portal:** `indiawris.gov.in`
- **Collaboration:** Ministry of Jal Shakti & ISRO.
- **Policy:** Open access for water researchers, administrators, and citizens.
- **Ingestion Strategy:** Automated telemetry ingestion with rate limiting ($1\text{ req/sec}$ max) and local caching to protect government server bandwidth.

---

## 5. Quality Flagging Specification
Every ingested record is assigned an immutable quality flag:
- `good`: Verified within plausible physical ranges and passes spatial/temporal consistency checks.
- `suspect`: Value deviates $>3\sigma$ from rolling 30-day baseline or indicates rapid uncharacteristic sensor jump.
- `rejected`: Physically impossible value (e.g., negative rainfall, water depth $>300\text{ m}$ in alluvial plains, $\text{pH} < 0$ or $> 14$). Stored with rejected flag for audit, excluded from ML training and risk scores.
