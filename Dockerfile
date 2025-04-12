FROM node:22-alpine

WORKDIR /app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml prisma  ./

RUN pnpm i

COPY . .

EXPOSE 3000

CMD [ "pnpm", "dev" ]