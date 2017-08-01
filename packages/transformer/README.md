# Usage

```javascript
const Transformer = require('@maxdome/transformer');

const transformer = new Transformer()
  .add({ 
    detect: data.format === 'a', 
    from: 'a', 
    to: 'b', 
    run: data => data.format = 'b', 
  })
  .add({ 
    detect: data.format === 'b', 
    from: 'b', 
    to: 'c', 
    run: data => data.format = 'c', 
  });
  
const data = { format: 'a' };
const to = 'c';

transformer.run(data, to); // { format: 'c' }
```
