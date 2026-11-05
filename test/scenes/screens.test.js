const assert = require('node:assert/strict');
const Scene = require('../../src/scenes/Scene').default;
const TitleScreen = require('../../src/scenes/TitleScreen').default;
const StageLoadingScreen =
  require('../../src/scenes/StageLoadingScreen').default;
const GameOverScreen = require('../../src/scenes/GameOverScreen').default;
const GameScreen = require('../../src/scenes/GameScreen').default;

describe('scenes', () => {
  it('exposes the active game context through the base scene', () => {
    const game = { ctx: { marker: true } };
    const scene = new Scene(game);
    assert.equal(scene.ctx, game.ctx);
  });

  it('starts stage loading when Enter is pressed from the title screen', () => {
    const listeners = {};
    const originalDocument = global.document;
    global.document = {
      addEventListener(type, handler) {
        listeners[type] = handler;
      },
      removeEventListener(type) {
        delete listeners[type];
      }
    };
    const game = {
      ctx: {},
      canvas: {},
      soundManager: { start() {}, stop() {} },
      scene: null
    };
    try {
      const title = new TitleScreen(game);
      game.scene = title;
      title.init();
      listeners.keydown({ keyCode: 13 });
      assert.ok(game.scene instanceof StageLoadingScreen);
      assert.equal(listeners.keydown, undefined);
    } finally {
      global.document = originalDocument;
    }
  });

  it('advances to the next stage or restarts the previous stage after its countdown', () => {
    const game = {
      ctx: {},
      canvas: {},
      soundManager: { start() {} },
      scene: null
    };
    const originalDocument = global.document;
    global.document = { addEventListener() {}, removeEventListener() {} };
    try {
      const loading = new StageLoadingScreen(game);
      loading._timeout = 0;
      loading.update();
      assert.ok(game.scene instanceof GameScreen);
      assert.equal(loading.active, false);
      let restarted = false;
      const previous = {
        restart() {
          restarted = true;
        }
      };
      const retry = new StageLoadingScreen(game, previous);
      retry.startStage();
      assert.equal(restarted, true);
      assert.equal(game.scene, previous);
    } finally {
      global.document = originalDocument;
    }
  });

  it('restarts from the title screen after game over countdown', () => {
    const game = {
      ctx: {},
      canvas: {},
      soundManager: { start() {} },
      scene: null
    };
    const screen = new GameOverScreen(game);
    screen._timeout = 0;
    screen.update();
    assert.ok(game.scene instanceof TitleScreen);
  });
});
