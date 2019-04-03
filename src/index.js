// const cpu = require('./cpu');
/* eslint-disable */
const CPU = require('./cpu');

const cpu = new CPU();

let gameLoop;

// const fs = require('fs');

// if (cpu.writeLog) {
  // fs.writeFileSync('/Users/matthewchang/Desktop/mine.txt', '');
// }

const bindController = (cou) => {
  window.onkeydown = cpu.controller.keyDown.bind(cpu.controller);
  window.onkeyup = cpu.controller.keyUp.bind(cpu.controller);
}

if (process.env.NODE_ENV === 'test') {
  gameLoop = setInterval(cpu.frame.bind(cpu), 1);
} else {
  document.getElementById('run').onclick = () => {
    gameLoop = setInterval(cpu.frame.bind(cpu), 1);
  };

  document.getElementById('step').onclick = () => {
    cpu.step();
  };

  document.getElementById('reset').onclick = () => {
    clearInterval(gameLoop);
    cpu.reset();
    bindController(cpu);
  };

  document.getElementById('stop').onclick = () => {
    console.log('stopping!!!');
    clearInterval(gameLoop);
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
