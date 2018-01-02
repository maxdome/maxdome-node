const express = require('express');
const got = require('got');

module.exports = function(options = {}) {
  const router = new express.Router();
  const healthChecks = options.healthChecks || {};

  function checkServices() {
    const results = {};
    return Promise.all(
      Object.keys(healthChecks).map(async name => {
        let dep = (results[name] =
          typeof healthChecks[name] === 'string'
            ? { method: 'GET', url: healthChecks[name] }
            : Object.assign({}, healthChecks[name]));
        dep.options = Object.assign({ json: true }, dep.options);

        let res;
        try {
          res = await got[dep.method ? dep.method.toLowerCase() : 'get'](dep.url, dep.options);
        } catch (err) {
          res = err.response;
        }

        const connOptions = Object.getOwnPropertySymbols(res.req.connection).find(
          item => item.toString() === 'Symbol(connect-options)'
        );
        dep.request = {
          body: dep.options.body,
          headers: res.req.connection[connOptions].headers,
        };
        dep.response = {
          body: res.body,
          headers: res.headers,
        };
        dep.status = res.statusCode || res.status || 502;
      })
    )
      .then(() => results)
      .catch(() => results);
  }

  function hasErrors(result) {
    return Object.values(result).some(val => val.status >= 400);
  }

  router.get('/', async (req, res, next) => {
    try {
      const result = await checkServices(healthChecks);
      const err = hasErrors(result);
      const filtered = {};
      Object.entries(result).forEach(([k, v]) => (filtered[k] = v.status));
      res.status(err ? 503 : 200).json(filtered);
    } catch (e) {
      next(e);
    }
  });

  router.get('/details', async (req, res, next) => {
    try {
      const result = await checkServices(healthChecks);
      const err = hasErrors(result);
      res.status(err ? 503 : 200).json(result);
    } catch (e) {
      next(e);
    }
  });

  return router;
};
