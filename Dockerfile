FROM node:13-alpine

WORKDIR /app

COPY ./build ./build
COPY ./node_modules ./node_modules

CMD [ "node", "./build/index.js" ]