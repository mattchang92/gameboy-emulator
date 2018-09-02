const CPUMemory = require('./cpuMemory');
const GPU = require('./gpu');
const MMU = require('./mmu');
const { opcodes } = require('./opcodes');

class CPU {
  constructor() {
    // general use registers
    this.counter = 0;
    this.initialCounter = 0;
    this.logsEnabled = false;
    this.offset = 0;
    this.limit = 30000;

    this.A = 0;
    this.B = 0;
    this.C = 0;
    this.D = 0;
    this.E = 0;

    // flag
    this.F = 0;

    // general use pointers
    this.H = 0;
    this.L = 0;

    // program counter
    this.PC = 0;

    // stack pointer
    this.SP = 0;
    this.M = 0;
    this.T = 0;

    // halt
    this.HALT = 0;

    this.RUN = 0;

    this.clock = {
      m: 0,
      t: 0,
    };

    this.ime = 0;

    // components
    this.ram = new CPUMemory();
    this.mmu = new MMU(this.ram);
    this.gpu = new GPU(this.mmu);
  }

  reset() {
    this.A = 0;
    this.B = 0;
    this.C = 0;
    this.D = 0;
    this.E = 0;
    this.F = 0;
    this.H = 0;
    this.L = 0;
    this.PC = 0;
    this.SP = 0;
    this.M = 0;
    this.T = 0;
    this.ime = 0;
    this.clock = {
      m: 0,
      t: 0,
    };
  }

  disableInterrupt() {
    this.ime = 0;
    this.M = 1;
    this.T = 4;
  }

  enableInterrupt() {
    this.ime = 1;
    this.M = 1;
    this.T = 4;
  }

  dispatch() {
    while (this.RUN) {
      this.frame();
    }
  }

  rst40() {
    console.log("rst40 breing called");
    this.ime = 0;
    this.SP -= 2;
    this.mmu.write16(this, this.SP, this.PC);
    this.PC = 0x0040;
    this.M = 3;
    this.T = 12;
  }

  frame() {
    const frameEnd = this.clock.m + 17556 * 5;

    while (this.clock.m < frameEnd) {
      // if (this.FAIL) {
      //   const op = this.mmu.read8(this, this.PC - 1);
      //   console.log('waht is the failed op', op.toString(16));
      //   return;
      // }

      const op = this.mmu.read8(this, this.PC++);
      // console.log('test')
      // console.log(this.PC - 1, op.toString(16), opcodes[op]);
      // console.log(this.PC - 1, op.toString(16), this.F.toString(2).slice(0, 4), opcodes[op].toString());
      this.initialCounter++;
      if (this.initialCounter > this.offset) {
        // this.logsEnabled = true;
        this.counter++;
      }

      if (this.counter < this.limit && this.logsEnabled) {
        console.log(this.PC - 1, op.toString(16), this.F.toString(2).slice(0, 4), this.SP, this.B, this.C, this.D, this.E, this.H, this.L, this.A);
      }

      if (typeof opcodes[op] !== 'function') {
        console.log('not a function!!!', op, op.toString(16), opcodes[op]);
      }
      opcodes[op](this);
      this.PC &= 0xffff;


      this.clock.m += this.M;
      this.clock.t += this.T;

      // if (this.ime) {
      //   console.log(this.mmu.ie, this.mmu.if);
      // }

      if (this.ime && this.mmu.ie && this.mmu.if) {
        const ifired = this.mmu.ie & this.mmu.if;
        if (ifired & 0x01) {
          this.mmu.if &= (0xff - 0x01);
          this.rst40();
        }
      }


      this.gpu.step(this);
    }
  }
}

module.exports = CPU;
