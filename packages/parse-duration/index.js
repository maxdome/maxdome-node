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
  if (format === 'ISO 8601') {
    let s = parseInt(ms / 1000);
    ms = ms % 1000;
    let m = parseInt(s / 60);
    s = s % 60;
    let h = parseInt(m / 60);
    m = m % 60;
    let d = parseInt(h / 24);
    h = h % 24;
    return (
      'P' +
      (d ? d + 'D' : '') +
      'T' +
      (h ? h + 'H' : '') +
      (m ? m + 'M' : '') +
      (s || ms ? (s ? s : '0') + '.' + (ms ? ('000' + ms).slice(-3) : '0') + 'S' : '')
    );
  }
  if (format && !parse[format] && format.substr(-1) === 's') {
    format = format.substr(0, format.length - 1);
  }
  return ms / parse[format || 'ms'];
};
