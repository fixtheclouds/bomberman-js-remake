import TitleScreen from './scenes/TitleScreen';
import Drawer from './canvas/Drawer';
import SoundManager from './utils/SoundManager';
import imageLoader from './utils/imageLoader';

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this._scene = new TitleScreen(this);
    this.keys = [];
    this.soundManager = new SoundManager();
  }

  loadResources() {
    return imageLoader.load('sprite.png');
  }

  init() {
    new Drawer(this.ctx);
    this._scene.init();
  }

  set scene(value) {
    this.soundManager.stop();
    this._scene = value;
    this._scene.init();
  }

  get scene() {
    return this._scene;
  }

  draw() {
    this._scene.draw();
  }

  update(frame) {
    this._scene.update(frame);
  }
}
