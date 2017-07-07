module.exports = ({ cbe2Url }) => ({
  asset: require('./src/asset')({ cbe2Url }),
  diff: require('./src/diff')({ cbe2Url }),
});
