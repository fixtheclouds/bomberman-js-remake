const assert = require('node:assert/strict');
const imageLoader = require('../../src/utils/imageLoader').default;
const SoundManager = require('../../src/utils/SoundManager').default;

describe('browser helpers', () => {
  it('loads and caches images and reports whether all requested assets are ready', async () => {
    const originalImage = global.Image;
    global.Image = class ImageStub {
      set src(value) {
        this.url = value;
        queueMicrotask(() => this.onload());
      }
    };
    imageLoader.cache = {};
    try {
      await imageLoader.load('sprite.png');
      assert.equal(imageLoader.isReady(), true);
      assert.equal(
        imageLoader.get('sprite.png').url,
        './assets/images/sprite.png'
      );
      assert.equal(imageLoader.get('missing.png'), undefined);
    } finally {
      global.Image = originalImage;
      imageLoader.cache = {};
    }
  });

  it('starts looped or one-shot audio at the expected paths', async () => {
    const manager = new SoundManager();
    manager.start('stage-theme', true);
    assert.equal(manager.handler.src, 'assets/sounds/stage-theme.mp3');
    assert.equal(manager.handler.loop, true);
    manager.stop();
    assert.equal(manager.handler.currentTime, 0);
    await SoundManager.play('plant');
    await SoundManager.play('explosion.wav');
  });
});
