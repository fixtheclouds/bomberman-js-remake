export default class Being {
  constructor(scene) {
    this._scene = scene;
    this.isAlive = true;
    this.x = null;
    this.y = null;
    this.sprite = null;
  }

  update(frame) {
    this.sprite.frame = frame;
  }

  draw() {
    const params = {
      posX: this.x,
      posY: this.y
    };
    if (this.sprite.animated) {
      return this.sprite.animate({
        ...params,
        speed: 0.2
      });
    }
    return this.sprite.draw(params);
  }

  get position() {
    return [this.x, this.y];
  }
}
