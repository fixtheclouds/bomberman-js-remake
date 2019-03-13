export default class SoundManager {
  constructor() {
    this.handler = null;
  }

  // Play audio once without initializing
  static async play(fileName) {
    const [, extension] = fileName.split('.');
    const path = !extension ? `${fileName}.mp3` : fileName;
    const audio = new Audio(`assets/sounds/${path}`);
    await audio.play();
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
