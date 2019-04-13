// const cpu = require('./cpu');
/* eslint-disable */
const CPU = require('./cpu');

const audioContext = new (window.AudioContext || window.webkitAudoContext)();
const squareWave1Left = audioContext.createOscillator();
const squareWave1Right = audioContext.createOscillator();
const gainNodeLeft = audioContext.createGain();
const gainNodeRight = audioContext.createGain();
const globalGainNode = audioContext.createGain();
globalGainNode.gain.value = 0.1;
gainNodeLeft.gain.value = 1;
gainNodeRight.gain.value = 1;

gainNodeLeft.connect(globalGainNode);
gainNodeRight.connect(globalGainNode);

globalGainNode.connect(audioContext.destination);

squareWave1Left.type = 'square';
squareWave1Left.frequency.setValueAtTime(0, audioContext.currentTime);
squareWave1Left.connect(gainNodeLeft);

squareWave1Right.type = 'square';
squareWave1Right.frequency.setValueAtTime(0, audioContext.currentTime);
squareWave1Right.connect(gainNodeRight);

const soundNodes = {};
const sound = {}

soundNodes.squareWave1Left = squareWave1Left;
soundNodes.squareWave1Right = squareWave1Right;

sound.soundNodes = soundNodes;
sound.audioContext = audioContext;
sound.gainNodeLeft = gainNodeLeft;
sound.gainNodeRight = gainNodeRight;

const cpu = new CPU(sound);

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

    // const audioContext = new (window.AudioContext || window.webkitAudoContext)();
    // const oscillator = audioContext.createOscillator();
    // const gainNode = audioContext.createGain();
    // gainNode.gain.value = 0.03;
    // gainNode.connect(audioContext.destination);

    // oscillator.type = 'square';
    // oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    // oscillator.connect(gainNode);
    squareWave1Left.start();
    squareWave1Right.start();
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
