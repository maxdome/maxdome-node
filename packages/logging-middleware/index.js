const expressWinston = require('express-winston');

module.exports = ({ logging, options }) => () => {
  const logger = logging('request');
module.exports = ({ logging, options }) => {

  return expressWinston.logger(
    Object.assign(
      {
        winstonInstance: logger,
        meta: true,
        dynamicMeta: (req, res) => ({
          path: req.route ? req.route.path : req.path,
        }),
        skip: (req, res) =>
          req.baseUrl === '/docs' || req.originalUrl === '/ping',
      },
      options
    )
  );
};
