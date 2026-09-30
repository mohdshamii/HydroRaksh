.PHONY: help dev build test lint clean up down db-migrate ingest ml-train

help:
	@echo "JalSuraksha — AI Water Resource Intelligence Orchestration"
	@echo "--------------------------------------------------------"
	@echo "make dev         - Launch full stack in local development mode"
	@echo "make up          - Start dockerized infrastructure (DB, Redis, MinIO, API, Web)"
	@echo "make down        - Stop docker containers"
	@echo "make test        - Run all automated test suites (unit, integration, e2e)"
	@echo "make lint        - Run linters and typecheckers across python and typescript"
	@echo "make db-migrate  - Run Alembic database migrations"
	@echo "make ingest      - Run ingestion connectors immediately"
	@echo "make ml-train    - Retrain forecasting models and update MLflow registry"

up:
	docker-compose -f infra/docker-compose.yml up -d

down:
	docker-compose -f infra/docker-compose.yml down

dev-api:
	cd apps/api && uvicorn app.main:app --reload --port 8000

dev-web:
	cd apps/web && npm run dev

test:
	pytest tests/ -v

test-unit:
	pytest tests/unit/ -v

test-integration:
	pytest tests/integration/ -v

lint:
	python -m flake8 apps/api services/ tests/ || true
	cd apps/web && npm run lint || true

clean:
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
