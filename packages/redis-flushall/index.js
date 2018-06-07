module.exports = async ({ redis }) => {
  await redis.flushall();
};

module.exports.controller = ({ redis, secret }) => async (req, res) => {
  if (secret && req.query.secret !== secret) {
    res.sendStatus(403);
  } else {
    await module.exports({ redis });
    res.sendStatus(204);
  }
};
