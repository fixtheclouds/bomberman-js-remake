import Sprite from './Sprite';

export default class AnimatedSprite extends Sprite {
  /**
   * Animated sprite constructor
   * @param {String} url sprite url
   * @param {Array} coords x/y frame of each frame
   * @param {Array} sequence animation sequence in indices of frames
   * @param {Number} width
   * @param {Number} height
   * @param {Boolean} loop
   */
  constructor({ coords, sequence, size: [width, height], loop = false }) {
    super('sprite.png', null, null, width, height);
    this.frame = 0; // default frame index
    this.coords = coords;
    this.sequence = sequence;
    this.loop = loop;
    this.done = false;
    this.animationSpeed = 0;
    this.prevFrame = 0;
  }

  draw(ctx, posX, posY) {
    if (this.done) return;
    if (this.animationSpeed) {
      const max = this.sequence.length;
      const idx = Math.floor(this.frame);
      const frame = Math.floor((idx / this.animationSpeed) % max);
      if (!this.loop && frame >= max - 1) {
        this.done = true;
        return;
      }
      this.frame = this.sequence[frame];
      this.prevFrame = this.frame;
    } else {
      this.frame = this.prevFrame;
    }
    const [x, y] = this.coords[this.frame];

    ctx.drawImage(
      this.img,
      x,
      y,
      this.width,
      this.height,
      posX * 2,
      posY * 2,
      this.width * 2,
      this.height * 2
    );
  }

  animate(ctx, { posX, posY, speed }) {
    this.animationSpeed = speed ? 1 / speed : 0;
    this.draw(ctx, posX, posY);
  }
}
