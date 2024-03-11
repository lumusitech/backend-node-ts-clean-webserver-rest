# Webserver and REST API- HTTP HTTP2 HTTPS - clean architecture - Node, TS, Jest

## Node with TypeScript - TS-Node-dev (better than nodemon when use typescript)

NOTE: After clone:

1. Create and config .env file with:

   ```text
   PORT=3000
   PUBLIC_PATH=public
   POSTGRES_URL=postgresql://postgres:123456@localhost:5432/TODO
   POSTGRES_USER=postgres
   POSTGRES_DB=TODO
   POSTGRES_PORT=5432
   POSTGRES_PASSWORD=123456
   NODE_ENV=development
   ```

2. Next, run:

   ```sh
   pnpm i
   docker compose up -d
   pnpm exec prisma migrate dev
   pnpm dev
   ```

### This app was initialized with this steps

1. Install TypeScript and other dependencies

   ```sh
   pnpm i -D typescript @types/node ts-node-dev rimraf
   ```

2. Initialize TypeScript config file (then, add other config that you like)

   ```sh
   pnpm exec tsc --init --outDir dist/ --rootDir src
   ```

3. Create scripts dev, build and start ([More about TS-Node-dev here](https://www.npmjs.com/package/ts-node-dev))

   ```JSON
   "dev": "tsnd --respawn --clear src/app.ts",
   "build": "rimraf ./dist && tsc && pnpm prisma:migrate:prod",
   "start": "node dist/app.js",
   "prisma:migrate:prod": "prisma migrate deploy",
   ```

### Jest with TypeScript config

Official documentation [about Jest](https://jestjs.io/docs/getting-started)

1. Development installs (super test is great to test Express)

   ```sh
   pnpm i -D jest @types/jest ts-jest supertest
   ```

2. Create jest config file

   ```sh
   pnpm exec jest --init
   ```

3. Config **jest.config.js** file

   ```ts
   preset: 'ts-jest',
   testEnvironment: "jest-environment-node",

   // Opcional - The paths to modules that run some code to configure or set up the testing environment before each test
   setupFiles: ['<rootDir>/setupTests.ts'],
   ```

4. Create a file in root dir named setupTest.ts and edit with:

   ```js
   import { config } from 'dotenv'

   config({
     path: '.env.test',
   })
   ```

5. Create and config .env.test with the needed values like:

   ```text
   PORT=3001
   PUBLIC_PATH=public
   POSTGRES_URL=postgresql://postgres:123456@localhost:5432/TODO
   POSTGRES_USER=postgres
   POSTGRES_DB=TODO
   POSTGRES_PORT=5432
   POSTGRES_PASSWORD=123456
   NODE_ENV=testing
   ```

6. Add the following scripts to the **package.json** file

   ```sh
   "prisma:migrate:test": "dotenv -e .env.test -- pnpm exec prisma migrate deploy",
   "test": "pnpm prisma:migrate:test && jest",
   "test:watch": "pnpm prisma:migrate:test && jest --watch",
   "test:coverage": "pnpm prisma:migrate:test && jest --coverage"
   ```

   NOTE: If test:watch not shows coverage, you can change that script with:

   ```sh
   "test:watch": "pnpm prisma:migrate:test && jest --watchAll --coverage",
   ```

7. If you get permission error, you can run:

   ```sh
   sudo chown -R $USER:$GROUP postgres # Or whatever folder/s with error
   ```

## NOTES about HTTP, HTTP/2 (HTTPS)

HTTP VS HTTP2 = HTTP/2 will make our applications faster, simpler and more robust. [Read more...](https://web.dev/articles/performance-http2?hl=es-419)

In native Node, without any framework like Express or Fastify, to generate certificates (https), run:

```sh
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout server.key -out server.crt
```

This will create 2 files (server.crt and server.key).
You can move them, for example to a folder named keys and then, add them as options in method http2.createSecureServer like this:

```js
const server = http2.createSecureServer(
  {
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
  },
  (req, res) => {
    //...code
  },
)
```

## Dependencies

### Development

- [Git linter](https://www.npmjs.com/package/git-commit-msg-linter): A lightweight, independent, 0 configurations and joyful git commit message linter. 👀 Watching your every git commit message INSTANTLY 🚀.

![allowed commits](https://raw.githubusercontent.com/legend80s/commit-msg-linter/master/assets/demo-7-compressed.png)

- [Typescript](https://www.npmjs.com/package/typescript): TypeScript is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript.

- [Node types](https://www.npmjs.com/package/@types/node): This package contains type definitions for node [https://nodejs.org/](https://nodejs.org/).

- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev): It restarts target node process when any of required files changes (as standard node-dev) but shares Typescript compilation process between restarts. This significantly increases speed of restarting comparing to node-dev -r ts-node/register ..., nodemon -x ts-node ... variations because there is no need to instantiate ts-node compilation each time.

- [rimraf](https://www.npmjs.com/package/rimraf): The UNIX command rm -rf for node.

- [Express types](https://www.npmjs.com/package/@types/express):This package contains type definitions for express.

- [Prisma](https://www.npmjs.com/package/prisma): Prisma is a next-generation ORM that consists of these tools:

  - Prisma Client: Auto-generated and type-safe query builder for Node.js & TypeScript
  - Prisma Migrate: Declarative data modeling & migration system
  - Prisma Studio: GUI to view and edit data in your database

- [Compression types](https://www.npmjs.com/package/@types/compression): This package contains type definitions for compression.

- [Supertest types](https://www.npmjs.com/package/@types/supertest): This package contains type definitions for supertest.

- [Dotenv-cli](https://www.npmjs.com/package/dotenv-cli): This will load the variables from the .env file in the current working directory and then run the command (using the new set of environment variables).

### Production

- [Express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.

- [Dotenv](https://www.npmjs.com/package/dotenv): Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

- [Env-Var](https://www.npmjs.com/package/env-var): Verification, sanitization, and type coercion for environment variables in Node.js and web applications. Supports TypeScript!

- [Compression](https://www.npmjs.com/package/compression): Returns the compression middleware using the given options. The middleware will attempt to compress response bodies for all request that traverse through the middleware, based on the given options.
