const assert = require('node:assert/strict');
const Player = require('../../src/game/beings/Player').default;
const Bomb = require('../../src/game/blocks/Bomb').default;
const { gridMethods } = require('../../src/utils/gridMethods');
const CollisionDetector = require('../../src/utils/CollisionDetector').default;

const makePlayer = () => {
  const scene = {
    blocks: Array.from({ length: 5 }, () =>
      Array.from({ length: 5 }, () => [])
    ),
    collisionDetector: { detect: () => false },
    overlaps([col, row], [x, y]) {
      return (
        gridMethods.getCloseCols(x).includes(col) &&
        gridMethods.getCloseRows(y).includes(row)
      );
    },
    setPointOfView() {
      this.pointOfViewCalls = (this.pointOfViewCalls || 0) + 1;
    },
    initiateEndGame() {
      this.endGameCalls = (this.endGameCalls || 0) + 1;
    },
    enemies: []
  };
  const game = { keys: [] };
  return { player: new Player(game, scene), scene };
};

describe('Player', () => {
  it('moves in the requested direction and updates the camera', () => {
    const { player, scene } = makePlayer();
    player.move('right');
    assert.equal(player.x, 17);
    assert.equal(player.direction, 'right');
    assert.equal(player.currentSpeed, player.speed);
    assert.equal(scene.pointOfViewCalls, 1);
  });

  it('maps arrow and control keys to movement and bomb planting', () => {
    const { player } = makePlayer();
    player.hasDetonator = true;
    player._game.keys[39] = true;
    player.keyPressCheck();
    assert.equal(player.x, 17);
    player._game.keys[39] = false;
    player._game.keys[17] = true;
    player.keyPressCheck();
    assert.equal(player.bombStack.length, 1);
  });

  it('plants bombs within its capacity and detonates the oldest bomb', () => {
    const { player, scene } = makePlayer();
    player.hasDetonator = true;
    player.plant();
    assert.equal(player.bombStack.length, 1);
    assert.ok(scene.blocks[1][1][0] instanceof Bomb);
    player.plant();
    assert.equal(player.bombStack.length, 1);
    const [bomb] = player.bombStack;
    let exploded = 0;
    bomb.explode = () => {
      exploded += 1;
    };
    player.detonate();
    assert.equal(exploded, 1);
  });

  it('allows the planter to leave a bomb but blocks returning to it', () => {
    const { player, scene } = makePlayer();
    scene.collisionDetector = new CollisionDetector(scene);
    player.hasDetonator = true;
    player.plant();
    const [bomb] = player.bombStack;
    assert.equal(bomb.passableBy, player);
    for (let i = 0; i < 16; i++) player.move('right');
    assert.equal(player.x, 32);
    assert.equal(bomb.passableBy, null);
    player.move('left');
    assert.equal(player.x, 32);
  });

  it('ignores detonator input until that ability is acquired', () => {
    const { player } = makePlayer();
    player.bombStack.push({
      explode() {
        exploded = true;
      }
    });
    let exploded = false;
    player.detonate();
    assert.equal(exploded, false);
  });

  it('loses one life and starts the end-game countdown only once per death', () => {
    const { player, scene } = makePlayer();
    player.kill();
    player.kill();
    assert.equal(player.lives, 2);
    assert.equal(player.isAlive, false);
    assert.equal(scene.endGameCalls, 1);
  });

  it('returns to the default position and detects overlapping living enemies', () => {
    const { player, scene } = makePlayer();
    player.x = 120;
    player.reset();
    assert.deepEqual(player.position, [16, 48]);
    scene.enemies = [{ isAlive: true, position: player.position }];
    assert.equal(player.collidesWithEnemy(), true);
    scene.enemies[0].isAlive = false;
    assert.equal(player.collidesWithEnemy(), false);
  });
});
