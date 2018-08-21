const CPU = require('./cpu');

const cpu = new CPU();

cpu.dispatch();

document.getElementById('run').onclick = () => {
  // console.log("being click")
  cpu.RUN = !cpu.RUN;
  cpu.dispatch();
};

document.getElementById('step').onclick = () => {
  cpu.step();
};

// cpu.dispatch();
