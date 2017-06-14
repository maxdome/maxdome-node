const parse = require('parse-duration');

module.exports = (str, format) => {
  if (!format) {
    [str, format] = str.split(' in ');
  }
  return parse(str) / parse[format || 'ms'];
};
