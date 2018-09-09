class Controller {
  constructor() {
    this.rows = [0x0f, 0x0f];
    this.column = 0;
    const INPUT = {
      DOWN: 'down',
      UP: 'up',
      LEFT: 'left',
      RIGHT: 'right',
      START: 'start',
      SELECT: 'select',
      A: 'a',
      B: 'b',
    };

    this.INPUT = INPUT;
    this.inputMap = {
      83: INPUT.DOWN,
      87: INPUT.UP,
      65: INPUT.LEFT,
      68: INPUT.RIGHT,
      13: INPUT.START,
      32: INPUT.SELECT,
      74: INPUT.A,
      76: INPUT.B,
    };
  }

  reset() {
    this.rows = [0x0f, 0x0f];
    this.column = 0;
  }

  read() {
    switch (this.column) {
      case 0x10: return this.rows[1];
      case 0x20: return this.rows[0];
      default: return 0;
    }
  }

  write(val) {
    this.column = val & 0x30;
  }

  /*
  LEFT      RIGHT     BIT   SETMASK   CLEARMASK
  ---------------------------------------------
  DOWN      START     3       0x4         0x7
  UP        SELECT    2       0x4         0xb
  LEFT      B         1       0x2         0xd
  RIGHT     A         0       0x1         0xe
  */
  keyDown(e) {
    const key = this.inputMap[e.keyCode];
    // console.log(e.keyCode, key);
    switch (key) {
      case this.INPUT.A: this.rows[1] &= 0xe; break;
      case this.INPUT.B: this.rows[1] &= 0xd; break;
      case this.INPUT.SELECT: this.rows[1] &= 0xb; break;
      case this.INPUT.START: this.rows[1] &= 0x7; break;
      case this.INPUT.RIGHT: this.rows[0] &= 0xe; break;
      case this.INPUT.LEFT: this.rows[0] &= 0xd; break;
      case this.INPUT.UP: this.rows[0] &= 0xb; break;
      case this.INPUT.DOWN: this.rows[0] &= 0x7; break;
      default: break;
    }
  }

  keyUp(e) {
    const key = this.inputMap[e.keyCode];

    switch (key) {
      case this.INPUT.A: this.rows[1] |= 0x1; break;
      case this.INPUT.B: this.rows[1] |= 0x2; break;
      case this.INPUT.SELECT: this.rows[1] |= 0x4; break;
      case this.INPUT.START: this.rows[1] |= 0x8; break;
      case this.INPUT.RIGHT: this.rows[0] |= 0x1; break;
      case this.INPUT.LEFT: this.rows[0] |= 0x2; break;
      case this.INPUT.UP: this.rows[0] |= 0x4; break;
      case this.INPUT.DOWN: this.rows[0] |= 0x8; break;
      default: break;
    }
  }
}


module.exports = Controller;
