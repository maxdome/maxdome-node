# Usage

## The controller

```javascript
app.get('/version', require('@maxdome/version').controller());
```

## Only the version

```javascript
const version = require('@maxdome/version')();
```

# Swagger

```yaml
paths:
  /version:
    get:
      summary: "Response the version of the app"
      responses:
        200:
          description: "OK"
          schema:
            type: string
            example: "1.0.0"
        500:
          description: "Internal Server Error"
```
