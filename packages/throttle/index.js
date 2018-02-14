const duration = require('@maxdome/duration');
const Throttle = require('redis-throttle');

module.exports = config => {
  Throttle.configure(config);
  return (key, limit, callback, fallback) => {
    let span = '1 second';
    if (typeof limit === 'string') {
      [limit, span] = limit.split(' per ');
    }
    span = duration(span).milliseconds();
    const throttle = new Throttle(key, { span, accuracy: span / 10 });
    return new Promise((resolve, reject) => {
      throttle.read((err, count) => {
        if (err) {
          reject(err);
          return;
        }
        if (count <= limit) {
          throttle.increment(1, err => {
            if (err) {
              reject(err);
              return;
            }
            resolve(callback());
          });
        } else {
          if (fallback) {
            resolve(fallback());
          } else {
            resolve();
          }
        }
      });
    });
  };
};
