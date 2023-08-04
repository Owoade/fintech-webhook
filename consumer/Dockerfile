FROM node:16.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN --mount=type=cache,target=/root/.npm \
    npm ci --only=production

COPY . .

EXPOSE 1200

CMD ["node", "index"]