# Framegrab

Framegrab is a small NestJS-based service to manage movies and related stills. It uses Prisma with Postgres for data storage and includes Docker compose files for local development.

## Key features

- REST API implemented with NestJS
- Prisma ORM for database access (Postgres)
- Docker compose for local dev (Postgres + app)
- Unit and e2e tests (Jest)

## Requirements

- Node.js (recommended: 18+)
- npm or yarn
- Docker & Docker Compose (for containerized development)

## Quick start (development)

1. Install dependencies

   ```bash
   npm install
   ```

2. Start in development mode (watch)

   ```bash
   npm run start:dev
   ```

The app will run on the port configured in `src/main.ts` (default Nest port 3000) unless overridden by environment variables.

## Docker (recommended for dev)

The repository includes a `docker-compose.yml` that starts Postgres and the application. It is the easiest way to get a consistent development environment.

Start the stack:

```bash
docker compose up --build
```

View logs:

```bash
docker compose logs --follow
```

Stop the stack:

```bash
docker compose down
```

Entrypoint behavior

- The container uses `docker-entrypoint.sh` which waits for the database to be available.
- If there are migrations present under `prisma/migrations`, it runs `npx prisma migrate deploy` to apply them (recommended for production-like runs).
- Otherwise it runs `npx prisma db push` to create/update the schema (convenient for local development).
- Finally it starts the compiled application (`node dist/src/main.js`).

## Environment variables

- `DATABASE_URL` — Postgres connection string (the example `docker-compose.yml` sets this to the `db` service).
- Other environment variables can be added or overridden in a `.env` file when running locally.

## Database and migrations

- Schema is defined in `prisma/schema.prisma`.
- For production or CI, prefer creating and applying migrations with `npx prisma migrate dev` / `npx prisma migrate deploy`.
- For fast local syncing you can use `npx prisma db push` but this does not create a migration history.

## Tests

- Unit tests:

  ```bash
  npm run test
  ```

- E2E tests:

  ```bash
  npm run test:e2e
  ```

- Coverage report:

  ```bash
  npm run test:cov
  ```

## Project structure (high level)

- `src/` — application source
  - `infra/` — infra adapters (Prisma, controllers)
  - `modules/` — domain modules (movie, still)
- `prisma/` — Prisma schema and migrations
- `test/` — e2e tests

## License

This project is provided under the MIT license.
