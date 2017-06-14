const parse = require('parse-duration');

module.exports = (str, format) => {
  if (!format) {
    [str, format] = str.split(' in ');
  }
  if (format && !parse[format] && format.substr(-1) === 's') {
    format = format.substr(0, format.length - 1);
  }
  return parse(str) / parse[format || 'ms'];
};
