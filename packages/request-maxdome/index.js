const getRequestBuilder = require('./src/getRequestBuilder');

Object.assign(getRequestBuilder, {
  Asset: require('./src/Asset'),
  AssetOptions: require('./src/AssetOptions'),
  AssetsOptions: require('./src/AssetsOptions'),
  AssetsQueryOptions: require('./src/AssetsQueryOptions'),
  MaxdomeOptions: require('./src/MaxdomeOptions'),
  SessionOptions: require('./src/SessionOptions'),
  getRequestBuilder: require('./src/getRequestBuilder'),
});

module.exports = getRequestBuilder;
