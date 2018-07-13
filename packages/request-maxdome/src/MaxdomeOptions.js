const fs = require('fs');

const app = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`));
const lib = JSON.parse(fs.readFileSync(`${__dirname}/../package.json`));

class MaxdomeOptions {
  constructor({ hostname: hostname = 'heimdall.maxdome.de/api', protocol: protocol = 'https', url } = {}) {
    if (url) {
      [this.protocol, this.hostname] = url.split('://');
    } else {
      this.hostname = hostname;
      this.protocol = protocol;
    }
  }

  toRequestOptions() {
    return {
      headers: {
        accept: 'application/json',
        client: 'mxd_store',
        clienttype: 'webportal',
        'content-type': 'application/json',
        language: 'de_DE',
        'maxdome-origin': 'maxdome.de',
        platform: 'web',
        'user-agent': `${app.name} v${app.version} via ${lib.name} v${lib.version}`,
      },
      json: true,
      url: {
        hostname: this.hostname,
        protocol: this.protocol,
      },
    };
  }
}

module.exports = MaxdomeOptions;
