---
id: shell-scripting
title: Variables, Loops & Scripts
---

# Variables, Loops & Scripts

## Goal

Write Bash scripts with variables, conditions, loops, functions, and meaningful exit codes.

## Concept

The **shell** runs commands. Scripts start with a **shebang** (`#!/bin/bash`). **Variables** store values; **$1**, **$2** are arguments. **Exit code 0** means success.

## Why does this exist?

Deploys, backups, and health checks repeat the same steps — scripts encode that reliably.

## Mental model

```text
script.sh
  ├── read args / env
  ├── if / loop
  ├── run commands
  └── exit 0 or 1
```

## Real-world example

`deploy.sh` pulls Git, runs tests, restarts systemd unit — same every release.

## Try it

```bash
#!/bin/bash
NAME=$1
echo "Hello $NAME"
```

Save as `hello.sh`, `chmod +x hello.sh`, run `./hello.sh DevOps`.

## Hands-on lab

**Objective:** Build `backup.sh`.

1. Create `backup.sh` that accepts a source file path.
2. Create `backups/` if missing.
3. Copy the file into `backups/` with a timestamp in the filename.
4. Print success or failure; exit non-zero on failure.

Example structure:

```bash
#!/bin/bash
set -e
SRC=$1
DEST_DIR="backups"
mkdir -p "$DEST_DIR"
cp "$SRC" "$DEST_DIR/$(basename "$SRC").$(date +%Y%m%d%H%M%S)"
echo "Backup OK"
```

## Break it

Run without arguments — script copies wrong path or fails oddly.

## Fix it

Check `$#` or test `-z "$1"` and print usage before doing work.

## Common mistakes

- Missing quotes around variables (`"$VAR"`).
- No `set -e` / explicit error handling for critical scripts.
- Hard-coding secrets in scripts instead of env vars.

## Checkpoint

You can write a small script with args, a condition, and a clear exit code.

## Next

**Environment Variables — Config, Secrets & .env**
