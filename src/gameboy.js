const GPU = require('./gpu');
const MMU = require('./mmu');
const CPU = require('./cpu');
const APU = require('./soundComponents/apu');
const Timer = require('./timer');
const Sound = require('./sound');
const Controller = require('./controller');

class Gameboy {
  constructor() {
    this.sound = new Sound();
    this.initializeComponents();
  }

  frame() {
    this.cpu.frame();
  }

  initializeComponents() {
    const apu = new APU(this.sound);
    const mmu = new MMU(apu);
    const gpu = new GPU(mmu);
    const timer = new Timer(mmu);
    const controller = new Controller(mmu);
    const cpu = new CPU(apu, mmu, gpu, timer, controller);

    this.apu = apu;
    this.mmu = mmu;
    this.gpu = gpu;
    this.timer = timer;
    this.controller = controller;
    this.cpu = cpu;
  }
}


module.exports = Gameboy;
