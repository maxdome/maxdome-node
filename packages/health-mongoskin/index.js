module.exports = ({ db }) => () => {
  if (db._state !== 2) {
    throw new Error('db connection not ready');
  }
};
