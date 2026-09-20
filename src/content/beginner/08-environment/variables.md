---
id: env-variables
title: Config, Secrets & .env
---

# Config, Secrets & .env

## Goal

Configure applications with environment variables and handle secrets safely.

## Concept

**Environment variables** are key/value pairs inherited by processes. Apps read them for ports, database URLs, and feature flags.

A **`.env` file** loads local config; it must stay **out of Git**. **Secrets** belong in vaults or platform secret stores in production.

## Why does this exist?

Same artifact should run in dev, staging, and prod with **different config** — not different code.

## Mental model

```mermaid
flowchart LR
  Code[Application code] --> Read[Read env]
  Dev[.env.development] --> Read
  Prod[Secret manager] --> Read
```

## Real-world example

`DATABASE_URL` points to a local Postgres in dev and a managed instance in production.

## Try it

```bash
export APP_ENV=development
echo $APP_ENV
APP_PORT=8080 node -e 'console.log(process.env.APP_PORT)'
```

## Hands-on commands

```bash
mkdir -p ~/devops-lab/config && cd ~/devops-lab
cat > config/app.env.example << 'EOF'
APP_ENV=development
APP_PORT=8080
EOF
cp config/app.env.example config/app.env
grep -q 'config/app.env' .gitignore 2>/dev/null || echo "config/app.env" >> .gitignore
set -a && source config/app.env && set +a
echo "Running as APP_ENV=$APP_ENV on port $APP_PORT"
APP_ENV=production bash -c 'echo "Simulated prod: APP_ENV=$APP_ENV"'
env | grep -E '^APP_' || true
```

## Hands-on lab

**Objective:** Two configurations.

1. Create `config/app.env.example` with keys `APP_ENV` and `APP_PORT` (no real secrets).
2. Copy to `config/app.env` locally and set dev values.
3. Add `config/app.env` to `.gitignore`.

**Challenge:** Run a one-liner that prints different messages when `APP_ENV=production` vs `development`.

## Break it

Commit `app.env` with a real API key to a public repo.

## Fix it

Rotate the secret, remove from history if possible, use ignores and pre-commit checks going forward.

## Common mistakes

- Logging environment variables in production.
- Using `export` in scripts without documenting required vars.
- Treating example files as optional when onboarding new devs.

## Checkpoint

You can export vars, explain why `.env` is gitignored, and separate config per environment.

## Next

**Capstone: Simple Linux Web Server**
