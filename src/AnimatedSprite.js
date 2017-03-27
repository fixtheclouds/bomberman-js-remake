import Sprite from './Sprite';

export default class AnimatedSprite extends Sprite {

  constructor(url, x, y, width, height, frames, padding, loop) {
    super(url, x, y, width, height);
    this.frame = 0; // default frame
    this.frames = frames; // animation sequence
    this.padding = padding || 2; // sprite horizontal padding
    this.loop = loop || true;
    this.done = false;
    this.speed = 0;
  }

  draw(ctx, posX, posY) {
    let frame = 0;
    if (this.speed > 0) {
      let max = this.frames.length;
      let idx = Math.floor(this.frame);
      frame = this.frames[idx % max];
      if (!this.loop && idx >= max) {
        this.done = true;
        return;
      }
    }

    let x = this.x + frame * this.width + this.padding;

    ctx.drawImage(this.img, x, this.y, this.width, this.height, posX*2, posY*2, this.width*2, this.height*2);
  }

}
