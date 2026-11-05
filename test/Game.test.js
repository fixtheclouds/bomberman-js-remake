const assert = require('node:assert/strict');
const Game = require('../src/Game').default;

describe('Game', () => {
  it('initializes the title scene and delegates frame work to the active scene', () => {
    const context = {};
    const canvas = { getContext: kind => (kind === '2d' ? context : null) };
    const game = new Game(canvas);
    assert.equal(game.ctx, context);
    assert.equal(game.scene.constructor.name, 'TitleScreen');

    const calls = [];
    game.soundManager.handler = { pause() {}, currentTime: 10 };
    game.scene = {
      init() {
        calls.push('init');
      },
      update(frame) {
        calls.push(['update', frame]);
      },
      draw() {
        calls.push('draw');
      }
    };
    game.update(3);
    game.draw();
    assert.deepEqual(calls, ['init', ['update', 3], 'draw']);
  });
});
