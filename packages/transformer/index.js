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

  run(from, to, data) {
    if (typeof from !== 'string') {
      data = from;
      from = detect(data);
    }
    const path = this.route.path(from, to);
    if (!path) {
      throw new Error(`unable to find a path to transform from "${from}" to "${to}"`);
    }
    from = undefined;
    for (const to of path) {
      if (from) {
        data = this.transformers.find(transformer => transformer.from === from && transformer.to === to).run(data);
      }
      from = to;
    }
    return data;
  }
}

module.exports = Transformer;
