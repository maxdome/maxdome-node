module.exports = ({ db }) => () => {
  if (db.connection.readyState !== 1) {
    throw new Error('db connection not ready');
  }
};
