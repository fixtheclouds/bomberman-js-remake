import TitleScreen from './TitleScreen';
import ImageLoader from './ImageLoader';

let loader = new ImageLoader();

export default class Game {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this._scene = new TitleScreen(this);
    this.keys = [];
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
    return loader.load('sprite.png');
  }

  draw() {
    this._scene.draw();
  }

  update(frame) {
    this._scene.update(frame);
  }

}
