const assert = require('node:assert/strict');
const Bomb = require('../../src/game/blocks/Bomb').default;

describe('Bomb', () => {
  it('deploys remote bombs without starting a countdown and explodes once requested', () => {
    const scene = { player: { bombStack: [] } };
    const bomb = new Bomb(scene, 2, 3, { range: 2, isDetonatable: true });
    scene.player.bombStack.push(bomb);
    bomb.explosion.fire = () => {
      scene.exploded = true;
    };
    bomb.deploy();
    assert.equal(bomb.timer, null);
    bomb.explode();
    assert.deepEqual(scene.player.bombStack, []);
    assert.equal(scene.exploded, true);
  });

  it('counts down and explodes after its fuse reaches zero', () => {
    const originalSetInterval = global.setInterval;
    const originalClearInterval = global.clearInterval;
    let tick;
    let cleared;
    global.setInterval = callback => {
      tick = callback;
      return 29;
    };
    global.clearInterval = id => {
      cleared = id;
    };
    try {
      const bomb = new Bomb({ player: { bombStack: [] } }, 1, 1, {
        range: 1,
        isDetonatable: false
      });
      let explosions = 0;
      bomb.explode = () => {
        explosions += 1;
      };
      bomb.countdown();
      tick();
      assert.equal(bomb.seconds, 1);
      tick();
      tick();
      assert.equal(cleared, 29);
      assert.equal(explosions, 1);
    } finally {
      global.setInterval = originalSetInterval;
      global.clearInterval = originalClearInterval;
    }
  });
});
