export default class SceneRenderer {
  constructor(ctx) {
    this.ctx = ctx;
    this.offsetX = 0;
  }

  changeBy(x) {
    this.offsetX += x;
  }

  getX(x) {
    return x + this.offsetX;
  }

  draw(object) {
    return object.draw(this.ctx, this.offsetX);
  }
}
