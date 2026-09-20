# Pipeline Concepts

## Goal

Map the CI/CD pipeline from commit to production.

## Concept

```text
Git push → Build → Test → Package → Deploy
```

- **CI:** integrate often; automated build + test
- **CD:** keep releasable; deploy with automation or approval

## Mental model

```mermaid
flowchart LR
  Dev[Developer] --> Git[Git]
  Git --> CI[CI]
  CI --> Art[Artifact]
  Art --> Dep[Deploy]
  Dep --> Mon[Monitor]
```

## Hands-on commands

Model pipeline stages as a script:

```bash
cat > /tmp/pipeline.sh << 'EOF'
#!/bin/bash
set -e
echo "[1/4] Build"; sleep 1
echo "[2/4] Test"; npm test 2>/dev/null || echo "  (skip if no package.json)"
echo "[3/4] Package"; echo "artifact=app.tar.gz"
echo "[4/4] Deploy (dry-run)"; echo "Would deploy to staging"
EOF
chmod +x /tmp/pipeline.sh
/tmp/pipeline.sh
echo "Pipeline exit: $?"
```

## Hands-on lab

On paper, draw your team’s pipeline. Mark manual steps to automate first.

## Break it

Deploy succeeds but tests were skipped — regressions reach users.

## Fix it

Make test stage mandatory; fail pipeline on red builds.

## Checkpoint

Define CI vs CD and name four pipeline stages.

## Next

**Your First CI Workflow (GitHub Actions)**
