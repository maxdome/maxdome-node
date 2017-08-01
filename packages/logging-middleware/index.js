const expressWinston = require('express-winston');

module.exports = ({ logging, options }) => {
  const requestLogger = logging('request');

  return expressWinston.logger(
    Object.assign(
      {
        winstonInstance: requestLogger,
        meta: true,
        dynamicMeta: (req, res) => ({
          path: req.route ? req.route.path : req.path,
        }),
        skip: (req, res) => req.baseUrl === '/docs' || req.originalUrl === '/ping',
      },
      options
    )
  );
};

module.exports.errorLogging = ({ logging, options, errorHandler }) => {
  const errorLogger = logging('error');

  const errorMiddlewares = [expressWinston.errorLogger(Object.assign({ winstonInstance: errorLogger }, options))];

  if (process.env.NODE_ENV === 'production') {
    errorMiddlewares.push(
      errorHandler ||
        ((err, req, res, next) => {
          res.sendStatus(err.status || err.statusCode || 500);
        })
    );
  }

  return errorMiddlewares;
};
