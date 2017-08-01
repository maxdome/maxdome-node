const Asset = require('@maxdome/request-maxdome').Asset;

module.exports = {
  detect: data => data['@class'],
  from: 'mmw',
  to: 'asset',
  run: data => new Asset(data),
};
