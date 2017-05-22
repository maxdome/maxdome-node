require('dotenv-safe').config();

const app = require('@maxdome/express')();

const logging = require('@maxdome/logging')({ level: process.env.LOG_LEVEL });
const serverLogger = logging('server');
serverLogger.info('initializing server');
app.use(require('@maxdome/logging-middleware')({ logger: logging('req') }));

app.use('/api', require('@maxdome/cors')());
app.use('/api', require('./routers/api')());

app.use('/docs', require('@maxdome/swagger')());
app.get('/', (req, res) => {
  res.redirect('/docs/');
});

const httpAuth = require('@maxdome/http-auth')({
  user: process.env.HTTP_AUTH_USER,
  password: process.env.HTTP_AUTH_PASSWORD,
});
app.use('/info', httpAuth, require('@maxdome/info')());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  serverLogger.info(`server listen on ${port}`);
});
