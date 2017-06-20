const parse = require('parse-duration');

module.exports = (ms, format) => {
  if (!ms) {
    return;
  }
  if (isNaN(ms)) {
    if (!format) {
      [ms, format] = ms.split(' in ');
    }
    ms = parse(ms);
  }
  if (format && !parse[format] && format.substr(-1) === 's') {
    format = format.substr(0, format.length - 1);
  }
  return ms / parse[format || 'ms'];
};
