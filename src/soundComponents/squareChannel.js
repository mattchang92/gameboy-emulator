class SquareChannel {
  constructor() {
    // NRx4 Control
    this.waveformEnabled = false;
    this.lengthEnabled = false;
    this.frequencyReg2 = 0;

    // NRx3 Frequency
    this.frequencyReg1 = 0;
    this.frequency = 0;

    // NRx2 Volume
    this.envelopeRunning = true;
    this.envelopeAddMode = 0;
    this.envelopePeriod = 0;
    this.envelopePeriodCounter = 0;
    this.volume = 0;
    this.outputVolume = 0;

    // NRx1 Length
    this.length = 0;
    this.duty = 0;
    this.dutySequencePointer = 0;
    this.dutyCycles = [
      [0, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 0, 0, 1],
      [1, 0, 0, 0, 0, 1, 1, 1],
      [0, 1, 1, 1, 1, 1, 1, 0],
    ];

    // NRx0 Sweep
    this.sweepEnabled = false;
    this.sweepShadow = 0;
    this.negateSweep = 0;
    this.sweepShift = 0;
    this.sweepPeriod = 0;
    this.sweepPeriodCounter = 0;

    this.timer = 0;
  }

  runSweepCheck() {
    if (--this.sweepPeriodCounter <= 0) {
      this.sweepPeriodCounter = this.sweepPeriod || 8;

      if (this.sweepEnabled && this.sweepPeriod > 0) {
        const freq = this.calculateSweep();
        if (freq <= 2047 && this.sweepShift > 0) {
          this.sweepShadow = freq;
          this.frequency = freq;
          this.calculateSweep();
        }
        this.calculateSweep();
      }
    }
  }

  runEnvelopeCheck() {
    if (--this.envelopePeriodCounter <= 0) {
      this.envelopePeriodCounter = this.envelopePeriod || 8; // Not sure why, following other emu examples

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
    if (this.length > 0 && this.waveformEnabled) {
      this.length--;
      if (this.length === 0) {
        this.waveformEnabled = false;
      }
    }
  }

  getVolumeGain() {
    return this.outputVolume / 16;
  }

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

  calculateSweep() {
    let newFrequency = this.sweepShadow >> this.sweepShift;

    if (this.negateSweep) {
      newFrequency = this.sweepShadow - newFrequency;
    } else {
      newFrequency += this.sweepShadow;
    }

    if (newFrequency > 2047) this.waveformEnabled = false;

    return newFrequency;
  }

  trigger() {
    if (this.length === 0) this.length = 64;

    this.timer = (2048 - this.frequency) * 4;
    this.envelopeRunning = true;
    this.envelopePeriodCounter = this.envelopePeriod;
    this.outputVolume = this.volume;

    this.sweepShadow = this.frequency;
    this.sweepPeriodCounter = this.sweepPeriod || 8;
    this.sweepEnabled = this.sweepPeriodCounter > 0 || this.sweepShift > 0;

    if (this.sweepShift > 0) this.calculateSweep();
  }

  read(addr) {
    switch (addr) {
      case 0: {
        const negateSweep = this.negateSweep << 3;
        const sweepPeriod = this.sweepPeriod << 4;
        return negateSweep + sweepPeriod + this.sweepShift;
      }
      case 1: {
        const duty = this.duty << 6;
        return duty + this.length;
      }
      case 2: {
        const volume = this.volume << 4;
        const envelopeAddMode = this.envelopeAddMode << 7;
        return volume + this.envelopePeriod + envelopeAddMode;
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
        this.sweepShift = val & 7;
        this.negateSweep = (val >>> 3) & 1;
        this.sweepPeriod = (val >>> 4) & 7;
        break;
      }
      case 1: {
        this.duty = val >>> 6;
        this.length = val & 0x3f;
        break;
      }
      case 2: {
        this.volume = val >>> 4;
        this.envelopePeriod - val && 7;
        this.envelopeAddMode = val >>> 7;
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


module.exports = SquareChannel;
