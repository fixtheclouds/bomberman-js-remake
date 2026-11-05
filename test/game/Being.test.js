const assert = require('node:assert/strict');
const Being = require('../../src/game/beings/Being').default;

describe('Being', () => {
  it('exposes pixel and cell positions and delegates drawing', () => {
    const scene = { collisionDetector: { detect: (...args) => args } };
    const being = new Being(scene);
    being.x = 16;
    being.y = 48;
    being.sprite = { animated: false, draw: params => params };
    assert.deepEqual(being.position, [16, 48]);
    assert.deepEqual(being.cellPosition, [1, 1]);
    assert.deepEqual(being.draw(), { posX: 16, posY: 48 });
    assert.deepEqual(being.detectCollisions(1, 2), [being, 1, 2]);
  });

  it('smoothly corrects movement to the nearest lane or invokes the stuck handler', () => {
    const being = new Being({});
    being.currentSpeed = 1;
    being.y = 63;
    being.smoothTurn(0, 63, 'right');
    assert.equal(being.y, 64);
    being.x = 15;
    being.smoothTurn(15, 0, 'down');
    assert.equal(being.x, 16);
    being.whenStuck = () => {
      being.stuck = true;
    };
    being.smoothTurn(16, 48, 'right');
    assert.equal(being.stuck, true);
  });
});
