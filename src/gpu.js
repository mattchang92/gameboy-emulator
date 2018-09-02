/*                            GPU MODES
Period	                      | GPU mode number	| Time spent (clocks)
Scanline (accessing OAM)	    |       2	        |      80
Scanline (accessing VRAM)	    |       3	        |      172
Horizontal blank	            |       0	        |      204
One line (scan and blank)	    |	                |      456
Vertical blank                |       1	        |      4560 (10 lines)
Full frame (scans and vblank) |                 |      70224
*/

/*   TILE DATA/MAP VRAM LAYOUT
  Region	 |            Usage
8000-87FF	 |    Tile set #1: tiles 0-127
8800-8FFF	 |    Tile set #1: tiles 128-255
           |    Tile set #0: tiles -1 to -128
9000-97FF	 |    Tile set #0: tiles 0-127
9800-9BFF	 |    Tile map #0
9C00-9FFF	 |    Tile map #1
*/

const {
  NUM_TILES,
  ROWS_IN_TILE,
  COLS_IN_TILE,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} = require('./constants');

class GPU {
  constructor(mmu) {
    this.MODE = 2;
    this.MODECLOCK = 0;
    this.backgroundOffsetX = 0;
    this.backgroundOffsetY = 0;
    this.LY = 0;
    this.gpuRam = new Array(0xff80 - 0xff40).fill(0);
    this.tileset = [];
    this.canvas = {};
    this.screen = {};
    this.vram = mmu.vram;
    this.palette = [
      [255, 255, 255, 255],
      [192, 192, 192, 255],
      [96, 96, 96, 255],
      [0, 0, 0, 255],
    ];

    // 0xff42 - 0xff4b
    this.SCY = 0; // scroll Y (R/W)
    this.SCX = 0; // scroll X (R/W)
    this.LY = 0; // LCDC y-coordinate (R)
    this.LYC = 0; // LY Compare (R/W)
    this.DMA = 0; // DMA Transfer and Start
    this.BGP = 0; // BG Palette (R/W)
    this.OBP0 = 0; // Object Palette 0 (R/W)
    this.OBP1 = 0; // Object Palette 1 (R/W)
    this.WY = 0; // Window Y Position (R/W)
    this.WX = 0; // Window X Position (R/W)

    // 0xff40 LCDC
    this.LCDEnable = 0;
    this.windowTileAddress = 0;
    this.windowEnable = 0;
    this.bgAndWindowTileData = 0;
    this.bgTileMapAddress = 0;
    this.objSize = 0;
    this.objEnable = 0;
    this.bgEnable = 0;

    // 0xff41 STAT
    this.lyInterrupt = 0;
    this.oamInterrupt = 0;
    this.vBLankInterrupt = 0;
    this.hBlankInterrupt = 0;
    this.lyFlag = 0;
    this.mode = 0;

    this.mapCounter = 0; // test variable

    this.reset();
  }

  setLCDC(val) {
    this.LCDEnable = val & 0x80;
    this.windowTileAddress = val & 0x40;
    this.windowEnable = val & 0x20;
    this.bgAndWindowTileData = val & 0x10;
    this.bgTileMapAddress = val & 0x08;
    this.objSize = val & 0x04;
    this.objEnable = val & 0x02;
    this.bgEnable = val & 0x01;
  }

  setSTAT(val) {
    this.lyInterrupt = val & 0x40;
    this.oamInterrupt = val & 0x20;
    this.vBLankInterrupt = val & 0x10;
    this.hBlankInterrupt = val & 0x08;
    this.lyFlag = val & 0x04;
    this.mode = (val & 0x01) + (val & 0x02);
  }

  setPalette(val) {
    for (let i = 0; i < 4; i++) {
      switch ((val >> (i * 2)) & 3) {
        case 0: this.palette[i] = [255, 255, 255, 255]; break;
        case 1: this.palette[i] = [192, 192, 192, 255]; break;
        case 2: this.palette[i] = [96, 96, 96, 255]; break;
        case 3: this.palette[i] = [0, 0, 0, 255]; break;
        default:
          break;
      }
    }
  }

