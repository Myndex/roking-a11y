/* eslint func-names: 0, prefer-arrow-callback: 0, one-var: 0 */
const assert = require('assert');
const utilities = require('../src/index.js');

const Color = utilities.Color;

describe('utilities - Color', function () {
  it('calculates the correct rgb values given a hue, saturation, and lightness', function () {
    const color = new Color({ hue: 193, saturation: '67%', lightness: '28%' });
    assert.equal(color.red, 24);
    assert.equal(color.green, 98);
    assert.equal(color.blue, 119);
    assert.equal(color.luminance, 10.261464538163523);
  });
  it('calculates the correct hsl values given a red, green, and blue', function() {
    const color = new Color({ red: 24, green: 98, blue: 118 });
    assert.equal(color.hue, 193);
    assert.equal(color.saturation, '67%');
    assert.equal(color.lightness, '28%');
    assert.equal(color.luminance, 10.237560921354328);
  });
  it('calculates the correct red, green, and blue given a six-digit hexadecimal', function() {
    const color = new Color('#186276');
    assert.equal(color.red, 24);
    assert.equal(color.green, 98);
    assert.equal(color.blue, 118);
    assert.equal(color.luminance, 10.237560921354328);
  });
  it('calculates the correct values given a three-digit hexadecimal', function() {
    const color = new Color('#f0d');
    assert.equal(color.red, 255);
    assert.equal(color.green, 0);
    assert.equal(color.blue, 221);
    assert.equal(color.luminance, 26.48045803081662);
  });
  it('calculates after modification of red, green, and blue values', function() {
    const color = new Color('#186276');
    assert.equal(color.red, 24);
    assert.equal(color.green, 98);
    assert.equal(color.blue, 118);

    color.red = 0;
    color.green = 'ff';
    color.blue = 0;
    assert.equal(color.hcolor, '#00ff00');
  });
  it('calculates the correct hsl values given a red, green, and blue', function() {
    const color = new Color({ red: 24, green: 98, blue: 118 });
    assert.equal(color.hue, 193);
    assert.equal(color.saturation, '67%');
    assert.equal(color.lightness, '28%');

    color.lightness = .5;
    color.saturation = .3;
    assert.equal(color.red, 89);
    assert.equal(color.green, 149);
    assert.equal(color.blue, 166);
  });
  it('calculates gray when there is no saturation', function() {
    const color = new Color({ hue: 0, saturation: 0, lightness: .4 });
    assert.equal(color.red, 102);
    assert.equal(color.green, 102);
    assert.equal(color.blue, 102);
  });
  it('validates color types', function() {
    const color = new Color();
    assert.equal(color.isColorType('#fff'), true);
    assert.equal(color.isColorType('#ffffff'), true);
    assert.equal(color.isColorType({red:0, green:0, blue:0}), true);
    assert.equal(color.isColorType({hue:0, saturation:0, lightness:0}), true);
    assert.equal(color.isColorType({hue:0, lightness:0}), false);
    assert.equal(color.isColorType({red:0, saturation:0, blue:0}), false);
    assert.equal(color.isColorType('#fffggg'), false);
    assert.equal(color.isColorType('#ff'), false);
    assert.equal(color.isColorType('#ffffffff'), false);
  });
});

