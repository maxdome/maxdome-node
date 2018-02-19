Provides check function for [`health`](http://npmjs.com/@maxdome/health) performing HTTP requests.

# Usage

```
const health = require('@maxdome/health')({
  example: require('@maxdome/health-got')('http://example.com/'),
});
app.get('/health', health);
```

# Example response

```
{
  "example": {
    "method": "GET",
    "options": {
      "json": true
    },
    "status": "UP",
    "url": "http://example.com/"
  },
  "status": "UP"
}
```
