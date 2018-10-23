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
const constants = require('./constants');

const {
  NUM_TILES,
  ROWS_IN_TILE,
  COLS_IN_TILE,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  NUM_SPRITES,
  CANVAS_ELEMENTS_PER_PIXEL,
  TILES_IN_SCREEN_WIDTH,
} = constants;

const {
  LCDC,
  STAT,
  SCY,
  SCX,
  LY,
  LYC,
  DMA,
  BGP,
  OBP0,
  OBP1,
  WY,
  WX,
} = constants.gpu;

class GPU {
  constructor(mmu) {
    this.mmu = mmu;
    this.MODE = 0;
    this.MODECLOCK = 0;
    this.gpuRam = new Array(0xff80 - 0xff40).fill(0);
    this.tileset = [];
    this.objectData = [];
    this.canvas = {};
    this.screen = {};
    this.vram = mmu.vram;
    this.bgPalette = [];
    this.objPalette0 = [];
    this.objPalette1 = [];

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
    // Bit 7 - LCD Display Enable             (0=Off, 1=On)
    // Bit 6 - Window Tile Map Display Select (0=9800-9BFF, 1=9C00-9FFF)
    // Bit 5 - Window Display Enable          (0=Off, 1=On)
    // Bit 4 - BG & Window Tile Data Select   (0=8800-97FF, 1=8000-8FFF)
    // Bit 3 - BG Tile Map Display Select     (0=9800-9BFF, 1=9C00-9FFF)
    // Bit 2 - OBJ (Sprite) Size              (0=8x8, 1=8x16)
    // Bit 1 - OBJ (Sprite) Display Enable    (0=Off, 1=On)
    // Bit 0 - BG Display (for CGB see below) (0=Off, 1=On)
    this.LCDC = 0;
    this.LCDEnable = 1;
    this.windowTileAddress = 0;
    this.windowEnable = 0;
    this.bgAndWindowTileData = 1;
    this.bgTileMapAddress = 0;
    this.objSize = 0;
    this.objEnable = 1;
    this.bgEnable = 1;


    // 0xff41 STAT
    this.STAT = 0;
    this.lyInterrupt = 0; // bit 6
    this.oamInterrupt = 0; // bit 5
    this.vBLankInterrupt = 0; // bit 4
    this.hBlankInterrupt = 0; // bit 3
    this.lyFlag = 0; // bit 2
    this.mode = 0; // bit 0-1

    this.mapCounter = 0; // test variable

    this.reset();
  }

  setLCDC(val) {
    this.LCDEnable = (val >> 7) & 1;
    this.windowTileAddress = (val >> 6) & 1;
    this.windowEnable = (val >> 5) & 1;
    this.bgAndWindowTileData = (val >> 4) & 1;
    this.bgTileMapAddress = (val >> 3) & 1;
    this.objSize = (val >> 2) & 1;
    this.objEnable = (val >> 1) & 1;
    this.bgEnable = val & 1;
  }

  setSTAT(val) {
    this.lyInterrupt = val & 0x40;
    this.oamInterrupt = val & 0x20;
    this.vBLankInterrupt = val & 0x10;
    this.hBlankInterrupt = val & 0x08;
    this.lyFlag = val & 0x04;
    // this.mode = (val & 0x01) + (val & 0x02);
  }

  setPalette(val, palette) {
    for (let i = 0; i < 4; i++) {
      switch ((val >> (i * 2)) & 3) {
        case 0: palette[i] = [255, 255, 255, 255]; break;
        case 1: palette[i] = [192, 192, 192, 255]; break;
        case 2: palette[i] = [96, 96, 96, 255]; break;
        case 3: palette[i] = [0, 0, 0, 255]; break;
        default:
          break;
      }
    }
  }

  read(addr) {
    switch (addr) {
      case LCDC: return this.LCDC;
      case STAT: return this.STAT;
      case SCY: return this.SCY;
      case SCX: return this.SCX;
      case LY: return this.LY;
      case LYC: return this.LYC;
      case DMA: return this.DMA;
      case BGP: return this.BGP;
      case OBP0: return this.OBP0;
      case OBP1: return this.OBP1;
      case WY: return this.WY;
      case WX: return this.WX;
      default: return this.gpuRam[addr - 0xff40];
    }
  }

