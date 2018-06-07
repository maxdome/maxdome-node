module.exports = async ({ redis }) => {
  await redis.flushall();
};

module.exports.controller = ({ redis, secret }) => {
  if (!secret) {
    throw new Error('missing secret for redis-flushall');
  }
  return async (req, res) => {
    if (req.query.secret !== secret) {
      res.sendStatus(403);
    } else {
      await module.exports({ redis });
      res.sendStatus(204);
    }
  };
};
