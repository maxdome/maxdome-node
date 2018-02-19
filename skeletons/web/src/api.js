const bodyParser = require('body-parser');
const express = require('express');

module.exports = () => {
  const router = express.Router();
  router.use(bodyParser.json());

  router.get('/', (req, res) => {
    res.send();
  });

  return router;
};
