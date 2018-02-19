module.exports = (healths = {}) => async (req, res) => {
  const checks = await Promise.all(
    Object.keys(healths).map(async name => {
      let health = healths[name];
      if (typeof health === 'function') {
        health = { check: health, data: {} };
      }
      let status = 'UP';
      try {
        health.check();
      } catch (e) {
        status = 'DOWN';
      }
      return { [name]: Object.assign({}, health.data, { status }) };
    })
  );
  let service;
  if (checks.find(check => check[Object.keys(check)[0]].status === 'DOWN')) {
    service = { code: 500, status: 'DOWN' };
  } else {
    service = { code: 200, status: 'UP' };
  }
  res
    .status(service.code)
    .send(Object.assign({}, checks.reduce((a, b) => Object.assign({}, a, b), {}), { status: service.status }));
};
