# 💧 JalSuraksha — AI Water Resource Intelligence

> *"Predict • Protect • Preserve"*  
> National & State Real-Time Water Resource Management, ML-Driven Forecasting & Citizen Decision Support Platform for India.

---

## 🌟 Overview

**JalSuraksha** replaces static simulations with an authoritative, production-grade geospatial intelligence platform that aggregates live and scheduled groundwater, reservoir, rainfall, and water quality telemetry across India (India-WRIS, CGWB, CWC, IMD, CPCB, Open-Meteo).

### Key Capabilities
- **Multi-Level Intelligence:** National $\to$ State $\to$ District $\to$ Block $\to$ Village drill-down with PostGIS geometries.
- **Data Provenance System:** Per-widget badging (`LIVE` 🟢, `DELAYED` 🟡, `SIMULATED` 🟠, `STALE` ⚪) showing data origin, ingestion timestamp, and sensor quality flags.
- **Machine Learning Forecasting:** Time-series projection models (XGBoost, Prophet, TFT) predicting groundwater depletion, drought risk, and storage depletion with SHAP explainability.
- **Real-Time Streaming:** Sub-second telemetry broadcast to browsers via TimescaleDB, Redis Pub/Sub, and WebSocket/SSE.
- **Field & Citizen Tools:** Geotagged issue reporting with photo upload for citizens, and an offline-first PWA for field officers recording manual well measurements.
- **Grounded AI Assistant:** Tool-calling LLM RAG engine answering queries grounded in real database observations, CGWB data, and CWC bulletins.

---

## 🏗️ Monorepo Architecture

```
JalSuraksha/
├── apps/
│   ├── api/                     # FastAPI (Python 3.10+) REST and WebSocket Gateway
│   │   ├── app/
│   │   │   ├── api/v1/          # Endpoints: auth, telemetry, forecasts, optimization
│   │   │   │   └── jalrakshak.py# JalRakshak decision-support router
│   │   │   ├── core/            # Configuration, security, database connectors
│   │   │   ├── models/          # SQLAlchemy and PostGIS spatial entities
│   │   │   ├── schemas/         # Pydantic validation schemas
│   │   │   └── services/        # Business logic, ML inference, Knapsack optimizer
│   │   └── requirements.txt
│   └── web/                     # Next.js 15 (React 19) App Router Frontend
│       ├── src/
│       │   ├── app/             # Layouts, routing, and global CSS variable tokens
│       │   ├── components/
│       │   │   ├── atlas/       # Map canvas, continuous time slider, layer controls
│       │   │   └── jalrakshak/  # 14 decision-support tool modals and components
│       │   ├── data/            # 75-district hydrological dataset (2000-2035)
│       │   └── lib/             # API client, color tokens, formatters
│       ├── tailwind.config.ts   # Dynamic light and dark theme variable configuration
│       └── package.json
├── img/                         # Architectural diagrams and high-resolution UI captures
├── docs/                        # IEEE research paper, specifications, runbooks
├── tests/                       # Unit, integration, and ML verification test suites
├── docker-compose.yml           # Containerized orchestration (TimescaleDB, Redis, MinIO)
└── README.md                    # System documentation
```

---

## 🚀 Quickstart

### Prerequisites
- Python 3.10+ (Python 3.12 recommended)
- Node.js 20+ (Node.js 22 recommended)
- Docker & Docker Compose (for full containerized stack)

### 1. Clone & Configure Environment
```bash
git clone https://github.com/mohdshamii/JalSuraksha.git
cd JalSuraksha
cp .env.example .env
```

### 7.3 Backend Setup (FastAPI)

```bash
cd apps/api
python -m venv .venv

# On Linux / macOS:
source .venv/bin/activate
# On Windows (PowerShell):
.venv\Scripts\Activate.ps1

pip install --upgrade pip
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Launch local backend server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The interactive OpenAPI documentation will be accessible at `http://localhost:8000/docs`.

### 7.4 Frontend Setup (Next.js 15)

```bash
cd apps/web
npm install

# Run static type verification
npx tsc --noEmit

# Run local development server
npm run dev
```

The application will be accessible at `http://localhost:3000`.

### 7.5 Running the Automated Test Suite

```bash
# Run backend pytest suite across all modules (auth, connectors, ML, jalrakshak)
pytest tests/unit/ -v

# Run frontend build verification
cd apps/web && npm run build
```

---

## 8. API Reference and Data Contracts

