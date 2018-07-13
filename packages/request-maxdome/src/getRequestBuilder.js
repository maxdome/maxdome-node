const AssetsOptions = require('./AssetsOptions');
const MaxdomeErrorLogger = require('./MaxdomeErrorLogger');
const MaxdomeOptions = require('./MaxdomeOptions');
const RequestBuilder = require('@dnode/request').RequestBuilder;

module.exports = ({
  assetOptions: assetOptions = {
    hostnames: (hostnames = {
      package: process.env.ASSET_HOSTNAME_PACKAGE || 'www.maxdome.de',
      store: process.env.ASSET_HOSTNAME_STORE || 'store.maxdome.de',
    }),
    protocol: (protocol = process.env.ASSET_PROTOCOL),
  },
  log,
  logger,
  maxdomeOptions: maxdomeOptions = {
    hostname: process.env.MAXDOME_HOSTNAME,
    protocol: process.env.MAXDOME_PROTOCOL,
    url: process.env.MAXDOME_URL,
  },
} = {}) =>
  new RequestBuilder(new MaxdomeOptions(maxdomeOptions))
    .addErrorLogger(new MaxdomeErrorLogger({ log, logger }))
    .setOptions('assets', new AssetsOptions(assetOptions));
