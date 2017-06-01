const AssetsOptions = require('./AssetsOptions');
const MaxdomeErrorLogger = require('./MaxdomeErrorLogger');
const MaxdomeOptions = require('./MaxdomeOptions');
const RequestBuilder = require('@dnode/request').RequestBuilder;
const TipOfTheDaysOptions = require('./TipOfTheDaysOptions');

module.exports = (
  {
    assetOptions: assetOptions = {},
    log,
    maxdomeOptions: maxdomeOptions = {},
  } = {}
) =>
  new RequestBuilder(new MaxdomeOptions(maxdomeOptions))
    .addErrorLogger(new MaxdomeErrorLogger(log))
    .setOptions('assets', new AssetsOptions(assetOptions))
    .setOptions('tipOfTheDays', new TipOfTheDaysOptions());
