import { MAP_TOP_MARGIN, UNIT_HEIGHT, UNIT_WIDTH } from '../../constants';
import { gridMethods } from '../../utils/gridMethods';

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

  get cellPosition() {
    return [
      gridMethods.getClosestCol(this.x),
      gridMethods.getClosestRow(this.y)
    ];
  }

  /** COMMON MOVEMENT MECHANICS **/
  detectCollisions(...params) {
    return this._scene.collisionDetector.detect(...params);
  }

  stop() {
    this.currentSpeed = 0;
  }

  smoothTurn(x, y, direction) {
    if (direction === 'right' || direction === 'left') {
      const smoothDistanceHigh = Math.floor(UNIT_WIDTH / 3);
      const smoothDistanceLow = Math.floor((UNIT_WIDTH * 2) / 3);
      const offset = (y - MAP_TOP_MARGIN) % UNIT_WIDTH;
      if (offset >= smoothDistanceLow) {
        this.y += this.currentSpeed;
      } else if (offset > 0 && offset <= smoothDistanceHigh) {
        this.y -= this.currentSpeed;
      } else {
        this.whenStuck();
      }
    } else if (direction === 'up' || direction === 'down') {
      const smoothDistanceHigh = Math.floor(UNIT_HEIGHT / 3);
      const smoothDistanceLow = Math.floor((UNIT_HEIGHT * 2) / 3);
      const offset = x % UNIT_HEIGHT;
      if (offset >= smoothDistanceLow) {
        this.x += this.currentSpeed;
      } else if (offset > 0 && offset <= smoothDistanceHigh) {
        this.x -= this.currentSpeed;
      } else {
        this.whenStuck();
      }
    }
  }
}
