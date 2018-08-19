const CBOPCODES = {
  RLCB: 0x00,
  RLCC: 0x01,
  RLCD: 0x02,
  RLCE: 0x03,
  RLCH: 0x04,
  RLCL: 0x05,
  RLCHLm: 0x06,
  RLCA: 0x07,
  RRCB: 0x08,
  RRCC: 0x09,
  RRCD: 0x0a,
  RRCE: 0x0b,
  RRCH: 0x0c,
  RRCL: 0x0d,
  RRCHLm: 0x0e,
  RRCA: 0x0f,

  RLB: 0x10,
  RLC: 0x11,
  RLD: 0x12,
  RLE: 0x13,
  RLH: 0x14,
  RLL: 0x15,
  RLHLm: 0x16,
  RLA: 0x17,
  RRB: 0x18,
  RRC: 0x19,
  RRD: 0x1a,
  RRE: 0x1b,
  RRH: 0x1c,
  RRL: 0x1d,
  RRHLm: 0x1e,
  RRA: 0x1f,

  SLAB: 0x20,
  SLAC: 0x21,
  SLAD: 0x22,
  SLAE: 0x23,
  SLAH: 0x24,
  SLAL: 0x25,
  SLAHLm: 0x26,
  SLAA: 0x27,
  SRAB: 0x28,
  SRAC: 0x29,
  SRAD: 0x2a,
  SRAE: 0x2b,
  SRAH: 0x2c,
  SRAL: 0x2d,
  SRAHLm: 0x2e,
  SRAA: 0x2f,

  SWAPB: 0x30,
  SWAPC: 0x31,
  SWAPD: 0x32,
  SWAPE: 0x33,
  SWAPH: 0x34,
  SWAPL: 0x35,
  SWAPHLm: 0x36,
  SWAPA: 0x37,
  SRLB: 0x38,
  SRLC: 0x39,
  SRLD: 0x3a,
  SRLE: 0x3b,
  SRLH: 0x3c,
  SRLL: 0x3d,
  SRLHLm: 0x3e,
  SRLA: 0x3f,

  BIT0B: 0x40,
  BIT0C: 0x41,
  BIT0D: 0x42,
  BIT0E: 0x43,
  BIT0H: 0x44,
  BIT0L: 0x45,
  BIT0HLm: 0x46,
  BIT0A: 0x47,
  BIT1B: 0x48,
  BIT1C: 0x49,
  BIT1D: 0x4a,
  BIT1E: 0x4b,
  BIT1H: 0x4c,
  BIT1L: 0x4d,
  BIT1HLm: 0x4e,
  BIT1A: 0x4f,

  BIT2B: 0x50,
  BIT2C: 0x51,
  BIT2D: 0x52,
  BIT2E: 0x53,
  BIT2H: 0x54,
  BIT2L: 0x55,
  BIT2HLm: 0x56,
  BIT2A: 0x57,
  BIT3B: 0x58,
  BIT3C: 0x59,
  BIT3D: 0x5a,
  BIT3E: 0x5b,
  BIT3H: 0x5c,
  BIT3L: 0x5d,
  BIT3HLm: 0x5e,
  BIT3A: 0x5f,

  BIT4B: 0x60,
  BIT4C: 0x61,
  BIT4D: 0x62,
  BIT4E: 0x63,
  BIT4H: 0x64,
  BIT4L: 0x65,
  BIT4HLm: 0x66,
  BIT4A: 0x67,
  BIT5B: 0x68,
  BIT5C: 0x69,
  BIT5D: 0x6a,
  BIT5E: 0x6b,
  BIT5H: 0x6c,
  BIT5L: 0x6d,
  BIT5HLm: 0x6e,
  BIT5A: 0x6f,

  BIT6B: 0x70,
  BIT6C: 0x71,
  BIT6D: 0x72,
  BIT6E: 0x73,
  BIT6H: 0x74,
  BIT6L: 0x75,
  BIT6HLm: 0x76,
  BIT6A: 0x77,
  BIT7B: 0x78,
  BIT7C: 0x79,
  BIT7D: 0x7a,
  BIT7E: 0x7b,
  BIT7H: 0x7c,
  BIT7L: 0x7d,
  BIT7HLm: 0x7e,
  BIT7A: 0x7f,
};


