const rp = require('request-promise');

module.exports = ({ cbe2Url }) =>
  async function asset(objectId, objectType) {
    if (!objectType) {
      for (objectType of ['a', 'b', 'ma']) {
        const mamAsset = asset(objectId, objectType);
        if (mamAsset) {
          return mamAsset;
        }
      }
    } else {
      try {
        const mamAsset = await rp.get({
          json: true,
          url:
            cbe2Url +
            `/content_backend/public/export/export.php?source=mam` +
            `&objectType=${objectType}&objectId=${objectId}&referencedIds=true`,
        });
        return mamAsset;
      } catch (e) {
        if (e.statusCode !== 406) {
          throw e;
        }
      }
    }
  };
