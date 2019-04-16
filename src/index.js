// const cpu = require('./cpu');
/* eslint-disable */
const CPU = require('./cpu');
const Sound = require('./sound');

const sound = new Sound();
const cpu = new CPU(sound);

let gameLoop;


let init = false;
let running = false;

const bindController = (cou) => {
  window.onkeydown = cpu.controller.keyDown.bind(cpu.controller);
  window.onkeyup = cpu.controller.keyUp.bind(cpu.controller);
}

if (process.env.NODE_ENV === 'test') {
  gameLoop = setInterval(cpu.frame.bind(cpu), 1);
} else {
  const reset = () => {
    clearInterval(gameLoop);
    cpu.reset();
    bindController(cpu);
    running = false;
    sound.stop();
  }

  document.getElementById('run').onclick = () => {
    if (running) {
      return null;
    } else {
      running = true;
    }

    gameLoop = setInterval(cpu.frame.bind(cpu), 1);

    if (!init) {
      init = true;
      sound.startChannels();
    }

    sound.play();
  };

  document.getElementById('step').onclick = () => {
    cpu.step();
  };

  document.getElementById('toggle-frame-rate').onclick = () => {
    cpu.USE_ACTUAL_SPEED = !cpu.USE_ACTUAL_SPEED;
  };

  document.getElementById('reset').onclick = () => {
    reset();
  };

  document.getElementById('mario').onclick = () => {
    reset();
    cpu.mmu.rom = cpu.mmu.roms.mario;
  };

  document.getElementById('tetris').onclick = () => {
    reset();
    cpu.mmu.rom = cpu.mmu.roms.tetris;
  };

  document.getElementById('dr-mario').onclick = () => {
    reset();
    cpu.mmu.rom = cpu.mmu.roms.drMario;
  };

  document.getElementById('kirby').onclick = () => {
    reset();
    cpu.mmu.rom = cpu.mmu.roms.kirby;
  };

  document.getElementById('stop').onclick = () => {
    console.log('stopping!!!');
    clearInterval(gameLoop);
    running = false;
    sound.stop();
  };

  document.getElementById("rom-upload").addEventListener("change", function() {
    const reader = new FileReader();

    reader.onload = function() {
      const romDataBuffer = this.result;
      const romAsIntArray = new Uint8Array(romDataBuffer);

      cpu.mmu.loadRom(romAsIntArray);
    }
    reader.readAsArrayBuffer(this.files[0]);
  }, false);

  cpu.dispatch();

  bindController(cpu);
}
