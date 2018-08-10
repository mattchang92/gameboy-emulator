const CPUMemory = require('./cpuMemory');
const MMU = require('./mmu');

class CPU {
  constructor() {
    this.registers = {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      F: 0,
      H: 0,
      L: 0,
      PC: 0,
      SP: 0,
      M: 0,
      T: 0,
    };
    this.ram = new CPUMemory();
    this.mmu = new MMU(this.ram);
  }
}