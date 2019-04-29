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

const SquareChannel = require('./squareChannel');
const WaveChannel = require('./waveChannel');
const NoiseChannel = require('./noiseChannel');

const FRAME_SEQUENCE_COUNTDOWN_RESET = 8192;
const DOWN_SAMPLE_COUNTER_RESET = 96;
const VOLUME_ADJUST = 0.1;

class Apu {
  constructor(sound) {
    this.soundNodes = sound.soundNodes;
    this.audioContext = sound.audioContext;
    this.gain = sound.gain;
    this.channel1 = new SquareChannel();
    this.channel2 = new SquareChannel();
    this.channel3 = new WaveChannel();
    this.channel4 = new NoiseChannel();

    this.powerEnabled = 0;

    this.channels = {
      squareChannel1: 'channel1',
      squareChannel2: 'channel2',
      waveChannel: 'channel3',
      noiseChannel: 'channel4',
    };

    this.disabledChannels = {
      channel1: 0,
      channel2: 0,
      channel3: 0,
      channel4: 0,
    };

    this.reset();
  }

  reset() {
    this.frameSequencer = 0;
    this.frameSequenceCounter = FRAME_SEQUENCE_COUNTDOWN_RESET;

    this.downSampleCounter = DOWN_SAMPLE_COUNTER_RESET;

    this.leftVolume = 0;
    this.rightVolume = 0;
    this.leftRightControlRegister = 0;

    this.leftChannelsEnabled = [0, 0, 0, 0];
    this.rightChannelsEnabled = [0, 0, 0, 0];
    this.channelsControlRegister = 0;

    this.powerControLRegister = 0;

    for (let i = 0; i < 5; i++) {
      this.channel1.write(i, 0);
      this.channel2.write(i, 0);
      this.channel3.write(i, 0);
      this.channel4.write(i, 0);
    }
  }

  step(cycles) {
    while (cycles-- > 0) {
      this.stepFrameSequencer();
    }

    this.channel1.step();
    this.channel2.step();
    this.channel3.step();
    this.channel4.step();

    if (--this.downSampleCounter <= 0) {
      this.downSampleCounter = DOWN_SAMPLE_COUNTER_RESET;
      this.gain.gainNodeLeft.gain.value = VOLUME_ADJUST * this.leftVolume / 8;
      this.gain.gainNodeRight.gain.value = VOLUME_ADJUST * this.rightVolume / 8;

      this.sampleChannels();
    }
  }

  sampleChannels() {
    Object.keys(this.channels).forEach((channel, i) => {
      const left = `${channel}Left`;
      const right = `${channel}Right`;
      const channelNumber = this.channels[channel];

      this.gain[left].gain.value = this.disabledChannels[channelNumber] ? 0 : this[channelNumber].getVolumeGain();
      this.gain[right].gain.value = this.disabledChannels[channelNumber] ? 0 : this[channelNumber].getVolumeGain();

      if (this.leftChannelsEnabled[i]) {
        this.soundNodes[left].frequency.setValueAtTime(this[channelNumber].getActualFrequency(), this.audioContext.currentTime);
      }

      if (this.rightChannelsEnabled[i]) {
        this.soundNodes[right].frequency.setValueAtTime(this[channelNumber].getActualFrequency(), this.audioContext.currentTime);
      }
    });
  }

  stepFrameSequencer() {
    if (--this.frameSequenceCounter <= 0) {
      this.frameSequenceCounter = FRAME_SEQUENCE_COUNTDOWN_RESET;

      switch (this.frameSequencer) {
        case 0: {
          this.channel1.runLengthCheck();
          this.channel2.runLengthCheck();
          this.channel3.runLengthCheck();
          this.channel4.runLengthCheck();
          break;
        }
        case 1: break;
        case 2: {
          this.channel1.runLengthCheck();
          this.channel1.runSweepCheck();
          this.channel2.runLengthCheck();
          this.channel2.runSweepCheck();
          this.channel3.runLengthCheck();
          this.channel4.runLengthCheck();
          break;
        }
        case 3: break;
        case 4: {
          this.channel1.runLengthCheck();
          this.channel2.runLengthCheck();
          this.channel3.runLengthCheck();
          this.channel4.runLengthCheck();
          break;
        }
        case 5: break;
        case 6: {
          this.channel1.runLengthCheck();
          this.channel1.runSweepCheck();
          this.channel2.runLengthCheck();
          this.channel2.runSweepCheck();
          this.channel3.runLengthCheck();
          this.channel4.runLengthCheck();
          break;
        }
        case 7: {
          this.channel1.runEnvelopeCheck();
          this.channel2.runEnvelopeCheck();
          this.channel4.runEnvelopeCheck();
          break;
        }
        default: {
          console.log('should not be reaching this block');
        }
      }

      this.frameSequencer = ++this.frameSequencer % 8;
    }
  }

  updateChannelsEnabled(val) {
    // TODO: Enable 4 once noise channel is implemented/fixed
    for (let i = 0; i < 3; i++) {
      this.rightChannelsEnabled[i] = (val >> i) & 1;
      this.leftChannelsEnabled[i] = (val >> (i + 4)) & 1;
    }
  }

  read(addr) {
    addr %= 0xff10;
    let val;

    if (addr >= 0x20) {
      return this.channel3.readWaveTable(addr);
    }

    switch (addr) {
      case 0x00: case 0x01: case 0x02: case 0x03: case 0x04:
        val = this.channel1.read(addr % 5); break;
      case 0x05: case 0x06: case 0x07: case 0x08: case 0x09:
        val = this.channel2.read(addr % 5); break;
      case 0x0a: case 0x0b: case 0x0c: case 0x0d: case 0x0e:
        val = this.channel3.read(addr % 5); break;
      case 0x10: case 0x11: case 0x12: case 0x13:
        val = this.channel4.read(addr % 5); break;
      case 0x14:
        return this.leftRightControlRegister;
      case 0x15:
        return this.channelsControlRegister;
      case 0x16:
        return this.powerControLRegister;
      default: console.log('reading addr greater than 0xff26 from sound');
    }

    return val;
  }

  write(addr, val) {
    addr %= 0xff10;

    if (addr >= 0x20) {
      return this.channel3.writeWaveTable(addr, val);
    }

    switch (addr) {
      case 0x00: case 0x01: case 0x02: case 0x03: case 0x04:
        val = this.channel1.write(addr % 5, val); break;
      case 0x05: case 0x06: case 0x07: case 0x08: case 0x09:
        val = this.channel2.write(addr % 5, val); break;
      case 0x0a: case 0x0b: case 0x0c: case 0x0d: case 0x0e:
        val = this.channel3.write(addr % 5, val); break;
      case 0x10: case 0x11: case 0x12: case 0x13:
        val = this.channel4.write(addr % 5, val); break;
      case 0x14:
        // According to docs bit 3 and 7 don't do anything. Related to cartridge mixing
        this.rightVolume = val & 0x7;
        this.leftVolume = (val >>> 4) & 0x7;
        this.leftRightControlRegister = val;
        break;
      case 0x15:
        this.updateChannelsEnabled(val);
        this.channelsControlRegister = val;
        break;
      case 0x16:
        if (val & 0x80 === 0) {
          this.powerEnabled = 0;
          this.sound.stop();
          this.reset();
        } else if (!this.powerEnabled) {
          this.frameSequencer = 0;
          this.powerEnabled = 1;
          // reset wave channel
        }
        this.powerControLRegister = val;
        break;
      default: console.log('writing addr greater than 0xff26 from sound');
    }
  }
}

module.exports = Apu;
