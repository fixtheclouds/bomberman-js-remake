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
  constructor({
    coords,
    sequence,
    size: [width, height],
    auto = false,
    loop = false
  }) {
    super({ x: null, y: null, width, height });
    this.frame = null;
    this.frameIdx = 0; // default frame index
    this.coords = coords;
    this.sequence = sequence;
    this.loop = loop;
    this.done = false;
    this.animationSpeed = 0;
    this.prevFrame = 0;
    this.animated = auto;
    this.setInitialFrame = _.once(frame => (this.initialFrame = frame));
  }

  draw({ posX, posY }) {
    this.setInitialFrame(this.frame);
    if (this.done) return;
    if (this.animationSpeed) {
      const max = this.sequence.length;
      const idx = Math.floor(this.relativeFrame);
      const frame = Math.floor((idx / this.animationSpeed) % max);
      if (!this.loop && frame >= max - 1) {
        this.done = true;
        return;
      }
      this.frameIdx = this.sequence[frame];
      this.prevFrame = this.frameIdx;
    } else {
      this.frameIdx = this.prevFrame;
    }
    const [x, y] = this.coords[this.frameIdx];
    return this.drawer.proxyDrawImage({
      img: this.img,
      x,
      y,
      width: this.width,
      height: this.height,
      imgX: posX,
      imgY: posY,
      imgWidth: this.width,
      imgHeight: this.height
    });
  }

  get relativeFrame() {
    return this.frame - this.initialFrame;
  }

  animate({ posX, posY, speed }) {
    this.animationSpeed = speed ? 1 / speed : 0;
    this.draw({ posX, posY });
  }
}
