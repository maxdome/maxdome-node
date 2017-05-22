const fs = require('fs');
const path = require('path');

let version;
module.exports = () => {
  if (!version) {
    version = `v${require(path.join(process.cwd(), 'package.json')).version}`;
    try {
      version +=
        '-' + fs.readFileSync(path.join(process.cwd(), 'REVISION'), 'utf-8');
    } catch (e) {
      if (e.code !== 'ENOENT') {
        throw e;
      }
    }
  }
  return version;
};
