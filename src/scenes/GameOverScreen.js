import Scene from './Scene';
import TextString from '../canvas/TextString';
import SoundManager from '../utils/SoundManager';
import TitleScreen from './TitleScreen';

const TIMEOUT = 210;

export default class GameOverScreen extends Scene {
  constructor(game) {
    super(game);
    this._timeout = TIMEOUT;
  }

  restartGame() {
    const scene = new TitleScreen(this._game);
    scene.init();
    this._game.scene = scene;
  }

  get active() {
    return this._timeout > 0;
  }

  init() {
    SoundManager.play('game-over');
  }

  update() {
    if (this.active) {
      this._timeout--;
    } else {
      this.restartGame();
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
    const text = new TextString('GAME OVER', 100, 170);
    text.draw(this._ctx);
  }
}
