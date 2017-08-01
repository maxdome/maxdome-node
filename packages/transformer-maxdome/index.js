const Transformer = require('@maxdome/transformer');

module.exports = new Transformer().add('./transformers/asset-schema.org').add('./transformers/mmw-asset.org');
