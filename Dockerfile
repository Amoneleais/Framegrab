# Use the official Node.js image as the base image
FROM node:24-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install bash and ffmpeg required by the application
RUN apk add --no-cache bash ffmpeg

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy prisma schema so `prisma generate` in postinstall can run during npm install
COPY prisma ./prisma

# Install the application dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 3000

# Ensure Node can resolve absolute imports that start with `src/` after build
ENV NODE_PATH=./dist

# Copy and set entrypoint that waits for DB and runs migrations before starting
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]