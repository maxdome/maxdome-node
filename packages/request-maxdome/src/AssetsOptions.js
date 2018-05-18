const Asset = require('./Asset');

class AssetsOptions {
  constructor({
    hostnames: hostnames = {
      package: 'www.maxdome.de',
      store: 'store.maxdome.de',
    },
    protocol: protocol = 'https',
  } = {}) {
    this.hostnames = hostnames;
    this.protocol = protocol;
  }

  toRequestOptions() {
    return {
      method: 'get',
      transform: data =>
        data.assetList.map(
          asset =>
            new Asset(asset, {
              hostnames: this.hostnames,
              protocol: this.protocol,
            })
        ),
      url: {
        path: 'v1/mxd/assets',
      },
    };
  }
}

module.exports = AssetsOptions;
