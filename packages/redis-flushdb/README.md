# Usage

## The controller

```javascript
if (process.env.REDIS_FLUSHDB_SECRET) {
  app.post('/debug/redis-flushdb', require('@maxdome/redis-flushdb').controller({
    redis,
    secret: process.env.REDIS_FLUSHDB_SECRET,
  }));
}
```

## Only the flushdb

```javascript
require('@maxdome/redis-flushdb')({ redis });
```

# Swagger

```yaml
paths:
  /debug/redis-flushdb:
    post:
      summary: "Remove all key/value pairs from a redis database"
      parameters:
        - name: secret
          description: "Secret for the flushdb"
          in: query
          type: string
          required: true
        - name: db
          description: "Database which gets flushed (optional, default: the default connected one gets flushed)"
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
