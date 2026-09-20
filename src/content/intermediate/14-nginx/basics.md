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

## Hands-on commands

```bash
# After installing nginx — test config without applying bad files:
sudo nginx -t
curl -I http://127.0.0.1/
echo 'server { listen 8082; location / { return 200 "lab\n"; } }' | sudo tee /etc/nginx/conf.d/lab.conf
sudo nginx -t && sudo systemctl reload nginx
curl -s http://127.0.0.1:8082/
sudo rm -f /etc/nginx/conf.d/lab.conf && sudo systemctl reload nginx
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
