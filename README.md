Use this as a template for your repository!

Features:
* DevOps scripts via [_gulp_](https://www.npmjs.com/package/gulp) and [_batch_](https://en.wikipedia.org/wiki/Batch_file)
* Tests via [_mocha_](https://mochajs.org/) & [_supertest_](https://www.npmjs.com/package/supertest)
* Plays a sound when a test fails
* API is integrated with relational (SQL) database via [Sequelize ORM](http://docs.sequelizejs.com/)
* Authentication is already done
* Logs errors in to database
* Pre-configured linter
* Monorepo structure

# Prerequisites

* [NodeJS](https://nodejs.org/en/) LTS
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) extension for VSCode
* Don't forget to `npm install`

# How to build / run

Many tasks are automated via scripts, using [_npm_](https://docs.npmjs.com/misc/scripts), [_gulp_](https://www.npmjs.com/package/gulp), & [_batch_](https://en.wikipedia.org/wiki/Batch_file) scripts.
Such scripts reside in [`package.json`](blob/master/package.json) and in the [`scripts`](tree/master/scripts) directory.

* Building
    * Build everything: `npm run build`
    * Build just front / api: `npm run build-front` or `npm run build-api` respectively
    * Build & rebuild if changes detected: `npm run autobuild-front` or `npm run autobuild-api`
* Running
    * Run everything: `npm start`
    * Run just front / api: `npm run start-front` / `npm run start-api` respectively
    * Run all tests: `npm test`
    * Run just front / api tests: `npm run test-front` / `npm run test-api` respectively
    * Run & rerun tests if changes detected: `npm run autotest-front` or `npm run autotest-api`
* For a simple, one-action set up for development, run [`start-dev.bat`](blob/master/start-dev.bat) in the root directory.
This builds everything & rebuilds if changes are detected, runs everything, and opens VSCode.

# Conventions

## Tests

* All tests are in their own files, ending with `.test.js`
