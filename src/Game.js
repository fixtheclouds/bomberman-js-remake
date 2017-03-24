import TitleScreen from './TitleScreen';
import ImageLoader from './ImageLoader';

let loader = new ImageLoader();

export default class Game {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this._scene = new TitleScreen(this);
  }

  set scene(value) {
    this.scene = value;
  }

  get scene() {
    return this.scene;
  }

  load() {
    return loader.load('sprite.png');
  }

  draw() {
    this._scene.draw();
  }

  update() {
    this._scene.update();
  }

}
