const powerUps = {
  Flames: {
    sprite: { x: 143, y: 271, width: 16, height: 16 },
    action: player => {
      if (player.flameRange < 10) {
        player.flameRange += 1;
      }
    }
  },
  Bombs: {
    sprite: { x: 161, y: 241, width: 16, height: 16 },
    action: player => {
      if (player.maxBombs < 10) {
        player.maxBombs += 1;
      }
    }
  },
  Wallpass: {
    sprite: { x: 215, y: 223, width: 16, height: 16 },
    action: player => {
      player.wallpass = true;
    }
  },
  Speed: {
    sprite: { x: 178, y: 241, width: 16, height: 16 },
    action: player => {
      if (player.speed < 3) {
        player.speed += 1;
      }
    }
  },
  Detonator: {
    sprite: { x: 196, y: 241, width: 16, height: 16 },
    action: player => {
      player.hasDetonator = true;
    }
  },
  Bombpass: {
    sprite: { x: 214, y: 241, width: 16, height: 16 },
    action: player => {
      player.bombpass = true;
    }
  },
  Flamepass: {
    sprite: { x: 0, y: 0, width: 16, height: 16 },
    action: player => {
      player.flamepass = true;
    }
  },
  Mystery: {
    sprite: { x: 0, y: 0, width: 16, height: 16 },
    action: player => {
      player.makeInvincible();
    }
  }
};

export default powerUps;
