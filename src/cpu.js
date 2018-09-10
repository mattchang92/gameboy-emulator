const CPUMemory = require('./cpuMemory');
const GPU = require('./gpu');
const MMU = require('./mmu');
const Controller = require('./controller');
const { opcodes, interrupts } = require('./opcodes');

class CPU {
  constructor() {
    // general use registers
    this.testMode = false;
    this.rstCalled = false;
    this.counter = 0;
    this.initialCounter = 0;
    this.logsEnabled = false;
    this.offset = 15000;
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

    this.ime = 1;

    // components
    this.ram = new CPUMemory();
    this.mmu = new MMU(this.ram);
    this.gpu = new GPU(this.mmu);
    this.controller = new Controller();
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

  handleInterrupts() {
    /*
      Interrupts
      0 VBlank
      1 LCD stat
      2 Timer
      3 Serial
      4 Joypad
    */
    if (this.ime && this.mmu.ie && this.mmu.if) {
      this.HALT = 0;
      // console.log(this.mmu.ie.toString(2), this.mmu.if.toString(2))
      let ifired = this.mmu.ie & this.mmu.if;
      for (let i = 0; i < 5; i++) {
        if (ifired & 0x01) {
          const mask = 1 << i;
          this.mmu.if &= (0xff - mask);
          interrupts[i](this);
          break;
        } else {
          ifired >>= 1;
        }
      }
    }
  }

  frame() {
    const frameEnd = this.clock.m + 17556 * 1;

    while (this.clock.m < frameEnd) {
      // Object.keys(this).forEach((key) => {
      //   if (this[key] === undefined) {
      //     const op = this.mmu.read8(this, this.PC - 1);
      //     console.log('property is undefined', key, op.toString(16));
      //   }
      // });

      if (this.FAIL) {
        const op = this.mmu.read8(this, this.PC - 1);
        console.log("write byte failed", op.toString(16));
        this.FAIL = false;
      }

      if (this.HALT) {
        this.M = 1;
      } else {
        const pc = this.PC;
        const sp = this.SP;
        const op = this.mmu.read8(this, this.PC++);

        this.initialCounter++;
        if (this.initialCounter > this.offset) {
          // this.logsEnabled = true;
          this.counter++;
        }

        if (this.timeout) {
          // console.log('if ', this.mmu.if, ' ie ', this.mmu.ie, ' ime ', this.ime);
          // console.log(this.PC - 1, op.toString(16), this.F.toString(2).slice(0, 4), this.SP, this.B, this.C, this.D, this.E, this.H, this.L, this.A);
        }

        if (typeof opcodes[op] !== 'function') {
          const prevOp = this.mmu.read8(this, this.PC - 2);
          console.log('not a function!!!', op, op.toString(16), opcodes[op], ' previous is ', prevOp.toString(16), ' pc is at ', this.PC);
        }
        opcodes[op](this);

        if (this.counter < this.limit && this.logsEnabled) {
          console.log('PC:', pc, ' OP:', op.toString(16), ' F:', this.F.toString(2).slice(0, 4), ' SP:', sp, ' B:', this.B, ' C:', this.C, ' D:', this.D, ' E:', this.E, ' H:', this.H, ' L:', this.L, ' A:', this.A);
        }

        this.PC &= 0xffff;


        this.clock.m += this.M;
        this.clock.t += this.T;
      }


      // if (this.ime) {
      //   console.log(this.mmu.ie, this.mmu.if);
      // }

      this.handleInterrupts();

      this.gpu.step(this);
    }
  }
}


module.exports = CPU;
