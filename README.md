# Nodejs Prisma Template

This repository contains template for nodejs backend. Stack used in this repository is Node.js, Prisma, and Express.

## System Requirement

To use this template, you should install this dependencies:

- Node.JS v16
- Yarn
- Docker (optional)

## How to run this app

To run this template in development mode, you can follow this instruction:

1. To run this app, you must copy `.env.example` to `.env`.
2. After that, you can run this command in your local:

```sh
yarn dev
```

3. You can also run jest test using `yarn test`.

To build this template, you can run this comand:

```sh
yarn clean # Cleanup build folder
yarn build
yarn start # to run this template
```

If you want to build this repository with docker, you can run:

```sh
docker build -t <your tag> .
```
