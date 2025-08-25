FROM node:24-alpine

WORKDIR /usr/src/app

RUN apk add --no-cache bash ffmpeg

COPY package*.json ./

COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

ENV NODE_PATH=./dist

COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh

RUN sed -i 's/\r$//' /usr/local/bin/docker-entrypoint.sh && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
