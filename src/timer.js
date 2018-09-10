/*
  T = 4,194,304Hz
  M = 1,048,576Hz
  Base = 262,144Hz

  Address   Register                       Details
  ----------------------------------------------
  0xff04    Divider  Counts up at a fixed 16384Hz; reset to 0 whenever written to
  oxff05    Counter  Counts up at the specified rate. Triggers INT 0x50 when going 255->0
  oxff06    Modulo   When Counter overflows to 0, it's reset to start at Modulo
  0xff07    Control

  Control Register
  Bits    Function                Details
  ---------------------------------------------------------------
  0-1     Speed (Hz)   0: 4,096, 1: 262,144, 2: 65,536, 3: 16,384
  2       Running      1 to run timer, 0 to stop
  -3-7    Unused
*/

class Timer {
  constructor() {
    this.clock = {
      main: 0,
      sub: 0,
      div: 0,
    };
    this.div = 0; // divider register
    this.tima = 0; // timer counter
    this.tma = 0; // timer modulo
    this.tac = 0; // timer control
  }

  increment(cpu) {
    this.clock.sub += cpu.M;

    if (this.clock.sub >= 4) {
      this.clock.main++;
      this.clock.sub -= 4;
      this.clock.div++;

      if (this.clock.div === 16) {
        this.div = (this.div + 1) & 0xff;
        this.clock.div = 0;
      }
    }

    this.check(cpu);
  }

  check(cpu) {
    if (this.tac & 4) {
      let threshold;
      switch (this.tac & 3) {
        case 0: threshold = 64; break;
        case 1: threshold = 1; break;
        case 2: threshold = 4; break;
        case 3: threshold = 16; break;
        default: break;
      }

      if (this.clock.main >= threshold) this.step(cpu);
    }
  }

  step(cpu) {
    this.clock.main = 0;
    this.tima++;

    if (this.tima > 255) {
      this.tima = this.tma;
      cpu.mmu.if |= 4;
    }
  }

  read(cpu, addr) {
    switch (addr) {
      case 0xff04: return this.div;
      case 0xff05: return this.tima;
      case 0xff06: return this.tma;
      case 0xff07: return this.tac;
      default: return 0;
    }
  }

  write(cpu, addr, val) {
    switch (addr) {
      case 0xff04: this.div = 0; break;
      case 0xff05: this.tima = val; break;
      case 0xff06: this.tma = val; break;
      case 0xff07: this.tac = val & 7; break;
      default: break;
    }
  }
}

module.exports = Timer;
