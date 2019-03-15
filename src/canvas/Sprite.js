import imageLoader from '../utils/imageLoader';
import Drawer from './Drawer';

const SPRITE_URL = 'sprite.png';

export default class Sprite {
  constructor({ x, y, width, height }) {
    this.img = imageLoader.get(SPRITE_URL);
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.drawer = new Drawer();
  }

  draw({ posX, posY }) {
    return this.drawer.proxyDrawImage({
      img: this.img,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      imgX: posX,
      imgY: posY,
      imgWidth: this.width,
      imgHeight: this.height
    });
  }
}
