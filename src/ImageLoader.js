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
    let promise = new Promise((resolve) => {
      urls.forEach((url) => {
        if (this.cache[url]) {
          return this.cache[url];
        } else {
          let img = new Image();
          img.src = `./assets/images/${url}`;
          this.cache[url] = false;
          img.onload = () => {
            this.cache[url] = img;
            if (this.isReady()) {
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
