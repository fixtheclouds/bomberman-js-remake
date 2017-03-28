export default class Enemy {


  constructor(type) {
    _.extend(this, types[type]);
  }

  die() {
    // TODO implement
  }

}

let types = {
  'Baloom': {
    points: 100,
    wallpass: false,
    speed: 2,
    intelligence: 1
  },
  'Oneal': {
    points: 200,
    wallpass: false,
    speed: 3,
    intelligence: 2
  },
  'Doll': {
    points: 400,
    wallpass: false,
    speed: 3,
    intelligence: 1
  },
  'Minvo': {
    points: 800,
    wallpass: false,
    speed: 4,
    intelligence: 2
  },
  'Kondoria': {
    points: 1000,
    wallpass: true,
    speed: 1,
    intelligence: 3
  },
  'Ovapi': {
    points: 2000,
    wallpass: true,
    speed: 2,
    intelligence: 2
  },
  'Pass': {
    points: 4000,
    wallpass: false,
    speed: 4,
    intelligence: 3
  },
  'Pontan': {
    points: 8000,
    wallpass: true,
    speed: 4,
    intelligence: 3
  }
};
