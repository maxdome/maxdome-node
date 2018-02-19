require('@maxdome/env');

const logging = require('@maxdome/logging')({
  level: process.env.LOG_LEVEL,
});
require('@maxdome/exception-handling')({ logging });
const appLogger = logging('app');
appLogger.info('initializing server');
const app = require('@maxdome/express')();
app.use(require('@maxdome/logging-middleware')({ logging }));

app.use('/docs', require('@maxdome/swagger')({ config: 'docs/swagger.yml' }));
app.get('/health', require('@maxdome/health')());

app.use('/api', require('./api')());

app.use(require('@maxdome/logging-middleware').errorLogging({ logging }));
if (!module.parent) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    appLogger.info(`Server listening on ${port}`);
  });
}
module.exports = app;
