const httpAuth = require('http-auth');
const path = require('path');

module.exports = opts => {
  if (!opts.user || !opts.password) {
    return (req, res, next) => {
      next();
    };
  }
  const pkg = require(path.join(process.cwd(), 'package.json'));
  return httpAuth.connect(
    httpAuth.basic({ realm: pkg.name }, (user, password, callback) => {
      callback(user == opts.user && password == opts.password);
    })
  );
};
