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
        healthcheck({ healthChecks: { heimdall: { method: 'POST', url: 'https://heimdall.maxdome.de/info' } } })
      );
      return request(app)
        .get('/health')
        .expect(503)
        .then(res => {
          assert.deepEqual(res.body, { heimdall: 404 });
        });
    });
    it('returns status 503 if a service is erroneous', () => {
      app.use(
        '/health',
        healthcheck({
          healthChecks: { google: 'https://google.com/ping', heimdall: 'https://heimdall.maxdome.de/info' },
        })
      );
      return request(app)
        .get('/health')
        .expect(503)
        .then(res => {
          assert.deepEqual(res.body, { google: 400, heimdall: 200 });
        });
    });
    it('returns status 200 all services are ok', () => {
      app.use('/health', healthcheck({ healthChecks: { heimdall: 'https://heimdall.maxdome.de/info' } }));
      return request(app)
        .get('/health')
        .expect(200)
        .then(res => {
          assert.deepEqual(res.body, { heimdall: 200 });
        });
    });
  });

  describe('/details', () => {
    it('allows advanced config', () => {
      app.use(
        '/health',
        healthcheck({
          healthChecks: { heimdall: { method: 'POST', url: 'https://heimdall-ext-test2.maxdome.de/health/app' } },
        })
      );
      return request(app)
        .get('/health/details')
        .expect(503)
        .then(res => {
          assert.equal(res.body.heimdall.method, 'POST');
          assert.equal(res.body.heimdall.url, 'https://heimdall-ext-test2.maxdome.de/health/app');
          assert.equal(res.body.heimdall.status, 404);
          assert.equal(typeof res.body.heimdall.request.headers, 'object');
          assert.equal(typeof res.body.heimdall.response.headers, 'object');
        });
    });
    it('returns status 503 if a service is erroneous', () => {
      app.use(
        '/health',
        healthcheck({
          healthChecks: { google: 'https://google.com/ping', heimdall: 'https://heimdall.maxdome.de/info' },
        })
      );
      return request(app)
        .get('/health/details')
        .expect(503)
        .then(res => {
          assert.equal(res.body.google.method, 'GET');
          assert.equal(res.body.google.url, 'https://google.com/ping');
          assert.equal(res.body.google.status, 400);
          assert.equal(typeof res.body.google.request.headers, 'object');
          assert.equal(typeof res.body.google.response.headers, 'object');
          assert.equal(res.body.heimdall.method, 'GET');
          assert.equal(res.body.heimdall.url, 'https://heimdall.maxdome.de/info');
          assert.equal(res.body.heimdall.status, 200);
          assert.equal(typeof res.body.heimdall.request.headers, 'object');
          assert.equal(typeof res.body.heimdall.response.headers, 'object');
        });
    });
    it('returns status 200 all services are ok', () => {
      app.use(
        '/health',
        healthcheck({ healthChecks: { heimdall: 'https://heimdall-ext-test2.maxdome.de/health/app' } })
      );
      return request(app)
        .get('/health/details')
        .expect(200)
        .then(res => {
          assert.equal(res.body.heimdall.method, 'GET');
          assert.equal(res.body.heimdall.url, 'https://heimdall-ext-test2.maxdome.de/health/app');
          assert.equal(res.body.heimdall.status, 200);
          assert.equal(typeof res.body.heimdall.request.headers, 'object');
          assert.equal(typeof res.body.heimdall.response.headers, 'object');
          assert.equal(typeof res.body.heimdall.response.body, 'object');
        });
    });
  });
});