  read8(addr) {
    addr -= 0xff40;
    switch (addr) {
      case 0x0: return this.gpuRam[addr];
      case 0x1: return this.gpuRam[addr];
      case 0x2: return this.SCY;
      case 0x3: return this.SCX;
      case 0x4: return this.LY;
      case 0x5: return this.LYC;
      case 0x6: return this.DMA;
      case 0x7: return this.BGP;
      case 0x8: return this.OBP0;
      case 0x9: return this.OBP1;
      case 0xa: return this.WY;
      case 0xb: return this.WX;
      default: return this.gpuRam[addr];
    }
  }

  write8(cpu, addr, val) {
    addr -= 0xff40;
    val &= 0xff;
    this.gpuRam[addr] = val;
    switch (addr) {
      case 0x0:
        this.setLCDC(val); break;
      case 0x1:
        this.setSTAT(val); break;
      case 0x2:
        this.SCY = val; break;
      case 0x3:
        this.SCX = val; break;
      case 0x4:
        console.log('should not be writing to LY'); break;
        // this.LY = val; break;
      case 0x5:
        this.LYC = val; break;
      case 0x6:
        this.DMA = val; break;
      case 0x7:
        this.setPalette(val); break;
      case 0x8:
        this.OBP0 = val; break;
      case 0x9:
        this.OBP1 = val; break;
      case 0xa:
        this.WY = val; break;
      case 0xb:
        this.WX = val; break;
      default:
        break;
    }
  }

  tileMapToScreen() {
    // if (!this.LCDEnable || !this.bgEnable) {
    //   console.log('gegeg', this.LCDEnable, this.bgEnable)
    // }

    const tileMapAddress = this.bgTileMapAddress ? 0x1c00 : 0x1800;
    const tileSet = this.bgAndWindowTileData ? 1 : 2;
    let printed = false;
    // this.SCY = 128;
    // this.SCX = 128;

    for (let row = 0; row < 144; row++) {
      for (let col = 0; col < 160; col++) {
        let tile;
        const actualRow = row + this.SCY;
        const actualCol = col + this.SCX;
        const tileIdRow = Math.floor(actualRow / 8);
        const tileIdCol = Math.floor(actualCol / 8);
        const tileIndex = (tileIdRow * 32) + tileIdCol;
        const tileId = this.vram[tileMapAddress + tileIndex];

        if (tileSet === 1) {
          if (!printed) {
            printed = true;
            // console.log('writing tile map to screen tileset 1', this.SCX, this.SCY, this.gpuRam[0].toString(2));
          }
          tile = this.tileset[tileId];
        } else if (tileSet === 2) {
          if (!printed) {
            printed = true;
            // console.log('writing tile map to screen tileset 2', this.SCX, this.SCY, this.gpuRam[0].toString(2));
          }
          if (tileId > 127) {
            // if (val > 127) val = -((~val + 1) & 0xff);
            // const test = -((~tileId + 1) & 0xff);
            // const ind = test + 128;
            // if (!printed) {
            //   printed = true;
            //   console.log('writing tile map to screen tileset 2', tileId, this.SCX, this.SCY, this.gpuRam[0].toString(2));
            // }
            tile = this.tileset[tileId];
          } else {
            tile = this.tileset[256 + tileId];
          }
          // if (val > 127) val = -((~val + 1) & 0xff);
        }
        if (tile) {
          const colorId = tile[actualRow % 8][actualCol % 8];
          const colorArr = this.palette[colorId];

          const baseIndex = (row * 160 * 4) + (col * 4);
          for (let i = 0; i < 4; i++) {
            this.screen.data[baseIndex + i] = colorArr[i];
          }
        } else {
          console.log('tile not found', row, this.SCY, col, this.SCX);
        }
      }
    }
  }

  step(cpu) {
    this.MODECLOCK += cpu.M;
    switch (this.MODE) {
      case 0:
        if (this.MODECLOCK >= 51) {
          if (this.LY === 143) {
            this.MODE = 1;
            this.tileMapToScreen();
            this.ctx.putImageData(this.screen, 0, 0);
          } else {
            this.MODE = 2;
          }

          this.MODECLOCK = 0;
          this.LY++;
        }
        break;

      case 1:
        if (this.MODECLOCK >= 114) {
          this.MODECLOCK = 0;
          this.LY++;

          if (this.LY > 153) {
            this.MODE = 2;
            this.LY = 0;
          }
        }
        break;

      case 2:
        if (this.MODECLOCK >= 20) {
          this.MODECLOCK = 0;
          this.MODE = 3;
        }
        break;

      case 3:
        if (this.MODECLOCK >= 43) {
          this.MODECLOCK = 0;
          this.MODE = 0;
        }
        break;

      default:
        break;
    }
  }

