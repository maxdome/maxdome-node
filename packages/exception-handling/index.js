module.exports = ({ logging }) => {
  const exceptionLogger = logging('exception');

  process
    .on('unhandledRejection', err => {
      exceptionLogger.error('UnhandledRejection', err);
    })
    .on('uncaughtException', err => {
      exceptionLogger.error('UncaughtException', err);
      process.exit(1);
    });
};
