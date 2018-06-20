Provides check function for [`health`](http://npmjs.com/@maxdome/health) checking MongoDB connection using [`mongoose`](https://www.npmjs.com/package/mongoose).

# Usage

```
app.get('/health', require('@maxdome/health').controller({
  db: require('@dnode/health-mongoose')(mongoose),
}));
```

# Example response

```
{
   "outcome": "UP",
   "checks": [
      {
         "name": "db",
         "state": "UP"
      }
   ]
}
```
