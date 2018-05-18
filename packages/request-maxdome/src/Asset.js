function slugify(title) {
  return title
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[!"\#$%&'()*+,\-./:;<=>?@\[\\\]^_`{|}~]+/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase();
}

class Asset {
  constructor(
    data,
    {
      hostnames: hostnames = {
        package: 'www.maxdome.de',
        store: 'store.maxdome.de',
      },
      protocol: protocol = 'https',
    } = {}
  ) {
    this._rawData = data;

    this.hostnames = hostnames;
    this.protocol = protocol;

    this.id = data.id;
    this.referenceId = data.referenceId;

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
    this.originalTitle = data.title;
    this.searchTitle = data.title.replace(' (Hot From the UK)', '').replace(' (Hot from the US)', '');
    this.hotFromTheUK = data.title.includes(' (Hot From the UK)');
    this.hotFromTheUS = data.title.includes(' (Hot from the US)');
    this.episodeTitle = data.episodeTitle;
    this.episodeNumber = data.episodeNumber;
    this.seasonNumber = data.seasonNumber || data.number;

    this.description = data.descriptionShort;
    this.descriptions = {
      long: data.descriptionLong,
      short: data.descriptionShort,
      soft: data.descriptionSoft,
      teaser: data.descriptionTeaser,
    };

    if (data.coverList) {
      const poster = data.coverList.filter(cover => cover.usageType === 'poster')[0];
      if (poster) {
        this.image = poster.url;
      }
    }

    this.areas = [];
    if (data.fullMarkingList.includes('inPremiumIncluded')) {
      this.areas.push('package');
    }
    if (data.mediaUsageList.includes('DTO') || data.mediaUsageList.includes('TVOD')) {
      this.areas.push('store');
    }

    this.countries = data.countryList || [];
    this.duration = data.duration;
    this.fskLevels = data.fskLevelList;
    this.genres = data.genreList
      .filter(genre => genre.genreType === 'genre' || genre.genreType === '_spielfilm')
      .map(genre => genre.value);
    this.languages = data.languageList;
    this.url = `${protocol}://${hostnames.package}/${data.id}`;
    this.productionYear = data.productionYear;

    if (data.userrating) {
      this.rating = {
        averageRating: data.userrating.averageRating,
        countTotal: data.userrating.countTotal,
      };
    }

    if (data.creditList) {
      this.actors = data.creditList
        .filter(credit => credit.creditType === 'actor')
        .map(credit => ({ name: credit.value }));
      this.directors = data.creditList
        .filter(credit => credit.creditType === 'director')
        .map(credit => ({ name: credit.value }));
    }

    if (this.type === 'episode') {
      if (data.parentIdList) {
        this.seasonId = data.parentIdList[0];
      }
      if (data.grandParentIdList) {
        this.seriesId = data.grandParentIdList[0];
      }
    }

    if (this.type === 'series') {
      if (data.parentIdList) {
        this.seriesId = data.parentIdList[0];
      }
    }
  }

  getImage(width = 204, height = 295) {
    if (this.image) {
      return {
        height,
        url: this.image.replace('__WIDTH__', width).replace('__HEIGHT__', height),
        width,
      };
    }
  }

  getCanonicalURL() {
    let hostname = this.hostnames.store;
    if (this.areas.includes('package')) {
      hostname = this.hostnames.package;
    }
    let path = '';
    switch (this.type) {
      case 'episode':
        path = `/${slugify(this.originalTitle)}/s${this.seasonNumber}/e${this.episodeNumber}-${slugify(
          this.episodeTitle
        )}-${this.id}.html`;
        break;
      case 'movie':
        path = `/${slugify(this.originalTitle)}-${this.id}.html`;
        break;
      case 'season':
        if (this.seasonNumber === '1') {
          path = `/${slugify(this.originalTitle)}-b${this.referenceId}.html`;
        } else {
          path = `/${slugify(this.originalTitle)}-s${this.seasonNumber}-b${this.id}.html`;
        }
        break;
      case 'series':
        path = `/${slugify(this.originalTitle)}-b${this.id}.html`;
        break;
    }
    return `${this.protocol}://${hostname}${path}`;
  }
}

module.exports = Asset;
