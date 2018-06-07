# Usage

## The controller

```javascript
if (process.env.REDIS_FLUSHALL_SECRET) {
  app.post('/debug/redis-flushall', require('@maxdome/redis-flushall').controller({
    redis,
    secret: process.env.REDIS_FLUSHALL_SECRET,
  }));
}
```

## Only the flushall

```javascript
require('@maxdome/redis-flushall')({ redis });
```

# Swagger

```yaml
paths:
  /debug/redis-flushall:
    post:
      summary: "Remove all key/value pairs from the redis"
      parameters:
        - name: secret
          description: "Authorization for the flushall"
          in: query
          type: string
      responses:
        204:
          description: "OK"
        403:
          description: "Missing or incorrect secret"
        500:
          description: "Internal Server Error"
```
