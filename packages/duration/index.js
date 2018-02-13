const parse = require('parse-duration');

module.exports = ms => {
  if (typeof ms !== 'number') {
    ms = parse(ms);
  }

  const duration = {};

  const pluralizations = [
    'nanosecond',
    'microsecond',
    'millisecond',
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
  ];
  for (const pluralization of pluralizations) {
    duration[pluralization + 's'] = () => ms / parse[pluralization];
  }

  duration.toISOString = () => {
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
  };

  return duration;
};
