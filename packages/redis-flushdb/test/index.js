const assert = require('assert');

const redisFlushDb = require('../');

class RedisMock {
  constructor() {
    this.data = {
      0: {
        a: 'b',
        c: 'd',
        e: 'f',
      },
      1: {
        g: 'h',
      },
    };
    this.options = {
      db: 0,
    };
    this.currentDb = 0;
  }

  select(db) {
    this.currentDb = db;
  }

  flushdb() {
    this.data[this.currentDb] = {};
  }
}

describe.only('/packages/redis-flushdb', () => {
  let redis;
  beforeEach(() => {
    redis = new RedisMock();
  });

  it('should only flush the default database if non is given', async () => {
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 1);
    await redisFlushDb({ redis })();
    assert.equal(Object.keys(redis.data[0]).length, 0);
    assert.equal(Object.keys(redis.data[1]).length, 1);
  });

  it('controller should only flush the default database if non is given and the right secret is given', async () => {
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 1);
    await redisFlushDb.controller({ redis, secret: 'secret' })(
      { query: { secret: 'secret' }},
      { sendStatus: status => {
        assert.equal(status, 204);
      } }
    );
    assert.equal(Object.keys(redis.data[0]).length, 0);
    assert.equal(Object.keys(redis.data[1]).length, 1);
  });

  it('controller should not flush the default database if non is given and the wrong secret is given', async () => {
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 1);
    await redisFlushDb.controller({ redis, secret: 'secret' })(
      { query: { secret: 'wrong secret' }},
      { sendStatus: status => {
        assert.equal(status, 403);
      } }
    );
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 1);
  });

  it('should only flush the 0 database if 0 is given', async () => {
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 1);
    await redisFlushDb({ redis })(0);
    assert.equal(Object.keys(redis.data[0]).length, 0);
    assert.equal(Object.keys(redis.data[1]).length, 1);
  });

  it('controller should only flush the 0 database if 0 is given and the right secret is given', async () => {
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 1);
    await redisFlushDb.controller({ redis, secret: 'secret' })(
      { query: { db: 0, secret: 'secret' }},
      { sendStatus: status => {
        assert.equal(status, 204);
      } }
    );
    assert.equal(Object.keys(redis.data[0]).length, 0);
    assert.equal(Object.keys(redis.data[1]).length, 1);
  });

  it('controller should not flush the 0 database if 0 is given and the wrong secret is given', async () => {
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 1);
    await redisFlushDb.controller({ redis, secret: 'secret' })(
      { query: { db: 0, secret: 'wrong secret' }},
      { sendStatus: status => {
        assert.equal(status, 403);
      } }
    );
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 1);
  });

  it('should only flush the 1 database if 1 is given', async () => {
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 1);
    await redisFlushDb({ redis })(1);
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 0);
  });

  it('controller should only flush the 1 database if 1 is given and the right secret is given', async () => {
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 1);
    await redisFlushDb.controller({ redis, secret: 'secret' })(
      { query: { db: 1, secret: 'secret' }},
      { sendStatus: status => {
        assert.equal(status, 204);
      } }
    );
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 0);
  });

  it('controller should not flush the 1 database if 1 is given and the wrong secret is given', async () => {
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 1);
    await redisFlushDb.controller({ redis, secret: 'secret' })(
      { query: { db: 1, secret: 'wrong secret' }},
      { sendStatus: status => {
        assert.equal(status, 403);
      } }
    );
    assert.equal(Object.keys(redis.data[0]).length, 3);
    assert.equal(Object.keys(redis.data[1]).length, 1);
  });
});
