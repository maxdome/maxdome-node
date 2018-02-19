const got = require('got');

module.exports = data => {
  if (typeof data === 'string') {
    data = { url: data };
  }
  data.method = data.method || 'get';
  data.options = Object.assign({ json: true }, data.options);
  return {
    check: () => got[data.method](data.url, data.options),
    data,
  };
};
