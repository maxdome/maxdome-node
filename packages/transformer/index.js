const Graph = require('node-dijkstra');

class Transformer {
  constructor() {
    this.route = new Graph();
    this.transformers = [];
  }

  add(transformer) {
    const to = {};
    to[transformer.to] = 1;
    this.route.addNode(transformer.from, to);
    this.transformers.push(transformer);
    return this;
  }

  detect(data) {
    for (const transformer of this.transformers) {
      if (transformer.detect(data)) {
        return transformer.from;
      }
    }
    throw new Error('unable to detect a supported transformer');
  }

  get(from, to) {
    const path = this.route.path(from, to);
    if (!path) {
      throw new Error(`unable to find a path to transform from "${from}" to "${to}"`);
    }
    const transformers = [];
    from = undefined;
    for (const to of path) {
      if (from) {
        transformers.push(this.transformers.find(transformer => transformer.from === from && transformer.to === to));
      }
      from = to;
    }
    return {
      detect: transformers[0].detect,
      from,
      to,
      run: data => {
        for (const transformer of transformers) {
          data = transformer.run(data);
        }
        return data;
      },
    };
  }

  run(from, to, data) {
    if (typeof from !== 'string') {
      data = from;
      from = this.detect(data);
    }
    return this.get(from, to).run(data);
  }
}

module.exports = Transformer;
