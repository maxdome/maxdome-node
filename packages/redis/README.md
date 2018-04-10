# Usage

```javascript
const redis = require('@maxdome/redis')(process.env.REDIS_URL);

await redis.setJSON('key', 'value', 1 * 60 * 60);
const value = await redis.getJSON('key');
```

If the expire is an object supporting `asSeconds()` (e.g. [@maxdome/duration](https://www.npmjs.com/package/@maxdome/duration) or [moment.duration](http://momentjs.com/docs/#/durations/)) it will be used.

```javascript
const duration = require('@maxdome/duration');
const redis = require('@maxdome/redis')(process.env.REDIS_URL);

await redis.setJSON('key', 'value', duration('1h'));
const value = await redis.getJSON('key');
```
