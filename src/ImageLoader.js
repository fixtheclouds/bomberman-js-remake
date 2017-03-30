let instance = null;

export default class ImageLoader {

  constructor() {
    if (!instance) {
      instance = this;
    }
    this.cache = {};
    return instance;
  }

  load(...urls) {
    let self = this;
    let promise = new Promise((resolve) => {
      urls.forEach((url) => {
        if (self.cache[url]) {
          return self.cache[url];
        } else {
          let img = new Image();
          img.src = `./assets/images/${url}`;
          self.cache[url] = false;
          img.onload = function() {
            self.cache[url] = img;
            if (self.isReady()) {
              resolve();
            }
          };
        }
      });
    });
    return promise;
  }

  get(url) {
    return this.cache[url];
  }

  isReady() {
    let ready = true;
    for (var k in this.cache) {
      if (this.cache.hasOwnProperty(k) && !this.cache[k]) {
        ready = false;
      }
    }
    return ready;
  }

}
