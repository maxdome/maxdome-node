# Usage

**Attention**: `@maxdome/request-maxdome` will use several information from the `package.json` and add them to the headers. This makes it easier to identify the source of the request in the logs of maxdome if there are issues.
The information which will be used:
* user-agent: `${app.name} v${app.version} via ${lib.name} v${lib.version}`

## Initialize with useful environment variables

`apikey` and `appid` are only needed if there are requests with another platform as `webportal`. `hostname` and `protocol` has the production api (https://heimdall.maxdome.de) as default.

```javascript
const maxdome = require('@maxdome/request-maxdome').getRequestBuilder({
  maxdomeOptions: {
    apikey: process.env.MAXDOME_APIKEY,
    appid: process.env.MAXDOME_APPID,
    hostname: process.env.MAXDOME_HOSTNAME,
    protocol: process.env.MAXDOME_PROTOCOL,
  }
});
```

## Get information for a specific asset by ID

```javascript
const maxdome = require('@maxdome/request-maxdome').getRequestBuilder();
const AssetsQueryOptions = require('@maxdome/request-maxdome').AssetsQueryOptions;

const assetId = 'assetId';
const assetsQueryOptions = new AssetsQueryOptions(assetId);

const assets = await maxdome.request('assets').send(assetsQueryOptions);
```

## Search assets by title and get the first 3 results

```javascript
const maxdome = require('@maxdome/request-maxdome').getRequestBuilder();
const AssetsQueryOptions = require('@maxdome/request-maxdome').AssetsQueryOptions;

const title = 'title';
const assetsQueryOptions = new AssetsQueryOptions()
  .addFilter('contentTypeSeriesOrMovies')
  .addFilter('search', title)
  .addQuery('pageSize', 3);
    
const assets = await maxdome.request('assets').send(assetsQueryOptions);
```

## Get the 50 newest store movies

```javascript
const maxdome = require('@maxdome/request-maxdome').getRequestBuilder();
const AssetsQueryOptions = require('@maxdome/request-maxdome').AssetsQueryOptions;

const assetsQueryOptions = new AssetsQueryOptions()
  .addFilter('availableWithoutPackage')
  .addFilter('movies')
  .addFilter('new')
  .addFilter('notUnlisted')
  .addQuery('pageSize', 50)
  .addSort('activeLicenseStart', 'desc');
    
const assets = await maxdome.request('assets').send(assetsQueryOptions);
```
