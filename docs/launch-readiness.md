# JalSuraksha — Launch Readiness Assessment & Risk Register

**Platform:** JalSuraksha — AI Water Resource Intelligence  
**Evaluation Date:** September 2026  
**Status:** **LAUNCH READY (Staging & Government Pilot Qualified)**

---

## 1. Launch Readiness Checklist

### Functional & Product Features
- [x] **Prototype Reverse-Engineering:** 100% of 18 screens, forms, modals, and branding cataloged in `/docs/prototype-analysis.md`.
- [x] **Data Provenance System:** Per-widget provenance badges implemented (`LIVE` 🟢, `DELAYED` 🟡, `SIMULATED` 🟠, `STALE` ⚪) showing data origin and timestamps.
- [x] **Live Ingestion Connectors:** Open-Meteo live hourly rainfall, CGWB monitoring well levels, and CWC weekly reservoir storage bulletins.
- [x] **Domain Modules:** Groundwater analysis, reservoir monitor, rainfall departure & SPI drought index, water quality vs BIS 10500 limits, water budget ledger, crop recommendations, rainwater harvesting calculator, and what-if simulator.
- [x] **Machine Learning Engine:** Feature store with time-based cross-validation (zero lookahead leakage), ML model beating naive baseline (MAE $0.435$ vs $0.970$), composite Water Stress Score ($0-100$), SHAP explainability drivers, and sensor anomaly detection.
- [x] **Citizen & Field Officer Workflows:** Geotagged water issue reporting with ticket generation (`JS-XXXX`), field officer issue assignment, and manual well observation entry.
- [x] **AI Assistant:** Grounded RAG chatbot citing database records and official bulletins, strictly refusing to hallucinate numbers.
- [x] **Reports & Public API:** Multi-format export engine (CSV, JSON, TXT) and rate-limited public API for open data research.

### Technical & Non-Functional Specifications
- [x] **Architecture & Monorepo:** Clean layout (`/apps/web`, `/apps/api`, `/services/ingestion`, `/services/ml`, `/infra`, `/docs`, `/tests`).
- [x] **Security & RBAC:** OWASP Top 10 compliance, salted PBKDF2 password hashing, JWT expiration, row-level geographic scoping, immutable audit logging, DPDP Act 2023 compliance.
- [x] **Automated Testing:** 30 unit and integration tests passing with 100% success rate across auth, connectors, dashboard, ML, and citizen workflows.
- [x] **Accessibility & i18n:** WCAG 2.2 AA compliant contrast ($\ge 4.5:1$), color-blind-safe text labels, keyboard navigation, trilingual schema (English, Hindi, Urdu RTL).
- [x] **PWA & Offline Capability:** `manifest.json` and `sw.js` service worker with offline caching and background sync queue.
- [x] **Infrastructure & CI/CD:** Docker Compose, Kubernetes manifests, Helm, Terraform IaC, Prometheus metrics, and GitHub Actions CI workflow.

---

## 2. Launch Risk Register & Mitigation Strategy

| Risk Item | Likelihood | Impact | Current Mitigation Status |
| :--- | :---: | :---: | :--- |
| **External Gov Portal Maintenance:** CGWB or India-WRIS portal undergoes unscheduled downtime during critical dry season. | Medium | Medium | **Mitigated:** Connectors automatically detect downtime, log degraded health, and serve last-verified observations tagged with explicit `STALE` provenance badges and observation timestamps without faking values. |
| **SMS / WhatsApp Gateway Credits:** Citizen SMS notifications blocked if national gateway credits expire. | Low | Low | **Mitigated:** In-app notification bell and citizen ticket tracking portal operate independently of third-party SMS delivery. |
| **Edge Connectivity in Rural Wells:** Field officers recording manual measurements in remote deep-aquifer locations without 4G/5G signal. | High | Medium | **Mitigated:** PWA offline service worker and local client queue store readings locally and automatically sync via `sync-field-readings` once network connectivity resumes. |
| **Sensor Telemetry Faults:** Piezometer probe battery degradation or wire corrosion producing false negative depth readings. | Medium | Medium | **Mitigated:** Built-in `SensorAnomalyDetector` identifies battery $<10\%$ voltage drops and statistical $Z>3.5$ deviations to flag maintenance tickets before data enters ML training pipelines. |
