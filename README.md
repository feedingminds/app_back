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

## Docker in dev

### Env Config

_Copy `.env.example` to `.env`_

### Levantar el contenedor

```console
docker-compose -f docker-compose.dev.yml up -d
```

_with logger_

```console
docker-compose -f docker-compose.dev.yml up
```

### Bajar el contenedor

```console
docker compose down
```

## Docker in test

### Instalar dependencias

```console
npm install
```

### Levantar el contenedor

```console
docker-compose up -d
```

_with logger_

```console
docker-compose up
```

### Bajar el contenedor

```console
docker compose down
```

### Bash

```console
docker exec -it app_back-mongo-1 bash
```

```console
mongo
```
