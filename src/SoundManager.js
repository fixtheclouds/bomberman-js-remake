export default class SoundManager {

  static play(sound, looped) {
    let audio = new Audio(`assets/sounds/${sound}.mp3`);
    audio.loop = looped || false;
    audio.play();
  }

}
