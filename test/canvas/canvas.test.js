const assert = require('node:assert/strict');
const AnimatedSprite = require('../../src/canvas/AnimatedSprite').default;

describe('canvas helpers', () => {
  it('scales canvas source and destination rectangles and applies horizontal offsets', () => {
    const drawerPath = require.resolve('../../src/canvas/Drawer');
    delete require.cache[drawerPath];
    const Drawer = require('../../src/canvas/Drawer').default;
    const calls = [];
    const drawer = new Drawer({ drawImage: (...args) => calls.push(args) });
    drawer.changeOffset(-3);
    drawer.proxyDrawImage({
      img: 'sprite',
      x: 1,
      y: 2,
      width: 16,
      height: 8,
      imgX: 10,
      imgY: 20,
      imgWidth: 16,
      imgHeight: 8
    });
    assert.deepEqual(calls[0], ['sprite', 1, 2, 16, 8, 14, 40, 32, 16]);
    drawer.reset();
    assert.equal(drawer.offsetX, 0);
  });

  it('uppercases text and draws optional shadow at doubled coordinates', () => {
    const drawerPath = require.resolve('../../src/canvas/Drawer');
    const textPath = require.resolve('../../src/canvas/TextString');
    delete require.cache[textPath];
    delete require.cache[drawerPath];
    const Drawer = require('../../src/canvas/Drawer').default;
    const TextString = require('../../src/canvas/TextString').default;
    const calls = [];
    const context = { fillText: (...args) => calls.push(args) };
    new Drawer(context);
    const text = new TextString('hello', 5, 7, '#fff', '#000', '12px');
    text.draw();
    assert.equal(text.text, 'HELLO');
    assert.equal(context.font, '12px PrStart');
    assert.deepEqual(calls, [
      ['HELLO', 12, 16],
      ['HELLO', 10, 14]
    ]);
  });

  it('advances animation frames and stops a non-looping animation at its end', () => {
    const sprite = new AnimatedSprite({
      coords: [
        [1, 2],
        [3, 4],
        [5, 6]
      ],
      sequence: [0, 1, 2],
      size: [16, 16]
    });
    const draws = [];
    sprite.drawer.proxyDrawImage = params => draws.push(params);
    sprite.frame = 0;
    sprite.animate({ posX: 10, posY: 20, speed: 0.4 });
    sprite.frame = 3;
    sprite.animate({ posX: 10, posY: 20, speed: 0.4 });
    assert.equal(draws[1].x, 3);
    assert.equal(draws[1].y, 4);
    sprite.frame = 5;
    sprite.animate({ posX: 10, posY: 20, speed: 0.4 });
    assert.equal(sprite.done, true);
    assert.equal(draws.length, 2);
  });
});
