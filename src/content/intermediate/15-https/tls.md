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
