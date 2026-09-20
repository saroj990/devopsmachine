---
id: linux-permissions
title: Permissions, Users & sudo
---

# Permissions, Users & sudo

## Goal

Read and change file permissions, understand users and groups, and use `sudo` safely.

## Concept

Each file has an **owner**, a **group**, and **mode** (`rwx` for user, group, others). **Users** log in; **groups** bundle permission grants.

`chmod` changes mode. `chown` changes owner (often needs root).

## Why does this exist?

Services run as specific users. Wrong permissions cause **permission denied** or **security holes** (world-writable configs).

## Mental model

```text
-rwxr-xr--  owner: alice  group: devs
 │││││││││
 user group other
```

## Real-world example

A deploy script must run as `deploy` user but config files should be readable only by that user — not `chmod 777`.

## Try it

```bash
ls -l logs/app.log
chmod 640 logs/app.log
ls -l logs/app.log
groups
whoami
```

## Hands-on commands

```bash
cd ~/devops-lab
mkdir -p config
echo "PORT=8080" > config/app.env
chmod 600 config/app.env
ls -l config/app.env
stat -c "%a %U %G" config/app.env 2>/dev/null || stat -f "%OLp %Su %Sg" config/app.env
id
sudo -n true 2>/dev/null && echo "sudo available" || echo "sudo may prompt for password"
```

## Hands-on lab

**Objective:** Secure a config file.

1. In `devops-lab/config`, create `app.env` with `PORT=8080`.
2. Set permissions so only you can read/write (`chmod 600 app.env`).
3. Try `cat app.env` as your user — should work.

**Challenge:** Explain what `chmod 644` would allow.

## Break it

Run a script that writes to `/etc` without sudo — permission denied.

## Fix it

- Write to a path you own, or
- Use `sudo` only when necessary, with least privilege.

## Common mistakes

- `chmod 777` “to fix it quick.”
- Running everything as root.
- Forgetting directory **execute** bit is required to `cd` into folders.
- Sharing private keys with loose permissions.

## Checkpoint

You can read `ls -l` output and choose a reasonable `chmod` for a secret config file.

## Next

**Processes & Monitoring**
