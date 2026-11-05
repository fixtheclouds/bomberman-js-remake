global._ = require('lodash');
global.Audio = class AudioStub {
  constructor(src) {
    this.src = src;
    this.loop = false;
    this.currentTime = 0;
  }

  play() {
    return Promise.resolve();
  }
  pause() {}
};
