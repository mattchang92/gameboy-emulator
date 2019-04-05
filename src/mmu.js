// const fs = require('fs');
const { testRoms, bios } = require('../config');

class MMU {
  constructor() {
    this.biosExecuted = false;
    this.bios = bios;
    this.rom;

    this.eram = new Array(0x2000).fill(0); // 0xa000 - 0xbfff
    this.oam = new Array(0xa0).fill(0); // 0xfe00 - 0xfe9f
    this.vram = new Array(0x2000).fill(0); // 0x8000 - 0x9fff
    this.wram = new Array(0x3e00).fill(0); // 0xc000 - 0xdfff (shadow copy)
    this.zram = new Array(0x7f).fill(0);
    this.io = new Array(0x80).fill(0);

    this.ie = 0; // interrupt enabled
    this.if = 0xe0; // interrupt flag (top 3 bits always set)

    this.mbc = [
      {},
      { rombank: 0, mode: 0 },
    ];

    this.romOffset = 0x4000;
    this.printed = false;

    this.testOutput = '';

    this.loadRom();
  }

  loadRom(gameData) {
    if (gameData) {
      this.rom = gameData;
      this.cartridgeType = this.rom[0x147];
      return;
    }

    if (process.env.NODE_ENV === 'test') {
      const testNumber = process.argv[2];
      const testRom = testRoms[testNumber];

      if (!testRom) {
        console.log(`Test number ${testNumber} not found. Exiting process`);
        process.exit(1);
      } else {
        this.rom = require(`../roms/test/${testRom}`);
      }
    } else {
      this.rom = require('../roms/tetris');
      // this.rom = require('../roms/dr_mario');
      // this.rom = require('../roms/super_mario_land');
      // this.rom = require('../roms/test/cpu_instrs');
      this.cartridgeType = this.rom[0x147];
    }
  }


  read8(cpu, addr) {
    let val;

    if (cpu === undefined || addr === undefined) {
      console.log('Missing required params for read byte');
      if (!cpu) console.log('missing cpu');
      if (!addr) console.log('missing addr');
      cpu.FAIL = true;
    }
    addr &= 0xffff;

    switch (addr & 0xf000) {
      // Bios (256 B) /ROM0 (16K)
      // 0x0104-0x0133

      case 0x0000:
        if (!this.biosExecuted) {
          if (addr < 0x100) {
            val = this.bios[addr]; break;
          }
        }
        val = this.rom[addr]; break;

      // ROM0
      case 0x1000:
      case 0x2000:
      case 0x3000:
        val = this.rom[addr]; break;

      // ROM1 (16K)
      case 0x4000:
      case 0x5000:
      case 0x6000:
      case 0x7000:
        val = this.rom[this.romOffset + (addr & 0x3fff)]; break;

      // VRAM (Graphics 8K)
      case 0x8000:
      case 0x9000:
        val = this.vram[addr & 0x1fff]; break;

      // External RAM (8K)
      case 0xa000:
      case 0xb000:
        val = this.eram[addr & 0x1fff]; break;

      // Working RAM (8K)
      case 0xc000:
      case 0xd000:
      case 0xe000:
        val = this.wram[addr & 0x1fff]; break;

      // 0xf000:
      case 0xf000: {
        switch (addr & 0x0f00) {
          // Working RAM shadow
          case 0x000: case 0x100: case 0x200: case 0x300: case 0x400: case 0x500: case 0x600:
          case 0x700: case 0x800: case 0x900: case 0xa00: case 0xb00: case 0xc00: case 0xd00:
            val = this.wram[addr & 0x1fff]; break;

          // Object Attribute Memory (OAM 160B)
          case 0xe00:
            val = addr < 0xfea0 ? this.oam[addr & 0xff] : 0; break;

          // 0xf00 Zero Page RAM (128 B)
          case 0xf00:
            if (addr === 0xffff) {
              val = this.ie; break;
            }
            if (addr === 0xff0f) {
              val = this.if; break;
            }
            if (addr >= 0xff80) {
              val = this.zram[addr & 0x7f]; break;
            }
            switch (addr & 0xf0) {
              case 0x00:
                switch (addr & 0xf) {
                  case 0:
                    val = cpu.controller.read(); break;
                  case 1:
                  case 2:
                    // TODO: Implement serial I/O later
                    val = this.io[addr & 0x7f]; break;
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                    val = cpu.timer.read(cpu, addr); break;
                  default:
                    val = this.io[addr & 0x7f]; break;
                }
                break;
              case 0x10:
              case 0x20:
                // TODO implement sound later
                val = this.io[addr & 0x7f]; break;
              case 0x40:
                val = cpu.gpu.read(addr); break;
              default:
                val = this.io[addr & 0x7f]; break;
            }
            break;
          default:
            break;
        }
        break;
      }

      default:
        break;
    }

    if (cpu.writeLog && cpu.counter > cpu.offset && cpu.counter < (cpu.offset + cpu.limit)) {
      // if (addr !== 0xff44) {
      // fs.appendFileSync('/Userss/matthewchang/Desktop/mine.txt', `reading byte from ram: addr: 0x${addr.toString(16)} with value: ${val}\n`);
      // }
    }
    return val;
  }

