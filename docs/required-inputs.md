# JalSuraksha — Required External Inputs & Credentials

The platform is designed to run completely autonomously with local defaults, mock fallbacks, and free public APIs (e.g. Open-Meteo, public Open Data portals). However, for full production deployment to government cloud environments and official live channels, the following external credentials and resources can be provided via environment variables (`.env`):

---

## 1. Optional Government & Data Portal API Keys

| Parameter Name | Target Integration | Description | Default Fallback if Absent |
| :--- | :--- | :--- | :--- |
| `DATA_GOV_IN_API_KEY` | data.gov.in (OGD Platform India) | API key for automated querying of national open water datasets | Fallback to cached Open Data fixtures and direct web queries |
| `IMD_API_KEY` / `AWS_IMD_KEY` | India Meteorological Department | Official district gridded rainfall & weather alert endpoints | Open-Meteo API (free, global high-res weather & historical rainfall) |
| `INDIA_WRIS_TOKEN` | India-WRIS (National Water Informatics) | Live API token for real-time well piezometer & telemetry telemetry | Automated respectful scraper with rate limiting and local SQLite/Postgres cache |
| `CPCB_AQI_WQI_KEY` | Central Pollution Control Board | Live river & groundwater quality monitoring station feeds | National Water Quality bulletin fixtures and state PCB feeds |

---

## 2. Notification & Communication Gateway Credentials

| Parameter Name | Service | Purpose | Fallback if Absent |
| :--- | :--- | :--- | :--- |
| `SMS_GATEWAY_URL` / `SMS_API_KEY` | C-DAC Mobile Seva / Twilio | SMS notifications for critical drought/flood warnings to rural citizens | In-app notification bell & mock SMS log console |
| `WHATSAPP_TOKEN` / `WHATSAPP_PHONE_ID` | WhatsApp Cloud API | WhatsApp advisories and citizen chatbot | In-app notifications & citizen web portal |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` | Mail Server (Gov NIC Mail or SendGrid) | Scheduled PDF district water reports & alert emails | Local file export download directly in browser |

---

## 3. Production Cloud & Infrastructure

| Parameter Name | Target Deployment | Purpose |
| :--- | :--- | :--- |
| `CLOUD_PROVIDER` | AWS / Azure / MeghRaj (NIC Cloud) | Target cloud platform for Kubernetes & Terraform |
| `DOMAIN_NAME` | e.g. `jalsuraksha.gov.in` | Base domain for SSL certificates (Let's Encrypt / Cert-Manager) |
| `SENTRY_DSN` | Sentry Error Tracking | Centralized application exception & performance monitoring |
| `OPENAI_API_KEY` or `GEMINI_API_KEY` | LLM Provider | AI Assistant RAG pipeline (FastAPI local RAG fallback included) |

---

## 4. Immediate Development Status

> [!NOTE]
> **Zero Blocker Architecture:** No external API key is strictly required to run and test the complete platform locally. Every connector implements a triple-tier resolution strategy:
> 1. Official live API (if key present in `.env`)
> 2. Respectful public fetch / Open-Meteo live API (no key required)
> 3. Verified offline fixture with real data provenance and explicit `STALE` / `SIMULATED` badging.
