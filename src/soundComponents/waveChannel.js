class WaveChannel {
  constructor() {
    // NRx4 Control
    this.waveformEnabled = false;
    this.lengthEnabled = false;
    this.frequencyReg2 = 0;

    // NRx3 Frequency
    this.frequencyReg1 = 0;
    this.frequency = 0;

    // NRx2 Volume
    this.volume = 0;
    this.outputVolume = 0;

    // NRx1 Length
    this.length = 0;
    this.lengthEnabled = false;

    this.timer = 0;
    this.positionCounter = 0;
    this.waveTable = new Array(16).fill(0);
    this.dacEnabled = false;
  }

  runLengthCheck() {
    if (this.length > 0 && this.lengthEnabled) {
      this.length--;
      if (this.length === 0) {
        this.waveformEnabled = false;
      }
    }
  }

  getVolumeGain() {
    return this.outputVolume / 100;
    // return this.outputVolume / 4;
    // switch (this.volume) {
    //   case 0: return 0;
    //   case 1: return 1;
    //   case 2: return 0.5;
    //   case 3: return 0.25;
    //   default: return 0;
    // }
  }

  getActualFrequency() {
    return (2 ** 17) / (2048 - this.frequency);
  }

  resetTimer() {
    this.timer = (2048 - this.frequency) * 2;
  }

  step() {
    if (--this.timer <= 0) {
      this.resetTimer();
      this.positionCounter = (++this.positionCounter) & 0x1f;

      if (this.waveformEnabled && this.dacEnabled) {
        const position = Math.floor(this.positionCounter / 2);
        let waveValue = this.waveTable[position];

        if (!(this.positionCounter & 1)) {
          waveValue >>= 4;
        }
        waveValue &= 0xf;

        if (this.volume > 0) {
          waveValue >>= (this.volume - 1);
        } else {
          waveValue = 0;
        }

        this.outputVolume = waveValue;
      } else {
        this.outputVolume = 0;
      }
    }
  }

  trigger() {
    if (this.length === 0) {
      this.length = 256;
    }

    this.timer = (2048 - this.frequency) * 2;
    this.positionCounter = 0;
  }

  readWaveTable(addr) {
    return this.waveTable[addr & 0xf];
  }

  writeWaveTable(addr, val) {
    this.waveTable[addr & 0xf] = val;
  }

  read(addr) {
    switch (addr) {
      case 0: {
        return this.dacEnabled ? 0x80 : 0;
      }
      case 1: {
        return this.length;
      }
      case 2: {
        return this.volume << 5;
      }
      case 3: {
        console.log('Register NRx3 is write only');
        break;
      }
      case 4: {
        const waveformEnabled = this.waveformEnabled ? 0x80 : 0;
        const lengthEnabled = this.lengthEnabled ? 0x40 : 0;
        return waveformEnabled + lengthEnabled + this.frequencyReg2;
      }
      default: break;
    }
  }

  write(addr, val) {
    switch (addr) {
      case 0: {
        this.dacEnabled = !!(val & 0x80);
        break;
      }
      case 1: {
        this.length = val;
        break;
      }
      case 2: {
        this.volume = val >>> 5;
        break;
      }
      case 3: {
        this.frequencyReg1 = val;
        this.frequency = this.frequencyReg1 + (this.frequencyReg2 << 8);
        break;
      }
      case 4: {
        this.waveformEnabled = !!(val & 0x80);
        this.frequencyReg2 = val & 0x7;
        this.frequency = this.frequencyReg1 + (this.frequencyReg2 << 8);
        this.lengthEnabled = !!(val & 0x40);
        if (this.waveformEnabled) this.trigger();
        break;
      }
      default: break;
    }
  }
}


module.exports = WaveChannel;
