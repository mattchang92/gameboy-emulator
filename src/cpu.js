const CPUMemory = require('./cpuMemory');
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

    // components
    this.ram = new CPUMemory();
    this.mmu = new MMU(this.ram);
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
    let test = 0;
    let f = true;
    while (this.RUN) {
      const op = this.mmu.read8(this.PC++);
      const instruction = opcodes[op];
      if (f) {
        console.log(instruction, op);
        f = false;
      }
      // let total = 0;
      // for (let i = 0x9C00; i < 0x9fff; i++) {
      // // for (let i = 0x9800; i < 0x9bff; i++) {
      //   total += this.ram.ram[i];
      // }
      // console.log(total);
      // console.log(this.ram.ram.slice(0x9800, 0x9bff));

      // 9C00-9FFF
      // console.log('found instruction', instruction);
      if (!instruction) {
        console.log('instruction not found at ', test);
        break;
      }
      test++;
      instruction(this);
      this.PC &= 0xffff;
    }
  }
}

module.exports = CPU;
