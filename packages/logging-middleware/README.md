# Usage

```
app.use(require('@maxdome/logging-middleware')({
  logging,
  options,
}));
```

See [express-winston](https://github.com/bithavoc/express-winston#request-logging) for options.

## Error Logging

```
app.use(require('@maxdome/logging-middleware').errorLogging({
  logging,
  options,
  errorHandler,
}));
```

See [express-winston#error-logging](https://github.com/bithavoc/express-winston#error-logging) for options.
