class Sound {
  constructor() {
    const audioContext = new (window.AudioContext || window.webkitAudoContext)();
    const gainNodeLeft = audioContext.createGain();
    const gainNodeRight = audioContext.createGain();

    const merger = audioContext.createChannelMerger();

    this.soundNodes = {};
    this.gain = {};

    gainNodeLeft.gain.value = 1;
    gainNodeRight.gain.value = 1;

    gainNodeLeft.connect(merger, 0, 0);
    gainNodeRight.connect(merger, 0, 1);

    merger.connect(audioContext.destination);

    this.gain.gainNodeLeft = gainNodeLeft;
    this.gain.gainNodeRight = gainNodeRight;

    this.audioContext = audioContext;
    this.initializeSquareChannels();
    this.initializeWaveChannel();
    this.initializeNoiseChannel();
  }

  initializeNoiseChannel() {
    const noiseChannelLeft = this.audioContext.createOscillator();
    const noiseChannelRight = this.audioContext.createOscillator();

    const channelGainLeft = this.audioContext.createGain();
    const channelGainRight = this.audioContext.createGain();

    channelGainLeft.connect(this.gain.gainNodeLeft);
    channelGainRight.connect(this.gain.gainNodeRight);

    noiseChannelLeft.connect(this.gain.gainNodeLeft);
    noiseChannelRight.connect(this.gain.gainNodeLeft);

    noiseChannelLeft.type = 'sine';
    noiseChannelLeft.frequency.setValueAtTime(0, this.audioContext.currentTime);
    noiseChannelLeft.connect(channelGainLeft);

    noiseChannelRight.type = 'sine';
    noiseChannelRight.frequency.setValueAtTime(0, this.audioContext.currentTime);
    noiseChannelRight.connect(channelGainLeft);

    this.soundNodes.noiseChannelLeft = noiseChannelLeft;
    this.soundNodes.noiseChannelRight = noiseChannelRight;
    this.gain.noiseChannelLeft = channelGainLeft;
    this.gain.noiseChannelRight = channelGainRight;
  }

  initializeWaveChannel() {
    const waveChannelLeft = this.audioContext.createOscillator();
    const waveChannelRight = this.audioContext.createOscillator();

    const channelGainLeft = this.audioContext.createGain();
    const channelGainRight = this.audioContext.createGain();

    channelGainLeft.connect(this.gain.gainNodeLeft);
    channelGainRight.connect(this.gain.gainNodeRight);

    waveChannelLeft.connect(this.gain.gainNodeLeft);
    waveChannelRight.connect(this.gain.gainNodeLeft);

    waveChannelLeft.type = 'sine';
    waveChannelLeft.frequency.setValueAtTime(0, this.audioContext.currentTime);
    waveChannelLeft.connect(channelGainLeft);

    waveChannelRight.type = 'sine';
    waveChannelRight.frequency.setValueAtTime(0, this.audioContext.currentTime);
    waveChannelRight.connect(channelGainLeft);

    this.soundNodes.waveChannelLeft = waveChannelLeft;
    this.soundNodes.waveChannelRight = waveChannelRight;
    this.gain.waveChannelLeft = channelGainLeft;
    this.gain.waveChannelRight = channelGainRight;
  }

  initializeSquareChannels() {
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