JalSuraksha exposes high-performance REST and WebSocket endpoints under `/api/v1/jalrakshak`:

### 8.1 Key Endpoints

- `GET /api/v1/jalrakshak/forecast/{district_id}`: Retrieves 3, 6, and 12-month groundwater level predictions with confidence intervals and SHAP feature drivers.
- `POST /api/v1/jalrakshak/recharge/recommend`: Evaluates district terrain parameters and returns ranked engineering recharge structures with estimated costs and capacities.
- `POST /api/v1/jalrakshak/budget/optimize`: Executes the knapsack algorithm to maximize annual recharge volume under a specified capital ceiling.
- `POST /api/v1/jalrakshak/simulate/whatif`: Simulates aquifer response to precipitation, extraction, and demand shifts.
- `POST /api/v1/jalrakshak/rwh/calculate`: Calculates rooftop rainwater yield, recommended storage volume, and financial payback.
- `GET /api/v1/jalrakshak/quality/screen/{district_id}`: Evaluates water quality against BIS 10500 standards and returns parameters of concern.
- `POST /api/v1/jalrakshak/iot/telemetry`: Ingests live sensor readings from ESP32 edge nodes and triggers automated anomaly alerts.
- `GET /api/v1/jalrakshak/iot/readings`: Retrieves real-time buffer of active IoT sensor transmissions.

### 8.2 IoT Sensor Ingestion Payload Schema

```json
{
  "device_id": "ESP32-AGRA-01",
  "district_id": "agra",
  "sensor_type": "water_level_ultrasonic",
  "reading_value": 27.65,
  "unit": "m_bgl",
  "battery_pct": 98.5,
  "timestamp": "2026-10-01T12:00:00Z"
}
```

---

## 9. Production Deployment and Observability

JalSuraksha supports containerized deployment using Docker Compose, Helm charts, and Terraform infrastructure-as-code manifests located in `/infra`:

```bash
# Production launch using Docker Compose
docker compose -f docker-compose.prod.yml up -d --build
```

### Telemetry and Observability Stack
- **Prometheus**: Scrapes operational metrics from `/metrics` endpoints across API gateways and background workers.
- **Grafana**: Pre-configured dashboards tracking telemetry event throughput, ML inference latency, and TimescaleDB hypertable compression ratios.
- **Loki and Promtail**: Centralized log aggregation for system audit trails and error logging.
- **Health Checks**: Automated liveness and readiness probes configured for Kubernetes container orchestration.

---

## 10. References and Citation

If you use JalSuraksha in your academic research, environmental planning projects, or civil decision-support systems, please cite the research monograph:

```bibtex
@article{shami2026jalsuraksha,
  title={JalSuraksha: Collaborative Filtering and Latent Topic Analysis for AI-Driven Groundwater Intelligence and Water Resource Decision Support},
  author={Shami, Mohd and Malik, Aman},
  journal={Department of Computer Science & Engineering (Data Science + AI), JalSuraksha Research Initiative},
  year={2026},
  institution={Government of India and Uttar Pradesh Ground Water Department},
  url={https://github.com/mohdshamii/JalSuraksha}
}
```

### Additional Academic References
1. Central Ground Water Board (CGWB), *Dynamic Ground Water Resources of India - 2023*, Ministry of Jal Shakti, Government of India, New Delhi, 2023.
2. V. M. Tiwari, B. Wahr, and S. Swenson, "Dwindling groundwater resources in northern India, from satellite gravity observations," *Geophysical Research Letters*, vol. 36, no. 18, pp. 1-5, 2009.
3. M. Rodell, I. Velicogna, and J. S. Famiglietti, "Satellite-based estimates of groundwater depletion in India," *Nature*, vol. 460, no. 7258, pp. 999-1002, 2009.
4. Y. Koren, R. Bell, and C. Volinsky, "Matrix factorization techniques for recommender systems," *Computer*, vol. 42, no. 8, pp. 30-37, Aug. 2009.
5. D. M. Blei, A. Y. Ng, and M. I. Jordan, "Latent Dirichlet Allocation," *Journal of Machine Learning Research*, vol. 3, pp. 993-1022, Jan. 2003.
6. Bureau of Indian Standards (BIS), *Indian Standard Drinking Water - Specification (Second Revision of IS 10500)*, Manak Bhavan, New Delhi, 2012.

---

**JalSuraksha Research Initiative**  
Department of Computer Science & Engineering (Data Science + Artificial Intelligence)  
Greater Noida, Uttar Pradesh, India.
