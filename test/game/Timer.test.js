const assert = require('node:assert/strict');
const Timer = require('../../src/game/Timer').default;

describe('Timer', () => {
  it('counts down once per tick and clears itself after reaching zero', () => {
    const originalSetInterval = global.setInterval;
    const originalClearInterval = global.clearInterval;
    let tick;
    let cleared;
    global.setInterval = callback => {
      tick = callback;
      return 17;
    };
    global.clearInterval = id => {
      cleared = id;
    };
    try {
      const timer = new Timer(1);
      timer.countdown();
      tick();
      assert.equal(timer.seconds, 0);
      tick();
      assert.equal(cleared, 17);
      assert.equal(timer.seconds, 0);
    } finally {
      global.setInterval = originalSetInterval;
      global.clearInterval = originalClearInterval;
    }
  });
});
