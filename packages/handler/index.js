module.exports = handler => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (e) {
    if (!res.headersSent) {
      const status = e.status || e.statusCode || 500;
      if (e.message) {
        res.status(status).send(e.message);
      } else {
        res.sendStatus(status);
      }
    }
  }
};
