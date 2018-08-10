class CPUMemory {
  constructor() {
    this.ram = new Uint8Array(0xffff);
  }
}

module.exports = CPUMemory;