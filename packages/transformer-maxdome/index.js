const Transformer = require('@maxdome/transformer');

module.exports = new Transformer()
  .add(require('./transformers/asset-schema.org'))
  .add(require('./transformers/mmw-asset'));
