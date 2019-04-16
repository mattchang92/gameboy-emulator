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

    this.audioContext = audioContext;
    this.merger = merger;

    this.gain.gainNodeLeft = gainNodeLeft;
    this.gain.gainNodeRight = gainNodeRight;

    this.audioContext = audioContext;
    this.initializeSquareChannels();
    this.initializeWaveChannel();
    this.initializeNoiseChannel();
  }

  initializeNoiseChannel() {
    this.initializeChannel('noiseChannel', 'sine');
  }

  initializeWaveChannel() {
    this.initializeChannel('waveChannel', 'sine');
  }

  initializeSquareChannels() {
    for (let i = 1; i <= 2; i++) {
      this.initializeChannel(`squareChannel${i}`, 'square');
    }
  }

  initializeChannel(channelName, channelType) {
    const leftOscillator = this.audioContext.createOscillator();
    const rightOscillator = this.audioContext.createOscillator();

    const channelGainLeft = this.audioContext.createGain();
    const channelGainRight = this.audioContext.createGain();

    channelGainLeft.connect(this.gain.gainNodeLeft);
    channelGainRight.connect(this.gain.gainNodeRight);

    leftOscillator.type = channelType;
    leftOscillator.frequency.setValueAtTime(0, this.audioContext.currentTime);
    leftOscillator.connect(channelGainLeft);

    rightOscillator.type = channelType;
    rightOscillator.frequency.setValueAtTime(0, this.audioContext.currentTime);
    rightOscillator.connect(channelGainRight);

    this.soundNodes[`${channelName}Left`] = leftOscillator;
    this.soundNodes[`${channelName}Right`] = rightOscillator;
    this.gain[`${channelName}Left`] = channelGainLeft;
    this.gain[`${channelName}Right`] = channelGainRight;
  }

  startChannels() {
    Object.values(this.soundNodes).forEach(node => node.start());
  }

  play() {
    this.merger.connect(this.audioContext.destination);
  }

  stop() {
    this.merger.disconnect(this.audioContext.destination);
  }
}

module.exports = Sound;
