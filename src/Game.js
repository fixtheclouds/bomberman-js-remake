import TitleScreen from './screens/TitleScreen';
import ImageLoader from './utils/ImageLoader';
import SoundManager from './utils/SoundManager';

const loader = new ImageLoader();

export default class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this._scene = new TitleScreen(this);
    this.keys = [];
    this.soundManager = new SoundManager();
  }

  init() {
    this._scene.init();
  }

  set scene(value) {
    this._scene = value;
  }

  get scene() {
    return this._scene;
  }

  load() {
    return loader.load('sprite.png', 'bomberman_v2.png', 'bomberman.gif');
  }

  draw() {
    this._scene.draw();
  }

  update(frame) {
    this._scene.update(frame);
  }
}
