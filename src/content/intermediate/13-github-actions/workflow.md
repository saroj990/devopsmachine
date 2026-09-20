# Your First CI Workflow

## Goal

Create a GitHub Actions workflow that runs on every push.

## Concept

- **Workflow:** YAML file in `.github/workflows/`
- **Job:** runs on a **runner**
- **Step:** shell command or action
- **Secrets:** encrypted variables for tokens

## Try it

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "22"
      - run: npm ci
      - run: npm test
```

## Hands-on lab

Add a job that runs `npm run build`. Fail the workflow if build fails.

## Break it

Workflow never runs — wrong branch filter or invalid YAML.

## Fix it

Use Actions tab logs; validate YAML indentation and `on:` triggers.

## Checkpoint

You can explain workflow, job, step, and where secrets belong.

## Next

**Reverse Proxy & Upstreams (Nginx)**