  read16(cpu, addr) {
    addr &= 0xffff;
    if (cpu.counter < cpu.limit && cpu.logsEnabled) {
      // console.log(`Reading word from address ${addr}`);
    }

    // const one = this.read8(cpu, addr);
    // const two = (this.read8(cpu, addr + 1) << 8);

    return ((this.read8(cpu, addr + 1) << 8) | this.read8(cpu, addr)) & 0xffff;
    // console.log('reading form addr ', addr, 'what are the vals', one, '  ', two);
    // console.log('reading 16 bit val from memory', one + two, ' from address ', addr);
    // return one + two;
  }

  write8(cpu, addr, val) {
    val &= 0xff;

    // if (cpu.writeLog && cpu.counter > cpu.offset && cpu.counter < (cpu.offset + cpu.limit)) {
    //   fs.appendFileSync('/Users/matthewchang/Desktop/mine.txt', `writing byte to ram: addr: 0x${addr.toString(16)}, val: ${val}\n`);
    // }

    if (cpu === undefined || addr === undefined || val === undefined) {
      console.log('Missing required params for write byte');
      if (!cpu === undefined) console.log('missing cpu');
      if (!addr === undefined) console.log('missing addr');
      if (!val === undefined) console.log('missing val');
      cpu.FAIL = true;
    }
    if (addr === 0xff50 && !this.biosExecuted) {
      this.printed = true;
      this.biosExecuted = true;
      // fs.appendFileSync('/Users/matthewchang/Desktop/mine.txt', this.vram.join('\n'));

      // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!s!!! BIOS SUCCESS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    }
    if (cpu.counter < cpu.limit && cpu.logsEnabled) {
      // console.log(`Writing byte to address ${addr} with value ${val}`);
    }
    addr &= 0xffff;

    switch (addr & 0xf000) {
      // Bios (256 B) /ROM0 (16K)
      case 0x0000:
      case 0x1000:
        if (!this.biosExecuted && addr < 0x100) return;
        this.rom[addr] = val; break;

      case 0x2000:
      case 0x3000:
        switch (this.cartridgeType) {
          case 1:
          case 2:
          case 3:
            val &= 0x1f;
            if (!val) val = 1;
            this.mbc[1].rombank = (this.mbc[1].rombank & 0x60) + val;
            this.romOffset = this.mbc[1].rombank * 0x4000;
            break;
          default:
            break;
        }
        break;

      // ROM1 (16K)
      case 0x4000:
      case 0x5000:
        this.rom[addr] = val; break;

      case 0x6000:
      case 0x7000:
        switch (this.cartridgeType) {
          case 2:
          case 3:
            this.mbc[1].mode = val & 1; break;
        }
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
      case 0xe000:
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
            if (addr < 0xfea0) {
              this.oam[addr & 0xff] = val;
              cpu.gpu.buildObjectData(addr - 0xfe00, val);
            }
            break;

          // 0xf00 Zero Page RAM (128 B)
          case 0xf00:
            if (addr === 0xffff) {
              this.ie = val;
              break;
            }
            if (addr === 0xff0f) {
              this.if = val;
              break;
            }

            if (addr === 0xff01 && process.env.NODE_ENV === 'test') {
              const char = String.fromCharCode(`${val}`);
              this.testOutput += char;
              console.log(this.testOutput);
            }
            if (addr >= 0xff80) {
              this.zram[addr & 0x7f] = val; break;
            }

            switch (addr & 0xf0) {
              case 0x00:
                switch (addr & 0xf) {
                  case 0:
                    cpu.controller.write(val); break;
                  case 1:
                  case 2:
                    // TODO: Implement serial I/O later
                    this.io[addr & 0x7f] = val; break;
                  case 4:
                  case 5:
                  case 6:
                  case 7:
                    cpu.timer.write(cpu, addr, val); break;
                  default:
                    this.io[addr & 0x7f] = val; break;
                }
                break;
              case 0x10:
              case 0x20:
                // TODO implement sound later
                this.io[addr & 0x7f] = val; break;
              case 0x40:
                cpu.gpu.write(cpu, addr, val); break;
              default:
                this.io[addr & 0x7f] = val; break;
            }
            break;
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
      // console.log(`Writing word to address ${addr} with value ${val}`);
    }

    if (cpu === undefined || addr === undefined || val === undefined) {
      // console.log('Missing required params for write word');
    }

    // if (addr === 0xff50) console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!! BIOS SUCCESS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    addr &= 0xffff;

    const leastSigByte = val & 0xff;
    const mostSigByte = (val >> 8) & 0xff;

    this.write8(cpu, addr, leastSigByte);
    this.write8(cpu, addr + 1, mostSigByte);
  }
}

module.exports = MMU;
