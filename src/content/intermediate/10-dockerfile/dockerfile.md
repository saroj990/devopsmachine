# Writing a Dockerfile

## Goal

Build a custom image with a Dockerfile and run it locally.

## Concept

A **Dockerfile** is a recipe: base image, dependencies, copy code, expose port, start command.

Layers cache — order instructions from least to most frequently changing.

## Try it

```dockerfile
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

## Hands-on commands

```bash
mkdir -p /tmp/docker-app && cd /tmp/docker-app
cat > package.json << 'EOF'
{"name":"demo","scripts":{"start":"node server.js"},"dependencies":{}}
EOF
echo 'require("http").createServer((q,r)=>r.end("ok")).listen(3000)' > server.js
cat > Dockerfile << 'EOF'
FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev 2>/dev/null || true
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
EOF
docker build -t my-app:lab .
docker run -d --name my-app-lab -p 3000:3000 my-app:lab
curl -s http://localhost:3000
docker stop my-app-lab && docker rm my-app-lab
```

## Hands-on lab

Containerize a minimal Node or static site. Verify health with `curl`.

## Break it

Build fails on `npm ci` — missing `package-lock.json` in context.

## Fix it

Ensure `.dockerignore` does not exclude required files; copy lockfile before install.

## Checkpoint

You can build, tag, and run your own image with port publishing.

## Next

**Multi-Container Apps (Compose)**
