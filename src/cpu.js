const CPUMemory = require('./cpuMemory');
const MMU = require('./mmu');

class CPU {
  constructor() {
    // general use registers
    this.A = 0,
    this.B = 0,
    this.C = 0,
    this.D = 0,
    this.E = 0,

    // flag
    this.F = 0,

    // general use pointers
    this.H = 0,
    this.L = 0,

    // program counter
    this.PC = 0,

    // stack pointer
    this.SP = 0,
    this.M = 0,
    this.T = 0,

    // halt
    this.HALT = 0,

    // components
    this.ram = new CPUMemory();
    this.mmu = new MMU(this.ram);
  }
}

module.exports = CPU;
