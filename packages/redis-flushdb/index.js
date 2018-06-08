module.exports = ({ redis }) => async (db) => {
  if (db !== undefined && db !== redis.options.db) {
    await redis.select(db);
    await redis.flushdb();
    await redis.select(redis.options.db);
  } else {
    await redis.flushdb();
  }
};

module.exports.controller = ({ redis, secret }) => {
  if (!secret) {
    throw new Error('missing secret for redis-flushdb');
  }
  return async (req, res) => {
    if (req.query.secret !== secret) {
      res.sendStatus(403);
    } else {
      await module.exports({ redis })(req.query.db);
      res.sendStatus(204);
    }
  };
};
