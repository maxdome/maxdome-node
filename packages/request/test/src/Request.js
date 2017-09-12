const assert = require('assert');

const Request = require('../../').Request;

const defaultOptions = { timeout: 1000 };

describe('/packages/request/src/Request.js', () => {
  it('should be empty if nothing is set', () => {
    const actual = new Request().getOptions();
    const expected = {};
    assert.deepEqual(actual, Object.assign({}, defaultOptions, expected));
  });

  it('should be able to handle one simple options got on construction', () => {
    const actual = new Request({
      url: 'http://google.de',
    }).getOptions();
    const expected = { url: 'http://google.de' };
    assert.deepEqual(actual, Object.assign({}, defaultOptions, expected));
  });

  it('should be able to handle one simple options got later', () => {
    const actual = new Request()
      .addOptions({
        url: 'http://google.de',
      })
      .getOptions();
    const expected = { url: 'http://google.de' };
    assert.deepEqual(actual, Object.assign({}, defaultOptions, expected));
  });

  it('should be able to handle simple url object options', () => {
    const actual = new Request()
      .addOptions({
        url: {
          hostname: 'google.de',
          protocol: 'http',
        },
      })
      .getOptions();
    const expected = { url: 'http://google.de' };
    assert.deepEqual(actual, Object.assign({}, defaultOptions, expected));
  });

  it('should be able to handle complex url object options with queries', () => {
    const actual = new Request()
      .addOptions({
        url: {
          hostname: 'google.de',
          protocol: 'http',
          query: {
            'a[]': ['b', 'c'],
            d: ['e'],
          },
        },
      })
      .getOptions();
    const expected = { url: 'http://google.de?a%5B%5D=b&a%5B%5D=c&d=e' };
    assert.deepEqual(actual, Object.assign({}, defaultOptions, expected));
  });

  it('should be able to handle complex url object options with searchs', () => {
    const actual = new Request()
      .addOptions({
        url: {
          hostname: 'google.de',
          protocol: 'http',
          search: {
            'a[]': ['b', 'c'],
            d: ['e'],
          },
        },
      })
      .getOptions();
    const expected = { url: 'http://google.de?a%5B%5D=b&a%5B%5D=c&d=e' };
    assert.deepEqual(actual, Object.assign({}, defaultOptions, expected));
  });

  it('should be able to handle object options', () => {
    const actual = new Request()
      .addOptions({
        toRequestOptions: () => ({
          url: 'http://google.de',
        }),
      })
      .getOptions();
    const expected = { url: 'http://google.de' };
    assert.deepEqual(actual, Object.assign({}, defaultOptions, expected));
  });

  it('should merge options with different attributes', () => {
    const actual = new Request()
      .addOptions({
        method: 'post',
      })
      .addOptions({
        url: 'http://google.de',
      })
      .getOptions();
    const expected = { method: 'post', url: 'http://google.de' };
    assert.deepEqual(actual, Object.assign({}, defaultOptions, expected));
  });

  it('should overwrite options with the same attributes and number values', () => {
    const actual = new Request()
      .addOptions({
        number: 1,
      })
      .addOptions({
        number: 2,
      })
      .getOptions();
    const expected = { number: 2 };
    assert.deepEqual(actual, Object.assign({}, defaultOptions, expected));
  });

  it('should overwrite options with the same attributes and string values', () => {
    const actual = new Request()
      .addOptions({
        string: 'a',
      })
      .addOptions({
        string: 'b',
      })
      .getOptions();
    const expected = { string: 'b' };
    assert.deepEqual(actual, Object.assign({}, defaultOptions, expected));
  });

  it('should concatenate options with the same attributes and array values', () => {
    const actual = new Request()
      .addOptions({})
      .addOptions({
        array: ['a'],
      })
      .addOptions({
        array: ['b'],
      })
      .getOptions();
    const expected = { array: ['a', 'b'] };
    assert.deepEqual(actual, Object.assign({}, defaultOptions, expected));
  });

  it('should accept also an array of options', () => {
    const actual = new Request()
      .addOptions([
        {
          method: 'post',
        },
        {
          url: 'http://google.de',
        },
      ])
      .getOptions();
    const expected = { method: 'post', url: 'http://google.de' };
    assert.deepEqual(actual, Object.assign({}, defaultOptions, expected));
  });
});
