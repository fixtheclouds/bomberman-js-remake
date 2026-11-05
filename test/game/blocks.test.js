const assert = require('node:assert/strict');
const Unit = require('../../src/game/blocks/Unit').default;
const HardBlock = require('../../src/game/blocks/HardBlock').default;
const SoftBlock = require('../../src/game/blocks/SoftBlock').default;
const Door = require('../../src/game/blocks/Door').default;
const Powerup = require('../../src/game/blocks/Powerup').default;
const FireBlock = require('../../src/game/blocks/FireBlock').default;
const AnimatedSprite = require('../../src/canvas/AnimatedSprite').default;

describe('map blocks', () => {
  it('tracks unit coordinates, animation state, and destruction', () => {
    const unit = new Unit(3, 4);
    unit.sprite = { frame: null };
    unit.update(12);
    assert.equal(unit.sprite.frame, 12);
    assert.equal(unit.animated, false);
    unit.destroy();
    assert.equal(unit.destroyed, true);
  });

  it('starts soft block burn animation and reveals doors and powerups', () => {
    const soft = new SoftBlock(2, 3);
    const door = new Door(1, 1);
    const powerup = new Powerup(4, 5, 'Flames');
    assert.equal(door.hidden, true);
    assert.equal(powerup.hidden, true);
    soft.burn();
    assert.ok(soft.sprite instanceof AnimatedSprite);
    door.burn();
    powerup.burn();
    assert.equal(door.hidden, false);
    assert.equal(powerup.hidden, false);
    assert.equal(
      powerup.action,
      require('../../src/game/powerups').default.Flames.action
    );
  });

  it('damages the map cell while fire is active and destroys finished fire', () => {
    const scene = { damage: (...args) => calls.push(args) };
    const calls = [];
    const fire = new FireBlock(scene, 2, 3, 'center');
    fire.sprite = { frame: null, done: false };
    fire.update(4);
    assert.deepEqual(calls, [[2, 3]]);
    assert.equal(fire.destroyed, false);
    fire.sprite.done = true;
    fire.update(5);
    assert.equal(fire.destroyed, true);
  });

  it('uses the configured hard block sprite tile', () => {
    const block = new HardBlock(0, 0);
    assert.deepEqual(
      [block.sprite.x, block.sprite.y, block.sprite.width, block.sprite.height],
      [0, 241, 16, 16]
    );
  });
});
