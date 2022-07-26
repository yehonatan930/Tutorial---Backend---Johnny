FROM node:13-alpine

WORKDIR /app

COPY ./dest ./build
COPY ./node_modules ./node_modules

CMD [ "node", "./build/index.js" ]