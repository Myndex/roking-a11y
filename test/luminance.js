/* eslint func-names: 0, prefer-arrow-callback: 0, one-var: 0 */
const assert = require('assert');
const utilities = require('../src/index.js');

const Luminance = utilities.Luminance;

describe('utilities - Luminance', function () {
  it('constructs properly', function() {
    let lum = new Luminance();
    assert.equal(lum.foreground, undefined);
    assert.equal(lum.background, undefined);
    assert.equal(lum.contrast, undefined);

    lum = new Luminance('#186276');
    assert.equal(lum.foreground.red, 24);
    assert.equal(lum.foreground.green, 98);
    assert.equal(lum.foreground.blue, 118);

    lum = new Luminance(null, '#186276');
    assert.equal(lum.foreground, undefined);
    assert.equal(lum.background.red, 24);
    assert.equal(lum.background.green, 98);
    assert.equal(lum.background.blue, 118);

    lum = new Luminance('#186276', {red: 24, green: 98, blue: 118});
    assert.equal(lum.foreground.red, 24);
    assert.equal(lum.foreground.green, 98);
    assert.equal(lum.foreground.blue, 118);
    assert.equal(lum.background.hcolor, '#186276');

    lum = new Luminance({red: 24, green: 98, blue: 118}, '#186276');
    assert.equal(lum.background.red, 24);
    assert.equal(lum.background.green, 98);
    assert.equal(lum.background.blue, 118);
    assert.equal(lum.foreground.hcolor, '#186276');

    lum = new Luminance({foreground: {red: 24, green: 98, blue: 118}, background: '#186276'});
    assert.equal(lum.background.red, 24);
    assert.equal(lum.background.green, 98);
    assert.equal(lum.background.blue, 118);
    assert.equal(lum.foreground.hcolor, '#186276');
  });
  it('sets background correctly', function () {
    const lum = new Luminance();
    lum.background = '#186276';
    assert.equal(lum.background.red, 24);
    assert.equal(lum.background.green, 98);
    assert.equal(lum.background.blue, 118);
  });
  it('sets foreground correctly', function () {
    const lum = new Luminance();
    lum.foreground = '#186276';
    assert.equal(lum.foreground.red, 24);
    assert.equal(lum.foreground.green, 98);
    assert.equal(lum.foreground.blue, 118);
  });
  it('calculates contrast correctly', function () {
    const lum = new Luminance('#fff', '#000');
    assert.equal(lum.contrast, 21);

    lum.background = '#fff';
    lum.foreground = '#000';
    assert.equal(lum.contrast, 21);

    lum.foreground = '#777';
    assert.equal(lum.contrast, 4.478089453577214);
  });
  it('tests using the specified threshold', function () {
    const lum = new Luminance('#000', '#fff');
    assert.equal(lum.test(lum.THRESHOLD.AA.normal), true);
  });
});

