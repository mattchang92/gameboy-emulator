// const cpu = require('./cpu');
const CPU = require('./cpu');

const cpu = new CPU();

let gameLoop;

document.getElementById('run').onclick = () => {
  // console.log("being click")
  // cpu.RUN = !cpu.RUN;
  // cpu.dispatch();
  gameLoop = setInterval(cpu.frame.bind(cpu), 1);
};

document.getElementById('step').onclick = () => {
  cpu.step();
};

document.getElementById('stop').onclick = () => {
  console.log('stopping!!!');
  clearInterval(gameLoop);
};

// cpu.dispatch();

window.onkeydown = cpu.controller.keyDown.bind(cpu.controller);

window.onkeyup = cpu.controller.keyUp.bind(cpu.controller);