const winston = require('winston');

module.exports = ({
  filename,
  level,
  transports: transports = [{ level: 'debug', type: 'Console' }],
}) => {
  if (filename) {
    transports.push({
      type: 'File',
      options: { filename, level: 'debug' },
    });
  }
  if (level) {
    for (const transport of transports) {
      transport.options = transport.options || {};
      transport.options.level = level;
    }
  }
  return (category, options) => {
    const logger = new winston.Logger(options);
    for (const transport of transports) {
      logger.add(
        winston.transports[transport.type],
        Object.assign({}, transport.options, { label: category })
      );
    }
    return logger;
  };
};
