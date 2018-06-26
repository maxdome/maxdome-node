Provides check function for [`health`](http://npmjs.com/@maxdome/health) checking MongoDB connection using [`mongoskin`](https://www.npmjs.com/package/mongoskin).

# Usage

```
app.get('/health', require('@maxdome/health').controller({
  db: require('@dnode/health-mongoskin')({ db }),
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
