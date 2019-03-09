import Sprite from './Sprite';

export default class OldAnimatedSprite extends Sprite {
  constructor(url, x, y, width, height, frames, paddings, loop = true) {
    super(url, x, y, width, height);
    this.frame = 0; // default frame
    this.frames = frames; // animation sequence
    // sprite horizontal padding
    this.paddings = paddings || new Array(this.frames.length).fill(0);
    this.loop = loop;
    this.done = false;
    this.animationSpeed = 0;
    this.prevFrame = 0;
  }

  draw(ctx, posX, posY) {
    if (this.done) return;
    if (this.animationSpeed) {
      const max = this.frames.length;
      const idx = Math.floor(this.frame);
      const frameIdx = Math.floor((idx / this.animationSpeed) % max);
      if (!this.loop && frameIdx >= max - 1) {
        this.done = true;
        return;
      }
      this.frame = this.frames[frameIdx];
      this.prevFrame = this.frame;
    } else {
      this.frame = this.prevFrame;
    }

    let x = this.x + this.frame * this.width;
    if (this.frame > 0) {
      x += this.paddings[this.frame];
    }

    ctx.drawImage(
      this.img,
      x,
      this.y,
      this.width,
      this.height,
      posX * 2,
      posY * 2,
      this.width * 2,
      this.height * 2
    );
  }

  animate(ctx, posX, posY, speed) {
    this.animationSpeed = speed ? 1 / speed : 0;
    this.draw(ctx, posX, posY);
  }
}