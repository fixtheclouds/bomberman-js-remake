import ImageLoader from './ImageLoader';

let imageLoader = new ImageLoader();

export default class Sprite {

  constructor(url, x, y, width, height) {
    this.img = imageLoader.get(url);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  draw(ctx, posX, posY) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height, posX*2, posY*2, this.width*2, this.height*2);
  }

}
