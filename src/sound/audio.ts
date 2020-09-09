const length = 11
const voiceUris = [...(new Array(length))].map((v, i) => `voices/voice-${i}.mp3`)

export default class Audio {
  source: AudioBufferSourceNode
  panner: PannerNode
  _setupSperker () {
    this.panner.coneOuterGain = 0.1;
    this.panner.coneOuterAngle = 180; // OuterAngleが180なので指向性が無のスピーカー
    this.panner.coneInnerAngle = 0;

    // スピーカーの位置を決める
    const xpos = Math.random() * 30 - 15
    const ypos = Math.sqrt( 15*15 - xpos*xpos ) * (Math.random() > 0.5 ? -1 : 1)
    console.log(`[speaker position]: (${xpos}, ${-ypos}, 0)`)
    this.panner.setPosition(xpos, ypos, 0);
  }
  _setupListner () {
    // マイクのいる位置もうまく定めたいお気持ち
  }
  playOneShot () {
    const ctx = new AudioContext()

    this.source = ctx.createBufferSource()
    this.panner = ctx.createPanner()

    new BufferLoader(ctx, voiceUris, (buffers) => {
      this.source.buffer = buffers[Math.floor(Math.random() * length)];
    }).load();


    this._setupSperker()

    this.panner.connect(ctx.destination);
    this.source.connect(this.panner);

    this.source.start(0);
  }
  stop() {
    this.source.stop(0);
  }
}


window.onload = () => {
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
}