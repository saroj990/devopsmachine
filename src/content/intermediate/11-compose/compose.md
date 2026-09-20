# Multi-Container Apps

## Goal

Define app + database with Docker Compose.

## Concept

Compose orchestrates **services**, **networks**, and **volumes** in one YAML file.

```mermaid
flowchart LR
  C[Compose] --> A[App service]
  C --> D[Postgres service]
  A --- N[Network] --- D
```

## Try it

```yaml
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://user:pass@db:5432/app
    depends_on:
      - db
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: pass
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

```bash
docker compose up -d
docker compose ps
```

## Hands-on lab

Add a healthcheck to `db` and confirm `app` starts after DB is ready.

## Break it

App cannot connect — using `localhost` instead of service name `db`.

## Fix it

Use the **service name** as hostname on the Compose network.

## Checkpoint

You can run two services, persist data, and read `docker compose logs`.

## Next

**Pipeline Concepts (CI/CD)**
