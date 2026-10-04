# EventHub - Stack Docker Compose

## Prerequis

- Docker Desktop avec Docker Compose.
- Copier `.env.example` vers `.env` si tu veux personnaliser les variables; les valeurs par defaut du Compose sont reservees au developpement local.
- Les services communiquent sur le reseau Compose. PostgreSQL, MongoDB et Redis ne publient pas leurs ports sur la machine hote.

## Developpement avec rechargement a chaud

```powershell
docker compose up --build
```

Le frontend est accessible sur `http://localhost:5173` et l'API sur `http://localhost:3001/healthz`. Les dossiers `apps/api` et `apps/web` sont montes dans les conteneurs; les volumes nommes protegent leurs `node_modules`. Les modifications API sont rechargees par `tsx watch`; Vite utilise le polling pour detecter les changements sur les volumes Docker Desktop/Windows.

Arreter les conteneurs avec `Ctrl+C`, puis supprimer les conteneurs en conservant les donnees:

```powershell
docker compose down
```

Pour supprimer aussi les donnees PostgreSQL/MongoDB et les dependances installees dans les volumes:

```powershell
docker compose down --volumes
```

## Images finales multistages

Les Dockerfiles de production utilisent des etapes separees pour les dependances, la compilation et l'execution. L'image API n'embarque que les dependances de production et le build; l'image frontend ne conserve que les fichiers compiles servis par Nginx.

```powershell
docker build -t eventhub-api:prod ./apps/api
docker build -t eventhub-web:prod ./apps/web
```

Valider les builds TypeScript/Vite localement:

```powershell
npm ci --prefix apps/api
npm run build --prefix apps/api
npm ci --prefix apps/web
npm run build --prefix apps/web
```
