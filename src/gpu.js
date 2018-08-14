/*
Period	                      | GPU mode number	| Time spent (clocks)
Scanline (accessing OAM)	    |       2	        |      80
Scanline (accessing VRAM)	    |       3	        |      172
Horizontal blank	            |       0	        |      204
One line (scan and blank)	    |	                |      456
Vertical blank                |       1	        |      4560 (10 lines)
Full frame (scans and vblank) |                 |      70224
*/

class GPU {
  constructor() {
    this.MODE = 0;
    this.MODECLOCK = 0;
    this.line = 0;
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
}

module.exports = GPU;