const setFlags = (cpu, val, isSub) => {
  cpu.F = 0;
  if (!(val & 0xff)) cpu.F |= 0x80;
  if (val > 0xff || val < 0) cpu.F |= 0x10;
  if (isSub) cpu.F |= 0x40;
};

const testBit = (cpu, val) => {
  cpu.F &= !0x40;
  cpu.F |= 0x20;
  if (val) {
    cpu.F &= ~0x80;
  } else {
    cpu.F |= 0x80;
  }
};

// const setHalfCarry = (cpu, a, b, isSub) => {
//   if (isSub) {
//     if ((a & 0xf) < (b & 0xf)) {
//       cpu.F |= 0x20;
//     } else {
//       cpu.F &= ~0x20;
//     }
//   } else if (((a & 0xf) + (b & 0xf)) & 0x10) {
//     cpu.F |= 0x20;
//   } else {
//     cpu.F &= ~0x20;
//   }
// };


const cbopcodes = {
  /* ------------------------ 0x0------------------------ */
  [CBOPCODES.RLCB]: (cpu) => { const c = cpu.B & 0x80 ? 1 : 0; cpu.B = (cpu.B << 1) | c; setFlags(cpu, cpu.B); cpu.B &= 0xff; cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.RLCC]: (cpu) => { const c = cpu.C & 0x80 ? 1 : 0; cpu.C = (cpu.C << 1) | c; setFlags(cpu, cpu.C); cpu.C &= 0xff; cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.RLCD]: (cpu) => { const c = cpu.D & 0x80 ? 1 : 0; cpu.D = (cpu.B << 1) | c; setFlags(cpu, cpu.D); cpu.D &= 0xff; cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.RLCE]: (cpu) => { const c = cpu.E & 0x80 ? 1 : 0; cpu.E = (cpu.B << 1) | c; setFlags(cpu, cpu.E); cpu.E &= 0xff; cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.RLCH]: (cpu) => { const c = cpu.H & 0x80 ? 1 : 0; cpu.H = (cpu.B << 1) | c; setFlags(cpu, cpu.H); cpu.H &= 0xff; cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.RLCL]: (cpu) => { const c = cpu.L & 0x80 ? 1 : 0; cpu.L = (cpu.B << 1) | c; setFlags(cpu, cpu.L); cpu.L &= 0xff; cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.RLCHLm]: (cpu) => { let val = cpu.read8(cpu, (cpu.H << 8) & cpu.L); const c = val & 0x80 ? 1 : 0; val = (val << 1) | c; setFlags(cpu, val); cpu.write8(cpu, (cpu.H << 8) | cpu.L, val & 0xff); cpu.M = 4; cpu.T = 16; },
  [CBOPCODES.RLCA]: (cpu) => { const c = cpu.A & 0x80 ? 1 : 0; cpu.A = (cpu.B << 1) | c; setFlags(cpu, cpu.A); cpu.A &= 0xff; cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.RRCB]: (cpu) => {
    const c = cpu.B & 1 ? 0x80 : 0;
    const o = cpu.B & 1 ? 0x10 : 1;
    cpu.B = (cpu.B >> 1) | c;
    setFlags(cpu, cpu.B);
    cpu.B &= 0xff;
    cpu.F = (cpu.F & 0xef) + o;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRCC]: (cpu) => {
    const c = cpu.C & 1 ? 0x80 : 0;
    const o = cpu.C & 1 ? 0x10 : 1;
    cpu.C = (cpu.C >> 1) | c;
    setFlags(cpu, cpu.C);
    cpu.C &= 0xff;
    cpu.F = (cpu.F & 0xef) + o;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRCD]: (cpu) => {
    const c = cpu.D & 1 ? 0x80 : 0;
    const o = cpu.D & 1 ? 0x10 : 1;
    cpu.D = (cpu.D >> 1) | c;
    setFlags(cpu, cpu.D);
    cpu.D &= 0xff;
    cpu.F = (cpu.F & 0xef) + o;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRCE]: (cpu) => {
    const c = cpu.E & 1 ? 0x80 : 0;
    const o = cpu.E & 1 ? 0x10 : 1;
    cpu.E = (cpu.E >> 1) | c;
    setFlags(cpu, cpu.E);
    cpu.E &= 0xff;
    cpu.F = (cpu.F & 0xef) + o;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRCH]: (cpu) => {
    const c = cpu.H & 1 ? 0x80 : 0;
    const o = cpu.H & 1 ? 0x10 : 1;
    cpu.H = (cpu.H >> 1) | c;
    setFlags(cpu, cpu.H);
    cpu.H &= 0xff;
    cpu.F = (cpu.F & 0xef) + o;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRCL]: (cpu) => {
    const c = cpu.L & 1 ? 0x80 : 0;
    const o = cpu.L & 1 ? 0x10 : 1;
    cpu.L = (cpu.L >> 1) | c;
    setFlags(cpu, cpu.L);
    cpu.L &= 0xff;
    cpu.F = (cpu.F & 0xef) + o;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRCHLm]: (cpu) => {
    let val = cpu.read8(cpu, (cpu.H << 8) & cpu.L);
    const c = val & 1 ? 0x80 : 0;
    const o = val & 1 ? 0x10 : 1;
    val = (val >> 1) | c;
    setFlags(cpu, val);
    cpu.write8(cpu, (cpu.H << 8) | cpu.L, val & 0xff);
    cpu.F = (cpu.F & 0xef) + o;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRCA]: (cpu) => {
    const c = cpu.A & 1 ? 0x80 : 0;
    const o = cpu.A & 1 ? 0x10 : 1;
    cpu.A = (cpu.A >> 1) | c;
    setFlags(cpu, cpu.A);
    cpu.A &= 0xff;
    cpu.F = (cpu.F & 0xef) + o;
    cpu.M = 2; cpu.T = 8;
  },

  /* ------------------------ 0x1------------------------ */
  [CBOPCODES.RLB]: (cpu) => {
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.B & 0x80 ? 0x10 : 0;
    cpu.B = (cpu.B << 1) | c;
    setFlags(cpu, cpu.B);
    cpu.B &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLC]: (cpu) => {
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.C & 0x80 ? 0x10 : 0;
    cpu.C = (cpu.C << 1) | c;
    setFlags(cpu, cpu.C);
    cpu.C &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLD]: (cpu) => {
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.D & 0x80 ? 0x10 : 0;
    cpu.D = (cpu.D << 1) | c;
    setFlags(cpu, cpu.D);
    cpu.D &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLE]: (cpu) => {
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.E & 0x80 ? 0x10 : 0;
    cpu.E = (cpu.E << 1) | c;
    setFlags(cpu, cpu.E);
    cpu.E &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLH]: (cpu) => {
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.H & 0x80 ? 0x10 : 0;
    cpu.H = (cpu.H << 1) | c;
    setFlags(cpu, cpu.H);
    cpu.H &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLL]: (cpu) => {
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.L & 0x80 ? 0x10 : 0;
    cpu.L = (cpu.L << 1) | c;
    setFlags(cpu, cpu.L);
    cpu.L &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLHLm]: (cpu) => {
    let val = cpu.read8((cpu.H << 8) | cpu.L);
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = val & 0x80 ? 0x10 : 0;
    val = (val << 1) | c;
    setFlags(cpu, val);
    cpu.write8(cpu, (cpu.H << 8) | cpu.L, val & 0xff);
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLA]: (cpu) => {
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.A & 0x80 ? 0x10 : 0;
    cpu.A = (cpu.A << 1) | c;
    setFlags(cpu, cpu.A);
    cpu.A &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRB]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.B & 1 ? 0x10 : 0;
    cpu.B = (cpu.B >> 1) | c;
    setFlags(cpu, cpu.B);
    cpu.B &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRC]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.C & 1 ? 0x10 : 0;
    cpu.C = (cpu.C >> 1) | c;
    setFlags(cpu, cpu.C);
    cpu.C &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRD]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.D & 1 ? 0x10 : 0;
    cpu.D = (cpu.D >> 1) | c;
    setFlags(cpu, cpu.D);
    cpu.D &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRE]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.E & 1 ? 0x10 : 0;
    cpu.E = (cpu.E >> 1) | c;
    setFlags(cpu, cpu.E);
    cpu.E &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRH]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.H & 1 ? 0x10 : 0;
    cpu.H = (cpu.H >> 1) | c;
    setFlags(cpu, cpu.H);
    cpu.H &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRL]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.L & 1 ? 0x10 : 0;
    cpu.L = (cpu.L >> 1) | c;
    setFlags(cpu, cpu.L);
    cpu.L &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRHLm]: (cpu) => {
    let val = cpu.read8((cpu.H << 8) | cpu.L);
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = val & 1 ? 0x10 : 0;
    val = (val >> 1) | c;
    setFlags(cpu, val);
    cpu.write8(cpu, (cpu.H << 8) | cpu.L, val & 0xff);
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRA]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.A & 1 ? 0x10 : 0;
    cpu.A = (cpu.A >> 1) | c;
    setFlags(cpu, cpu.A);
    cpu.A &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },

  /* ------------------------ 0x2------------------------ */
  [CBOPCODES.SLAB]: (cpu) => {
    const overflow = cpu.B & 0x80 ? 0x10 : 0;
    setFlags(cpu, cpu.B << 1);
    cpu.B = (cpu.B << 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SLAC]: (cpu) => {
    const overflow = cpu.C & 0x80 ? 0x10 : 0;
    setFlags(cpu, cpu.C << 1);
    cpu.C = (cpu.C << 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SLAD]: (cpu) => {
    const overflow = cpu.D & 0x80 ? 0x10 : 0;
    setFlags(cpu, cpu.D << 1);
    cpu.D = (cpu.D << 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SLAE]: (cpu) => {
    const overflow = cpu.E & 0x80 ? 0x10 : 0;
    setFlags(cpu, cpu.E << 1);
    cpu.E = (cpu.E << 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SLAH]: (cpu) => {
    const overflow = cpu.H & 0x80 ? 0x10 : 0;
    setFlags(cpu, cpu.H << 1);
    cpu.H = (cpu.H << 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SLAL]: (cpu) => {
    const overflow = cpu.L & 0x80 ? 0x10 : 0;
    setFlags(cpu, cpu.L << 1);
    cpu.L = (cpu.L << 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SLAHLm]: (cpu) => {
    console.log('Calling illegal Opcode!!');
    const val = cpu.read8((cpu.H << 8) | cpu.L);
    const overflow = val & 0x80 ? 0x10 : 0;
    setFlags(cpu, val << 1);
    cpu.write8(cpu, (cpu.H << 8) | cpu.L, (val << 1) & 0xff);
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 4; cpu.T = 16;
  },
  [CBOPCODES.SLAA]: (cpu) => {
    const overflow = cpu.L & 0x80 ? 0x10 : 0;
    setFlags(cpu, cpu.L << 1);
    cpu.L = (cpu.L << 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SRAB]: (cpu) => {
    const c = cpu.B & 0x80;
    const overflow = cpu.B & 1 ? 0x10 : 0;
    setFlags(cpu, (cpu.B >> 1) | c);
    cpu.B = ((cpu.B >> 1) | c) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SRAC]: (cpu) => {
    const c = cpu.C & 0x80;
    const overflow = cpu.C & 1 ? 0x10 : 0;
    setFlags(cpu, (cpu.C >> 1) | c);
    cpu.C = ((cpu.C >> 1) | c) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SRAD]: (cpu) => {
    const c = cpu.D & 0x80;
    const overflow = cpu.D & 1 ? 0x10 : 0;
    setFlags(cpu, (cpu.D >> 1) | c);
    cpu.D = ((cpu.D >> 1) | c) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SRAE]: (cpu) => {
    const c = cpu.E & 0x80;
    const overflow = cpu.E & 1 ? 0x10 : 0;
    setFlags(cpu, (cpu.E >> 1) | c);
    cpu.E = ((cpu.E >> 1) | c) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SRAH]: (cpu) => {
    const c = cpu.H & 0x80;
    const overflow = cpu.H & 1 ? 0x10 : 0;
    setFlags(cpu, (cpu.H >> 1) | c);
    cpu.H = ((cpu.H >> 1) | c) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SRAL]: (cpu) => {
    const c = cpu.L & 0x80;
    const overflow = cpu.L & 1 ? 0x10 : 0;
    setFlags(cpu, (cpu.L >> 1) | c);
    cpu.L = ((cpu.L >> 1) | c) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SRAHLm]: (cpu) => {
    console.log('Calling illegal Opcode!!');
    const val = cpu.read8(cpu, (cpu.H << 8) | cpu.L);
    const c = val & 0x80;
    const overflow = val & 1 ? 0x10 : 0;
    setFlags(cpu, (val >> 1) | c);
    cpu.write8(cpu, (cpu.H << 8) | cpu.L, ((val >> 1) | c) & 0xff);
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 4; cpu.T = 16;
  },
  [CBOPCODES.SRAA]: (cpu) => {
    const c = cpu.A & 0x80;
    const overflow = cpu.A & 1 ? 0x10 : 0;
    setFlags(cpu, (cpu.A >> 1) | c);
    cpu.A = ((cpu.A >> 1) | c) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },

  /* ------------------------ 0x3------------------------ */
  [CBOPCODES.SWAPB]: (cpu) => {
    cpu.B = ((cpu.B & 0xf) << 4) | ((cpu.B & 0xf0) >> 4);
    setFlags(cpu, cpu.B);
    cpu.M = 1; cpu.T = 4;
  },
  [CBOPCODES.SWAPC]: (cpu) => {
    cpu.C = ((cpu.C & 0xf) << 4) | ((cpu.C & 0xf0) >> 4);
    setFlags(cpu, cpu.C);
    cpu.M = 1; cpu.T = 4;
  },
  [CBOPCODES.SWAPD]: (cpu) => {
    cpu.D = ((cpu.D & 0xf) << 4) | ((cpu.D & 0xf0) >> 4);
    setFlags(cpu, cpu.D);
    cpu.M = 1; cpu.T = 4;
  },
  [CBOPCODES.SWAPE]: (cpu) => {
    cpu.E = ((cpu.E & 0xf) << 4) | ((cpu.E & 0xf0) >> 4);
    setFlags(cpu, cpu.E);
    cpu.M = 1; cpu.T = 4;
  },
  [CBOPCODES.SWAPH]: (cpu) => {
    cpu.H = ((cpu.H & 0xf) << 4) | ((cpu.H & 0xf0) >> 4);
    setFlags(cpu, cpu.H);
    cpu.M = 1; cpu.T = 4;
  },
  [CBOPCODES.SWAPL]: (cpu) => {
    cpu.L = ((cpu.L & 0xf) << 4) | ((cpu.L & 0xf0) >> 4);
    setFlags(cpu, cpu.L);
    cpu.M = 1; cpu.T = 4;
  },
  [CBOPCODES.SWAPHLm]: () => {
    console.log('Calling illegal opcode!');
  },
  [CBOPCODES.SWAPA]: (cpu) => {
    cpu.A = ((cpu.A & 0xf) << 4) | ((cpu.A & 0xf0) >> 4);
    setFlags(cpu, cpu.A);
    cpu.M = 1; cpu.T = 4;
  },
  [CBOPCODES.SRLB]: (cpu) => {
    const overflow = cpu.B & 1 ? 0x10 : 0;
    setFlags(cpu, cpu.B >> 1);
    cpu.B = (cpu.B >> 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SRLC]: (cpu) => {
    const overflow = cpu.C & 1 ? 0x10 : 0;
    setFlags(cpu, cpu.C >> 1);
    cpu.C = (cpu.C >> 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SRLD]: (cpu) => {
    const overflow = cpu.D & 1 ? 0x10 : 0;
    setFlags(cpu, cpu.D >> 1);
    cpu.D = (cpu.D >> 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SRLE]: (cpu) => {
    const overflow = cpu.E & 1 ? 0x10 : 0;
    setFlags(cpu, cpu.E >> 1);
    cpu.E = (cpu.E >> 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SRLH]: (cpu) => {
    const overflow = cpu.H & 1 ? 0x10 : 0;
    setFlags(cpu, cpu.H >> 1);
    cpu.H = (cpu.H >> 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SRLL]: (cpu) => {
    const overflow = cpu.L & 1 ? 0x10 : 0;
    setFlags(cpu, cpu.L >> 1);
    cpu.L = (cpu.L >> 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.SRLHLm]: () => {
    console.log('Calling illegal opcode!!');
  },
  [CBOPCODES.SRLA]: (cpu) => {
    const overflow = cpu.A & 1 ? 0x10 : 0;
    setFlags(cpu, cpu.A >> 1);
    cpu.A = (cpu.A >> 1) & 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },

  /* ------------------------ 0x4------------------------ */
  [CBOPCODES.BIT0B]: (cpu) => { testBit(cpu, cpu.B & 0x01); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT0C]: (cpu) => { testBit(cpu, cpu.C & 0x01); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT0D]: (cpu) => { testBit(cpu, cpu.D & 0x01); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT0E]: (cpu) => { testBit(cpu, cpu.E & 0x01); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT0H]: (cpu) => { testBit(cpu, cpu.H & 0x01); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT0L]: (cpu) => { testBit(cpu, cpu.L & 0x01); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT0HLm]: (cpu) => { testBit(cpu, cpu.read8(cpu, (cpu.H << 8) | cpu.L) & 0x01); cpu.M = 3; cpu.T = 12; },
  [CBOPCODES.BIT0A]: (cpu) => { testBit(cpu, cpu.A & 0x01); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT1B]: (cpu) => { testBit(cpu, cpu.B & 0x02); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT1C]: (cpu) => { testBit(cpu, cpu.C & 0x02); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT1D]: (cpu) => { testBit(cpu, cpu.D & 0x02); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT1E]: (cpu) => { testBit(cpu, cpu.E & 0x02); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT1H]: (cpu) => { testBit(cpu, cpu.H & 0x02); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT1L]: (cpu) => { testBit(cpu, cpu.L & 0x02); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT1HLm]: (cpu) => { testBit(cpu, cpu.read8(cpu, (cpu.H << 8) | cpu.L) & 0x02); cpu.M = 3; cpu.T = 12; },
  [CBOPCODES.BIT1A]: (cpu) => { testBit(cpu, cpu.A & 0x02); cpu.M = 2; cpu.T = 8; },

  /* ------------------------ 0x5------------------------ */
  [CBOPCODES.BIT2B]: (cpu) => { testBit(cpu, cpu.B & 0x04); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT2C]: (cpu) => { testBit(cpu, cpu.C & 0x04); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT2D]: (cpu) => { testBit(cpu, cpu.D & 0x04); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT2E]: (cpu) => { testBit(cpu, cpu.E & 0x04); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT2H]: (cpu) => { testBit(cpu, cpu.H & 0x04); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT2L]: (cpu) => { testBit(cpu, cpu.L & 0x04); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT2HLm]: (cpu) => { testBit(cpu, cpu.read8(cpu, (cpu.H << 8) | cpu.L) & 0x04); cpu.M = 3; cpu.T = 12; },
  [CBOPCODES.BIT2A]: (cpu) => { testBit(cpu, cpu.A & 0x04); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT3B]: (cpu) => { testBit(cpu, cpu.B & 0x08); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT3C]: (cpu) => { testBit(cpu, cpu.C & 0x08); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT3D]: (cpu) => { testBit(cpu, cpu.D & 0x08); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT3E]: (cpu) => { testBit(cpu, cpu.E & 0x08); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT3H]: (cpu) => { testBit(cpu, cpu.H & 0x08); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT3L]: (cpu) => { testBit(cpu, cpu.L & 0x08); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT3HLm]: (cpu) => { testBit(cpu, cpu.read8(cpu, (cpu.H << 8) | cpu.L) & 0x08); cpu.M = 3; cpu.T = 12; },
  [CBOPCODES.BIT3A]: (cpu) => { testBit(cpu, cpu.A & 0x08); cpu.M = 2; cpu.T = 8; },

  /* ------------------------ 0x6------------------------ */
  [CBOPCODES.BIT4B]: (cpu) => { testBit(cpu, cpu.B & 0x10); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT4C]: (cpu) => { testBit(cpu, cpu.C & 0x10); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT4D]: (cpu) => { testBit(cpu, cpu.D & 0x10); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT4E]: (cpu) => { testBit(cpu, cpu.E & 0x10); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT4H]: (cpu) => { testBit(cpu, cpu.H & 0x10); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT4L]: (cpu) => { testBit(cpu, cpu.L & 0x10); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT4HLm]: (cpu) => { testBit(cpu, cpu.read8(cpu, (cpu.H << 8) | cpu.L) & 0x10); cpu.M = 3; cpu.T = 12; },
  [CBOPCODES.BIT4A]: (cpu) => { testBit(cpu, cpu.A & 0x10); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT5B]: (cpu) => { testBit(cpu, cpu.B & 0x20); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT5C]: (cpu) => { testBit(cpu, cpu.C & 0x20); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT5D]: (cpu) => { testBit(cpu, cpu.D & 0x20); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT5E]: (cpu) => { testBit(cpu, cpu.E & 0x20); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT5H]: (cpu) => { testBit(cpu, cpu.H & 0x20); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT5L]: (cpu) => { testBit(cpu, cpu.L & 0x20); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT5HLm]: (cpu) => { testBit(cpu, cpu.read8(cpu, (cpu.H << 8) | cpu.L) & 0x20); cpu.M = 3; cpu.T = 12; },
  [CBOPCODES.BIT5A]: (cpu) => { testBit(cpu, cpu.A & 0x20); cpu.M = 2; cpu.T = 8; },

  /* ------------------------ 0x7------------------------ */
  [CBOPCODES.BIT6B]: (cpu) => { testBit(cpu, cpu.B & 0x40); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT6C]: (cpu) => { testBit(cpu, cpu.C & 0x40); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT6D]: (cpu) => { testBit(cpu, cpu.D & 0x40); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT6E]: (cpu) => { testBit(cpu, cpu.E & 0x40); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT6H]: (cpu) => { testBit(cpu, cpu.H & 0x40); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT6L]: (cpu) => { testBit(cpu, cpu.L & 0x40); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT6HLm]: (cpu) => { testBit(cpu, cpu.read8(cpu, (cpu.H << 8) | cpu.L) & 0x40); cpu.M = 3; cpu.T = 12; },
  [CBOPCODES.BIT6A]: (cpu) => { testBit(cpu, cpu.A & 0x40); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT7B]: (cpu) => { testBit(cpu, cpu.B & 0x80); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT7C]: (cpu) => { testBit(cpu, cpu.C & 0x80); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT7D]: (cpu) => { testBit(cpu, cpu.D & 0x80); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT7E]: (cpu) => { testBit(cpu, cpu.E & 0x80); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT7H]: (cpu) => { testBit(cpu, cpu.H & 0x80); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT7L]: (cpu) => { testBit(cpu, cpu.L & 0x80); cpu.M = 2; cpu.T = 8; },
  [CBOPCODES.BIT7HLm]: (cpu) => { testBit(cpu, cpu.read8(cpu, (cpu.H << 8) | cpu.L) & 0x80); cpu.M = 3; cpu.T = 12; },
  [CBOPCODES.BIT7A]: (cpu) => { testBit(cpu, cpu.A & 0x80); cpu.M = 2; cpu.T = 8; },


};

module.exports = {
  CBOPCODES,
  cbopcodes,
};
