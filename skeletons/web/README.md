# Web Skeleton

Example express application contains all packages and constrains adopting the Engineering Guidelines of maxdome and the Team Guidelines of Content Engineering.

## Engineering Guidelines

### Healthcheck (`GET /health`)

* Status code 2xx/5xx is needed for the ELB
* Body with the details of the different checked parts in the [Spring Boot format](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-monitoring.html#production-ready-health-access-restrictions) for debugging
* Checks shouldn't cascade, so an app can check his own internal dependencies (e.g. cache/database) if needed to run, but not other apps
* Covered by [@maxdome/health](https://www.npmjs.com/package/@maxdome/health)

### API Documentation (`GET /docs`)

* All routes defined with the requests and responses
* Preferred format: [Swagger](https://swagger.io/)
* Covered by [@maxdome/swagger](https://www.npmjs.com/package/@maxdome/swagger)

### Logging

* stdout/stderr is used by the app, it will be streamed from EBS to CloudWatch
* Different log level should be supported and smart settings for the environments
* Covered by:
  * [@maxdome/logging](https://www.npmjs.com/package/@maxdome/logging) for the log level and the output format
  * [@maxdome/logging-middlewares](https://www.npmjs.com/package/@maxdome/logging-middleware) for log all requests and errors
  * [@maxdome/exception-handling](https://www.npmjs.com/package/@maxdome/exception-handling) to log all uncaught exceptions

### Schemaupdates

* Not yet used by us
* Migrations as part of the app
* Covered by e.g. [knex migrations](http://knexjs.org/#Migrations)

### Configuration

* Environment depending configs and useful application configs independly changeable by environment variables
* Local development supported by `.env` file
* Covered by [@maxdome/env](https://www.npmjs.com/package/@maxdome/env)

### Versioning

* [Semantic Versioning](https://semver.org/)
* Different versioning of the source (package.json) and the API (docs/swagger.yml)
* Version of deployed app accessible by `GET /version`

## Team Guidelines

### Local development

* Installation by `npm i`
* Environment initialization by `npm run env`
* Run by `npm run dev` using [nodemon](https://www.npmjs.com/package/nodemon)

### Code Style

* Linting by `npm run lint`

### Testing

* Run by `npm test`
* Splitting of unit and integration tests using [mocha](https://www.npmjs.com/package/mocha)
* Additionally using some helper to write tests:
  * [power-assert](https://www.npmjs.com/package/power-assert) or [chai](https://www.npmjs.com/package/chai) for assertion
  * [sinon](https://www.npmjs.com/package/sinon) for stubs and mocks
  * [supertest](https://www.npmjs.com/package/supertest) to test express routes
* Security checks by using `npm audit`
