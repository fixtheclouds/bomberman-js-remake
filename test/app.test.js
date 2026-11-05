const assert = require('node:assert/strict');

describe('browser entry point', () => {
  it('loads the app, sizes the canvas, and schedules the render loop', async () => {
    const originalDocument = global.document;
    const originalImage = global.Image;
    const originalRequestAnimationFrame = global.requestAnimationFrame;
    const sassLoader = require.extensions['.sass'];
    const scheduledFrames = [];
    const drawCalls = [];
    const context = {
      fillRect: (...args) => drawCalls.push(['fillRect', ...args]),
      drawImage: (...args) => drawCalls.push(['drawImage', ...args]),
      fillText: (...args) => drawCalls.push(['fillText', ...args])
    };
    const canvas = { getContext: () => context };

    global.document = {
      getElementById: id => (id === 'canvas' ? canvas : null),
      addEventListener() {},
      removeEventListener() {}
    };
    global.Image = class ImageStub {
      set src(path) {
        this.path = path;
        queueMicrotask(() => this.onload());
      }
    };
    global.requestAnimationFrame = callback => scheduledFrames.push(callback);
    require.extensions['.sass'] = module => {
      module.exports = {};
    };

    try {
      delete require.cache[require.resolve('../src/app')];
      require('../src/app');
      await new Promise(resolve => setImmediate(resolve));
      assert.equal(canvas.width, 512);
      assert.equal(canvas.height, 480);
      assert.equal(scheduledFrames.length, 1);
      scheduledFrames.shift()();
      assert.ok(drawCalls.some(([method]) => method === 'fillRect'));
      assert.ok(drawCalls.some(([method]) => method === 'drawImage'));
      assert.equal(scheduledFrames.length, 1);
    } finally {
      global.document = originalDocument;
      global.Image = originalImage;
      global.requestAnimationFrame = originalRequestAnimationFrame;
      if (sassLoader) {
        require.extensions['.sass'] = sassLoader;
      } else {
        delete require.extensions['.sass'];
      }
    }
  });
});
