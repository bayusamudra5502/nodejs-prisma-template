FROM node:lts AS build

COPY . /app
WORKDIR /app

RUN ["yarn", "install"]
RUN ["yarn", "clean"]
RUN ["yarn", "build"]
COPY ./package.json ./build/package.json

FROM node:lts-alpine

WORKDIR /app
COPY --from=build /app/build /app
RUN ["yarn", "install", "--prod"]
CMD ["node", "main.js"]
