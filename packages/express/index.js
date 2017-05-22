const express = require('express');

module.exports = () => {
  const app = express();
  app.set('x-powered-by', false);
  app.get('/ping', (req, res) => {
    res.sendStatus(200);
  });
  return app;
};
