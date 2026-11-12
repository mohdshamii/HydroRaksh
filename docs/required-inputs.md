# JalSuraksha — Environment Variables & External Integration Configuration

**Platform:** JalSuraksha — National AI Groundwater Intelligence & Decision-Support System  
**Design Philosophy:** **Zero-Blocker Autonomous Architecture**  

---

## 1. Zero-Blocker Architecture Overview

JalSuraksha is designed to run **completely autonomously and offline out of the box** without requiring any third-party paid API keys, external cloud accounts, or remote network dependencies.

- **Empirical Government Data:** Over **1,400,000 empirical observations** (CGWB groundwater levels 1991–2025, CGWB water quality chemical assays, IMD rainfall records, NAQUIM aquifer attributes, and Survey of India district boundaries) are pre-indexed locally in `data/` and cached in `data/cache/`.
- **Database Fallback:** If PostgreSQL or TimescaleDB is not configured or reachable, the platform automatically falls back to an embedded SQLite database (`jalsuraksha_local.db`) with identical schemas and seeded records.
- **AI Copilot Fallback:** The conversational AI assistant includes a deterministic hydrogeological retrieval-augmented response engine that answers questions using local database tables, BIS 10500 standards, and CGWB bulletins when no external LLM API key is present.

---

## 2. Environment Variables Specification (`.env`)

For enterprise cloud deployment, live national single sign-on, and scheduled automated updates, the following optional parameters can be configured:

### A. Core Database & Caching
| Variable Name | Required? | Default / Fallback | Description |
| :--- | :---: | :--- | :--- |
| `DATABASE_URL` | Optional | `sqlite:///jalsuraksha_local.db` | PostgreSQL / TimescaleDB connection string (e.g., `postgresql://user:pass@localhost:5432/jalsuraksha_db`). |
| `REDIS_URL` | Optional | `redis://localhost:6379/0` (In-memory if missing) | Redis connection URL for real-time WebSocket telemetry pub/sub broadcast. |
| `CACHE_DIR` | Optional | `data/cache` | Directory where pre-indexed empirical hydrology cache files reside. |

---

### B. Enterprise Authentication & Single Sign-On (SSO)
| Variable Name | Required? | Default / Fallback | Description |
| :--- | :---: | :--- | :--- |
| `SECRET_KEY` | Optional | Auto-generated secure random string | Secret key for signing local session JWT tokens (HS256). |
| `AUTH_STORAGE_MODE` | Optional | `json` (or `db`) | Switches between local JSON user store (`data/private/users.json`) and relational DB. |
| `SUPABASE_URL` | Optional | None (Local fallback active) | Supabase project URL for hosted PostgreSQL and managed authentication. |
| `SUPABASE_KEY` | Optional | None | Supabase public anonymous API key for client-side authentication. |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | None | Supabase privileged service key for administrative user management. |
| `GOOGLE_CLIENT_ID` | Optional | None (Fallback notification) | Google Cloud OAuth 2.0 Client ID for institutional government single sign-on. |
| `GOOGLE_CLIENT_SECRET` | Optional | None | Google Cloud OAuth 2.0 Client Secret. |

---

### C. Live National Data Portals & APIs
| Variable Name | Required? | Default / Fallback | Description |
| :--- | :---: | :--- | :--- |
| `DATA_GOV_IN_API_KEY` | Optional | Local CGWB CSV files | API key for querying Open Government Data (OGD) Platform India (`data.gov.in`). |
| `IMD_API_KEY` | Optional | Open-Meteo & Local IMD CSVs | India Meteorological Department official weather API key. |
| `INDIA_WRIS_TOKEN` | Optional | Local CGWB historical levels | National Water Informatics Centre API token for live DWLR piezometer telemetry. |
| `CPCB_API_KEY` | Optional | Local Water Quality CSVs | Central Pollution Control Board water quality station feed. |

---

### D. Conversational AI Assistant (LLM)
| Variable Name | Required? | Default / Fallback | Description |
| :--- | :---: | :--- | :--- |
| `GEMINI_API_KEY` | Optional | Local Hydrogeological RAG | Google Gemini API key for enhanced natural language synthesis and report summarization. |
| `OPENAI_API_KEY` | Optional | Local Hydrogeological RAG | OpenAI API key for alternative LLM provider. |

---

## 3. Sample Development `.env` Template

```ini
# --- Application Environment ---
ENVIRONMENT=development
FLASK_APP=apps.flask_app:create_app
FLASK_DEBUG=1
PORT=5000

# --- Database & Storage ---
# Leave commented to automatically use zero-setup local SQLite
# DATABASE_URL=postgresql://jalsuraksha:jalsuraksha@localhost:5432/jalsuraksha_db
AUTH_STORAGE_MODE=json

# --- Security ---
SECRET_KEY=jalsuraksha-national-secret-key-change-in-production-2026

# --- Optional Third-Party Credentials ---
# GEMINI_API_KEY=your_gemini_api_key_here
# GOOGLE_CLIENT_ID=your_google_client_id_here
```