  write(cpu, addr, val) {
    val &= 0xff;
    this.gpuRam[addr - 0xff40] = val;
    switch (addr) {
      case LCDC:
        this.setLCDC(val);
        this.LCDC = val;
        this.gpuRam[addr - 0xff40] = val; break;
      case STAT:
        this.setSTAT(val);
        // this.STAT = val;
        this.STAT = this.STAT & ~0x78 | (val & 0xf8);
        this.gpuRam[addr - 0xff40] = val; break;
      case SCY:
        this.SCY = val; break;
      case SCX:
        this.SCX = val; break;
      case 0x4:
        this.LY = 0;
        console.log('should not be writing to LY'); break;
        // this.LY = val; break;
      case LYC:
        this.LYC = val; break;
      case DMA:
        for (let i = 0; i < 160; i++) {
          const newVal = this.mmu.read8(cpu, (val << 8) + i);
          this.mmu.oam[i] = newVal;
          if (process.env.NODE_ENV !== 'test') this._updateOam(0xfe00 + i, newVal);
        }
        this.DMA = val; break;
      case BGP:
        this.setPalette(val, this.bgPalette);
        this.BGP = val; break;
      case OBP0:
        this.setPalette(val, this.objPalette0);
        this.OBP0 = val; break;
      case OBP1:
        this.setPalette(val, this.objPalette1);
        this.OBP1 = val; break;
      case WY:
        this.WY = val; break;
      case WX:
        this.WX = val; break;
      default:
        break;
    }
  }

  buildObjectData(addr, val) {
    if (process.env.NODE_ENV === 'test') return;

    const obj = addr >> 2;
    if (obj >= 40) console.log('Address given for object is not valid', obj);

    switch (addr & 3) {
      case 0: this.objectData[obj].y = val - 16; break;
      case 1: this.objectData[obj].x = val - 8; break;
      case 2: this.objectData[obj].tile = val; break;
      case 3:
        this.objectData[obj].palette = (val & 0x10) ? 1 : 0;
        this.objectData[obj].xFlip = (val & 0x20) ? 1 : 0;
        this.objectData[obj].yFlip = (val & 0x40) ? 1 : 0;
        this.objectData[obj].zIndex = (val & 0x80) ? 1 : 0;
        break;
      default: break;
    }
  }

  renderScanline() {
    if (process.env.NODE_ENV === 'test') return;

    // const tileSet = 1;
    const tileMapAddress = this.bgTileMapAddress ? 0x1c00 : 0x1800; // (0=8800-97FF, 1=8000-8FFF)
    const tileSet = this.bgAndWindowTileData; // (0=9800-9BFF, 1=9C00-9FFF)
    // const tileSet = this.bgAndWindowTileData ? 1 : 2;
    const scanRow = [];

    // if (!this.LCDEnable) return;

    if (this.bgEnable) this._renderBackgroundLine(tileMapAddress, tileSet, scanRow);
    if (this.objEnable) this._renderSpritesLine(scanRow);
  }

  step(cpu) {
    this.MODECLOCK += cpu.M;
    switch (this.MODE) {
      case 0: // Hblank
        if (this.MODECLOCK >= 51) {
          this.LY++;
          this._checkLYC();
          this.MODECLOCK -= 51;
          if (this.LY === 144) {
            this.MODE = 1;
            this._changeMode(1);
            if (process.env.NODE_ENV !== 'test') this.ctx.putImageData(this.screen, 0, 0);

            this.mmu.if |= 1;
          } else {
            this.MODE = 2;
          }
        }
        break;

      case 1: // Vblank
        if (this.MODECLOCK >= 114) {
          this.MODECLOCK -= 114;
          this.LY++;

          if (this.LY > 153) {
            this._changeMode(2);
            this.MODE = 2;
            this.LY = 0;
          }
          this._checkLYC();
        }
        break;

      case 2: // OAM read mode
        if (this.MODECLOCK >= 20) {
          this.MODECLOCK -= 20;
          this._changeMode(3);
          this.MODE = 3;
        }
        break;

      case 3: // VRAM read mode
        if (this.MODECLOCK >= 43) {
          this.MODECLOCK -= 43;
          this._changeMode(0);
          this.renderScanline();
          this.MODE = 0;
        }
        break;

      default:
        break;
    }
  }

  reset() {
    if (process.env.NODE_ENV === 'test') return;
    /* eslint-disable-next-line */
    const canvas = document.getElementById('game-screen');

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

      this.screen.data.set(data);

      this.ctx.putImageData(this.screen, 0, 0);
    }

    this.bgPalette = [[255, 255, 255, 255], [192, 192, 192, 255], [96, 96, 96, 255], [0, 0, 0, 255]];
    this.objPalette0 = [[255, 255, 255, 255], [192, 192, 192, 255], [96, 96, 96, 255], [0, 0, 0, 255]];
    this.objPalette1 = [[255, 255, 255, 255], [192, 192, 192, 255], [96, 96, 96, 255], [0, 0, 0, 255]];

