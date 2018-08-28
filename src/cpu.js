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
    this.clock = {
      m: 0,
      t: 0,
    };
  }

  dispatch() {
    while (this.RUN) {
      this.step();
    }
  }

  step() {
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
      // console.log(this.gpu.tileset[64]);
      const palette = [
        [255, 255, 255, 255],
        [192, 192, 192, 255],
        [96, 96, 96, 255],
        [0, 0, 0, 255],
      ];
      // const palette = [
      //   255,
      //   192,
      //   96,
      //   0,
      // ];

      // const tile = this.gpu.tileset[1];
      // const tile = this.gpu.tileset[1].map(line => line.map(pixel => palette[pixel]));
      const start = 1;
      const id = 0;
      // console.log(this.mmu.vram.slice(0x1c00, 0x1c00 + 32));

      // for (let i = 0x9800; i < 0x9fff; i++) {
      //   console.log(this.mmu.vram[i - 0x8000]);
      // }

      // console.log(this.gpu.tileset[1]);

      // for (let i = start; i < start + 25; i++) {
      //   let mappedTile = [];
      //   this.gpu.tileset[i].forEach((line) => {
      //     line.forEach((pixel) => {
      //       mappedTile = [...mappedTile, ...palette[pixel]];
      //     });
      //   });

      //   const canvas = document.getElementById(`test${id++}`);
      //   const ctx = canvas.getContext('2d');
      //   const screen = ctx.createImageData(8, 8);

      //   screen.data.set(mappedTile);
      //   ctx.putImageData(screen, 0, 0);
      // }

      // this.gpu.tileMapToScreen();
      // this.gpu.ctx.putImageData(this.gpu.screen, 0, 0);

      console.log('not a function!!!', op, op.toString(16), opcodes[op]);
    }
    opcodes[op](this);
    this.PC &= 0xffff;


    this.clock.m += this.M;
    this.clock.t += this.T;

    this.gpu.step(this);
  }
}

module.exports = CPU;
