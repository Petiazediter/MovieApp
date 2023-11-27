FROM node:20.5.1-alpine3.18

RUN apk update
RUN apk add openssl
RUN apk add bash

WORKDIR /opt/app/client

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

CMD ["npm", "run", "start"]