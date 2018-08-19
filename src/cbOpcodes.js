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
};


const setFlags = (cpu, val, isSub) => {
  cpu.F = 0;
  if (!(val & 0xff)) cpu.F |= 0x80;
  if (val > 0xff || val < 0) cpu.F |= 0x10;
  if (isSub) cpu.F |= 0x40;
};

const setHalfCarry = (cpu, a, b, isSub) => {
  if (isSub) {
    if ((a & 0xf) < (b & 0xf)) {
      cpu.F |= 0x20;
    } else {
      cpu.F &= ~0x20;
    }
  } else if (((a & 0xf) + (b & 0xf)) & 0x10) {
    cpu.F |= 0x20;
  } else {
    cpu.F &= ~0x20;
  }
};


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
    setFlags(cpu.B);
    cpu.B &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLC]: (cpu) => {
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.C & 0x80 ? 0x10 : 0;
    cpu.C = (cpu.C << 1) | c;
    setFlags(cpu.C);
    cpu.C &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLD]: (cpu) => {
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.D & 0x80 ? 0x10 : 0;
    cpu.D = (cpu.D << 1) | c;
    setFlags(cpu.D);
    cpu.D &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLE]: (cpu) => {
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.E & 0x80 ? 0x10 : 0;
    cpu.E = (cpu.E << 1) | c;
    setFlags(cpu.E);
    cpu.E &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLH]: (cpu) => {
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.H & 0x80 ? 0x10 : 0;
    cpu.H = (cpu.H << 1) | c;
    setFlags(cpu.H);
    cpu.H &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLL]: (cpu) => {
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.L & 0x80 ? 0x10 : 0;
    cpu.L = (cpu.L << 1) | c;
    setFlags(cpu.L);
    cpu.L &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLHLm]: (cpu) => {
    let val = cpu.read8((cpu.H << 8) | cpu.L);
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = val & 0x80 ? 0x10 : 0;
    val = (val << 1) | c;
    setFlags(val);
    cpu.write8(cpu, (cpu.H << 8) | cpu.L, val & 0xff);
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RLA]: (cpu) => {
    const c = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.A & 0x80 ? 0x10 : 0;
    cpu.A = (cpu.A << 1) | c;
    setFlags(cpu.A);
    cpu.A &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRB]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.B & 1 ? 0x10 : 0;
    cpu.B = (cpu.B >> 1) | c;
    setFlags(cpu.B);
    cpu.B &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRC]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.C & 1 ? 0x10 : 0;
    cpu.C = (cpu.C >> 1) | c;
    setFlags(cpu.C);
    cpu.C &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRD]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.D & 1 ? 0x10 : 0;
    cpu.D = (cpu.D >> 1) | c;
    setFlags(cpu.D);
    cpu.D &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRE]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.E & 1 ? 0x10 : 0;
    cpu.E = (cpu.E >> 1) | c;
    setFlags(cpu.E);
    cpu.E &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRH]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.H & 1 ? 0x10 : 0;
    cpu.H = (cpu.H >> 1) | c;
    setFlags(cpu.H);
    cpu.H &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRL]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.L & 1 ? 0x10 : 0;
    cpu.L = (cpu.L >> 1) | c;
    setFlags(cpu.L);
    cpu.L &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRHLm]: (cpu) => {
    let val = cpu.read8((cpu.H << 8) | cpu.L);
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = val & 1 ? 0x10 : 0;
    val = (val >> 1) | c;
    setFlags(val);
    cpu.write8(cpu, (cpu.H << 8) | cpu.L, val & 0xff);
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
  [CBOPCODES.RRA]: (cpu) => {
    const c = cpu.F & 0x10 ? 0x80 : 0;
    const overflow = cpu.A & 1 ? 0x10 : 0;
    cpu.A = (cpu.A >> 1) | c;
    setFlags(cpu.A);
    cpu.A &= 0xff;
    cpu.F = (cpu.F & 0xef) | overflow;
    cpu.M = 2; cpu.T = 8;
  },
};

module.exports = {
  CBOPCODES,
  cbopcodes,
};
