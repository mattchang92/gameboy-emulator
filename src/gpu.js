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
    this.MODE = 2;
    this.MODECLOCK = 0;
    this.backgroundOffsetX = 0;
    this.backgroundOffsetY = 0;
    this.line = 0;
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

    this.reset();
  }

  step(cpu) {
    this.MODECLOCK += cpu.M;
    switch (this.MODE) {
      case 0:
        if (this.MODECLOCK >= 51) {
          this.MODECLOCK = 0;
          this.line++;
          // console.log(this.MODECLOCK, this.line);

          if (this.line === 143) {
            this.MODE = 1;
            // console.log('WRITING TO CANVAS');
            // for (let i = 0; i < this.screen.data.length; i++) {
            //   this.screen.data[i] = Math.floor(255 * Math.random());
            // }
            // this.screen.data = this.screen.data.map(() => Math.floor(255 * Math.random()));
            this.ctx.putImageData(this.screen, 0, 0);
          } else {
            this.MODE = 2;
          }
        }
        break;

      case 1:
        if (this.MODECLOCK >= 114) {
          this.MODECLOCK = 0;
          this.line++;

          if (this.line > 153) {
            this.MODE = 2;
            this.line = 0;
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
          this.renderScan();
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
      this.screen = this.ctx.createImageData(256, 256);
      const data = new Array(256 * 256 * 4).fill(144);

      this.screen.data.set(data);

      this.ctx.putImageData(this.screen, 0, 0);
    }
  }


  updateTileBasedOnMemory(addr) {
    /* Get the address of the least significant
     byte in the tile row that was updated */
    // console.log('updating tile based on memory', addr, addr.toString(16));
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
    // for (let i = 0; i < 10000; i++) {
    //   this.screen.data[i] = 255;
    // }
    // this.ctx.putImageData(this.screen, 0, 0);

    // let mapOffs = this.bgMap ? 0x1c00 : 0x1800;
    let mapOffs = 0x1800;
    mapOffs += ((this.line + this.backgroundOffsetY) & 0xff) >> 3;

    let lineOffs = this.backgroundOffsetX >> 3;

    const y = (this.line + this.backgroundOffsetY) & 0x7;
    let x = this.backgroundOffsetX & 0x7;
    const canvasOffs = (this.line * 256 * 4) % (256 * 256 * 4);
    let colour;
    let tile = this.vram[mapOffs + lineOffs];
    // console.log('render scan sbeing triggered', this.line);
    // console.log(JSON.stringify(this.tileset[tile]));

    for (let i = 0; i < 256; i++) {
      colour = this.palette[this.tileset[tile][y][x]];
      // console.log('what is the color', y, x, this.tileset[tile]);
      // console.log("what is ist", colour);
      // console.log('rendering scan', canvasOffs);
      // console.log(this.screen.data.slice(canvasOffs, canvasOffs + 5))
      // console.log(canvasOffs, colour)
      this.screen.data[canvasOffs + 0] = colour[0];
      this.screen.data[canvasOffs + 1] = colour[1];
      this.screen.data[canvasOffs + 2] = colour[2];
      this.screen.data[canvasOffs + 3] = colour[3];
      // console.log(this.screen.data.slice(canvasOffs, canvasOffs + 5));

      x++;
      if (x === 8) {
        x = 0;
        lineOffs = (lineOffs + 1) & 31;
        tile = this.vram[mapOffs + lineOffs];
        if (this.bgTile === 1 && tile < 128) tile += 256;
      }
    }
    // console.log('------------------', this.screen.data.find(el => el !== 144));
    // console.log('rendering scan');
    // for (let i = 0; i < this.screen.data.length; i++) {
    //   this.screen.data[i] = Math.floor(255 * Math.random());
    // }
    // this.ctx.putImageData(this.screen, 0, 0);
  }
}

module.exports = GPU;
