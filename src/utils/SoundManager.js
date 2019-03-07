export default class SoundManager {
  constructor() {
    this.handler = null;
  }

  // Play audio once without initializing
  static play(sound) {
    const audio = new Audio(`assets/sounds/${sound}.mp3`);
    audio.play();
  }

  start(sound, looped) {
    this.handler = new Audio(`assets/sounds/${sound}.mp3`);
    this.handler.loop = looped || false;
    this.handler.play();
  }

  stop() {
    this.handler.pause();
    this.handler.currentTime = 0;
  }
}
