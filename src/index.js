// const cpu = require('./cpu');
/* eslint-disable */
const Gameboy = require('./gameboy');

const gameboy = new Gameboy();

let gameLoop;


let init = false;
let running = false;

const bindController = (cou) => {
  window.onkeydown = gameboy.controller.keyDown.bind(gameboy.controller);
  window.onkeyup = gameboy.controller.keyUp.bind(gameboy.controller);
}

if (process.env.NODE_ENV === 'test') {
  gameLoop = setInterval(gameboy.frame.bind(gameboy), 1);
} else {
  const reset = () => {
    clearInterval(gameLoop);
    gameboy.initializeComponents();
    bindController(gameboy.cpu);
    running = false;
    gameboy.sound.stop();
  }

  document.getElementById('run').onclick = () => {
    if (running) {
      return null;
    } else {
      running = true;
    }

    gameLoop = setInterval(gameboy.frame.bind(gameboy), 1);

    if (!init) {
      init = true;
      gameboy.sound.startChannels();
    }

    gameboy.sound.play();
  };

  document.getElementById('step').onclick = () => {
    gameboy.cpu.step();
  };

  document.getElementById('toggle-frame-rate').onclick = () => {
    gameboy.cpu.USE_ACTUAL_SPEED = !gameboy.cpu.USE_ACTUAL_SPEED;
  };

  document.getElementById('reset').onclick = () => {
    reset();
  };

  document.getElementById('mario').onclick = () => {
    reset();
    gameboy.mmu.rom = gameboy.cpu.mmu.roms.mario;
  };

  document.getElementById('tetris').onclick = () => {
    reset();
    gameboy.mmu.rom = gameboy.cpu.mmu.roms.tetris;
  };

  document.getElementById('dr-mario').onclick = () => {
    reset();
    gameboy.mmu.rom = gameboy.cpu.mmu.roms.drMario;
  };

  document.getElementById('kirby').onclick = () => {
    reset();
    gameboy.mmu.rom = gameboy.cpu.mmu.roms.kirby;
  };

  document.getElementById('stop').onclick = () => {
    console.log('stopping!!!');
    clearInterval(gameLoop);
    running = false;
    gameboy.sound.stop();
  };

  document.getElementById("rom-upload").addEventListener("change", function() {
    const reader = new FileReader();

    reader.onload = function() {
      const romDataBuffer = this.result;
      const romAsIntArray = new Uint8Array(romDataBuffer);

      gameboy.mmu.loadRom(romAsIntArray);
    }
    reader.readAsArrayBuffer(this.files[0]);
  }, false);

  gameboy.cpu.dispatch();

  bindController(gameboy.cpu);
}
