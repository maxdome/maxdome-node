const _ = {
  pick: require('lodash.pick'),
};
const express = require('express');
const fs = require('fs');
const path = require('path');

module.exports = () => {
  const router = new express.Router();

  const version = require('@maxdome/version')();
  router.get('/version', (req, res) => {
    res.send(version);
  });

  let env = {};
  try {
    const keys = fs
      .readFileSync(path.join(process.cwd(), '.env.example'), 'utf-8')
      .split('\n')
      .map(line => {
        const matches = line.match(/([A-Z_]*)=.*? #info/);
        if (matches) {
          return matches[1];
        }
      })
      .filter(key => key);
    env = _.pick(process.env, keys);
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e;
    }
  }
  
  router.get('/env', (req, res) => {
    res.send(env);
  });

  return router;
};
