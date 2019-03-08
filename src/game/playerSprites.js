import AnimatedSprite from '../elements/AnimatedSprite';

const movingUpSprite = new AnimatedSprite(
  'sprite.png',
  2,
  21,
  12,
  16,
  [0, 1, 2],
  [0, 2, 4]
);

const movingDownSprite = new AnimatedSprite(
  'sprite.png',
  2,
  3,
  12,
  16,
  [0, 1, 2],
  [0, 2, 4]
);

const movingLeftSprite = new AnimatedSprite(
  'sprite.png',
  43,
  21,
  12,
  16,
  [0, 1, 2],
  [0, 0, 2]
);

const movingRightSprite = new AnimatedSprite(
  'sprite.png',
  43,
  3,
  12,
  16,
  [0, 1, 2],
  [0, 0, 2]
);

const deathSprite = new AnimatedSprite(
  'sprite.png',
  83,
  3,
  12,
  16,
  [0, 1, 2, 3, 4, 5],
  2,
  false
);

export {
  movingDownSprite,
  movingUpSprite,
  movingLeftSprite,
  movingRightSprite,
  deathSprite
};
