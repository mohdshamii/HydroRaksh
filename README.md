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
│   ├── api/             # FastAPI (Python 3.12) REST & WebSocket Gateway
│   └── web/             # Next.js 15 (React 19) App Router, MapLibre GL, Tailwind
├── services/
│   ├── ingestion/       # Pluggable connectors (India-WRIS, CGWB, CWC, IMD, Open-Meteo)
│   └── ml/              # Forecasting models, feature store, anomaly detection & SHAP
├── infra/               # Docker Compose, Kubernetes Helm, Terraform IaC
├── docs/                # Architecture specifications, prototype audit, required inputs
├── tests/               # Unit, integration, contract, and E2E test suites
├── Makefile             # Unified developer workflow targets
└── docker-compose.yml   # Multi-container orchestration
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

### 2. Launch Local Development Services
```bash
# Launch TimescaleDB, Redis, MinIO, API & Web via Docker:
make up

# Or launch services locally without containers:
# Terminal 1: Backend API
cd apps/api && uvicorn app.main:app --reload --port 8000

# Terminal 2: Frontend Web
cd apps/web && npm run dev
```

### 3. Run Ingestion Pipeline
```bash
python services/ingestion/pipeline.py
```

### 4. Run Automated Test Suite
```bash
make test
```

---

## 🛡️ License & Attribution
Developed for the National Water Informatics and Water Resources Departments of India.  
Open-source under the Apache 2.0 License.
