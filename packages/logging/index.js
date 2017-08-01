const winston = require('winston');

module.exports = ({
  level,
  transports: transports = [
    {
      type: 'Console',
      options: {
        timestamp: true,
        colorize: process.env.NODE_ENV !== 'production',
        prettyPrint: process.env.NODE_ENV !== 'production',
        json: process.env.NODE_ENV === 'production',
        stringify: obj => JSON.stringify(obj),
        silent: process.env.NODE_ENV === 'test',
        level: 'info',
      },
    },
  ],
}) => {
  if (level) {
    for (const transport of transports) {
      transport.options = transport.options || {};
      transport.options.level = level;
    }
  }
  return (category, options) => {
    const logger = new winston.Logger(options);
    for (const transport of transports) {
      logger.add(winston.transports[transport.type], Object.assign({}, transport.options, { label: category }));
    }
    return logger;
  };
};
