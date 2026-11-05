const assert = require('node:assert/strict');
const Explosion = require('../../src/game/Explosion').default;
const SoftBlock = require('../../src/game/blocks/SoftBlock').default;
const HardBlock = require('../../src/game/blocks/HardBlock').default;
const FireBlock = require('../../src/game/blocks/FireBlock').default;

const makeScene = size => {
  const scene = {
    blocks: Array.from({ length: size }, () =>
      Array.from({ length: size }, () => [])
    ),
    burnSoftBlock(col, row) {
      this.burned = [col, row];
    }
  };
  return scene;
};

describe('Explosion', () => {
  it('places a center fire and spreads in four directions to its range', () => {
    const scene = makeScene(7);
    const explosion = new Explosion(scene, 3, 3, 2);
    explosion.fire();
    assert.ok(scene.blocks[3][3].some(block => block instanceof FireBlock));
    assert.ok(scene.blocks[3][1].some(block => block instanceof FireBlock));
    assert.ok(scene.blocks[5][3].some(block => block instanceof FireBlock));
    assert.ok(scene.blocks[3][5].some(block => block instanceof FireBlock));
    assert.ok(scene.blocks[1][3].some(block => block instanceof FireBlock));
    assert.equal(Explosion.computeFireType(false, 'left'), 'horizontal');
    assert.equal(Explosion.computeFireType(true, 'up'), 'upEdge');
  });

  it('stops at hard blocks and burns soft blocks without placing fire beyond them', () => {
    const scene = makeScene(7);
    scene.blocks[4][3].push(new HardBlock(4, 3));
    scene.blocks[3][2].push(new SoftBlock(3, 2));
    const explosion = new Explosion(scene, 3, 3, 3);
    explosion.fire();
    assert.equal(
      scene.blocks[5][3].some(block => block instanceof FireBlock),
      false
    );
    assert.deepEqual(scene.burned, [3, 2]);
    assert.equal(
      scene.blocks[3][1].some(block => block instanceof FireBlock),
      false
    );
  });
});
