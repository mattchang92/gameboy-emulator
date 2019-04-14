class Sound {
  constructor() {
    const audioContext = new (window.AudioContext || window.webkitAudoContext)();
    const gainNodeLeft = audioContext.createGain();
    const gainNodeRight = audioContext.createGain();

    this.soundNodes = {};
    this.gain = {};

    gainNodeLeft.gain.value = 1;
    gainNodeRight.gain.value = 1;

    gainNodeLeft.connect(audioContext.destination);
    gainNodeRight.connect(audioContext.destination);


    this.gain.gainNodeLeft = gainNodeLeft;
    this.gain.gainNodeRight = gainNodeRight;

    this.audioContext = audioContext;
    this.initializeSquareWaves();
  }

  initializeSquareWaves() {
    for (let i = 1; i <= 2; i++) {
      const squareWaveLeft = this.audioContext.createOscillator();
      const squareWaveRight = this.audioContext.createOscillator();

      const channelGainLeft = this.audioContext.createGain();
      const channelGainRight = this.audioContext.createGain();

      channelGainLeft.connect(this.gain.gainNodeLeft);
      channelGainRight.connect(this.gain.gainNodeRight);

      squareWaveLeft.type = 'square';
      squareWaveLeft.frequency.setValueAtTime(0, this.audioContext.currentTime);
      squareWaveLeft.connect(channelGainLeft);

      squareWaveRight.type = 'square';
      squareWaveRight.frequency.setValueAtTime(0, this.audioContext.currentTime);
      squareWaveRight.connect(channelGainRight);

      this.soundNodes[`squareWave${i}Left`] = squareWaveLeft;
      this.soundNodes[`squareWave${i}Right`] = squareWaveRight;
      this.gain[`squareWave${i}Left`] = channelGainLeft;
      this.gain[`squareWave${i}Right`] = channelGainRight;
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
