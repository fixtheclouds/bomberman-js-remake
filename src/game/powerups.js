import Sprite from '../elements/Sprite';

const powerUps = {
  Flames: {
    sprite: new Sprite('sprite.png', 143, 271, 16, 16),
    action: player => {
      if (player.flameRange < 10) {
        player.flameRange += 1;
      }
    }
  },
  Bombs: {
    sprite: new Sprite('sprite.png', 161, 241, 16, 16),
    action: player => {
      if (player.maxBombs < 10) {
        player.maxBombs += 1;
      }
    }
  },
  Wallpass: {
    sprite: new Sprite('sprite.png', 215, 223, 16, 16),
    action: player => {
      player.wallpass = true;
    }
  },
  Speed: {
    sprite: new Sprite('sprite.png', 178, 241, 16, 16),
    action: player => {
      if (player.speed < 3) {
        player.speed += 1;
      }
    }
  },
  Detonator: {
    sprite: new Sprite('sprite.png', 196, 241, 16, 16),
    action: player => {
      player.hasDetonator = true;
    }
  },
  Bombpass: {
    sprite: new Sprite('sprite.png', 214, 241, 16, 16),
    action: player => {
      player.bombpass = true;
    }
  },
  Flamepass: {
    sprite: new Sprite('sprite.png', 0, 0, 16, 16),
    action: player => {
      player.flamepass = true;
    }
  },
  Mystery: {
    sprite: new Sprite('sprite.png', 0, 0, 16, 16),
    action: player => {
      player.makeInvincible();
    }
  }
};

export default powerUps;
