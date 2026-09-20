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
