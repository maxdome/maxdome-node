# Usage

```javascript
const redisClient = require('@maxdome/redis')(process.env.REDIS_URL);

await redisClient.setJSON('key', 'value');
const value = await redisClient.getJSON('key');
```
