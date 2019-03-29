import Scene from './Scene';
import TextString from '../canvas/TextString';
import GameScreen from './GameScreen';

const STAGE_LOADING_TIMEOUT = 210;

export default class StageLoadingScreen extends Scene {
  constructor(game, prevScene = null) {
    super(game);
    this._stage = 1;
    this.prevScene = prevScene;
    this._timeout = STAGE_LOADING_TIMEOUT;
  }

  startStage() {
    if (this.prevScene) {
      this.prevScene.restart();
      this._game.scene = this.prevScene;
      return;
    }
    this._game.scene = new GameScreen(this._game, this._stage);
  }

  get active() {
    return this._timeout > 0;
  }

  init() {
    this._game.soundManager.start('stage-start');
  }

  update() {
    if (this.active) {
      this._timeout--;
    } else {
      this.startStage();
    }
  }

  draw() {
    if (!this.active) {
      return;
    }
    this._drawBG();
    this._drawText();
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
