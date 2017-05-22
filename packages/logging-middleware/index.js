const morgan = require('morgan');

module.exports = ({ format: format = 'combined', logger }) =>
  morgan(format, {
    stream: {
      write: message => {
        logger.info(message.replace('\n', ''));
      },
    },
  });
