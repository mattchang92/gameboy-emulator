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
} = require('./constants');

class GPU {
  constructor(mmu) {
    this.MODE = 0;
    this.MODECLOCK = 0;
    this.backgroundOffsetX = 0;
    this.backgroundOffsetY = 0;
    this.line = 0;
    this.tileset = [];
    this.canvas = {};
    this.screen = {};
    this.vram = mmu.vram;
    this.palette = [
      [255, 255, 255],
      [192, 192, 192],
      [96, 96, 96],
      [0, 0, 0],
    ];
  }

  step(cpu) {
    this.MODECLOCK += cpu.T;

    switch (this.MODE) {
      case 2:
        if (this.MODECLOCK >= 80) {
          this.MODECLOCK = 0;
          this.MODE = 3;
        }
        break;

      case 3:
        if (this.MODECLOCK >= 172) {
          this.MODECLOCK = 0;
          this.MODE = 0;
          this.renderScan();
        }
        break;

      case 0:
        if (GPU.MODECLOCK >= 204) {
          this.MODECLOCK = 0;
          this.line++;

          if (this.line === 143) {
            this.MODE = 1;
            this.canvas.putImageData(this.screen, 0, 0);
          } else {
            this.MODE = 2;
          }
        }
        break;

      case 1:
        if (this.MODECLOCK >= 456) {
          this.MODECLOCK = 0;
          this.line++;

          if (this.line > 153) {
            this.MODE = 2;
            this.line = 0;
          }
        }
        break;

      default:
        break;
    }
  }

  reset() {
    /* eslint-disable-next-line */
    const canvas = document.getElementById('game-screen');

    this.tileset = new Array(NUM_TILES).fill(null)
      .map(() => new Array(ROWS_IN_TILE).fill([])
        .map(() => new Array(COLS_IN_TILE).fill(0)));

    if (canvas) {
      this.canvas = canvas.getContext('2d');

      if (this.canvas.createImageData) {
        this.screen = this.canvas.createImageData(160, 144);
      } else if (this.canvas.getImageData) {
        this.screen = this.canvas.getImageData(0, 0, 160, 144);
      } else {
        this.screen = {
          width: 160,
          height: 144,
        };
      }

      this.screen.data = new Array(160 * 144 * 4).fill(0xff);

      this.canvas.putImageData(this.screen, 0, 0);
    }
  }

  updateTileBasedOnMemory(addr) {
    /* Get the address of the least significant
     byte in the tile row that was updated */
    addr &= 0x1ffe;

    const tile = (addr >> 4) & 0x1ff;
    const y = (addr >> 1) & 0xf;
    let bitIndex;

    for (let i = 0; i < 8; i++) {
      bitIndex = 1 << (7 - i);
      const leastSigBit = (this.vram[addr] & bitIndex) ? 1 : 0;
      const mostSigBit = (this.vram[addr + 1] & bitIndex) ? 2 : 0;

      this.tileset[tile][y][i] = leastSigBit + mostSigBit;
    }
  }

  renderScan() {
    let mapOffs = this.bgMap ? 0x1c00 : 0x1800;
    mapOffs += ((this.LINE + this.backgroundOffsetY) & 0xff) >> 3;

    let lineOffs = this.backgroundOffsetX >> 3;

    const y = (this.LINE + this.backgroundOffsetY) & 0x7;
    let x = this.backgroundOffsetX & 0x7;
    const canvasOffs = this.LINE * 160 * 4;
    let colour;
    let tile = this.vram[mapOffs + lineOffs];

    for (let i = 0; i < 160; i++) {
      colour = this.palette[this.tileset[tile][y][x]];

      this.screen.data[canvasOffs + 0] = colour[0];
      this.screen.data[canvasOffs + 1] = colour[1];
      this.screen.data[canvasOffs + 2] = colour[2];
      this.screen.data[canvasOffs + 3] = colour[3];

      x++;
      if (x === 8) {
        x = 0;
        lineOffs = (lineOffs + 1) & 31;
        tile = this.vram[mapOffs + lineOffs];
        if (this.bgTile === 1 && tile < 128) tile += 256;
      }
    }
  }
}

module.exports = GPU;
