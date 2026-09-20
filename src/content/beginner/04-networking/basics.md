---
id: networking-basics
title: IPs, DNS & Ports
---

# IPs, DNS & Ports

## Goal

Understand addresses, name resolution, ports, and the basics of TCP/UDP, HTTP, and HTTPS.

## Concept

An **IP address** identifies a host on a network. **DNS** maps names (e.g. `example.com`) to IPs.

A **port** is a number where a service listens. **TCP** is reliable and connection-oriented; **UDP** is lightweight and best-effort.

**HTTP** serves web content; **HTTPS** adds TLS encryption (usually port 443).

## Why does this exist?

Deploying and debugging apps means knowing **where** services listen and **how** clients reach them.

## Mental model

```text
Client  --DNS-->  IP address
Client  --TCP:443-->  Server (HTTPS)
```

## Important ports

| Port | Service |
|------|---------|
| 22 | SSH |
| 53 | DNS |
| 80 | HTTP |
| 443 | HTTPS |
| 3000 | Dev server |
| 5432 | PostgreSQL |
| 6379 | Redis |
| 8080 | Common app port |

## Real-world example

Your API listens on `8080` inside a VM. The firewall must allow **80/443** on the load balancer, which forwards to `8080`.

## Try it

Read your machine addresses (command varies):

```bash
ip addr
# or: ifconfig
```

## Hands-on commands

```bash
ip addr show 2>/dev/null | grep -E "inet " || ifconfig | grep "inet "
getent hosts localhost
getent hosts example.com | head -1
nc -zv 127.0.0.1 22 2>&1 | head -1 || echo "nc not installed — try: ss -tln | grep :22"
cat /etc/services | grep -E "^\s*(http|https|ssh)\s" | head -5
```

## Hands-on lab

**Objective:** Match services to ports.

1. Write which port you would use for SSH, HTTPS, and a local React dev server.
2. Look up what `localhost` means and which IP it uses.

## Break it

Browser shows “connection refused” to `http://localhost:3000` but the app runs on port `8080`.

## Fix it

Match **URL port** to **listening port** (`ss -tulpn` helps).

## Common mistakes

- Confusing IP with MAC address.
- Opening all ports in the firewall “just in case.”
- Forgetting HTTPS terminates on 443, not 80.

## Checkpoint

You can explain DNS, name three common ports, and describe HTTP vs HTTPS at a high level.

## Next

**curl, ping & ss**
