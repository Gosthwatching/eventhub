# EventHub - Stack DEV/PROD sans Docker Compose

## Prerequis

- Docker avec BuildKit et Node 20+ pour les commandes locales facultatives.
- Le reseau Docker `eventhub-net` relie les services par leur nom.
- Les volumes PostgreSQL et MongoDB conservent les donnees.
- Copier `.env.example` vers `.env` et remplacer `JWT_SECRET` avant tout usage hors local.

## Reseau et volumes

```powershell
docker network create eventhub-net
docker volume create eventhub-pgdata
docker volume create eventhub-mongodata
```

## Bases de donnees

```powershell
docker run -d --name eventhub-postgres --network eventhub-net `
  -e POSTGRES_USER=eventhub -e POSTGRES_PASSWORD=eventhub -e POSTGRES_DB=eventhub `
  -p 5432:5432 -v eventhub-pgdata:/var/lib/postgresql/data postgres:16-alpine

docker run -d --name eventhub-mongo --network eventhub-net `
  -p 27017:27017 -v eventhub-mongodata:/data/db mongo:7

docker run -d --name eventhub-redis --network eventhub-net `
  -p 6379:6379 redis:7-alpine
```

Ces commandes exposent les bases pour le developpement local. En production, proteger les identifiants et restreindre l'acces reseau; ne pas exposer les ports des bases publiquement.

## Production

Construire et lancer l'API TypeScript et le frontend React/Vite servi par Nginx:

```powershell
Copy-Item .env.example .env
# Modifier JWT_SECRET dans .env avant le lancement.
docker build -t eventhub-api ./apps/api
docker run -d --name eventhub-api --network eventhub-net --env-file .env `
  -p 3001:3000 eventhub-api

docker build -t eventhub-web ./apps/web
docker run -d --name eventhub-web --network eventhub-net -p 8080:80 eventhub-web
```

Verifier l'API avec `Invoke-WebRequest http://localhost:3001/healthz` et ouvrir le frontend sur `http://localhost:8080`. Nginx transmet `/api/*` a `eventhub-api:3000`.

## Developpement avec rechargement a chaud

Les montages Windows utilisent des chemins absolus pour eviter les ambiguities de `$PWD` dans Docker Desktop.

```powershell
$apiPath = (Resolve-Path .\apps\api).Path
docker build -f apps/api/Dockerfile.dev -t eventhub-api-dev ./apps/api
docker run --rm -it --name eventhub-api-dev --network eventhub-net --env-file .env `
  -p 3001:3000 --mount "type=bind,source=$apiPath,target=/app" `
  --mount type=volume,target=/app/node_modules eventhub-api-dev
```

Dans un second terminal:

```powershell
$webPath = (Resolve-Path .\apps\web).Path
docker build -f apps/web/Dockerfile.dev -t eventhub-web-dev ./apps/web
docker run --rm -it --name eventhub-web-dev --network eventhub-net `
  -e API_PROXY_TARGET=http://eventhub-api:3000 -p 5173:5173 `
  --mount "type=bind,source=$webPath,target=/app" `
  --mount type=volume,target=/app/node_modules eventhub-web-dev
```

Ouvrir `http://localhost:5173`; Vite transmet `/api/*` a l'API. Le volume anonyme `node_modules` preserve les dependances installees dans le conteneur.

## Tests et arret

```powershell
npm ci --prefix apps/api
npm run build --prefix apps/api
npm ci --prefix apps/web
npm run build --prefix apps/web

docker stop eventhub-web eventhub-api eventhub-redis eventhub-mongo eventhub-postgres
docker rm eventhub-web eventhub-api eventhub-redis eventhub-mongo eventhub-postgres
docker volume rm eventhub-pgdata eventhub-mongodata
docker network rm eventhub-net
```

Les commandes `docker stop` et `docker rm` peuvent etre ignorees pour les conteneurs qui n'ont pas ete demarres. Les volumes et le reseau sont a supprimer uniquement pour une remise a zero locale.
