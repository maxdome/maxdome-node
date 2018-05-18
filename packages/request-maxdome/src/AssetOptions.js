const Asset = require('./Asset');

class AssetOptions {
  constructor(
    assetId,
    {
      hostnames: hostnames = {
        package: 'www.maxdome.de',
        store: 'store.maxdome.de',
      },
      protocol: protocol = 'https',
    } = {}
  ) {
    this.assetId = assetId;
    this.hostnames = hostnames;
    this.protocol = protocol;
  }

  toRequestOptions() {
    return {
      method: 'get',
      transform: data =>
        new Asset(data, {
          hostnames: this.hostnames,
          protocol: this.protocol,
        }),
      url: {
        path: `v1/assets/${this.assetId}`,
      },
    };
  }
}

module.exports = AssetOptions;
