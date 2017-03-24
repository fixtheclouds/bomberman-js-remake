import SoundManager from './SoundManager';

export default class Scene {
  constructor(game) {
    this._soundManager = SoundManager;
    this._game = game;
    this._ctx = this._game.ctx;
  }
}
