import AnimatedSprite from '../AnimatedSprite';

const LIVES_COUNT = 3;

export default class Player {

  constructor(game, scene, x, y) {
    this.x = x;
    this.y = y;
    this.width = 12;
    this.height = 16;
    this.lives = LIVES_COUNT;
    this.speed = 1;
    this.currentSpeed = 0;
    this._frame = 0;
    this._game = game;
    this.scene = scene;
    this.detectCollisions = scene.collisionDetector.detect;
    this._ctx = game.ctx;
    this.isAlive = true;
    this.isMoving = false;

    // Abilities
    this.bombpass = false;
    this.wallpass = false;
    this.flamepass = false;
    this.fireRange = 1;
    this.maxBombs = 1;
    this.hasDetonator = false;

    // Sprites
    this.movingUpSprite = new AnimatedSprite('sprite.png', 2, 21, 12, 16, [0, 1, 2], 2);
    this.movingDownSprite = new AnimatedSprite('sprite.png', 2, 3, 12, 16, [0, 1, 2], 2);
    this.movingLeftSprite = new AnimatedSprite('sprite.png', 43, 21, 12, 16, [0, 1, 2], 2);
    this.movingRightSprite = new AnimatedSprite('sprite.png', 43, 3, 12, 16, [0, 1, 2], 2);
    this.deathSprite = new AnimatedSprite('sprite.png', 83, 3, 12, 16, [0, 1, 2, 3, 4, 5], 2, false);

    this._sprite = this.movingUpSprite;

  }

  get centerX() {
    return this.x + (this.width / 2);
  }

  get centerY() {
    return this.y + (this.height / 2);
  }

  kill() {
    this.isAlive = false;
    this._sprite = this.deathSprite;
  }

  bindKeyboard() {
    document.addEventListener('keydown', e => {
      this._game.keys[e.keyCode] = true;
    });

    document.addEventListener('keyup', e => {
      this._game.keys[e.keyCode] = false;
    });
  }

  keyPressCheck() {
    this.stop();
    if (this._game.keys[39]) {
      this.moveRight();
    } else if (this._game.keys[37]) {
      this.moveLeft();
    } else if (this._game.keys[38]) {
      this.moveUp();
    } else if (this._game.keys[40]) {
      this.moveDown();
    } else if (this._game.keys[18]) {
      this.plant();
    } else if (this._game.keys[19]) {
      this.detonate();
    }
  }

  stop() {
    this.currentSpeed = 0;
  }

  moveDown() {
    this.currentSpeed = this.speed;
    this._sprite = this.movingDownSprite;
    if (!this.detectCollisions(this.x, this.y, 'down', this.bombpass, this.wallpass)) {
      this.y += this.currentSpeed;
    }
  }

  moveUp() {
    this.currentSpeed = this.speed;
    this._sprite = this.movingUpSprite;
    if (!this.detectCollisions(this.x, this.y, 'up', this.bombpass, this.wallpass)) {
      this.y -= this.currentSpeed;
    }
  }

  moveRight() {
    this.currentSpeed = this.speed;
    this._sprite = this.movingRightSprite;
    if (!this.detectCollisions(this.x, this.y, 'right', this.bombpass, this.wallpass)) {
      this.x += this.currentSpeed;
    }
  }

  moveLeft() {
    this.currentSpeed = this.speed;
    this._sprite = this.movingLeftSprite;
    if (!this.detectCollisions(this.x, this.y, 'left', this.bombpass, this.wallpass)) {
      this.x -= this.currentSpeed;
    }
  }

  draw() {
    this._sprite.draw(this._ctx, this.x, this.y);
  }

  update(frame) {
    this._frame = frame;
    this._sprite.speed = this.currentSpeed;
    this._sprite.frame = this._frame;
  }

  plant() {
    // TODO implement
  }

  detonate() {
    // TODO implement
  }

  smoothTurn(x, y) {

  }

}
