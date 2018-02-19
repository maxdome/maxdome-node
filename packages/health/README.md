Provides an `/health` endpoint response with the health of the app in the [Spring Boot format](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-monitoring.html#production-ready-health-access-restrictions).

# Usage

```
const health = require('@maxdome/health')({
  example: () => {},
});
app.get('/health', health);
```

# Example response

```
{
  "example": { status: "UP" },
  "status":"UP"
}
```

# Plugins

* Check with HTTP requests: [`health-got`](https://www.npmjs.com/package/@maxdome/health-got)
