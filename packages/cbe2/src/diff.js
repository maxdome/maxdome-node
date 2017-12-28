const rp = require('request-promise');

module.exports = ({ cbe2Url }) =>
  async function diff(timestamp = 0, objectType) {
    if (!objectType) {
      const diffs = [];
      for (objectType of ['a', 'b', 'ma']) {
        diffs.push(diff(objectType));
      }
      return diffs;
    } else {
      const data = await rp.get({
        json: true,
        url:
          cbe2Url +
          `/content_backend/public/export/export.php?source=cbe` +
          `&objectType=${objectType}&timestamp=${timestamp}`,
      });
      return { objectType, deleted: data.deleted, updated: data.updated };
    }
  };
