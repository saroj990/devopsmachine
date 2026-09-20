# Capstone: Production-Style Web App

## Goal

Combine containers, Compose, CI, Nginx, HTTPS, cloud concepts, IaC, and monitoring.

## Architecture

```text
                 Internet
                    |
                    v
                  Nginx (TLS)
                    |
         +----------+----------+
         v                     v
    Static / SPA           API service
         |                     |
         +----------+----------+
                    v
              PostgreSQL
```

## Steps

1. **App:** Containerize frontend and API (or monolith + static).
2. **Compose:** Run app + database locally with env vars and volumes.
3. **CI:** GitHub Actions — lint, test, build image on push.
4. **Proxy:** Nginx routes `/` and `/api`; terminate TLS in prod.
5. **Cloud (optional):** Deploy to a VM or PaaS; security groups / firewall allow 80/443.
6. **IaC (optional):** Terraform module for bucket, DNS, or firewall rule.
7. **Monitor:** Health endpoint, basic metrics or uptime check, log aggregation habit.

## Expected result

- One command (`docker compose up` or deploy script) brings up the stack.
- CI badge green on main.
- HTTPS URL loads the app; `/api/health` returns OK.
- You can explain what to check when error rate spikes.

## Break it

CI passes but production is down — deploy not wired to CI artifact.

## Fix it

Pipeline promotes the same image digest tested in CI; smoke test after deploy.

## Checkpoint

You delivered an integrated intermediate project and can demo the full path from commit to browser.

## Next

Expert track (Kubernetes and beyond) — coming soon.
