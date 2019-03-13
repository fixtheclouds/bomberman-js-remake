// --
// PLAYER
// ---
const playerAnimation = {
  up: {
    coords: [[2, 21], [16, 21], [30, 21]],
    sequence: [0, 1, 2],
    size: [12, 16],
    loop: true
  },
  down: {
    coords: [[2, 3], [16, 3], [30, 3]],
    sequence: [0, 1, 2],
    size: [12, 16],
    loop: true
  },
  left: {
    coords: [[43, 21], [56, 21], [70, 21]],
    sequence: [0, 1, 2],
    size: [12, 16],
    loop: true
  },
  right: {
    coords: [[43, 3], [55, 3], [69, 3]],
    sequence: [0, 1, 2],
    size: [12, 16],
    loop: true
  },
  death: {
    coords: [[83, 3], [97, 3], [111, 3], [125, 3], [139, 3], [159, 3]],
    sequence: [0, 1, 2, 3, 4, 5],
    size: [12, 16],
    auto: true
  }
};

// ---
// ENEMIES
// ---
const enemyAnimation = {
  Baloom: {
    left: {
      coords: [[-1, 39], [16, 39], [33, 40]],
      sequence: [0, 1, 2, 1],
      size: [16, 16],
      auto: true,
      loop: true
    }
  }
};

// --
// BOMB
// ---
const bombAnimation = {
  coords: [[83, 21], [100, 21], [119, 21]],
  size: [16, 16],
  sequence: [0, 1, 2],
  auto: true,
  loop: true
};

// ---
// FIRE
// ---
const fireAnimation = {
  leftEdge: {
    coords: [[2, 205], [53, 205], [107, 205], [161, 205]],
    size: [16, 16],
    sequence: [0, 1, 2, 1, 0]
  },
  rightEdge: {
    coords: [[35, 205], [89, 205], [143, 205], [197, 205]],
    size: [16, 16],
    sequence: [0, 1, 2, 1, 0]
  },
  upEdge: {
    coords: [[17, 187], [71, 187], [125, 187], [179, 187]],
    size: [16, 16],
    sequence: [0, 1, 2, 1, 0]
  },
  downEdge: {
    coords: [[17, 223], [71, 223], [125, 223], [179, 223]],
    size: [16, 16],
    sequence: [0, 1, 2, 1, 0]
  },
  center: {
    coords: [[17, 205], [71, 204], [125, 205], [179, 205]],
    size: [16, 16],
    sequence: [0, 1, 2, 1, 0]
  },
  vertical: {
    coords: [[35, 187], [53, 222], [107, 223], [161, 223]],
    size: [16, 16],
    sequence: [0, 1, 2, 1, 0]
  },
  horizontal: {
    coords: [[35, 223], [89, 223], [143, 223], [197, 223]],
    size: [16, 16],
    sequence: [0, 1, 2, 1, 0]
  }
};

// ---
// BLOCKS
// ---
const blockAnimation = {
  burn: {
    coords: [[35, 241], [53, 241], [71, 241], [107, 241], [125, 241]],
    size: [16, 16],
    sequence: [0, 1, 2, 3, 4]
  }
};

export {
  playerAnimation,
  bombAnimation,
  fireAnimation,
  blockAnimation,
  enemyAnimation
};
