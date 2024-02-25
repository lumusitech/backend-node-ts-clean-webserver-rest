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
   "build": "rimraf ./dist && tsc",
   "start": "npm run build && node dist/app.js"
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
   // setupFiles: ['dotenv/config'],
   ```

4. Add the following scripts to the **package.json** file

   ```sh
   "test": "jest",
   "test:watch": "jest --watch",
   "test:coverage": "jest --coverage",
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

- [@types/node](https://www.npmjs.com/package/@types/node): This package contains type definitions for node [https://nodejs.org/](https://nodejs.org/).

- [ts-node-dev](https://www.npmjs.com/package/ts-node-dev): It restarts target node process when any of required files changes (as standard node-dev) but shares Typescript compilation process between restarts. This significantly increases speed of restarting comparing to node-dev -r ts-node/register ..., nodemon -x ts-node ... variations because there is no need to instantiate ts-node compilation each time.

- [rimraf](https://www.npmjs.com/package/rimraf): The UNIX command rm -rf for node.

- [Express types](https://www.npmjs.com/package/@types/express):This package contains type definitions for express.

### Production

- [Express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for Node.js.

- [Dotenv](https://www.npmjs.com/package/dotenv): Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.

- [Env-Var](https://www.npmjs.com/package/env-var): Verification, sanitization, and type coercion for environment variables in Node.js and web applications. Supports TypeScript!
