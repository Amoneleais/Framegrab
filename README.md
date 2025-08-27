# FramegrabAPI

A NestJS-based REST API to manage movies and extract still frames from video files using FFmpeg.

This README is a concise guide to get the project running locally, using Docker, and running the main features.

## Quick status

- Language: TypeScript / Node.js (NestJS)
- Database: PostgreSQL + Prisma
- Video processing: FFmpeg (invoked from the app)

## What you’ll find here

- Setup and development steps
- Running with Docker
- FFmpeg notes and extraction examples
- Testing and troubleshooting

## Requirements

- Node.js 18+
- npm or pnpm
- Docker & Docker Compose (optional but recommended)
- FFmpeg installed and available on PATH (or in the container)

## Setup (local, without Docker)

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/Amoneleais/Framegrab.git
cd FramegrabAPI
npm install
```

2. Create environment file from the example:

```bash
cp .env.example .env
```

3. Edit `.env` with your values. Minimum required variables:

- DATABASE_URL - e.g. postgresql://user:pass@localhost:5432/framegrabapi
- POSTGRES_USER
- POSTGRES_PASSWORD

4. Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

5. Start development server:

```bash
npm run start:dev
```

The API default base URL: http://localhost:3000
Swagger docs (if enabled): http://localhost:3000/api

## Run with Docker (recommended for a quick local environment)

This project includes a `docker-compose.yml` that brings up Postgres and the app.

1. Build and start services:

```bash
docker-compose up --build -d
```

2. Apply migrations from inside the app container (or locally):

```bash
npx prisma migrate deploy
```

3. Check logs / service status:

```bash
docker-compose logs -f
```

To stop:

```bash
docker-compose down
```

## FFmpeg and extracting stills

FFmpeg must be available to the process that runs the app. On Windows, add FFmpeg to your PATH; on Linux/macOS use your package manager or the container image.

Endpoint: POST /stills/extract

Payload (JSON):

```json
{
  "movieId": "<movie-id>",
  "interval": 5
}
```

Example using curl:

```bash
curl -X POST http://localhost:3000/stills/extract \
  -H "Content-Type: application/json" \
  -d '{"movieId":"<movie-id>","interval":5}'
```

Notes:

- `interval` is seconds between extracted frames.
- The app saves images to the configured output folder and records metadata in the DB.

## Database models (summary)

- Movie: id, title, description?, releaseDate, rating?, path, createdAt, updatedAt
- Still: id, url, timestamp (seconds), movieId, createdAt

See `prisma/schema.prisma` for the full model definitions.

## Testing

Run unit tests:

```bash
npm run test
```

Run e2e tests:

```bash
npm run test:e2e
```

Generate coverage:

```bash
npm run test:cov
```

## Troubleshooting

- FFmpeg errors: verify ffmpeg is in PATH and accessible by the Node process. Run `ffmpeg -version` to confirm.
- Prisma/DB: if migrations fail, ensure the `DATABASE_URL` is correct and the DB accepts connections.
- Docker: if the app container doesn't start, inspect logs with `docker-compose logs` and ensure the DB container is healthy.

## License

MIT — see the `LICENSE` file.

## Author

Manoel Elias de Araujo Neto — manoelaraujo24@gmail.com

GitHub: https://github.com/Amoneleais
