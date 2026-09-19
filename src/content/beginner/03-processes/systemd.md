---
id: linux-systemd
title: systemd & Logs
---

# systemd & Logs

## Goal

Manage services with systemd and read logs with `journalctl`.

## Concept

**systemd** starts services at boot and supervises them. Units have names like `ssh.service` or `nginx.service`.

`systemctl status`, `start`, `stop`, `restart`, and `enable` control units. **journald** collects logs.

## Why does this exist?

Manual `nohup` processes do not survive reboots. systemd gives **restarts**, **dependencies**, and **centralized logs**.

## Mental model

```text
systemd
  ├── multi-user.target
  │     ├── ssh.service
  │     └── nginx.service
  └── journald (logs)
```

## Real-world example

After config change, `sudo systemctl restart nginx` and `journalctl -u nginx -n 50` to verify no errors.

## Try it

```bash
systemctl status ssh
journalctl -u ssh -n 20 --no-pager
```

(Use `sshd` instead of `ssh` on some distributions.)

## Hands-on lab

**Objective:** Inspect a service.

1. Pick a running unit from `systemctl list-units --type=service --state=running | head`.
2. Run `systemctl status` on it.
3. Fetch the last 15 log lines with `journalctl -u <unit> -n 15`.

**Expected result:** Active state plus recent log entries.

## Break it

Edit a unit file with a typo; `systemctl restart` fails.

## Fix it

Read `systemctl status` and `journalctl -xe`. Fix the unit file, run `sudo systemctl daemon-reload`, retry.

## Common mistakes

- Forgetting `daemon-reload` after unit edits.
- Not checking logs before restarting repeatedly.
- Disabling a critical service on production without a maintenance window.

## Checkpoint

You can check service status and pull filtered journal logs for one unit.

## Next

**Networking — IPs, DNS & Ports**
