class Asset {
  constructor(
    data,
    { hostname: hostname = 'maxdome.de', protocol: protocol = 'http' } = {}
  ) {
    this.id = data.id;

    const types = {
      assetvideofilm: 'movie',
      assetvideofilmtvseries: 'episode',
      multiassettvseriesseason: 'season',
      multiassetbundletvseries: 'series',
    };
    this.type = types[data['@class'].toLowerCase()];

    this.title = data.title;
    if (this.type === 'season') {
      this.title += ` (Staffel ${data.number})`;
    }
    this.searchTitle = data.title
      .replace(' (Hot From the UK)', '')
      .replace(' (Hot from the US)', '');
    this.hotFromTheUK = data.title.includes(' (Hot From the UK)');
    this.hotFromTheUS = data.title.includes(' (Hot from the US)');
    this.episodeTitle = data.episodeTitle;
    this.episodeNumber = data.episodeNumber;
    this.seasonNumber = data.seasonNumber || data.number;

    this.description = data.descriptionShort;

    if (data.coverList) {
      const poster = data.coverList.filter(
        cover => cover.usageType === 'poster'
      )[0];
      if (poster) {
        this.image = poster.url;
      }
    }

    this.areas = [];
    if (data.fullMarkingList.includes('inPremiumIncluded')) {
      this.areas.push('package');
    }
    if (
      data.mediaUsageList.includes('DTO') ||
      data.mediaUsageList.includes('TVOD')
    ) {
      this.areas.push('store');
    }

    this.countries = data.countryList;
    this.duration = data.duration;
    this.fskLevels = data.fskLevelList;
    this.genres = data.genreList
      .filter(genre => genre.genreType === 'genre')
      .map(genre => genre.value);
    this.link = `${protocol}://${hostname}/${data.id}`;
    this.productionYear = data.productionYear;
    this.rating = data.userrating;
  }
}

module.exports = Asset;
