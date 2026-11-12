# JalSuraksha — Operational Runbook & Production Administration

**Platform:** JalSuraksha — National AI Groundwater Intelligence & Decision-Support System  
**Architecture:** Flask Production Web Interface (Port 5000) • FastAPI Microservice (Port 8000) • TimescaleDB / SQLite Dual Storage • Pre-Indexed Empirical Telemetry Cache  
**Status:** Operational — Production Grade  

---

## 1. Routine Operational Commands

### A. Launching Applications

#### 1. Launch Primary Government Web Intelligence Portal (Flask)
```bash
# Starts the public-facing india.gov.in-styled intelligence portal
python run_flask.py
```
- **Default Port:** `http://localhost:5000`
- **Key Routes:**
  - National Geospatial Water Atlas: `/`
  - Super Intelligence Lab (ML Studio): `/lab`
  - Pan-India Telemetry APIs: `/api/v1/water-levels`, `/api/v1/water-quality`, `/api/v1/rainfall`
  - Decision-Support Suite: `/api/v1/jalrakshak/*`
  - RBAC Single Sign-On: `/api/v1/auth/*`

#### 2. Launch High-Throughput REST API Microservice (FastAPI)
```bash
# Starts the asynchronous OpenAPI / Swagger microservice
uvicorn apps.api.app.main:app --port 8000 --reload
```
- **Default Port:** `http://localhost:8000`
- **Interactive Documentation:** `http://localhost:8000/docs` (Swagger UI) and `http://localhost:8000/redoc`

#### 3. Containerized Full Stack (Docker Compose)
```bash
# Spins up TimescaleDB, Redis telemetry bus, FastAPI, and Flask reverse proxy
make up
# Or:
docker-compose up -d
```

---

### B. Empirical Data Ingestion & Cache Management

The platform operates against **1,400,000+ empirical government observations** from CGWB, IMD, and Survey of India:

```bash
# Rebuild or refresh the persistent empirical telemetry cache:
python services/real_data_service.py
```
This script reads from `data/`:
1. `data/CGWG/*.csv`: **1,152,078 groundwater observations** across 54 state files (1991–2025).
2. `data/Ground Water Quality/*.csv`: **185,660 chemical assays** across 33 state files evaluated against **BIS 10500:2012** limits.
3. `data/Rainfall District wise Daily/*.csv`: **61,834 IMD rainfall records** across 728 districts.
4. `data/Aquifire Spread Data/Major_Principal_Aquifer.dbf`: **43 Major & Principal Aquifer systems**.
5. `data/District Boundaries/district_nwic.GeoJSON`: **733 Survey of India authentic administrative boundary paths** normalized to SVG paths.

**Generated Cache Outputs:**
- `data/cache/real_hydrology_cache.json`: Indexed district-level metrics for millisecond runtime load.
- `data/cache/state_svg_boundaries.json`: Pre-projected SVG boundary paths (2.1 MB) eliminating synthetic Voronoi straight lines.

---

### C. Automated Testing & Verification

Execute the complete test suite covering authentication, RBAC, real empirical data pipelines, ML forecasters, Flask blueprints, and decision tools:

```bash
# Execute full unit test suite (111 tests):
pytest tests/unit

# Execute with detailed test execution verbose output:
pytest tests/unit -v

# Run targeted real data integration tests:
pytest tests/unit/test_real_data_integration.py -v
```

---

### D. Machine Learning & Model Pipelines

```bash
# Execute end-to-end ML model retraining & feature store generation:
python services/ml/inference.py

# Run Hydro-Geological Collaborative Filtering (HG-CF) recommendation:
python -c "from services.ml.models.hg_cf import HydroGeologicalCollaborativeFiltering; cf = HydroGeologicalCollaborativeFiltering(); print(cf.recommend('varanasi'))"
```

---

## 2. Incident Response Playbooks

### Playbook 1: Cache Invalidation & Telemetry Resynchronization
- **Symptom:** District telemetry counts or water quality metrics do not reflect newly added CSV files in `data/`.
- **Diagnostic:** Inspect `data/cache/real_hydrology_cache.json` modification date.
- **Remediation:**
  1. Remove stale cache file:
     ```bash
     rm data/cache/real_hydrology_cache.json
     ```
  2. Re-run ingestion engine:
     ```bash
     python services/real_data_service.py
     ```
  3. Restart Flask / FastAPI services to re-load in-memory structures.

---

### Playbook 2: Database Connection Fallback (PostgreSQL to SQLite)
- **Symptom:** PostgreSQL / TimescaleDB is unreachable during local evaluation or network partition.
- **Architecture Defense:** Both Flask and FastAPI implement an automated graceful fallback to `sqlite:///jalsuraksha_local.db` if `psycopg2` is missing or PostgreSQL connection times out.
- **Verification:**
  ```python
  from app.core.database import get_db
  # Automatically returns operational SQLite session with seeded schemas
  ```

---

### Playbook 3: User Authentication & Role Lockout
- **Symptom:** Administrative or Scientist user locked out or credentials need reset.
- **Remediation:**
  The platform utilizes a dual-store authentication engine (JSON User Store `data/private/users.json` and Relational Database):
  - Pre-configured emergency testing accounts:
    - **Citizen / Public Analyst:** `citizen@jalsuraksha.nic.in` (Password: `Citizen123!`, Role: `public_user`)
    - **Hydro-Scientist:** `scientist@cgwb.gov.in` (Password: `Scientist123!`, Role: `scientist`)
    - **Board Administrator:** `admin@jalshakti.gov.in` (Password: `Admin123!`, Role: `admin`)
  - Inspect users in JSON store:
    ```python
    from app.core.json_user_store import JsonUserStore
    print(JsonUserStore.list_users())
    ```

---

### Playbook 4: Boundary Polygon Alignment & GeoJSON Verification
- **Symptom:** District map boundary fails to render or exhibits projection distortion.
- **Diagnostic:** Survey of India boundaries originate from `district_nwic.GeoJSON` (EPSG:7755 - India LCC in meters).
- **Remediation:**
  Ensure `data/cache/state_svg_boundaries.json` is generated using min/max bounding box state normalization in `services/real_data_service.py`. This ensures responsive SVG viewports without requiring heavy client-side GIS projection libraries.
