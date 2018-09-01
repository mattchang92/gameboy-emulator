const CPU = require('./cpu');

const cpu = new CPU();

cpu.dispatch();

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
