const got = require('got');

module.exports = data => {
  if (typeof data === 'string') {
    data = { url: data };
  }
  data.method = data.method || 'get';
  return {
    check: () => got[data.method](data.url, data.options),
    data: { method: data.method, url: data.url },
  };
};
