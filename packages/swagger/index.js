const express = require('express');
const fs = require('fs');
const path = require('path');
const SwaggerParser = require('swagger-parser');

module.exports = ({ config: config = 'config/swagger.json' } = {}) => {
  const router = new express.Router();

  let schema;
  router.get('/swagger.json', async (req, res, next) => {
    try {
      if (!schema) {
        schema = await SwaggerParser.bundle(path.join(process.cwd(), config));
        schema.info.version = require('@maxdome/version')();
      }
      res.send(schema);
    } catch (e) {
      next(e);
    }
  });

  const swaggerUIDirname = path.dirname(
    require.resolve('swagger-ui/package.json')
  );

  let html;
  router.get('/', (req, res, next) => {
    if (!req.originalUrl.endsWith('/')) {
      res.redirect(301, req.originalUrl + '/');
      return;
    }
    try {
      if (!html) {
        html = fs.readFileSync(
          path.join(swaggerUIDirname, 'dist/index.html'),
          'utf8'
        );
        html = html.replace(
          /url = "(.*)"/,
          `url = window.location.origin + window.location.pathname + 'swagger.json'`
        );
      }
      res.send(html);
    } catch (e) {
      next(e);
    }
  });
  router.use('/', express.static(`${swaggerUIDirname}/dist`));

  return router;
};
