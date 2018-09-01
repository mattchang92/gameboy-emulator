class MMU {
  constructor() {
    this.biosExecuted = false;
    this.bios = [
      0x31, 0xFE, 0xFF, 0xAF, 0x21, 0xFF, 0x9F, 0x32, 0xCB, 0x7C, 0x20, 0xFB, 0x21, 0x26, 0xFF, 0x0E,
      0x11, 0x3E, 0x80, 0x32, 0xE2, 0x0C, 0x3E, 0xF3, 0xE2, 0x32, 0x3E, 0x77, 0x77, 0x3E, 0xFC, 0xE0,
      0x47, 0x11, 0x04, 0x01, 0x21, 0x10, 0x80, 0x1A, 0xCD, 0x95, 0x00, 0xCD, 0x96, 0x00, 0x13, 0x7B,
      0xFE, 0x34, 0x20, 0xF3, 0x11, 0xD8, 0x00, 0x06, 0x08, 0x1A, 0x13, 0x22, 0x23, 0x05, 0x20, 0xF9,
      0x3E, 0x19, 0xEA, 0x10, 0x99, 0x21, 0x2F, 0x99, 0x0E, 0x0C, 0x3D, 0x28, 0x08, 0x32, 0x0D, 0x20,
      0xF9, 0x2E, 0x0F, 0x18, 0xF3, 0x67, 0x3E, 0x64, 0x57, 0xE0, 0x42, 0x3E, 0x91, 0xE0, 0x40, 0x04,
      0x1E, 0x02, 0x0E, 0x0C, 0xF0, 0x44, 0xFE, 0x90, 0x20, 0xFA, 0x0D, 0x20, 0xF7, 0x1D, 0x20, 0xF2,
      0x0E, 0x13, 0x24, 0x7C, 0x1E, 0x83, 0xFE, 0x62, 0x28, 0x06, 0x1E, 0xC1, 0xFE, 0x64, 0x20, 0x06,
      0x7B, 0xE2, 0x0C, 0x3E, 0x87, 0xF2, 0xF0, 0x42, 0x90, 0xE0, 0x42, 0x15, 0x20, 0xD2, 0x05, 0x20,
      0x4F, 0x16, 0x20, 0x18, 0xCB, 0x4F, 0x06, 0x04, 0xC5, 0xCB, 0x11, 0x17, 0xC1, 0xCB, 0x11, 0x17,
      0x05, 0x20, 0xF5, 0x22, 0x23, 0x22, 0x23, 0xC9, 0xCE, 0xED, 0x66, 0x66, 0xCC, 0x0D, 0x00, 0x0B,
      0x03, 0x73, 0x00, 0x83, 0x00, 0x0C, 0x00, 0x0D, 0x00, 0x08, 0x11, 0x1F, 0x88, 0x89, 0x00, 0x0E,
      0xDC, 0xCC, 0x6E, 0xE6, 0xDD, 0xDD, 0xD9, 0x99, 0xBB, 0xBB, 0x67, 0x63, 0x6E, 0x0E, 0xEC, 0xCC,
      0xDD, 0xDC, 0x99, 0x9F, 0xBB, 0xB9, 0x33, 0x3E, 0x3c, 0x42, 0xB9, 0xA5, 0xB9, 0xA5, 0x42, 0x4C,
      0x21, 0x04, 0x01, 0x11, 0xA8, 0x00, 0x1A, 0x13, 0xBE, 0x20, 0xFE, 0x23, 0x7D, 0xFE, 0x34, 0x20,
      0xF5, 0x06, 0x19, 0x78, 0x86, 0x23, 0x05, 0x20, 0xFB, 0x86, 0x20, 0xFE, 0x3E, 0x01, 0xE0, 0x50,
    ];
    this.rom = require('../roms/test/06-ld r,r');
    this.eram = new Array(0x2000).fill(0);
    this.oam = [];
    this.vram = new Array(0x2000).fill(0);
    this.wram = new Array(0x2000).fill(0);
    this.zram = [];
    this.printed = false;
  }


  read8(cpu, addr) {
    addr &= 0xffff;
    if (cpu.counter < cpu.limit && cpu.logsEnabled) {
      console.log(`Reading byte from address ${addr}`);
    }
    switch (addr & 0xf000) {
      // Bios (256 B) /ROM0 (16K)
      // 0x0104-0x0133

      // 0x00A8-0x00D7

      case 0x0000:
        if (!this.biosExecuted) {
          // console.log('reading from bios at addrss ', addr);
          if (addr <= 0x0133 && addr >= 0x0104) {
            const testAddr = addr - 0x0104;
            // console.log('logo hack inbound', this.bios[0x00a8 + testAddr], this.rom[addr]);
            // return this.rom[addr];
            return this.bios[0x00a8 + testAddr];
          }

          if (addr <= 0x014D && addr >= 0x0134) {
            return addr === 0x0134 ? 0xe7 : 0;
          }

          if (addr < 0x100) return this.bios[addr];
          if (cpu.PC === 0x0100) {
            this.biosExecuted = true;
            console.log('--------------------BIOS FULLY EXECUTED--------------------');
          }
        }
        return this.rom[addr];

      // ROM0
      case 0x1000:
      case 0x2000:
      case 0x3000:
        return this.rom[addr];

      // ROM1 (16K)
      case 0x4000:
      case 0x5000:
      case 0x6000:
      case 0x7000:
        return this.rom[addr];

      // VRAM (Graphics 8K)
      case 0x8000:
      case 0x9000:
        return this.vram[addr & 0x1fff];

      // External RAM (8K)
      case 0xa000:
      case 0xb000:
        return this.eram[addr & 0x1fff];

      // Working RAM (8K)
      case 0xc000:
      case 0xd000:
        return this.wram[addr & 0x1fff];

      // 0xf000:
      case 0xf000: {
        switch (addr & 0x0f00) {
          // Working RAM shadow
          case 0x000: case 0x100: case 0x200: case 0x300: case 0x400: case 0x500: case 0x600:
          case 0x700: case 0x800: case 0x900: case 0xa00: case 0xb00: case 0xc00: case 0xd00:
            return this.wram[addr & 0x1fff];

          // Object Attribute Memory (OAM 160B)
          case 0xe00:
            if (addr < 0xfea0) return this.oam[addr & 0xff];
            return 0;

          // 0xf00 Zero Page RAM (128 B)
          case 0xf00:
            if (addr >= 0xff80) {
              return this.zram[addr & 0x7f];
            }
            switch (addr & 0xf0) {
              case 0x00:
                return 0; // implement later

              case 0x10:
              case 0x20:
              case 0x30:
                return 0;

              case 0x40:
              case 0x50:
              case 0x60:
              case 0x70:
                return cpu.gpu.read8(addr);
              default:
                break;
            }

            return 0; // I/O control

          default:
            break;
        }
        break;
      }

      default:
        break;
    }
  }

  read16(cpu, addr) {
    addr &= 0xffff;
    if (cpu.counter < cpu.limit && cpu.logsEnabled) {
      console.log(`Reading word from address ${addr}`);
    }

    // const one = this.read8(cpu, addr);
    // const two = (this.read8(cpu, addr + 1) << 8);

    return this.read8(cpu, addr) + (this.read8(cpu, addr + 1) << 8);
    // console.log('reading form addr ', addr, 'what are the vals', one, '  ', two);
    // console.log('reading 16 bit val from memory', one + two, ' from address ', addr);
    // return one + two;
  }

  write8(cpu, addr, val) {
    if (addr === 0xff50 && !this.biosExecuted) {
      this.printed = true;
      this.biosExecuted = true;
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BIOS SUCCESS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }
    if (cpu.counter < cpu.limit && cpu.logsEnabled) {
      console.log(`Writing byte to address ${addr} with value ${val}`);
    }
    addr &= 0xffff;

    switch (addr & 0xf000) {
      // Bios (256 B) /ROM0 (16K)
      case 0x0000:
        if (!this.biosExecuted && addr < 0x100) return;
        this.rom[addr] = val; break;

      // ROM0
      case 0x1000:
      case 0x2000:
      case 0x3000:
        this.rom[addr] = val; break;

      // ROM1 (16K)
      case 0x4000:
      case 0x5000:
      case 0x6000:
      case 0x7000:
        this.rom[addr] = val; break;

      // VRAM (Graphics 8K)
      case 0x8000:
      case 0x9000:
        // console.log('writing to vram');
        this.vram[addr & 0x1fff] = val;
        cpu.gpu.updateTileBasedOnMemory(addr & 0x1fff);
        break;

      // External RAM (8K)
      case 0xa000:
      case 0xb000:
        this.eram[addr & 0x1fff] = val; break;

      // Working RAM (8K)
      case 0xc000:
      case 0xd000:
        this.wram[addr & 0x1fff] = val; break;

      // 0xf000:
      case 0xf000:
        switch (addr & 0x0f00) {
          // Working RAM shadow
          case 0x000: case 0x100: case 0x200: case 0x300: case 0x400: case 0x500: case 0x600:
          case 0x700: case 0x800: case 0x900: case 0xa00: case 0xb00: case 0xc00: case 0xd00:
            this.wram[addr & 0x1fff] = val; break;

          // Object Attribute Memory (OAM 160B)
          case 0xe00:
            if (addr < 0xfea0) this.oam[addr & 0xff] = val; break;

          // 0xf00 Zero Page RAM (128 B)
          case 0xf00:
            if (addr >= 0xff80) {
              this.zram[addr & 0x7f] = val; break;
            } else {
              switch (addr & 0xf0) {
                case 0x00:
                  break; // implement later

                case 0x10:
                case 0x20:
                case 0x30:
                  break;

                case 0x40:
                case 0x50:
                case 0x60:
                case 0x70:
                  cpu.gpu.write8(addr, val);
                  break;
                default:
                  break;
              }
            }
          default:
            break;
        }
        break;

      default:
        break;
    }
  }

  write16(cpu, addr, val) {
    if (cpu.counter < cpu.limit && cpu.logsEnabled) {
      console.log(`Writing word to address ${addr} with value ${val}`);
    }

    // if (addr === 0xff50) console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BIOS SUCCESS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    addr &= 0xffff;

    const leastSigByte = val & 0xff;
    const mostSigByte = (val >>> 8) & 0xff;

    this.write8(cpu, addr, leastSigByte);
    this.write8(cpu, addr + 1, mostSigByte);
  }

  loadRom(data) {
    this.rom = data;
  }
}

module.exports = MMU;
