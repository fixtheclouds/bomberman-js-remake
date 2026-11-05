const assert = require('node:assert/strict');
const Enemy = require('../../src/game/beings/Enemy').default;

describe('Enemy', () => {
  it('uses a free cell and the configured movement properties', () => {
    const scene = {
      freeCells: () => [[4, 5]],
      collisionDetector: { detect: () => false }
    };
    const enemy = new Enemy(scene, 'Baloom');
    assert.equal(enemy.x, 64);
    assert.equal(enemy.y, 112);
    assert.equal(enemy.speed, 0.5);
    enemy.move('right');
    assert.equal(enemy.x, 64.5);
  });

  it('stops moving when killed and does not process repeated kills', () => {
    const scene = {
      freeCells: () => [[1, 1]],
      collisionDetector: { detect: () => false }
    };
    const enemy = new Enemy(scene, 'Baloom');
    enemy.kill();
    const deathSprite = enemy.sprite;
    enemy.kill();
    enemy.moveRandomly();
    assert.equal(enemy.isAlive, false);
    assert.equal(enemy.currentSpeed, 0);
    assert.equal(enemy.sprite, deathSprite);
  });

  it('does not move while its random choice is none', () => {
    const scene = {
      freeCells: () => [[1, 1]],
      collisionDetector: { detect: () => false }
    };
    const enemy = new Enemy(scene, 'Baloom');
    const start = enemy.position;
    enemy.lastDirection = 'none';
    enemy.moveRandomly();
    assert.deepEqual(enemy.position, start);
  });
});