  reset() {
    /* eslint-disable-next-line */
    const canvas = document.getElementById('game-screen');
    // console.log(canvas);
    this.tileset = new Array(NUM_TILES).fill(null)
      .map(() => new Array(ROWS_IN_TILE).fill([])
        .map(() => new Array(COLS_IN_TILE).fill(0)));

    if (canvas) {
      this.ctx = canvas.getContext('2d');
      this.screen = this.ctx.createImageData(SCREEN_WIDTH, SCREEN_HEIGHT);
      const color = 0;
      const data = new Array(SCREEN_WIDTH * SCREEN_HEIGHT).fill(null)
        .map(() => [color, color, color, 255])
        .join()
        .split(',')
        .map(num => parseInt(num, 10));


      // const data = new Array(256 * 256 * 4).fill(255);

      this.screen.data.set(data);

      this.ctx.putImageData(this.screen, 0, 0);
    }
  }


  updateTileBasedOnMemory(addr) {
    /* Get the address of the least significant
     byte in the tile row that was updated */
    // console.log('updating tile based on memory', addr, addr.toString(16));
    if (addr >= 0x17ff) return;

    const tile = (addr >> 4) & 0x1ff;
    const y = (addr >> 1) & 0x7;
    let bitIndex;
    // console.log('tile is ', tile, y);
    for (let i = 0; i < 8; i++) {
      bitIndex = 1 << (7 - i);
      const leastSigBit = (this.vram[addr] & bitIndex) ? 1 : 0;
      const mostSigBit = (this.vram[addr + 1] & bitIndex) ? 2 : 0;
      // console.log(leastSigBit, mostSigBit);
      // console.log(tile, this.tileset[tile]);

      this.tileset[tile][y][i] = leastSigBit + mostSigBit;
      // console.log('checking first tile', this.tileset[tile]);

      // console.log('setting tile info', leastSigBit + mostSigBit);
      // console.log('tile is', JSON.stringify(this.tileset[tile]));
    }
  }

  renderScan() {
    // // let mapOffs = this.bgMap ? 0x1c00 : 0x1800;
    // let mapOffs = 0x1800;
    // mapOffs += ((this.LY + this.backgroundOffsetY) & 0xff) >> 3;

    // let lineOffs = this.backgroundOffsetX >> 3;

    // const y = (this.LY + this.backgroundOffsetY) & 0x7;
    // let x = this.backgroundOffsetX & 0x7;
    // const canvasOffs = (this.LY * 256 * 4) % (256 * 256 * 4);
    // let colour;
    // let tile = this.vram[mapOffs + lineOffs];
    // // console.log('render scan sbeing triggered', this.LY);
    // // console.log(JSON.stringify(this.tileset[tile]));

    // for (let i = 0; i < 256; i++) {
    //   colour = this.palette[this.tileset[tile][y][x]];
    //   // console.log('what is the color', y, x, this.tileset[tile]);
    //   // console.log("what is ist", colour);
    //   // console.log('rendering scan', canvasOffs);
    //   // console.log(this.screen.data.slice(canvasOffs, canvasOffs + 5))
    //   // console.log(canvasOffs, colour)
    //   this.screen.data[canvasOffs + 0] = colour[0];
    //   this.screen.data[canvasOffs + 1] = colour[1];
    //   this.screen.data[canvasOffs + 2] = colour[2];
    //   this.screen.data[canvasOffs + 3] = colour[3];
    //   // console.log(this.screen.data.slice(canvasOffs, canvasOffs + 5));

    //   x++;
    //   if (x === 8) {
    //     x = 0;
    //     lineOffs = (lineOffs + 1) & 31;
    //     tile = this.vram[mapOffs + lineOffs];
    //     if (this.bgTile === 1 && tile < 128) tile += 256;
    //   }
    // }
  }
}

module.exports = GPU;
