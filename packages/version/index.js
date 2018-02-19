const fs = require('fs');
const path = require('path');

let version;
module.exports = () => {
  if (!version) {
    version = `v${require(path.join(process.cwd(), 'package.json')).version}`;
    try {
      version += '-' + fs.readFileSync(path.join(process.cwd(), 'REVISION'), 'utf-8').trim();
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e;
      }
    }
  }
  return version;
};

module.exports.controller = () => (req, res) => {
  res.status(200).send(module.exports());
};
