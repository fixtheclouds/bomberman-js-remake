const assert = require('node:assert/strict');
const stages = require('../../src/stages').default;
const enemies = require('../../src/game/enemies').default;
const powerups = require('../../src/game/powerups').default;
const animations = require('../../src/game/animations');
const constants = require('../../src/constants');

describe('game catalogs', () => {
  it('defines stage geometry and encounter data', () => {
    assert.deepEqual(stages[1].size, [26, 13]);
    assert.equal(stages[1].enemies.Baloom, 4);
    assert.equal(stages[2].enemies.Oneal, 1);
    assert.ok(stages[1].time > 0);
    assert.ok(stages[2].blockDensity > stages[1].blockDensity);
  });

  it('defines enemy scoring, movement, and wall passing data', () => {
    assert.deepEqual(Object.keys(enemies), [
      'Baloom',
      'Oneal',
      'Doll',
      'Minvo',
      'Kondoria',
      'Ovapi',
      'Pass',
      'Pontan'
    ]);
    assert.equal(enemies.Baloom.points, 100);
    assert.equal(enemies.Pontan.points, 8000);
    assert.equal(enemies.Kondoria.wallPass, true);
    assert.ok(Object.values(enemies).every(enemy => enemy.speed > 0));
  });

  it('keeps powerup effects within their documented caps', () => {
    const player = {
      flameRange: 10,
      maxBombs: 10,
      speed: 3,
      hasDetonator: false
    };
    powerups.Flames.action(player);
    powerups.Bombs.action(player);
    powerups.Speed.action(player);
    powerups.Detonator.action(player);
    assert.equal(player.flameRange, 10);
    assert.equal(player.maxBombs, 10);
    assert.equal(player.speed, 3);
    assert.equal(player.hasDetonator, true);
  });

  it('applies movement, wall, bomb, and flame abilities to player fields', () => {
    const player = {
      flameRange: 1,
      maxBombs: 1,
      speed: 1,
      wallPass: false,
      bombPass: false,
      flamePass: false
    };
    powerups.Flames.action(player);
    powerups.Bombs.action(player);
    powerups.Speed.action(player);
    powerups.Wallpass.action(player);
    powerups.Bombpass.action(player);
    powerups.Flamepass.action(player);
    assert.deepEqual(
      [
        player.flameRange,
        player.maxBombs,
        player.speed,
        player.wallPass,
        player.bombPass,
        player.flamePass
      ],
      [2, 2, 2, true, true, true]
    );
  });

  it('provides animation frames and consistent tile dimensions', () => {
    assert.equal(constants.UNIT_WIDTH, 16);
    assert.equal(constants.UNIT_HEIGHT, 16);
    assert.deepEqual(animations.playerAnimation.down.size, [12, 16]);
    assert.ok(animations.fireAnimation.center.sequence.length > 0);
    assert.equal(animations.bombAnimation.loop, true);
  });
});
