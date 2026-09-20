# Reverse Proxy & Upstreams

## Goal

Configure Nginx to route traffic to backend applications.

## Concept

```text
Internet → Nginx → React static / Node API
```

`proxy_pass` forwards requests; `upstream` groups backends for load balancing.

## Try it

```nginx
upstream api {
    server 127.0.0.1:3000;
}

server {
    listen 80;
    location /api/ {
        proxy_pass http://api/;
        proxy_set_header Host $host;
    }
    location / {
        root /var/www/html;
        try_files $uri /index.html;
    }
}
```

## Hands-on lab

Proxy `/api` to a local Node process; serve static files on `/`.

## Break it

502 Bad Gateway — upstream not listening.

## Fix it

`curl localhost:3000` on server; check `systemctl status` and Nginx error log.

## Checkpoint

Configure a location block and reload Nginx safely.

## Next

**TLS in Production**
