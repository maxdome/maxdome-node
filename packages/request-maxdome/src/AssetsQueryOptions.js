class AssetsQueryOptions {
  constructor(ids) {
    this.query = {};
    if (ids) {
      this.addFilter('assetId', ids);
    }
  }

  addQuery(key, value) {
    if (this.query[key]) {
      if (!Array.isArray(this.query[key])) {
        this.query[key] = [this.query[key]];
      }
      this.query[key].push(value);
    } else {
      this.query[key] = value;
    }
    return this;
  }

  addParam(type, name, values) {
    if (values) {
      if (!Array.isArray(values)) {
        values = [values];
      }
      this.addQuery(type, `${name}~${values.join('|')}`);
    } else {
      this.addQuery(type, name);
    }
    return this;
  }

  addFilter(name, values) {
    const alternativeNames = {
      package: 'hasPackageContent',
      store: 'availableWithoutPackage',
    };
    if (alternativeNames[name]) {
      name = alternativeNames[name];
    }
    this.addParam('filter[]', name, values);
    return this;
  }

  addSort(name, values) {
    this.addParam('sort[]', name, values);
    return this;
  }

  toRequestOptions() {
    return {
      url: {
        query: this.query,
      },
    };
  }
}

module.exports = AssetsQueryOptions;
