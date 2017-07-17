# Usage

```
app.use('/info', require('@maxdome/info')());
```

If a `.env.example` exists, only keys which are defined with an ` #info` will be displayed with the `/info/env`.

e.g. a `.env.example` with:
```
SECRET=
PORT= #info
```

will result in a `/info/env`:
```
{
  "PORT": "8000"
}
```
