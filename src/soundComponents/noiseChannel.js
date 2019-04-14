class NoiseChannel {
  constructor() {
    // NRx4 Control
    this.waveformEnabled = false;
    this.lengthEnabled = false;
    this.frequencyReg2 = 0;

    // NRx3 Frequency
    this.divisorCode = 0;
    this.widthMode = 0;
    this.clockShift = 0;

    // NRx2 Volume
    this.envelopeRunning = false;
    this.envelopeAddMode = 0;
    this.envelopePeriod = 0;
    this.envelopePeriodCounter = 0;
    this.volume = 0;
    this.volumeTemp = 0;
    this.outputVolume = 0;

    // NRx1 Length
    this.length = 0;
    this.lengthCounter = 0;
    this.lengthEnabled = false;

    this.timer = 0;
    this.dacEnabled = false;

    this.divisors = [8, 16, 32, 48, 64, 80, 96, 112];
    this.lsfr = 0;
  }

  step() {
    if (--this.timer <= 0) {
      this.timer = this.divisors[this.divisorCode] << this.clockShift;

      const res = (this.lfsr & 1) ^ ((this.lfsr >> 1) & 1);
      this.lfsr >>= 1;
      this.lfsr |= res << 14;

      if (this.widthMode) {
        this.lfsr &= ~0x40;
        this.lfsr |= res << 6;
      }

      if (this.waveformEnabled && this.dacEnabled && (this.lfsr & 1)) {
        this.outputVolume = this.volumeTemp;
      } else {
        this.outputVolume = 0;
      }
    }
  }

  runEnvelopeCheck() {
    if (--this.envelopePeriodCounter <= 0) {
      this.envelopePeriodCounter = this.envelopePeriod || 8;

      if (this.envelopeRunning && this.envelopePeriod > 0) {
        if (this.envelopeAddMode && this.volume < 15) {
          this.volume++;
        } else if (!this.envelopeAddMode && this.volume > 0) {
          this.volume--;
        }
      }

      if (this.volume === 0 || this.volume === 15) {
        this.envelopeRunning = false;
      }
    }
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
    return this.outputVolume / 16;
  }

  trigger() {
    if (this.lengthCounter === 0) {
      this.lengthCounter = 64;
    }

    this.timer = this.divisors[this.divisorCode] << this.clockShift;
    this.envelopePeriodCounter = this.envelopePeriod;
    this.envelopeRunning = true;
    this.volumeTemp = this.volume;
    this.lsfr = 0;

    console.log(this.volume, this.volumeTemp, this.outputVolume);
  }

  read(addr) {
    switch (addr) {
      case 0: {
        return this.length;
      }
      case 1: {
        const envelopeAddMode = this.envelopeAddMode ? 0x80 : 0;
        const volume = this.volume << 4;
        return envelopeAddMode + volume + this.envelopePeriod;
      }
      case 2: {
        const width = this.widthMode << 3;
        const clockShift = this.clockShift << 4;
        return width + clockShift + this.divisorCode;
      }
      case 3: {
        const waveformEnabled = this.waveformEnabled ? 0x80 : 0;
        const lengthEnabled = this.lengthEnabled ? 0x40 : 0;
        return waveformEnabled + lengthEnabled;
      }
      default: break;
    }
  }

  write(addr, val) {
    switch (addr) {
      case 0: {
        this.length = val & 0x3f;
        break;
      }
      case 1: {
        this.dacEnabled = !!(val & 0xf8);
        this.volume = (val >>> 4) & 0xf;
        this.envelopeAddMode = (val >>> 3) & 1;
        this.envelopePeriod = val & 7;
        break;
      }
      case 2: {
        this.divisorCode = val & 7;
        this.widthMode = (val >>> 3) & 1;
        this.clockShift = (val >>> 4);
        break;
      }
      case 3: {
        this.waveformEnabled = !!(val & 0x80);
        this.lengthEnabled = !!(val & 0x40);
        if (this.waveformEnabled) this.trigger();
        break;
      }
      default: break;
    }
  }
}

module.exports = NoiseChannel;
