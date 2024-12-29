FROM oven/bun
WORKDIR /usr/src/app
COPY . .

ENV NODE_ENV=production
RUN bun run build

EXPOSE 3000
ENTRYPOINT [ "bun","server/server.ts" ]