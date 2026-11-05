const assert = require('node:assert/strict');
const GameScreen = require('../../src/scenes/GameScreen').default;
const HardBlock = require('../../src/game/blocks/HardBlock').default;
const SoftBlock = require('../../src/game/blocks/SoftBlock').default;
const Bomb = require('../../src/game/blocks/Bomb').default;

const makeGame = () => ({
  ctx: {},
  canvas: { width: 512, height: 480 },
  keys: [],
  soundManager: { start() {}, stop() {} }
});

describe('GameScreen', () => {
  it('allocates a stage grid and reports its dimensions', () => {
    const originalDocument = global.document;
    global.document = { addEventListener() {}, removeEventListener() {} };
    try {
      const screen = new GameScreen(makeGame(), 1);
      assert.equal(screen.stageCols, 26);
      assert.equal(screen.stageRows, 13);
      assert.equal(screen.stageWidth, 416);
      assert.equal(screen.blocks.length, 26);
      assert.equal(screen.blocks[0].length, 13);
    } finally {
      global.document = originalDocument;
    }
  });

  it('builds hard boundaries, inner pillars, and reserved starting cells', () => {
    const originalDocument = global.document;
    const originalRandom = Math.random;
    global.document = { addEventListener() {}, removeEventListener() {} };
    Math.random = () => 0.99;
    try {
      const screen = new GameScreen(makeGame(), 1);
      screen._buildBlocks();
      assert.ok(screen.blocks[0][4].some(block => block instanceof HardBlock));
      assert.ok(screen.blocks[2][2].some(block => block instanceof HardBlock));
      assert.equal(
        screen.blocks[1][1].some(block => block instanceof SoftBlock),
        false
      );
      assert.equal(
        screen.freeCells().some(([col, row]) => col === 1 && row === 1),
        false
      );
    } finally {
      global.document = originalDocument;
      Math.random = originalRandom;
    }
  });

  it('applies blast damage to the player and nearby enemies', () => {
    const originalDocument = global.document;
    global.document = { addEventListener() {}, removeEventListener() {} };
    try {
      const screen = new GameScreen(makeGame(), 1);
      screen.player.kill = () => {
        screen.playerWasHit = true;
      };
      const enemy = {
        position: [16, 48],
        kill() {
          this.wasHit = true;
        }
      };
      screen.enemies = [enemy];
      screen.damage(1, 1);
      assert.equal(screen.playerWasHit, true);
      assert.equal(enemy.wasHit, true);
      screen.player.flamePass = true;
      screen.playerWasHit = false;
      screen.damage(1, 1);
      assert.equal(screen.playerWasHit, false);
    } finally {
      global.document = originalDocument;
    }
  });

  it('handles block visibility, open cells, and camera movement', () => {
    const originalDocument = global.document;
    global.document = { addEventListener() {}, removeEventListener() {} };
    try {
      const screen = new GameScreen(makeGame(), 1);
      const softBlock = new SoftBlock(3, 3);
      screen.blocks[3][3].push(softBlock);
      assert.equal(
        screen.freeCells().some(([col, row]) => col === 3 && row === 3),
        false
      );
      assert.equal(
        screen.freeCells(true).some(([col, row]) => col === 3 && row === 3),
        true
      );
      screen.burnSoftBlock(3, 3);
      assert.equal(softBlock.animated, true);
      assert.equal(screen.overlaps([1, 1], [16, 48]), true);

      screen.player.x = 200;
      screen.player.direction = 'right';
      screen.setPointOfView();
      assert.equal(screen.drawer.offsetX, -1);
      screen.player.direction = 'left';
      screen.setPointOfView();
      assert.equal(screen.drawer.offsetX, 0);
    } finally {
      global.document = originalDocument;
    }
  });

  it('removes destroyed animated blocks and transitions when the stage timer expires', () => {
    const originalDocument = global.document;
    global.document = { addEventListener() {}, removeEventListener() {} };
    try {
      const game = makeGame();
      const screen = new GameScreen(game, 1);
      const block = new SoftBlock(2, 2);
      block.burn();
      block.destroy();
      screen.blocks[2][2].push(block);
      screen.updateBlocks(1);
      assert.deepEqual(screen.blocks[2][2], []);

      screen.player.update = () => {};
      screen.player.keyPressCheck = () => {};
      screen.timer = { seconds: 0 };
      screen.update(1);
      assert.equal(screen.secondsLeft, 0);
      assert.equal(game.scene.constructor.name, 'StageLoadingScreen');
    } finally {
      global.document = originalDocument;
    }
  });

  it('removes an exploded bomb from the field on the next update', () => {
    const originalDocument = global.document;
    global.document = { addEventListener() {}, removeEventListener() {} };
    try {
      const screen = new GameScreen(makeGame(), 1);
      const bomb = new Bomb(screen, 1, 1, { range: 1, isDetonatable: true });
      screen.player.bombStack.push(bomb);
      screen.blocks[1][1].push(bomb);
      bomb.explosion.fire = () => {};
      bomb.explode();
      screen.updateBlocks(1);
      assert.deepEqual(screen.blocks[1][1], []);
    } finally {
      global.document = originalDocument;
    }
  });
});
