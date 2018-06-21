const assert = require('power-assert');
const express = require('express');
const request = require('supertest');

['../', '../es5.js'].forEach(path => {
  describe(`packages/health (${path})`, () => {
    it('should have outcome "UP" without any checks', done => {
      const app = express();
      app.get('/health', require(path).controller());
      request(app)
        .get('/health')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          const expected = { status: 'UP' };
          assert.deepEqual(res.body, expected);
          done();
        });
    });

    it('should have outcome "UP" with positive checks', done => {
      const app = express();
      app.get('/health', require(path).controller({
        a: () => {},
        b: () => {},
      }));
      request(app)
        .get('/health')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          const expected = {
            status: 'UP',
            a: { status: 'UP' },
            b: { status: 'UP' },
          };
          assert.deepEqual(res.body, expected);
          done();
        });
    });

    it('should have outcome "UP" with positive checks and data', done => {
      const app = express();
      app.get('/health', require(path).controller({
        a: { check: () => {}, data: { c: 'd' } },
        b: { check: () => {}, data: { e: 'f' } },
      }));
      request(app)
        .get('/health')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          const expected = {
            status: 'UP',
            a: { status: 'UP', c: 'd' },
            b: { status: 'UP', e: 'f' },
          };
          assert.deepEqual(res.body, expected);
          done();
        });
    });

    it('should have outcome "DOWN" if at least one check throws an error', done => {
      const app = express();
      app.get('/health', require(path).controller({
        a: () => {
          throw new Error('test');
        },
        b: () => {},
      }));
      request(app)
        .get('/health')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .then(res => {
          const expected = {
            status: 'DOWN',
            a: { status: 'DOWN' },
            b: { status: 'UP' },
          };
          assert.deepEqual(res.body, expected);
          done();
        });
    });

    it('should support async checks', done => {
      const app = express();
      app.get('/health', require(path).controller({
        a: () => {
          return new Promise((resolve, reject) => {
            process.nextTick(() => {
              reject(new Error('test'));
            });
          });
        },
        b: () => {},
      }));
      request(app)
        .get('/health')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(500)
        .then(res => {
          const expected = {
            status: 'DOWN',
            a: { status: 'DOWN' },
            b: { status: 'UP' },
          };
          assert.deepEqual(res.body, expected);
          done();
        });
    });
  });
});
