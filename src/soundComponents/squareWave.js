class SquareWave {
  constructor() {
    this.waveformEnabled = false;
    this.lengthEnabled = false;
    this.invertSweep = false;

    this.length = 0;
    this.volume = 0;
    this.outputVolume = 0;

    this.duty = 0;
    this.dutySequencePointer = 0;

    this.frequencyReg1 = 0;
    this.frequencyReg2 = 0;
    this.frequency = 0;
    this.timer = 0;

    this.dutyCycles = [
      [1, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0, 0, 0, 0],
      [1, 1, 1, 1, 1, 1, 0, 0],
    ];
  }

  runSweepCheck() {}

  runEnvelopeCheck() {}

  runLengthCheck() {}

  getActualFrequency() {
    return (2 ** 17) / (2048 - this.frequency);
  }

  resetTimer() {
    this.timer = (2048 - this.frequency) * 4;
  }

  setOutputVolume() {
    if (this.waveformEnabled && !!this.dutyCycles[this.duty][this.dutySequencePointer]) {
      this.outputVolume = this.volume;
    } else {
      this.outputVolume = 0;
    }
  }

  step() {
    if (--this.timer <= 0) {
      this.resetTimer();
      this.dutySequencePointer = (++this.dutySequencePointer) % 8;
    }

    this.setOutputVolume();
  }

  read(addr) {
    switch (addr) {
      case 0: {
        const invertSweep = this.invertSweep ? 0x8 : 0;
        // PPP and SSS ??
        return invertSweep;
      }
      case 1: {
        const duty = this.duty << 6;
        // LLL ??
        return duty;
      }
      case 2: {
        const volume = this.volume << 4;
        // A and PPP ??
        return volume;
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
        this.invertSweep = !!(val & 0x8);
        // PPP and SSS??
        break;
      }
      case 1: {
        this.duty = val >>> 6;
        // LLL ??
        break;
      }
      case 2: {
        this.volume = val >>> 4;
        // A and PPP ??
        break;
      }
      case 3: {
        this.frequencyReg1 = val;
        this.frequency = this.frequencyReg1 + (this.frequencyReg2 << 8);
        break;
      }
      case 4: {
        this.enabled = !!(val & 0x80);
        this.frequencyReg2 = val & 0x7;
        this.frequency = this.frequencyReg1 + (this.frequencyReg2 << 8);
        this.lengthEnabled = !!(val & 0x40);
        break;
      }
      default: break;
    }
  }
}


module.exports = SquareWave;
