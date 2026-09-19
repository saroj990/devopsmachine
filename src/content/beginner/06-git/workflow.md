---
id: git-workflow
title: Remotes, Merge & .gitignore
---

# Remotes, Merge & .gitignore

## Goal

Connect to remotes (e.g. GitHub), merge branches, and keep secrets out of Git.

## Concept

A **remote** is another copy of the repo (usually `origin`). `git push` and `git pull` synchronize commits.

**Merge** integrates branch history. **`.gitignore`** lists paths Git should not track.

## Why does this exist?

Code lives on shared hosting for review and CI. Ignores prevent `.env` and `node_modules` from entering history.

## Mental model

```text
local main  ----push---->  origin/main
            <---pull-----
feature     ----merge----> main
```

## Real-world example

Pull request merges `feature/billing` into `main`; GitHub Actions runs tests on the merge commit.

## Try it

```bash
git remote add origin git@github.com:you/repo.git
git push -u origin main
echo "node_modules/" >> .gitignore
git add .gitignore && git commit -m "Ignore node_modules"
```

## Hands-on lab

**Objective:** Feature branch workflow.

1. Create `feature/readme`, edit README, commit.
2. Switch to `main` and merge `feature/readme`.
3. Add `.gitignore` for `*.log` and `config/app.env`.

**Challenge:** Explain what happens if you already committed a secret — why is `.gitignore` not enough?

## Break it

Merge conflict on the same line in two branches.

## Fix it

Open conflicted files, choose correct content, `git add`, `git commit` to complete merge.

## Common mistakes

- Force-pushing shared branches.
- Committing `.env` or private keys.
- Pulling without committing local work (stash or commit first).

## Checkpoint

You can push/pull, merge a feature branch, and maintain a sensible `.gitignore`.

## Next

**Shell Scripting**
