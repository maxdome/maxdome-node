const Asset = require('./Asset');

class AssetsOptions {
  constructor(
    { hostname: hostname = 'maxdome.de', protocol: protocol = 'http' } = {}
  ) {
    this.hostname = hostname;
    this.protocol = protocol;
  }

  toRequestOptions() {
    return {
      method: 'get',
      transform: data =>
        data.assetList.map(
          asset =>
            new Asset(asset, {
              hostname: this.hostname,
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
