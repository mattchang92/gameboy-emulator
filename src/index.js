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

  document.getElementById('toggleFrameRate').onclick = () => {
    cpu.USE_ACTUAL_SPEED = !cpu.USE_ACTUAL_SPEED;
  };

  document.getElementById('reset').onclick = () => {
    clearInterval(gameLoop);
    cpu.reset();
    bindController(cpu);
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
