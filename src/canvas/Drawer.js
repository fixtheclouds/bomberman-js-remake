let instance = null;

export default class Drawer {
  constructor(ctx) {
    if (!instance) {
      this.ctx = ctx;
      this.offsetX = 0;
      instance = this;
    }
    return instance;
  }

  reset() {
    this.offsetX = 0;
  }

  changeOffset(x) {
    this.offsetX += x;
  }

  proxyDrawImage({
    img,
    x,
    y,
    width,
    height,
    imgX,
    imgY,
    imgWidth,
    imgHeight
  }) {
    return this.ctx.drawImage(
      img,
      x,
      y,
      width,
      height,
      (imgX + this.offsetX) * 2,
      imgY * 2,
      imgWidth * 2,
      imgHeight * 2
    );
  }
}
