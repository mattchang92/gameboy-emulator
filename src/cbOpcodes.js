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
};


const setFlags = (cpu, val, isSub) => {
  cpu.F = 0;
  if (!(val & 0xff)) cpu.F |= 0x80;
  if (val > 0xff || val < 0) cpu.F |= 0x10;
  if (isSub) cpu.F |= 0x40;
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
};

module.exports = {
  CBOPCODES,
  cbopcodes,
};
