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
