const CPUMemory = require('./cpuMemory');
const GPU = require('./gpu');
const MMU = require('./mmu');
const Timer = require('./timer');
const Controller = require('./controller');
const { opcodes, interrupts } = require('./opcodes/opcodes');

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

    this.registers = {
      A: 0,
      F: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      H: 0,
      L: 0,
      PC: 0x100,
      SP: 0,
    };

    // stack pointer
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
    this.timer = new Timer();
    this.controller = new Controller();
  }

  get A() { return this.registers.A; }
  get F() { return this.registers.F; }
  get B() { return this.registers.B; }
  get C() { return this.registers.C; }
  get D() { return this.registers.D; }
  get E() { return this.registers.E; }
  get H() { return this.registers.H; }
  get L() { return this.registers.L; }

  set A(x) { this.registers.A = x & 0xff; }
  set F(x) { this.registers.F = x & 0xff; }
  set B(x) { this.registers.B = x & 0xff; }
  set C(x) { this.registers.C = x & 0xff; }
  set D(x) { this.registers.D = x & 0xff; }
  set E(x) { this.registers.E = x & 0xff; }
  set H(x) { this.registers.H = x & 0xff; }
  set L(x) { this.registers.L = x & 0xff; }

  get AF() { return (this.registers.A << 8 | this.registers.F); }
  get BC() { return (this.registers.B << 8 | this.registers.C); }
  get DE() { return (this.registers.D << 8 | this.registers.E); }
  get HL() { return (this.registers.H << 8 | this.registers.L); }

  set AF(x) { this.A = x >> 8; this.F = x; }
  set BC(x) { this.B = x >> 8; this.C = x; }
  set DE(x) { this.D = x >> 8; this.E = x; }
  set HL(x) { this.H = x >> 8; this.L = x; }

  get PC() { return this.registers.PC; }
  get SP() { return this.registers.SP; }

  set PC(x) { this.registers.PC = x & 0xffff; }
  set SP(x) { this.registers.SP = x & 0xffff; }

  reset() {
    this.registers = {
      A: 0,
      F: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      H: 0,
      L: 0,
      PC: 0,
      SP: 0,
    };
    this.M = 0;
    this.T = 0;
    this.ime = 1;
    this.clock = {
      m: 0,
      t: 0,
    };
    this.mmu.biosExecuted = false;
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
      let interruptProcessed = false;
      this.HALT = 0;
      this.ime = 0;
      // console.log(this.mmu.ie.toString(2), this.mmu.if.toString(2))
      let ifired = this.mmu.ie & this.mmu.if;
      for (let i = 0; i < 5; i++) {
        if (ifired & 0x01) {
          interruptProcessed = true;
          const mask = 1 << i;
          this.mmu.if &= (0xff - mask);
          interrupts[i](this);
          break;
        } else {
          ifired >>= 1;
        }
      }

      if (!interruptProcessed) this.ime = 1;
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
        console.log('write byte failed', op.toString(16));
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

        if (typeof opcodes[op] !== 'function') {
          const prevOp = this.mmu.read8(this, this.PC - 2);
          console.log('not a function!!!', op, op.toString(16), opcodes[op], ' previous is ', prevOp.toString(16), ' pc is at ', this.PC);
        }
        opcodes[op](this);

        if (this.counter < this.limit && this.logsEnabled) {
          console.log('PC:', pc, ' OP:', op.toString(16), ' F:', this.F.toString(2).slice(0, 4), ' SP:', sp, ' B:', this.B, ' C:', this.C, ' D:', this.D, ' E:', this.E, ' H:', this.H, ' L:', this.L, ' A:', this.A);
        }

        this.PC &= 0xffff;
      }


      this.handleInterrupts();

      this.clock.m += this.M;
      this.clock.t += this.T;
      this.timer.increment(this);

      this.gpu.step(this);
    }
  }
}


module.exports = CPU;