    for (let i = 0; i < 40; i++) {
      this.objectData[i] = {
        y: -16,
        x: -8,
        tile: 0,
        palette: 0,
        xFlip: 0,
        yFlip: 0,
        xIndex: 0,
        num: i,
      };
    }
  }


  updateTileBasedOnMemory(addr) {
    /* Get the address of the least significant
     byte in the tile row that was updated */
    if (addr >= 0x17ff || process.env.NODE_ENV === 'test') return;
    addr &= 0x1ffe;

    const tile = (addr >> 4) & 0x1ff;
    const y = (addr >> 1) & 0x7;
    let bitIndex;

    for (let i = 0; i < 8; i++) {
      bitIndex = 1 << (7 - i);
      const leastSigBit = (this.vram[addr] & bitIndex) ? 1 : 0;
      const mostSigBit = (this.vram[addr + 1] & bitIndex) ? 2 : 0;

      this.tileset[tile][y][i] = leastSigBit + mostSigBit;
    }
  }

  _renderBackgroundLine(tileMapAddress, tileSet, scanRow) {
    for (let col = 0; col < SCREEN_WIDTH; col++) {
      const actualRow = (this.LY + this.SCY) & 0xff;
      const actualCol = (col + this.SCX) & 0xff;
      const tileIdRow = Math.floor(actualRow / ROWS_IN_TILE);
      const tileIdCol = Math.floor(actualCol / COLS_IN_TILE);
      const tileIndex = (tileIdRow * TILES_IN_SCREEN_WIDTH) + tileIdCol;
      const tileId = this.vram[tileMapAddress + tileIndex];


      const tile = tileSet ? this.tileset[tileId] : this.tileset[256 + tileId.signed()];
      // if (tileSet === 1 || tileId > 127) {
      //   tile = this.tileset[tileId];
      // } else {
      //   tile = this.tileset[256 + tileId];
      // }

      if (tile) {
        const colorId = tile[actualRow % ROWS_IN_TILE][actualCol % COLS_IN_TILE];
        const colorArr = this.bgPalette[colorId];

        const baseIndex = ((this.LY * SCREEN_WIDTH) + col) * CANVAS_ELEMENTS_PER_PIXEL;
        for (let i = 0; i < CANVAS_ELEMENTS_PER_PIXEL; i++) {
          this.screen.data[baseIndex + i] = colorArr[i];
        }
        scanRow[col] = colorId;
      } else {
        console.log('tile not found', this.LY, this.SCY, col, this.SCX);
      }
    }
  }

  _renderSpritesLine(scanRow) {
    const isOnScreen = (obj, x) => ((obj.x + x) >= 0) && ((obj.x + x) < 160);
    const isNotTransparent = (tileRow, x) => tileRow[x];
    const isDisplayed = (obj, x) => obj.zIndex || !scanRow[obj.x + x];

    for (let i = 0; i < NUM_SPRITES; i++) {
      const obj = this.objectData[i];
      const height = this.objSize ? 16 : 8;
      if (obj.y <= this.LY && (obj.y + height) > this.LY) {
        const palette = obj.palette ? this.objPalette1 : this.objPalette0;
        const baseIndex = ((this.LY * SCREEN_WIDTH) + obj.x) * CANVAS_ELEMENTS_PER_PIXEL;
        const row = obj.yFlip ? (height - 1) - (this.LY - obj.y) : this.LY - obj.y;
        const tileRow = this.tileset[obj.tile][row];

        for (let x = 0; x < 8; x++) {
          const pixel = obj.xFlip ? (7 - x) : x;
          if (isOnScreen(obj, x) && isNotTransparent(tileRow, pixel) && isDisplayed(obj, pixel)) {
            const colorArr = palette[tileRow[pixel]];
            for (let j = 0; j < CANVAS_ELEMENTS_PER_PIXEL; j++) {
              const offset = baseIndex + (x * 4);
              this.screen.data[offset + j] = colorArr[j];
            }
          }
        }
      }
    }
  }

  _updateOam(addr, val) {
    addr -= 0xFE00;
    const obj = addr >> 2;
    if (obj < 40) {
      switch (addr & 3) {
        case 0:
          this.objectData[obj].y = val - 16;
          break;
        case 1:
          this.objectData[obj].x = val - 8;
          break;
        case 2:
          if (this.objSize) this.objectData[obj].tile = (val & 0xFE);
          else this.objectData[obj].tile = val;
          break;
        case 3:
          this.objectData[obj].palette = (val & 0x10) ? 1 : 0;
          this.objectData[obj].xFlip = (val & 0x20) ? 1 : 0;
          this.objectData[obj].yFlip = (val & 0x40) ? 1 : 0;
          this.objectData[obj].zIndex = (val & 0x80) ? 0 : 1;
          break;
        default: break;
      }
    }
  }

  _changeMode(mode) {
    let interrupt = false;
    switch (mode) {
      case 0: if (this.STAT & 8) interrupt = true; break;
      case 1: if (this.STAT & 0x10) interrupt = true; break;
      case 2: if (this.STAT & 0x20) interrupt = true; break;
      default: break;
    }
    if (interrupt) this.mmu.if |= 2;
  }

  _checkLYC() {
    if (this.LYC === this.LY) {
      this.STAT |= 1 << 2;
      if (this.STAT & 0x40) this.mmu.if |= 2;
    } else {
      this.STAT &= ~(1 << 2);
    }
  }
}

module.exports = GPU;
