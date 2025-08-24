#!/usr/bin/env bash
set -euo pipefail

# Parse host and port from DATABASE_URL if provided, otherwise use defaults
DEFAULT_HOST="db"
DEFAULT_PORT="5432"

DB_HOST="${DEFAULT_HOST}"
DB_PORT="${DEFAULT_PORT}"

if [ -n "${DATABASE_URL-}" ]; then
  # Extract the host:port part after the '@' (e.g. host:5432/path)
  host_port=$(echo "$DATABASE_URL" | sed -E 's#.*@([^/]+).*#\1#')
  # Split host and port
  host_part=$(echo "$host_port" | cut -d':' -f1)
  port_part=$(echo "$host_port" | cut -d':' -f2 | cut -d'/' -f1)
  if [ -n "$host_part" ]; then DB_HOST="$host_part"; fi
  if [ -n "$port_part" ]; then DB_PORT="$port_part"; fi
fi

echo "Waiting for database ${DB_HOST}:${DB_PORT}..."
# Wait for TCP port to be open
until (echo > /dev/tcp/${DB_HOST}/${DB_PORT}) >/dev/null 2>&1; do
  printf '.'
  sleep 1
done

echo "Database is available. Preparing Prisma schema..."

# If there are migrations in prisma/migrations, apply them (deploy). Otherwise push schema (dev).
if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations)" ]; then
  echo "Found migrations, running: prisma migrate deploy"
  npx prisma migrate deploy
  echo "prisma migrate deploy finished"
else
  echo "No migrations found; running: prisma db push (creates/updates tables from schema.prisma)"
  npx prisma db push
  echo "prisma db push finished"
fi

echo "Starting application"
exec node dist/src/main.js
