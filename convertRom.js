const fs = require('fs');

const path = './roms/test';
const name = '06-ld r,r';

const rom = fs.readFileSync(`${path}/${name}.gb`, { encoding: 'binary' });

const binary = rom.split('').map(c => c.charCodeAt(0));

fs.writeFileSync(`${path}/${name}.js`, binary);
