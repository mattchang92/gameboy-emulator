/*
  FF10  |  NR10  |  Channel 1 Sweep
  FF11  |  NR11  |  Channel 1 Sound length/Wave pattern duty
  FF12  |  NR12  |  Channel 1 Volume Envelope
  FF13  |  NR13  |  Channel 1 Frequency Lo (Write only)
  FF14  |  NR14  |  Channel 1 Frequency Hi

  FF15 Unused
  FF16  |  NR21  |  Channel 2 Sound length/Wave pattern duty
  FF17  |  NR22  |  Channel 2 Volume Envelope
  FF18  |  NR23  |  Channel 2 Frequency Lo (Write only)
  FF19  |  NR24  |  Channel 2 Frequency Hi

  FF1A  |  NR30  |  Channel 3 Sound on/off
  FF1B  |  NR31  |  Channel 3 Sound length
  FF1C  |  NR32  |  Channel 3 Select output level
  FF1D  |  NR33  |  Channel 3 Frequency Lo (write only)
  FF1E  |  NR34  |  Channel 3 Frequency Hi

  FF20  |  NR41  |  Channel 4 Sound length
  FF21  |  NR42  |  Channel 4 Volume Envelope
  FF22  |  NR43  |  Channel 4 Polynomial Counter
  FF23  |  NR44  |  Channel 4 Counter/Consecutive; Initial

  FF24  |  NR50  |  Channel control (On/Off)
  FF25  |  NR51  |  Selection of Sound output terminal
  FF26  |  NR52  |  Sound on/off
*/

const SquareWave = require('./squareWave');

const FRAME_SEQUENCE_COUNTDOWN_RESET = 8192;

class Apu {
  constructor() {
    this.ram = new Array(0xff26 - 0xff10).fill(0);
    this.frameSequencer = 0;
    this.frameSequenceCounter = FRAME_SEQUENCE_COUNTDOWN_RESET;

    this.channel1 = new SquareWave();
  }

  step(cycles) {
    while (cycles-- > 0) {
      this.stepFrameSequencer();
    }
  }

  stepFrameSequencer() {
    if (--this.frameSequenceCounter <= 0) {
      this.frameSequenceCounter = FRAME_SEQUENCE_COUNTDOWN_RESET;

      switch (this.frameSequencer) {
        case 0: {
          this.channel1.runLengthCheck();
          break;
        }
        case 1: break;
        case 2: {
          this.channel1.runLengthCheck();
          this.channel1.runSweepCheck();
          break;
        }
        case 3: break;
        case 4: {
          this.channel1.runLengthCheck();
          break;
        }
        case 5: break;
        case 6: {
          this.channel1.runLengthCheck();
          this.channel1.runSweepCheck();
          break;
        }
        case 7: {
          this.channel1.runEnvelopeCheck();
          break;
        }
        default: {
          console.log('should not be reaching this block');
        }
      }

      this.frameSequencer = ++this.frameSequencer % 8;
    }
  }

  read(addr) {
    addr %= 0xff10;

    if (addr > 0x16) {
      console.log('reading addr greater than 0xff26 from sound');
    }
    return this.ram[addr];
  }

  write(addr, val) {
    addr %= 0xff10;

    if (addr > 0x16) {
      console.log('writing to addr greater than 0xff26 from sound');
    }

    this.ram[addr] = val;
  }
}

module.exports = Apu;
