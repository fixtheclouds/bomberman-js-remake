const assert = require('node:assert/strict');
const CollisionDetector = require('../../src/utils/CollisionDetector').default;
const HardBlock = require('../../src/game/blocks/HardBlock').default;
const SoftBlock = require('../../src/game/blocks/SoftBlock').default;
const Bomb = require('../../src/game/blocks/Bomb').default;

const makeScene = () => ({
  blocks: Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => [])),
  overlaps: () => false
});

describe('CollisionDetector', () => {
  it('checks the cells a moving unit will enter', () => {
    const scene = makeScene();
    scene.blocks[2][1].push(new HardBlock(2, 1));
    const detector = new CollisionDetector(scene);
    assert.equal(
      detector.detect({ position: [16, 48] }, 16, 48, 'right', false, false),
      true
    );
    assert.equal(
      detector.detect({ position: [16, 48] }, 16, 48, 'left', false, false),
      false
    );
  });

  it('allows soft blocks only when wall pass is enabled', () => {
    const scene = makeScene();
    scene.blocks[1][1].push(new SoftBlock(1, 1));
    const detector = new CollisionDetector(scene);
    assert.equal(
      detector.detect({ position: [16, 48] }, 16, 48, 'left', false, false),
      true
    );
    assert.equal(
      detector.detect({ position: [16, 48] }, 16, 48, 'left', false, true),
      false
    );
  });

  it('allows exiting an overlapping bomb, then blocks re-entry', () => {
    const scene = makeScene();
    scene.blocks[1][1].push(
      new Bomb(scene, 1, 1, { range: 1, isDetonatable: true })
    );
    scene.overlaps = ([col, row]) => col === 1 && row === 1;
    const detector = new CollisionDetector(scene);
    assert.equal(
      detector.detect({ position: [16, 48] }, 16, 48, 'left', false, false),
      false
    );
    scene.overlaps = () => false;
    assert.equal(
      detector.detect({ position: [16, 48] }, 16, 48, 'left', false, false),
      true
    );
  });

  it('ignores invalid coordinates and unknown directions', () => {
    const detector = new CollisionDetector(makeScene());
    assert.equal(detector.detect({}, NaN, 0, 'left', false, false), undefined);
    assert.equal(detector.detect({}, 0, 0, 'diagonal', false, false), false);
  });
});
