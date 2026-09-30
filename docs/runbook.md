# JalSuraksha — Incident Response, Operations & Disaster Recovery Runbook

---

## 1. Routine Operational Commands

### Launching Services
```bash
# Start full containerized stack:
make up

# Start local dev servers:
make dev-api  # Runs FastAPI on port 8000
make dev-web  # Runs Next.js on port 3000
```

### Ingestion Triggers
```bash
# Execute manual ingestion across all active connectors:
python services/ingestion/pipeline.py
```

### ML Retraining & Feature Store Refresh
```bash
# Retrain forecasters and recompute composite risk scores:
python services/ml/inference.py
```

---

## 2. Incident Response Playbooks

### Playbook 1: Ingestion Connector Failure / Degraded Status
1. **Detection:** Prometheus alert or Admin Console indicates `DataSource.status == 'degraded'`.
2. **Investigation:** Query `/api/v1/admin/ingestion-runs` to inspect `errors_log`.
3. **Action:**
   - If external government portal is down (e.g. CGWB NGWIS maintenance): Verify connector switched gracefully to `STALE` cache fallback with explicit last-observed timestamp.
   - Test connector locally: `pytest tests/unit/test_connectors.py -v`.
   - Never fabricate data. Keep provenance set to `STALE` until external service recovers.

### Playbook 2: Database Backup & Recovery Test
1. **Automated TimescaleDB Dump:**
   ```bash
   docker exec -t jalsuraksha_timescaledb pg_dump -U jalsuraksha -Fc jalsuraksha_db > /backups/jalsuraksha_$(date +%Y%m%d).dump
   ```
2. **Restoration Verification Test:**
   ```bash
   createdb -U jalsuraksha -h localhost jalsuraksha_restore_test
   pg_restore -U jalsuraksha -h localhost -d jalsuraksha_restore_test /backups/jalsuraksha_latest.dump
   ```

### Playbook 3: High Telemetry Latency / Redis Queue Backlog
1. Check Redis queue depth: `docker exec -it jalsuraksha_redis redis-cli llen ingestion_queue`.
2. Scale API replicas: `kubectl scale deployment jalsuraksha-api --replicas=5 -n jalsuraksha`.
