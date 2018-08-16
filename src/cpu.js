const CPUMemory = require('./cpuMemory');
const GPU = require('./gpu');
const MMU = require('./mmu');
const { opcodes } = require('./opcodes');

class CPU {
  constructor() {
    // general use registers
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

    this.RUN = 1;

    this.clock = {
      m: 0,
      t: 0,
    };

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
  }

  dispatch() {
    while (this.RUN) {
      const op = this.mmu.read8(this.PC++);
      opcodes[op]();
      this.PC &= 0xffff;

      this.clock.m += this.M;
      this.clock.t += this.T;

      this.gpu.step(this);
    }
  }
}

module.exports = CPU;
