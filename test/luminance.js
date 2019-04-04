/* eslint func-names: 0, prefer-arrow-callback: 0, one-var: 0 */
const assert = require('assert');
const utilities = require('../src/index.js');

const Luminance = utilities.Luminance;
const WCAG = utilities.WCAG;

describe('utilities - Luminance', function () {
  it('constructs properly', function () {
    let lum = new Luminance();
    let udef;
    assert.equal(lum.foreground, udef);
    assert.equal(lum.background, udef);
    assert.equal(lum.contrast, udef);

    lum = new Luminance('#186276');
    assert.equal(lum.foreground.red, 24);
    assert.equal(lum.foreground.green, 98);
    assert.equal(lum.foreground.blue, 118);

    lum = new Luminance(null, '#186276');
    assert.equal(lum.foreground, udef);
    assert.equal(lum.background.red, 24);
    assert.equal(lum.background.green, 98);
    assert.equal(lum.background.blue, 118);

    lum = new Luminance('#186276', { red: 24, green: 98, blue: 118 });
    assert.equal(lum.foreground.red, 24);
    assert.equal(lum.foreground.green, 98);
    assert.equal(lum.foreground.blue, 118);
    assert.equal(lum.background.hcolor, '#186276');

    lum = new Luminance({ red: 24, green: 98, blue: 118 }, '#186276');
    assert.equal(lum.background.red, 24);
    assert.equal(lum.background.green, 98);
    assert.equal(lum.background.blue, 118);
    assert.equal(lum.foreground.hcolor, '#186276');

    lum = new Luminance({ foreground: { red: 24, green: 98, blue: 118 },
      background: '#186276' });
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
  it('calculates contrast correctly for full opacity', function () {
    const lum = new Luminance('#fff', '#000');
    assert.equal(lum.contrast, 21);

    lum.background = '#fff';
    lum.foreground = '#000';
    assert.equal(lum.contrast, 21);

    lum.foreground = '#777';
    assert.equal(lum.contrast, 4.48);
  });
  it('calculates contrast correctly for partial opacity', function () {
    const lum = new Luminance('#fff6', '#000');
    assert.equal(lum.contrast, 3.66);

    lum.background = '#fff';
    lum.foreground = '#0006';
    assert.equal(lum.contrast, 2.85);

    lum.foreground = '#777';
    assert.equal(lum.contrast, 4.48);
  });
  it('tests using the specified threshold', function () {
    const lum = new Luminance('#000', '#fff');
    assert.equal(lum.test(WCAG.CONTRAST.AA.normal), true);
  });
  it('searches for a color value that passes a contrast threshold', function () {
    const lum = new Luminance('#ccc', '#bbb');

    // searches isolating changes to foreground only
    lum.search(WCAG.CONTRAST.AA.normal, lum.foreground);
    assert.equal(lum.foreground.hcolor, '#ffffff');
    assert.equal(lum.background.hcolor, '#bbbbbb');
    assert.equal(lum.test(WCAG.CONTRAST.AA.normal), false);

    // searches isolating changes to background only
    lum.reset();
    assert.equal(lum.background.hcolor, '#bbbbbb');
    assert.equal(lum.foreground.hcolor, '#cccccc');
  });
  it('searches for a color value that passes a contrast threshold', function () {
    const lum = new Luminance('#ccc', '#bbb');

    // searches isolating changes to foreground only
    lum.search(WCAG.CONTRAST.AA.normal, lum.foreground);
    assert.equal(lum.foreground.hcolor, '#ffffff');
    assert.equal(lum.background.hcolor, '#bbbbbb');
    assert.equal(lum.test(WCAG.CONTRAST.AA.normal), false);

    // searches isolating changes to background only
    lum.background = '#bbb';
    lum.foreground = '#ccc';
    lum.search(WCAG.CONTRAST.AA.normal, lum.background);
    assert.equal(lum.foreground.hcolor, '#cccccc');
    assert.equal(lum.background.hcolor, '#575757');
    assert.equal(lum.test(WCAG.CONTRAST.AA.normal), true);

    // searches without isolating changes
    lum.background = '#ccc';
    lum.foreground = '#bbb';
    lum.search(WCAG.CONTRAST.AA.normal);
    assert.equal(lum.background.hcolor, '#ffffff');
    assert.equal(lum.foreground.hcolor, '#767676');
    assert.equal(lum.test(WCAG.CONTRAST.AA.normal), true);

    lum.background = '#bbb';
    lum.foreground = '#ccc';
    lum.search(WCAG.CONTRAST.AA.normal);
    assert.equal(lum.foreground.hcolor, '#ffffff');
    assert.equal(lum.background.hcolor, '#767676');
    assert.equal(lum.test(WCAG.CONTRAST.AA.normal), true);

    lum.background = '#bbb';
    lum.foreground = '#cccc';
    lum.search(WCAG.CONTRAST.AA.normal);
    assert.equal(lum.foreground.hcolor, '#cdcb33cc');
    assert.equal(lum.background.hcolor, '#3f3f3f');
    assert.equal(lum.test(WCAG.CONTRAST.AA.normal), true);
  });
});

