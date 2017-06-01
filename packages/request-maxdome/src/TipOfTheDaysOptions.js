const TipOfTheDay = require('./TipOfTheDay');

class TipOfTheDaysOptions {
  toRequestOptions() {
    return {
      headers: {
        client: 'mxd_package',
      },
      method: 'get',
      transform: data => data.map(tipOfTheDay => new TipOfTheDay(tipOfTheDay)),
      url: {
        path: 'v1/components/tipoftheday',
      },
    };
  }
}

module.exports = TipOfTheDaysOptions;
