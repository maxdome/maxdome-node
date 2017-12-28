# Usage

```
const healthChecks = {
  service1: 'https://service1.com/ping',
  service2: { method: 'POST', url: 'https://service2.com/ping' },
  service3: { url: 'https://service3.com/ping', options: { headers: { 'Authorization': `Basic dXNlcjpwYXNz` } } },
};

app.use(require('@maxdome/healthcheck')({ healthChecks }));
```
