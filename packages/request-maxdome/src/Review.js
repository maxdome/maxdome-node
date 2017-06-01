const Asset = require('./Asset');
const Maxpert = require('./Maxpert');

class Review {
  constructor(data) {
    const asset = data.mam_asset_id[0];
    if (asset) {
      this.asset = new Asset(asset);
    }
    this.headline = data.headline;
    const maxpert = data.maxpert[0];
    if (maxpert) {
      this.maxpert = new Maxpert(maxpert);
    }
  }
}

module.exports = Review;
