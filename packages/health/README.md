Provides an `/health` endpoint response with the health of the app in the [Spring Boot format](https://docs.spring.io/spring-boot/docs/current/reference/html/production-ready-monitoring.html#production-ready-health-access-restrictions).

# Usage

```
app.get('/health', require('@maxdome/health').controller({
  example: () => {},
}));
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

# Swagger

```yaml
paths:
  /health:
    get:
      summary: "Healthcheck if the app is running correctly"
      responses:
        200:
          description: "OK"
          schema:
            type: object
            properties:
              status:
                type: string
                example: "UP"
        500:
          description: "Internal Server Error"
```
