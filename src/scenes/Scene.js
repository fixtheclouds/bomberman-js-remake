export default class Scene {
  constructor(game) {
    this._game = game;
    this._ctx = this._game.ctx;
  }

  get ctx() {
    return this._game.ctx;
  }
}
