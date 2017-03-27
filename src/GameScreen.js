
import Player from './game/Player';
import Scene from './Scene';
import Sprite from './Sprite';
import TextString from './TextString';

const BGCOLOR = '#1F8B00';

export default class GameScreen extends Scene {

  constructor(game) {
    super(game);
    this.player = new Player(game, 12, 12);
    this.player.bindKeyboard();
  }

  draw() {
    this._drawBG();
    this.player.draw();
  }

  update(frame) {
    this.player.update(frame);
    this.player.keyPressCheck();
  }

  _drawBG() {
    this._ctx.fillStyle = BGCOLOR;
    this._ctx.fillRect(0, 0, this._game.canvas.width, this._game.canvas.height);
  }


}
