# Metrics, Logs & Alerts

## Goal

Monitor latency, errors, traffic, and saturation; tie logs to incidents.

## Concept

**Golden signals:** Latency, Traffic, Errors, Saturation.

- **Metrics:** time-series numbers (CPU, RPS, 5xx rate)
- **Logs:** discrete events (request ID, stack traces)
- **Traces:** request path across services (intro level)

## Try it

On a Linux host:

```bash
docker stats
journalctl -u nginx -n 20 --no-pager
```

## Hands-on lab

Define one SLO (e.g. 99% requests < 500ms). Pick one metric and one log line to prove it.

## Break it

Alert fires constantly — threshold too low (noise).

## Fix it

Tune thresholds; use burn rates; document runbooks.

## Checkpoint

List golden signals and when to use metrics vs logs.

## Next

**Capstone: Production-Style Web App**
