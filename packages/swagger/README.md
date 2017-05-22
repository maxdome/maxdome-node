# Usage

```
app.use('/docs', require('@maxdome/swagger')());
app.get('/', (req, res) => {
  res.redirect('/docs/');
});
```
