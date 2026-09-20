# TLS in Production

## Goal

Understand HTTPS, certificates, and TLS termination at the proxy.

## Concept

```text
Browser --HTTPS--> Nginx --HTTP--> App
```

A **certificate** proves identity; **TLS** encrypts traffic. **CAs** sign certs browsers trust.

## Try it

Inspect a site certificate in the browser or:

```bash
openssl s_client -connect example.com:443 -servername example.com </dev/null 2>/dev/null | openssl x509 -noout -dates
```

## Hands-on commands

```bash
# Inspect remote certificate:
echo | openssl s_client -connect example.com:443 -servername example.com 2>/dev/null \
  | openssl x509 -noout -subject -issuer -dates
# Local self-signed (lab only):
openssl req -x509 -newkey rsa:2048 -keyout /tmp/lab.key -out /tmp/lab.crt \
  -days 7 -nodes -subj "/CN=localhost" 2>/dev/null
openssl x509 -in /tmp/lab.crt -noout -text | head -20
rm -f /tmp/lab.key /tmp/lab.crt
```

## Hands-on lab

Use Let’s Encrypt (certbot) or a cloud LB certificate on a test VM. Force HTTPS redirect.

## Break it

Certificate expired — users see trust warnings.

## Fix it

Automate renewal; monitor expiry; reload Nginx after renew.

## Checkpoint

Explain TLS termination and why private keys must stay secret.

## Next

**Cloud Building Blocks**
