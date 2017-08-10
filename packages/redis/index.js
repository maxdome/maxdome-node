const redis = require('redis');
const RedisCluster = require('redis-clustr');

module.exports = ({ redisUrl, redisClusterUrl }) => {
  let redisClient;
  if (redisClusterUrl) {
    const [host, port] = redisClusterUrl.split(':');
    redisClient = new RedisCluster({
      servers: [
        {
          host,
          port
        }
      ]
    });
  } else {
    redisClient = redis.createClient(redisUrl);
  }

  redisClient.setJSON = (key, value, callback) => {
    value = JSON.stringify(value);
    if (callback) {
      redisClient.set(key, value, callback);
    } else {
      return new Promise((resolve, reject) => {
        redisClient.set(key, value, err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  };

  redisClient.getJSON = (key, callback) => {
    if (callback) {
      redisClient.get(key, (err, value) => {
        if (value) {
          try {
            value = JSON.parse(value);
          } catch (e) {
            err = e;
            value = undefined;
          }
        }
        callback(err, value);
      });
    } else {
      return new Promise((resolve, reject) => {
        redisClient.get(key, (err, value) => {
          if (value) {
            try {
              value = JSON.parse(value);
            } catch (e) {
              err = e;
              value = undefined;
            }
          }
          if (err) {
            reject(err);
          } else {
            resolve(value);
          }
        });
      });
    }
  };

  return redisClient;
};

module.exports.createClient = module.exports;
