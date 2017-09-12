const assert = require('assert');

const Transformer = require('../');

const transformer = new Transformer()
  .add({
    detect: data => data.format === 'a',
    from: 'a',
    to: 'b',
    run: data => {
      data.format = 'b';
      return data;
    },
  })
  .add({
    detect: data => data.format === 'b',
    from: 'b',
    to: 'c',
    run: data => {
      data.format = 'c';
      return data;
    },
  });

describe('/packages/transformer', () => {
  it('Transforms directly from a to b by giving the from and the data', () => {
    const actual = transformer.run('a', 'b', { format: 'a' });
    const expected = { format: 'b' };
    assert.deepEqual(actual, expected);
  });

  it('Transforms directly from a to b by giving only the data to detect the from', () => {
    const actual = transformer.run({ format: 'a' }, 'b');
    const expected = { format: 'b' };
    assert.deepEqual(actual, expected);
  });

  it('Transforms indirectly from a to c', () => {
    const actual = transformer.run('a', 'c', { format: 'a' });
    const expected = { format: 'c' };
    assert.deepEqual(actual, expected);
  });

  it('Returns an actual transformer which transforms indirectly from a to c', () => {
    const actual = transformer.get('a', 'c').run({ format: 'a' });
    const expected = { format: 'c' };
    assert.deepEqual(actual, expected);
  });
});
