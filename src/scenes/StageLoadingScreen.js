import Scene from './Scene';
import TextString from '../canvas/TextString';

const STAGE_LOADING_TIMEOUT = 30;

export default class StageLoadingScreen extends Scene {
  constructor(game) {
    super(game);
    this._playSound = _.once(() =>
      this._soundManager.play('stage-start', true)
    );
    this._stage = 1;
    this._timeout = STAGE_LOADING_TIMEOUT;
  }

  set stage(num) {
    this._stage = num;
  }

  isVisible() {
    return this._timeout > 0;
  }

  update() {
    if (!this.isVisible()) {
      this._timeout--;
    }
  }

  draw() {
    if (!this.isVisible()) {
      return;
    }
    this._playSound();
    this._drawBG();
    this._drawStage();
  }

  _drawBG() {
    this._ctx.fillStyle = '#000000';
    this._ctx.fillRect(0, 0, this._game.canvas.width, this._game.canvas.height);
  }

  _drawText() {
    const num = '00'.substr((this._stage + '').length) + this._stage;
    const text = new TextString(`Stage ${num}`, 100, 170);
    text.draw(this._ctx);
  }
}
