const AssetsOptions = require('./AssetsOptions');
const MaxdomeErrorLogger = require('./MaxdomeErrorLogger');
const MaxdomeOptions = require('./MaxdomeOptions');
const RequestBuilder = require('@maxdome/request').RequestBuilder;
const TipOfTheDaysOptions = require('./TipOfTheDaysOptions');

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
    apikey: process.env.MAXDOME_APIKEY,
    appid: process.env.MAXDOME_APPID,
    hostname: process.env.MAXDOME_HOSTNAME,
    protocol: process.env.MAXDOME_PROTOCOL,
    url: process.env.MAXDOME_URL,
  },
} = {}) =>
  new RequestBuilder(new MaxdomeOptions(maxdomeOptions))
    .addErrorLogger(new MaxdomeErrorLogger({ log, logger }))
    .setOptions('assets', new AssetsOptions(assetOptions))
    .setOptions('tipOfTheDays', new TipOfTheDaysOptions());
