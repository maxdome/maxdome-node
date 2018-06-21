'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports.controller = (healths = {}) => (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const checks = yield Promise.all(Object.keys(healths).map((() => {
      var _ref2 = _asyncToGenerator(function* (name) {
        let health = healths[name];
        if (typeof health === 'function') {
          health = { check: health, data: {} };
        }
        let status = 'UP';
        try {
          yield health.check();
        } catch (e) {
          status = 'DOWN';
        }
        return { [name]: Object.assign({}, health.data, { status }) };
      });

      return function (_x3) {
        return _ref2.apply(this, arguments);
      };
    })()));
    let service;
    if (checks.find(function (check) {
      return check[Object.keys(check)[0]].status === 'DOWN';
    })) {
      service = { code: 500, status: 'DOWN' };
    } else {
      service = { code: 200, status: 'UP' };
    }
    res.status(service.code).send(Object.assign({}, checks.reduce(function (a, b) {
      return Object.assign({}, a, b);
    }, {}), { status: service.status }));
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();
