const parse = require('parse-duration');

module.exports = (str, format = 'ms') => parse(str) / parse[format];
