const Review = require('./Review');

class TipOfTheDay {
  constructor(data) {
    const review = data.review[0];
    if (review) {
      this.review = new Review(review);
    }
    this.published = new Date(data.published);
  }
}

module.exports = TipOfTheDay;
