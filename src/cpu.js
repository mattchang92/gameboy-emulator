const { opcodes, interrupts } = require('./opcodes/opcodes');

class CPU {
  constructor(apu, mmu, gpu, timer, controller) {
    this.rstCalled = false;
    this.initialCounter = 0;
    this.logsEnabled = false;
    this.timeStamp = 0;

    const SKIP_BOOT_ROM = true;

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

    this.framesProcessed = 0;
    this.frameRateTimeStamp = new Date().getTime();

    this.T = 0;
    this.HALT = 0;
    this.RUN = 0;
    this.USE_ACTUAL_SPEED = false;

    this.clock = {
      m: 0,
      t: 0,
    };

    this.ime = 1;

    // components
    this.apu = apu;
    this.mmu = mmu;
    this.gpu = gpu;
    this.timer = timer;
    this.controller = controller;

    if (SKIP_BOOT_ROM) this.skipBootRom();
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
  set F(x) { this.registers.F = x & 0xf0; }
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

  skipBootRom() {
    this.registers = {
      A: 0x11,
      F: 0xb0,
      B: 0,
      C: 0x13,
      D: 0,
      E: 0xd8,
      H: 0x01,
      L: 0x4d,
      PC: 0x100,
      SP: 0xfffe,
    };

    this.mmu.write8(this, 0xff40, 0x91);
    this.mmu.write8(this, 0xff47, 0xfc);
    this.mmu.write8(this, 0xff48, 0xff);
    this.mmu.write8(this, 0xff49, 0xff);

    this.mmu.biosExecuted = true;
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
    let interrupt = this.mmu.ie & this.mmu.if;
    if (interrupt) this.HALT = 0;

    if (this.ime && interrupt) {
      this.ime = 0;
      for (let i = 0; i < 5; i++) {
        if (interrupt & 0x01) {
          const mask = 1 << i;
          this.mmu.if &= ~mask;
          interrupts[i](this);
          this.ime = 1;
          return;
        }
        interrupt >>= 1;
      }
    }
  }

  frame() {
    const currentTime = new Date().getTime();
    const timeDiff = currentTime - this.timeStamp;

    if (timeDiff < 16 && this.USE_ACTUAL_SPEED) {
      setTimeout(() => {
        this.executeCycle.bind(this);
      }, 16 - timeDiff);
    } else {
      this.executeCycle();
    }
  }

  executeCycle() {
    this.timeStamp = new Date().getTime();
    const frameEnd = this.clock.m + 17556 * 1;
    this.framesProcessed++;

    while (this.clock.m < frameEnd) {
      this._validateState();

      if (this.HALT) {
        this.M = 1;
      } else {
        const op = this.mmu.read8(this, this.PC++);

        this._validateOpcode(op);

        opcodes[op](this);

        this.apu.step(this.M * 4);

        this.PC &= 0xffff;
      }


      this.handleInterrupts();

      this.clock.m += this.M;
      this.clock.t += this.T;
      this.timer.increment(this.M);

      this.gpu.step(this.M);
    }

    this._calculateFrameRate();
  }

  _validateOpcode(op) {
    if (typeof opcodes[op] !== 'function') {
      const prevOp = this.mmu.read8(this, this.PC - 2);
      console.log('num instructions implemented: ', Object.keys(opcodes).length);
      console.log('not a function!!!', op, `0x${op.toString(16)}`, opcodes[op], ' previous is ', prevOp.toString(16), ' pc is at ', this.PC);
    }
  }

  _validateState() {
    const registers = ['B', 'C', 'D', 'E', 'H', 'L', 'A', 'F'];
    registers.forEach((r, i) => {
      if (typeof this[r] !== 'number') {
        console.log('not a number', r, i);
      }
    });

    if (this.FAIL) {
      const op = this.mmu.read8(this, this.PC - 1);
      console.log('write byte failed', op.toString(16));
      this.FAIL = false;
    }
  }

  _calculateFrameRate() {
    const now = new Date().getTime();
    if (now - this.frameRateTimeStamp > 1000) {
      document.getElementById('frame-rate-display').innerHTML = this.framesProcessed;
      this.framesProcessed = 0;
      this.frameRateTimeStamp = now;
    }
  }
}


module.exports = CPU;
