const assert = require('power-assert');

const duration = require('../');

describe('packages/parse-duration', () => {
  it('1 hour 20 minutes in milliseconds', () => {
    const actual = duration('1h 20m').milliseconds();
    const expected = 4800000;
    assert.deepEqual(actual, expected);
  });

  it('1 hour 20 minutes in seconds', () => {
    const actual = duration('1h 20m').seconds();
    const expected = 4800;
    assert.deepEqual(actual, expected);
  });

  it('4800000 milliseconds in milliseconds', () => {
    const actual = duration(4800000).milliseconds();
    const expected = 4800000;
    assert.deepEqual(actual, expected);
  });

  it('4800000 milliseconds in seconds', () => {
    const actual = duration(4800000).seconds();
    const expected = 4800;
    assert.deepEqual(actual, expected);
  });

  it('1 hour 20 minutes in ISO 8601', () => {
    const actual = duration('1h 20m').toISOString();
    const expected = 'PT1H20M';
    assert.deepEqual(actual, expected);
  });

  it('1 day 4 hours 20 minutes 7 seconds and 87 milliseconds in ISO 8601', () => {
    const actual = duration('1d 4h 20m 7s 87ms').toISOString();
    const expected = 'P1DT4H20M7.087S';
    assert.deepEqual(actual, expected);
  });
});
