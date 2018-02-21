Provides check function for [`health`](http://npmjs.com/@maxdome/health) performing HTTP requests.

# Usage

```
app.get('/health', require('@maxdome/health').controller({
  example: require('@maxdome/health-got')('http://example.com/'),
}));
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
