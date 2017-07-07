# Usage

## Get an asset without knowing the type

```javascript
const cbe2 = require('@maxdome/cbe2')({ cbe2Url: process.env.CBE2_URL });

const objectId = 0;
const mamAsset = cbe2.asset(objectId);
```

## Get an asset with the type

```javascript
const cbe2 = require('@maxdome/cbe2')({ cbe2Url: process.env.CBE2_URL });

const objectId = 0;
const objectType = '';
const mamAsset = cbe2.asset(objectId, objectType);
```

## Get the asset data of all changed assets for a diff

```javascript
const cbe2 = require('@maxdome/cbe2')({ cbe2Url: process.env.CBE2_URL });

const timestamp = 0;
const diffs = cbe2.diff(timestamp);

for (const diff of diffs) {
  for (const objectId of diff.changed) {
    const mamAsset = await cb2.asset(objectId, diff.objectType);
  }
}
```
