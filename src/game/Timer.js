export default class Timer {
  constructor(seconds) {
    this.seconds = seconds;
    this.timer = null;
  }

  countdown() {
    this.timer = setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      } else {
        //this.publish('Timer.timeOver');
        this.stop();
      }
    }, 1000);
  }

  stop() {
    clearInterval(this.timer);
  }
}
