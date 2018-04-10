const Redis = require('ioredis');

module.exports = url => {
  const redis = new Redis(url);

  redis.setJSON = async (...arguments) => {
    arguments[1] = JSON.stringify(arguments[1]);
    if (typeof arguments[2] === 'object' && arguments[2].asSeconds) {
      arguments[2] = parseInt(arguments[2].asSeconds());
    }
    if (typeof arguments[2] === 'number') {
      arguments[3] = parseInt(arguments[2]);
      arguments[2] = 'EX';
    }
    return await redis.set.apply(redis, arguments);
  }

  redis.getJSON = async key => {
    const value = await redis.get(key);
    if (value) {
      return JSON.parse(value);
    }
    return value;
  }

  return redis;
};
