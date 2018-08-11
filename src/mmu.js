class MMU {
  constructor(cpuMemory) {
    this.ram = cpuMemory.ram;
  }

  read8(addr) {
    addr = addr & 0xffff;
    
    return this.ram[addr];
  }

  read16(addr) {
    addr = addr & 0xffff;

    const leastSigByte = this.ram[addr];
    const mostSigByte = this.ram[(addr + 1) & 0xffff];

    return (mostSigByte << 8) | leastSigByte;
  }

  write8(addr, val) {
    addr = addr & 0xffff;

    this.ram[addr] = val;
  }

  write16(addr, val) {
    addr = addr & 0xffff;

    const leastSigByte = val & 0xff;
    const mostSigByte = (val >>> 8) & 0xff;

    this.ram[addr] = leastSigByte;
    this.ram[(addr + 1) & 0xffff] = mostSigByte;
  }
}

module.exports = MMU;