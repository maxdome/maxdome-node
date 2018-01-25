const express = require('express');
const request = require('supertest');
const assert = require('assert');

describe('/packages/healthcheck', () => {
  let app;
  const healthcheck = require('../');

  beforeEach(() => {
    app = express();
  });

  describe('/', () => {
    it('allows advanced config', () => {
      app.use(
        '/health',
        healthcheck({ healthChecks: { github: { method: 'POST', url: 'https://status.github.com/api/status.json' } } })
      );
      return request(app)
        .get('/health')
        .expect(503)
        .then(res => {
          assert.deepEqual(res.body, { github: 404 });
        });
    });
    it('returns status 503 if a service is erroneous', () => {
      app.use(
        '/health',
        healthcheck({
          healthChecks: { google: 'https://google.com/ping', github: 'https://status.github.com/api/status.json' },
        })
      );
      return request(app)
        .get('/health')
        .expect(503)
        .then(res => {
          assert.deepEqual(res.body, { google: 400, github: 200 });
        });
    });
    it('returns status 200 all services are ok', () => {
      app.use('/health', healthcheck({ healthChecks: { github: 'https://status.github.com/api/status.json' } }));
      return request(app)
        .get('/health')
        .expect(200)
        .then(res => {
          assert.deepEqual(res.body, { github: 200 });
        });
    });
  });

  describe('/details', () => {
    it('allows advanced config', () => {
      app.use(
        '/health',
        healthcheck({
          healthChecks: { github: { method: 'POST', url: 'https://status.github.com/api/status.json' } },
        })
      );
      return request(app)
        .get('/health/details')
        .expect(503)
        .then(res => {
          assert.equal(res.body.github.method, 'POST');
          assert.equal(res.body.github.url, 'https://status.github.com/api/status.json');
          assert.equal(res.body.github.status, 404);
          assert.equal(typeof res.body.github.response.headers, 'object');
        });
    });
    it('returns status 503 if a service is erroneous', () => {
      app.use(
        '/health',
        healthcheck({
          healthChecks: { google: 'https://google.com/ping', github: 'https://status.github.com/api/status.json' },
        })
      );
      return request(app)
        .get('/health/details')
        .expect(503)
        .then(res => {
          assert.equal(res.body.google.method, 'GET');
          assert.equal(res.body.google.url, 'https://google.com/ping');
          assert.equal(res.body.google.status, 400);
          assert.equal(typeof res.body.google.response.headers, 'object');
          assert.equal(res.body.github.method, 'GET');
          assert.equal(res.body.github.url, 'https://status.github.com/api/status.json');
          assert.equal(res.body.github.status, 200);
          assert.equal(typeof res.body.github.response.headers, 'object');
        });
    });
    it('returns status 200 all services are ok', () => {
      app.use('/health', healthcheck({ healthChecks: { github: 'https://status.github.com/api/status.json' } }));
      return request(app)
        .get('/health/details')
        .expect(200)
        .then(res => {
          assert.equal(res.body.github.method, 'GET');
          assert.equal(res.body.github.url, 'https://status.github.com/api/status.json');
          assert.equal(res.body.github.status, 200);
          assert.equal(typeof res.body.github.response.headers, 'object');
          assert.equal(typeof res.body.github.response.body, 'object');
        });
    });
  });
});
