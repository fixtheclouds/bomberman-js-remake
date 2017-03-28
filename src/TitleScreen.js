import Sprite from './Sprite';
import TextString from './TextString';
import Scene from './Scene';
import GameScreen from './GameScreen';

export default class TitleScreen extends Scene{

  constructor(game) {
    super(game);
  }

  init() {
    this._game.soundManager.start('title-screen', true);
    this._bindKeyboard();
  }

  draw() {

    this._drawBG();
    this._drawSplash();
    this._drawMenu();
  }

  _bindKeyboard() {
    let self = this;
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 13) {
        let scene = new GameScreen(self._game)
        scene.init();
        self._game.scene =  scene;
      }
    });
  }

  update() {
    // TODO implement
  }

  _drawBG() {
    this._ctx.fillStyle = '#000000';
    this._ctx.fillRect(0, 0, this._game.canvas.width, this._game.canvas.height);
  }

  _drawSplash() {
    let splash = new Sprite('sprite.png', 4, 259, 227, 139);
    splash.draw(this._ctx, 14, 7);
  }

  _drawMenu() {
    let text = new TextString('Start', 100, 170);
    text.draw(this._ctx);
  }

}
