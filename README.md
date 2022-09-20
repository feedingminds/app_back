# backend-app

## Install programs

- [Node.js](https://nodejs.org/en/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)

## Install VSC Plugins

- Prettier
- Eslint
- Error Lens

## Install Dependencies

```console
npm install
```

## Mode development

```console
npm run dev
```

## Mongo DB

### Levantar el contenedor

```console
docker compose up -d
```

### Bajar el contenedor

```console
docker compose down
```

### Env Config

Copy `.env.example` to `.env`

### Bash

```console
docker exec -it app_back-mongo-1 bash
```

```console
mongo
```
