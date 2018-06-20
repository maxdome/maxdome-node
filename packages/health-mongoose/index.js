module.exports = ({ mongoose }) => () => {
  if (mongoose.connection.readyState !== 1) {
    throw new Error('mongoose connection not ready');
  }
};
