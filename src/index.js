const CPU = require('./cpu');

const cpu = new CPU();

document.getElementById('start').onclick = () => {
  console.log('being clicked');
  cpu.dispatch();
};

// cpu.dispatch();
