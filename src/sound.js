class Sound {
  constructor() {
    const audioContext = new (window.AudioContext || window.webkitAudoContext)();
    this.gainNodeLeft = audioContext.createGain();
    this.gainNodeRight = audioContext.createGain();
    const globalGainNode = audioContext.createGain();

    this.soundNodes = {};

    globalGainNode.gain.value = 0.1;
    this.gainNodeLeft.gain.value = 1;
    this.gainNodeRight.gain.value = 1;

    this.gainNodeLeft.connect(globalGainNode);
    this.gainNodeRight.connect(globalGainNode);

    globalGainNode.connect(audioContext.destination);

    this.audioContext = audioContext;
    this.initializeSquareWaves();
  }

  initializeSquareWaves() {
    for (let i = 1; i <= 2; i++) {
      const squareWaveLeft = this.audioContext.createOscillator();
      const squareWaveRight = this.audioContext.createOscillator();

      squareWaveLeft.type = 'square';
      squareWaveLeft.frequency.setValueAtTime(0, this.audioContext.currentTime);
      squareWaveLeft.connect(this.gainNodeLeft);

      squareWaveRight.type = 'square';
      squareWaveRight.frequency.setValueAtTime(0, this.audioContext.currentTime);
      squareWaveRight.connect(this.gainNodeRight);

      this.soundNodes[`squareWave${i}Left`] = squareWaveLeft;
      this.soundNodes[`squareWave${i}Right`] = squareWaveRight;
    }
  }

  start() {
    Object.values(this.soundNodes).forEach(node => node.start());
  }

  stop() {
    Object.values(this.soundNodes).forEach(node => node.stop());
  }
}

module.exports = Sound;
