const OPCODES = {
  NOP: 0x00,
  LDBCnn: 0x01,
  LDBCmA: 0x02,
  INCBC: 0x03,
  INCB: 0x04,
  DECB: 0x05,
  LDBn: 0x06,
  RLCA: 0x07,
  LDnnSP: 0x08,
  ADDHLBC: 0x09,
  LDABCm: 0x0a,
  DECBC: 0x0b,
  INCC: 0x0c,
  DECC: 0x0d,
  LDCn: 0x0e,
  RRCA: 0x0f,

  STOP: 0x10,
  LDDEnn: 0x11,
  LDDEmA: 0x12,
  INCDE: 0x13,
  INCD: 0x14,
  DECD: 0x15,
  LDDn: 0x16,
  RLA: 0x17,
  JRn: 0x18,
  ADDHLDE: 0x19,
  LDADEm: 0x1a,
  DECDE: 0x1b,
  INCE: 0x1c,
  DECE: 0x1d,
  LDEn: 0x1e,
  RRA: 0x1f,

  JRNZn: 0x20,
  LDHLnn: 0x21,
  LDIHLmA: 0x22,
  INCHL: 0x23,
  INCH: 0x24,
  DECH: 0x25,
  LDHn: 0x26,
  DAA: 0x27, // ??????
  JRZn: 0x28,
  ADDHLHL: 0x29,
  LDIAHLm: 0x2a,
  DECHL: 0x2b,
  INCL: 0x2c,
  DECL: 0x2d,
  LDLn: 0x2e,
  CMPL: 0x2f,

  JRNCn: 0x30,
  LDSPnn: 0x31,
  LDDHLmA: 0x32,
  INCSP: 0x33,
  INCHLm: 0x34,
  DECHLm: 0x35,
  LDHLmn: 0x36,
  SCF: 0x37,
  JRCn: 0x38,
  ADDHLSP: 0x39,
  LDDAHLm: 0x3a,
  DECSP: 0x3b,
  INCA: 0x3c,
  DECA: 0x3d,
  LDAn: 0x3e,
  CFF: 0x3f,

  LDBB: 0x40,
  LDBC: 0x41,
  LDBD: 0x42,
  LDBE: 0x43,
  LDBH: 0x44,
  LDBL: 0x45,
  LDBHLm: 0x46,
  LDBA: 0x47,
  LDCB: 0x48,
  LDCC: 0x49,
  LDCD: 0x4a,
  LDCE: 0x4b,
  LDCH: 0x4c,
  LDCL: 0x4d,
  LDCHLm: 0x4e,
  LDCA: 0x4f,

  LDDB: 0x50,
  LDDC: 0x51,
  LDDD: 0x52,
  LDDE: 0x53,
  LDDH: 0x54,
  LDDL: 0x55,
  LDDHLm: 0x56,
  LDDA: 0x57,
  LDEB: 0x58,
  LDEC: 0x59,
  LDED: 0x5a,
  LDEE: 0x5b,
  LDEH: 0x5c,
  LDEL: 0x5d,
  LDEHLm: 0x5e,
  LDEA: 0x5f,

  LDHB: 0x60,
  LDHC: 0x61,
  LDHD: 0x62,
  LDHE: 0x63,
  LDHH: 0x64,
  LDHL: 0x65,
  LDHHLm: 0x66,
  LDHA: 0x67,
  LDLB: 0x68,
  LDLC: 0x69,
  LDLD: 0x6a,
  LDLE: 0x6b,
  LDLH: 0x6c,
  LDLL: 0x6d,
  LDLHLm: 0x6e,
  LDLA: 0x6f,

  LDHLmB: 0x70,
  LDHLmC: 0x71,
  LDHLmD: 0x72,
  LDHLmE: 0x73,
  LDHLmH: 0x74,
  LDHLmL: 0x75,
  HALT: 0x76,
  LDHLmA: 0x77,
  LDAB: 0x78,
  LDAC: 0x79,
  LDAD: 0x7a,
  LDAE: 0x7b,
  LDAH: 0x7c,
  LDAL: 0x7d,
  LDAHLm: 0x7e,
  LDAA: 0x7f,

  ADDAB: 0x80,
  ADDAC: 0x81,
  ADDAD: 0x82,
  ADDAE: 0x83,
  ADDAH: 0x84,
  ADDAL: 0x85,
  ADDAHLm: 0x86,
  ADDAA: 0x87,
  ADCAB: 0x88,
  ADCAC: 0x89,
  ADCAD: 0x8a,
  ADCAE: 0x8b,
  ADCAH: 0x8c,
  ADCAL: 0x8d,
  ADCAHLm: 0x8e,
  ADCAA: 0x8f,

  SUBAB: 0x90,
  SUBAC: 0x91,
  SUBAD: 0x92,
  SUBAE: 0x93,
  SUBAH: 0x94,
  SUBAL: 0x95,
  SUBAHLm: 0x96,
  SUBAA: 0x97,
  SUBCAB: 0x98,
  SUBCAC: 0x99,
  SUBCAD: 0x9a,
  SUBCAE: 0x9b,
  SUBCAH: 0x9c,
  SUBCAL: 0x9d,
  SUBCAHLm: 0x9e,
  SUBCAA: 0x9f,

  ANDB: 0xa0,
  ANDC: 0xa1,
  ANDD: 0xa2,
  ANDE: 0xa3,
  ANDH: 0xa4,
  ANDL: 0xa5,
  ANDHLm: 0xa6,
  ANDA: 0xa7,
  XORB: 0xa8,
  XORC: 0xa9,
  XORD: 0xaa,
  XORE: 0xab,
  XORH: 0xac,
  XORL: 0xad,
  XORHLm: 0xae,
  XORA: 0xaf,

  ORB: 0xb0,
  ORC: 0xb1,
  ORD: 0xb2,
  ORE: 0xb3,
  ORH: 0xb4,
  ORL: 0xb5,
  ORHLm: 0xb6,
  ORA: 0xb7,
  CPB: 0xb8,
  CPC: 0xb9,
  CPD: 0xba,
  CPE: 0xbb,
  CPH: 0xbc,
  CPL: 0xbd,
  CPHLm: 0xbe,
  CPA: 0xbf,

  RETNZ: 0xc0,
  POPBC: 0xc1,
  JPNZnn: 0xc2,
  JPnn: 0xc3,
  CALLNZnn: 0xc4,
  PUSHBC: 0xc5,
  ADDAn: 0xc6,
  RST00: 0xc7,
  RETZ: 0xc8,
  RET: 0xc9,
  JPZnn: 0xca,
  EXTops: 0xcb, // ???? secondary opcode table?
  CALLZnn: 0xcc,
  CALLnn: 0xcd,
  ADCAn: 0xce,
  RST08: 0xcf,

  RETNC: 0xd0,
  POPDE: 0xd1,
  JPNCnn: 0xd2,
  CALLNCnn: 0xd4,
  PUSHDE: 0xd5,
  SUBAn: 0xd6,
  RST10: 0xd7,
  RETC: 0xd8,
  RETI: 0xd9, // set interupts?
  JPCnn: 0xda,
  CALLCnn: 0xdc,
  SBCAn: 0xde,
  RST18: 0xdf,

  LDHnmA: 0xe0,
  POPHL: 0xe1,
  LDHCmA: 0xe2,
  PUSHHL: 0xe5,
  ANDn: 0xe6,
  RST20: 0xe7,
  ADDSPd: 0xe8,
  JPHLm: 0xe9,
  LDnnmA: 0xea,
  XORn: 0xee,
  RST28: 0xef,

  LDHAnm: 0xf0,
  POPAF: 0xf1,
  DI: 0xf3, // disable interupts. no interupts yet
  PUSHAF: 0xf5,
  ORn: 0xf6,
  RST30: 0xf7,
  LDHLSPd: 0xf8,
  LDSPHL: 0xf9,
  LDAnnm: 0xfa,
  EI: 0xfb, // enable interupts. no interupts yet
  CPn: 0xfe,
  RST38: 0xff,
};

// Zero (0x80): Set if the last operation produced a result of 0;
// Operation (0x40): Set if the last operation was a subtraction;
// Half-carry (0x20): Set if, in the result of the last operation, the lower half of the byte overflowed past 15;
// Carry (0x10): Set if the last operation produced a result over 255 (for additions) or under 0 (for subtractions).
// fz: function(i,as) { Z80._r.f=0; if(!(i&255)) Z80._r.f|=128; Z80._r.f|=as?0x40:0; },

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

const opcodes = {
  /* ------------------------ 0x0 ------------------------ */
  [OPCODES.NOP]: (cpu) => { cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDBCnn]: (cpu) => {
    cpu.C = cpu.mmu.read8(cpu, cpu.PC++);
    cpu.B = cpu.mmu.read8(cpu, cpu.PC++);
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.LDBCmA]: (cpu) => {
    cpu.mmu.write8(cpu.gpu, cpu.B << 8 | cpu.C, cpu.A);
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.INCBC]: (cpu) => {
    cpu.C = (cpu.C + 1) & 0xff;
    if (!cpu.C) cpu.B = (cpu.B + 1) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.INCB]: (cpu) => {
    setFlags(cpu, cpu.B + 1);
    setHalfCarry(cpu, cpu.B, 1);
    cpu.B = ++cpu.B & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.DECB]: (cpu) => {
    cpu.B--;
    setFlags(cpu, cpu.B, 1);
    cpu.B &= 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.LDBn]: (cpu) => {
    cpu.B = cpu.mmu.read8(cpu, cpu.PC++);
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.RLCA]: (cpu) => {
    const bit = cpu.A >>> 7;
    cpu.A = ((cpu.A << 1) + bit) & 0xff;
    cpu.F = bit ? 0x10 : 0;
  },
  [OPCODES.LDnnSP]: (cpu) => {
    const address = cpu.mmu.read16(cpu.PC);
    cpu.mmu.write16(cpu.gpu, address, cpu.SP);
    cpu.PC += 2;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADDHLBC]: (cpu) => {
    let hl = (cpu.H << 8) + cpu.L;
    hl += (cpu.B << 8) + cpu.C;
    if (hl > 0xffff) {
      cpu.F |= 0x10;
    } else {
      cpu.F &= 0xef;
    }
    cpu.F &= ~0x40;
    cpu.H = (hl >>> 8) & 0xff;
    cpu.L = hl & 0xff;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.LDABCm]: (cpu) => {
    const address = (cpu.B << 8) + cpu.C;
    cpu.A = cpu.mmu.read8(cpu, address);
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.DECBC]: (cpu) => {
    cpu.C = (cpu.C - 1) & 0xff;
    if (cpu.C === 0xff) cpu.B = (cpu.B - 1) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.INCC]: (cpu) => {
    setFlags(cpu, cpu.C + 1);
    setHalfCarry(cpu, cpu.C, 1);
    cpu.C = ++cpu.C & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.DECC]: (cpu) => {
    cpu.C--;
    setFlags(cpu, cpu.C, 1);
    cpu.C &= 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.LDCn]: (cpu) => {
    cpu.C = cpu.mmu.read8(cpu, cpu.PC++);
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.RRCA]: (cpu) => {
    const bit = cpu.A & 1;
    cpu.A = ((cpu.A >>> 1) + (bit * 0x80)) & 0xff;
    cpu.F = bit ? 0x10 : 0;
    cpu.M = 1; cpu.T = 4;
  },

  /* ------------------------ 0x1 ------------------------ */
  [OPCODES.STOP]: (cpu) => {
    cpu.PC++;
  },
  [OPCODES.LDDEnn]: (cpu) => {
    cpu.E = cpu.mmu.read8(cpu, cpu.PC);
    cpu.D = cpu.mmu.read8(cpu, (cpu.PC + 1) & 0xffff);
    cpu.PC += 2;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.LDDEmA]: (cpu) => {
    cpu.mmu.write8(cpu.gpu, cpu.D << 8 | cpu.E, cpu.A);
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.INCDE]: (cpu) => {
    cpu.E = (cpu.E + 1) & 0xff;
    if (!cpu.E) cpu.D = (cpu.D + 1) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.INCD]: (cpu) => {
    setFlags(cpu, cpu.D + 1);
    setHalfCarry(cpu, cpu.D, 1);
    cpu.D = ++cpu.D & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.DECD]: (cpu) => {
    cpu.D--;
    setFlags(cpu, cpu.D, 1);
    cpu.D &= 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.LDDn]: (cpu) => {
    cpu.D = cpu.mmu.read8(cpu, cpu.PC++);
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.RLA]: (cpu) => {
    const bit = cpu.A >>> 7;
    const carry = (cpu.F >>> 4) && 0xff;
    cpu.F = bit ? 0x10 : 0;
    cpu.A = ((cpu.A << 1) + carry) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.JRn]: (cpu) => {
    let val = cpu.mmu.read8(cpu, cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    cpu.PC += val;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.ADDHLDE]: (cpu) => {
    let hl = (cpu.H << 8) + cpu.L;
    hl += (cpu.D << 8) + cpu.E;
    if (hl > 0xffff) {
      cpu.F |= 0x10;
    } else {
      cpu.F &= 0xef;
    }
    cpu.F &= ~0x40;
    cpu.H = (hl >>> 8) & 0xff;
    cpu.L = hl & 0xff;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.LDADEm]: (cpu) => {
    const address = (cpu.D << 8) + cpu.E;
    cpu.A = cpu.mmu.read8(cpu, address);
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.DECDE]: (cpu) => {
    cpu.E = (cpu.E - 1) & 0xff;
    if (cpu.E === 0xff) cpu.C = (cpu.C - 1) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.INCE]: (cpu) => {
    setFlags(cpu, cpu.E + 1);
    setHalfCarry(cpu, cpu.E, 1);
    cpu.E = ++cpu.E & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.DECE]: (cpu) => {
    cpu.E--;
    setFlags(cpu, cpu.E, 1);
    cpu.E &= 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.LDEn]: (cpu) => {
    cpu.E = cpu.mmu.read8(cpu, cpu.PC++);
    cpu.M = 2; cpu.T = 48;
  },
  [OPCODES.RRA]: (cpu) => {
    const bit = cpu.A & 1;
    const carry = (cpu.F >>> 4) && 0xff;
    cpu.F = bit ? 0x10 : 0;
    cpu.A = ((cpu.A >>> 1) + (carry * 0x80)) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.JRNZn]: (cpu) => {
    const zero = (cpu.F >> 7) & 0xff;
    let val = cpu.mmu.read8(cpu, cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    if (!zero) cpu.PC += val;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.LDHLnn]: (cpu) => {
    cpu.L = cpu.mmu.read8(cpu, cpu.PC);
    cpu.H = cpu.mmu.read8(cpu, cpu.PC + 1);
    cpu.PC += 2;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.LDIHLmA]: (cpu) => {
    cpu.mmu.write8(cpu.gpu, cpu.H << 8 | cpu.L, cpu.A);
    cpu.L = (cpu.L + 1) & 0xff;
    if (!cpu.L) cpu.H = (cpu.H + 1) & 0xff;
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.INCHL]: (cpu) => {
    cpu.L = (cpu.L + 1) & 0xff;
    if (!cpu.L) cpu.H = (cpu.H + 1) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.INCH]: (cpu) => {
    setFlags(cpu, cpu.H + 1);
    setHalfCarry(cpu, cpu.H, 1);
    cpu.H = ++cpu.H & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.DECH]: (cpu) => {
    cpu.H--;
    setFlags(cpu, cpu.H, 1);
    cpu.H &= 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.LDHn]: (cpu) => {
    cpu.H = cpu.mmu.read8(cpu, cpu.PC++);
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.DAA]: (cpu) => {
    // Potentially illegal instruction?
    const sub = (cpu.F & 0x40) ? 1 : 0;
    const h = (cpu.F & 0x20) ? 1 : 0;
    let c = (cpu.F & 0x10) ? 1 : 0;
    if (sub) {
      if (h) cpu.A = (cpu.A - 0x6) & 0xFF;
      if (c) cpu.A -= 0x60;
    } else {
      if ((cpu.A & 0xF) > 9 || h) cpu.A += 0x6;
      if (cpu.A > 0x9F || c) cpu.A += 0x60;
    }

    if (cpu.A & 0x100) c = 1;

    cpu.A &= 0xFF;
    cpu.F &= 0x40;

    if (cpu.A === 0) cpu.F |= 0x80;
    if (c) cpu.F |= 0x10;
  },

  /* ------------------------ 0x2------------------------ */
  [OPCODES.JRZn]: (cpu) => {
    const zero = (cpu.F >> 7) & 0xff;
    let val = cpu.mmu.read8(cpu, cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    if (zero) cpu.PC += val;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.ADDHLHL]: (cpu) => {
    let hl = (cpu.H << 8) + cpu.L;
    hl <<= 1;
    if (hl > 0xffff) {
      cpu.F |= 0x10;
    } else {
      cpu.F &= 0xef;
    }
    cpu.F &= ~0x40;
    cpu.H = (hl >>> 8) & 0xff;
    cpu.L = hl & 0xff;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.LDIAHLm]: (cpu) => {
    const address = (cpu.H << 8) + cpu.L;
    cpu.A = cpu.mmu.read8(cpu, address);
    cpu.L = (cpu.L + 1) & 0xff;
    if (!cpu.L) cpu.H = (cpu.H + 1) & 0xff;
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.DECHL]: (cpu) => {
    cpu.L = (cpu.L - 1) & 0xff;
    if (cpu.L === 0xff) cpu.H = (cpu.H - 1) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.INCL]: (cpu) => {
    setFlags(cpu, cpu.L + 1);
    setHalfCarry(cpu, cpu.L, 1);
    cpu.L = ++cpu.L & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.DECL]: (cpu) => {
    cpu.L--;
    setFlags(cpu, cpu.L, 1);
    cpu.L &= 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.LDLn]: (cpu) => {
    cpu.L = cpu.mmu.read8(cpu, cpu.PC++);
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.CMPL]: (cpu) => {
    cpu.A = (~cpu.A) & 0xff;
    setFlags(cpu, cpu.A, 1);
    cpu.M = 1; cpu.T = 4;
  },

  /* ------------------------ 0x3 ------------------------ */
  [OPCODES.JRNCn]: (cpu) => {
    cpu.M = 2; cpu.T = 4;
    const carry = cpu.F & 0x10;
    let val = cpu.mmu.read8(cpu, cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    if (!carry) { cpu.PC += val; cpu.M++; cpu.T += 4; }
  },
  [OPCODES.LDSPnn]: (cpu) => {
    cpu.SP = cpu.mmu.read16(cpu.PC);
    cpu.PC += 2;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.LDDHLmA]: (cpu) => {
    cpu.mmu.write8(cpu.gpu, cpu.H << 8 | cpu.L, cpu.A);
    cpu.L = (cpu.L - 1) & 0xff;
    if (cpu.L === 0xff) cpu.H = (cpu.H - 1) & 0xff;
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.INCSP]: (cpu) => { cpu.SP = (cpu.SP + 1) & 0xffff; cpu.M = 1; cpu.T = 4; },
  [OPCODES.INCHLm]: (cpu) => {
    const val = (cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L) + 1) & 0xff;
    cpu.mmu.write8(cpu.gpu, (cpu.H << 8) | cpu.L);
    setFlags(cpu, val);
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.DECHLm]: (cpu) => {
    const val = (cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L) - 1) & 0xff;
    cpu.mmu.write8(cpu.gpu, (cpu.H << 8) | cpu.L);
    setFlags(cpu, val, 1);
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.LDHLmn]: (cpu) => {
    cpu.mmu.write8(cpu.gpu, (cpu.H << 8) | cpu.L, cpu.mmu.read8(cpu, cpu.PC++));
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.SCF]: (cpu) => { cpu.F |= 0x10; cpu.M = 1; cpu.T = 4; },
  [OPCODES.JRZn]: (cpu) => {
    cpu.M = 2; cpu.T = 8;
    const carry = cpu.F & 0x10;
    let val = cpu.mmu.read8(cpu, cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    if (carry) { cpu.PC += val; cpu.M++; cpu.T += 4; }
  },
  [OPCODES.ADDHLSP]: (cpu) => {
    let hl = (cpu.H << 8) + cpu.L;
    hl += cpu.SP;
    if (hl > 0xffff) {
      cpu.F |= 0x10;
    } else {
      cpu.F &= 0xef;
    }
    cpu.F &= ~0x40;
    cpu.H = (hl >>> 8) & 0xff;
    cpu.L = hl & 0xff;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.LDDAHLm]: (cpu) => {
    const address = (cpu.H << 8) + cpu.L;
    cpu.A = cpu.mmu.read8(cpu, address);
    cpu.L = (cpu.L - 1) & 0xff;
    if (cpu.L === 0xff) cpu.H = (cpu.H - 1) & 0xff;
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.DECSP]: (cpu) => { cpu.SP = (cpu.SP - 1) & 0xffff; cpu.M = 2; cpu.T = 8; },
  [OPCODES.INCA]: (cpu) => {
    setFlags(cpu, cpu.A + 1);
    setHalfCarry(cpu, cpu.A, 1);
    cpu.A = ++cpu.A & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.DECA]: (cpu) => {
    cpu.A--;
    setFlags(cpu, cpu.A, 1);
    cpu.A &= 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.LDAn]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, cpu.PC++); cpu.M = 2; cpu.T = 8; },
  [OPCODES.CFF]: (cpu) => { cpu.F &= ~0x10; cpu.M = 1; cpu.T = 4; },

  /* ------------------------ 0x4 ------------------------ */
  [OPCODES.LDBB]: (cpu) => { cpu.B = cpu.B; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDBC]: (cpu) => { cpu.B = cpu.C; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDBD]: (cpu) => { cpu.B = cpu.D; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDBE]: (cpu) => { cpu.B = cpu.E; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDBH]: (cpu) => { cpu.B = cpu.H; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDBL]: (cpu) => { cpu.B = cpu.L; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDBHLm]: (cpu) => { cpu.B = cpu.mmu.read8(cpu, ((cpu.H << 8) | cpu.L)); cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDBA]: (cpu) => { cpu.B = cpu.A; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDCB]: (cpu) => { cpu.C = cpu.B; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDCC]: (cpu) => { cpu.C = cpu.C; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDCD]: (cpu) => { cpu.C = cpu.D; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDCE]: (cpu) => { cpu.C = cpu.E; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDCH]: (cpu) => { cpu.C = cpu.H; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDCL]: (cpu) => { cpu.C = cpu.L; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDCHLm]: (cpu) => { cpu.C = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDCA]: (cpu) => { cpu.C = cpu.A; cpu.M = 1; cpu.T = 4; },

  /* ------------------------ 0x5 ------------------------ */
  [OPCODES.LDDB]: (cpu) => { cpu.D = cpu.B; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDDC]: (cpu) => { cpu.D = cpu.C; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDDD]: (cpu) => { cpu.D = cpu.D; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDDE]: (cpu) => { cpu.D = cpu.E; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDDH]: (cpu) => { cpu.D = cpu.H; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDDL]: (cpu) => { cpu.D = cpu.L; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDDHLm]: (cpu) => { cpu.D = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDDA]: (cpu) => { cpu.D = cpu.A; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDEB]: (cpu) => { cpu.E = cpu.B; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDEC]: (cpu) => { cpu.E = cpu.C; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDED]: (cpu) => { cpu.E = cpu.D; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDEE]: (cpu) => { cpu.E = cpu.E; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDEH]: (cpu) => { cpu.E = cpu.H; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDEL]: (cpu) => { cpu.E = cpu.L; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDEHLm]: (cpu) => { cpu.E = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDEA]: (cpu) => { cpu.E = cpu.A; cpu.M = 1; cpu.T = 4; },

  /* ------------------------ 0x6 ------------------------ */
  [OPCODES.LDHB]: (cpu) => { cpu.H = cpu.B; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDHC]: (cpu) => { cpu.H = cpu.C; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDHD]: (cpu) => { cpu.H = cpu.D; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDHE]: (cpu) => { cpu.H = cpu.E; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDHH]: (cpu) => { cpu.H = cpu.H; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDHL]: (cpu) => { cpu.H = cpu.L; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDHHLm]: (cpu) => { cpu.H = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDHA]: (cpu) => { cpu.H = cpu.A; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDLB]: (cpu) => { cpu.L = cpu.B; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDLC]: (cpu) => { cpu.L = cpu.C; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDLD]: (cpu) => { cpu.L = cpu.D; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDLE]: (cpu) => { cpu.L = cpu.E; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDLH]: (cpu) => { cpu.L = cpu.H; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDLL]: (cpu) => { cpu.L = cpu.L; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDLHLm]: (cpu) => { cpu.L = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDLA]: (cpu) => { cpu.L = cpu.A; cpu.M = 1; cpu.T = 4; },

  /* ------------------------ 0x7 ------------------------ */
  [OPCODES.LDHLmB]: (cpu) => { cpu.mmu.write8(cpu.gpu, (cpu.H << 8) | cpu.L, cpu.B); cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDHLmC]: (cpu) => { cpu.mmu.write8(cpu.gpu, (cpu.H << 8) | cpu.L, cpu.C); cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDHLmD]: (cpu) => { cpu.mmu.write8(cpu.gpu, (cpu.H << 8) | cpu.L, cpu.D); cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDHLmE]: (cpu) => { cpu.mmu.write8(cpu.gpu, (cpu.H << 8) | cpu.L, cpu.E); cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDHLmH]: (cpu) => { cpu.mmu.write8(cpu.gpu, (cpu.H << 8) | cpu.L, cpu.H); cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDHLmL]: (cpu) => { cpu.mmu.write8(cpu.gpu, (cpu.H << 8) | cpu.L, cpu.L); cpu.M = 2; cpu.T = 8; },
  [OPCODES.HALT]: (cpu) => { cpu.HALT = 1; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDHLmA]: (cpu) => { cpu.mmu.write8(cpu.gpu, (cpu.H << 8) | cpu.L, cpu.A); cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDAB]: (cpu) => { cpu.A = cpu.B; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDAC]: (cpu) => { cpu.A = cpu.C; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDAD]: (cpu) => { cpu.A = cpu.D; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDAE]: (cpu) => { cpu.A = cpu.E; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDAH]: (cpu) => { cpu.A = cpu.H; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDAL]: (cpu) => { cpu.A = cpu.L; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDAHLm]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, (cpu)); cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDAA]: (cpu) => { cpu.A = cpu.A; cpu.M = 1; cpu.T = 4; },

  /* ------------------------ 0x8 ------------------------ */
  [OPCODES.ADDAB]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.B);
    setHalfCarry(cpu, cpu.A, cpu.B);
    cpu.A = (cpu.A + cpu.B) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADDAC]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.C);
    setHalfCarry(cpu, cpu.A, cpu.C);
    cpu.A = (cpu.A + cpu.C) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADDAD]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.D);
    setHalfCarry(cpu, cpu.A, cpu.D);
    cpu.A = (cpu.A + cpu.D) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADDAE]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.E);
    setHalfCarry(cpu, cpu.A, cpu.E);
    cpu.A = (cpu.A + cpu.E) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADDAH]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.H);
    setHalfCarry(cpu, cpu.A, cpu.H);
    cpu.A = (cpu.A + cpu.H) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADDAL]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.L);
    setHalfCarry(cpu, cpu.A, cpu.L);
    cpu.A = (cpu.A + cpu.L) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADDAHLm]: (cpu) => {
    const val = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L);
    setFlags(cpu, cpu.A + val);
    setHalfCarry(cpu, cpu.A, val);
    cpu.A = (cpu.A + val) & 0xff;
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.ADDAA]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.A);
    setHalfCarry(cpu, cpu.A, cpu.A);
    cpu.A = (cpu.A + cpu.A) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADCAB]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.L);
    setHalfCarry(cpu, cpu.A, cpu.L);
    cpu.A = (cpu.A + cpu.L) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADCAC]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + cpu.C + carry);
    setHalfCarry(cpu, cpu.A, cpu.C + carry);
    cpu.A = (cpu.A + cpu.C) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADCAD]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + cpu.D + carry);
    setHalfCarry(cpu, cpu.A, cpu.D + carry);
    cpu.A = (cpu.A + cpu.D) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADCAE]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + cpu.E + carry);
    setHalfCarry(cpu, cpu.A, cpu.E + carry);
    cpu.A = (cpu.A + cpu.E) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADCAH]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + cpu.H + carry);
    setHalfCarry(cpu, cpu.A, cpu.H + carry);
    cpu.A = (cpu.A + cpu.H) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADCAL]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + cpu.L + carry);
    setHalfCarry(cpu, cpu.A, cpu.L + carry);
    cpu.A = (cpu.A + cpu.L) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.ADCAHLm]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    const val = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L);
    setFlags(cpu, cpu.A + val + carry);
    setHalfCarry(cpu, cpu.A, val + carry);
    cpu.A = (cpu.A + val) & 0xff;
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.ADCAA]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + cpu.A + carry);
    setHalfCarry(cpu, cpu.A, cpu.A + carry);
    cpu.A = (cpu.A + cpu.A) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },

  /* ------------------------ 0x9 ------------------------ */
  [OPCODES.SUBAB]: (cpu) => {
    setFlags(cpu, cpu.A - cpu.B, 1);
    setHalfCarry(cpu, cpu.A, cpu.B, 1);
    cpu.A = (cpu.A - cpu.B) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.SUBAC]: (cpu) => {
    setFlags(cpu, cpu.A - cpu.C, 1);
    setHalfCarry(cpu, cpu.A, cpu.C, 1);
    cpu.A = (cpu.A - cpu.C) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.SUBAD]: (cpu) => {
    setFlags(cpu, cpu.A - cpu.D, 1);
    setHalfCarry(cpu, cpu.A, cpu.D, 1);
    cpu.A = (cpu.A - cpu.D) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.SUBAE]: (cpu) => {
    setFlags(cpu, cpu.A - cpu.E, 1);
    setHalfCarry(cpu, cpu.A, cpu.E, 1);
    cpu.A = (cpu.A - cpu.E) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.SUBAH]: (cpu) => {
    setFlags(cpu, cpu.A - cpu.H, 1);
    setHalfCarry(cpu, cpu.A, cpu.H, 1);
    cpu.A = (cpu.A - cpu.H) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.SUBAL]: (cpu) => {
    setFlags(cpu, cpu.A - cpu.L, 1);
    setHalfCarry(cpu, cpu.A, cpu.L, 1);
    cpu.A = (cpu.A - cpu.L) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.SUBAHLm]: (cpu) => {
    const val = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L);
    setFlags(cpu, cpu.A - val, 1);
    setHalfCarry(cpu, cpu.A, val, 1);
    cpu.A = (cpu.A - val) & 0xff;
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.SUBAA]: (cpu) => {
    cpu.A = 0;
    cpu.F = 0xc0;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.SUBCAB]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.B - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.B + carry, 1);
    cpu.A = (cpu.A - cpu.B - carry) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.SUBCAC]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.C - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.C + carry, 1);
    cpu.A = (cpu.A - cpu.C - carry) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.SUBCAD]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.D - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.D + carry, 1);
    cpu.A = (cpu.A - cpu.D - carry) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.SUBCAE]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.E - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.E + carry, 1);
    cpu.A = (cpu.A - cpu.E - carry) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.SUBCAH]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.H - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.H + carry, 1);
    cpu.A = (cpu.A - cpu.H - carry) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.SUBCAL]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.L - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.L + carry, 1);
    cpu.A = (cpu.A - cpu.L - carry) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  [OPCODES.SUBCAHLm]: (cpu) => {
    const val = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L);
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - val - carry, 1);
    setHalfCarry(cpu, cpu.A, val + carry, 1);
    cpu.A = (cpu.A - val - carry) & 0xff;
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.SUBCAA]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.B - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.B + carry, 1);
    cpu.A = (cpu.A - cpu.B - carry) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },

  /* ------------------------ 0xa ------------------------ */
  [OPCODES.ANDB]: (cpu) => { cpu.A &= cpu.B; cpu.F = !cpu.A ? 0xa0 : 0x20; cpu.M = 1; cpu.T = 4; },
  [OPCODES.ANDC]: (cpu) => { cpu.A &= cpu.C; cpu.F = !cpu.A ? 0xa0 : 0x20; cpu.M = 1; cpu.T = 4; },
  [OPCODES.ANDD]: (cpu) => { cpu.A &= cpu.D; cpu.F = !cpu.A ? 0xa0 : 0x20; cpu.M = 1; cpu.T = 4; },
  [OPCODES.ANDE]: (cpu) => { cpu.A &= cpu.E; cpu.F = !cpu.A ? 0xa0 : 0x20; cpu.M = 1; cpu.T = 4; },
  [OPCODES.ANDH]: (cpu) => { cpu.A &= cpu.H; cpu.F = !cpu.A ? 0xa0 : 0x20; cpu.M = 1; cpu.T = 4; },
  [OPCODES.ANDL]: (cpu) => { cpu.A &= cpu.L; cpu.F = !cpu.A ? 0xa0 : 0x20; cpu.M = 1; cpu.T = 4; },
  [OPCODES.ANDHLm]: (cpu) => { cpu.A &= cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); cpu.F = !cpu.A ? 0xa0 : 0x20; cpu.M = 2; cpu.T = 8; },
  [OPCODES.ANDA]: (cpu) => { cpu.F = !cpu.A ? 0xa0 : 0x20; cpu.M = 1; cpu.T = 4; },
  [OPCODES.XORB]: (cpu) => { cpu.A ^= cpu.B; cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.XORC]: (cpu) => { cpu.A ^= cpu.C; cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.XORD]: (cpu) => { cpu.A ^= cpu.D; cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.XORE]: (cpu) => { cpu.A ^= cpu.E; cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.XORH]: (cpu) => { cpu.A ^= cpu.H; cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.XORL]: (cpu) => { cpu.A ^= cpu.L; cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.XORHLm]: (cpu) => { cpu.A ^= cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 2; cpu.T = 8; },
  [OPCODES.XORA]: (cpu) => { cpu.A = 0; cpu.F = 0x80; cpu.M = 1; cpu.T = 4; },

  /* ------------------------ 0xb ------------------------ */
  [OPCODES.ORB]: (cpu) => { cpu.A |= cpu.B; cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.ORC]: (cpu) => { cpu.A |= cpu.C; cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.ORD]: (cpu) => { cpu.A |= cpu.D; cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.ORE]: (cpu) => { cpu.A |= cpu.E; cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.ORH]: (cpu) => { cpu.A |= cpu.H; cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.ORL]: (cpu) => { cpu.A |= cpu.L; cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.ORHLm]: (cpu) => { cpu.A |= cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 2; cpu.T = 8; },
  [OPCODES.ORA]: (cpu) => { cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPB]: (cpu) => { setFlags(cpu, cpu.A - cpu.B, 1); setHalfCarry(cpu, cpu.A, cpu.B, 1); cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPC]: (cpu) => { setFlags(cpu, cpu.A - cpu.C, 1); setHalfCarry(cpu, cpu.A, cpu.C, 1); cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPD]: (cpu) => { setFlags(cpu, cpu.A - cpu.D, 1); setHalfCarry(cpu, cpu.A, cpu.D, 1); cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPE]: (cpu) => { setFlags(cpu, cpu.A - cpu.E, 1); setHalfCarry(cpu, cpu.A, cpu.E, 1); cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPH]: (cpu) => { setFlags(cpu, cpu.A - cpu.L, 1); setHalfCarry(cpu, cpu.A, cpu.H, 1); cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPL]: (cpu) => { setFlags(cpu, cpu.A - cpu.B, 1); setHalfCarry(cpu, cpu.A, cpu.L, 1); cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPHLm]: (cpu) => { const val = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); setFlags(cpu, cpu.A - val, 1); setHalfCarry(cpu, cpu.A, val, 1); cpu.M = 2; cpu.T = 8; },
  [OPCODES.CPA]: (cpu) => { cpu.F = 0xc0; cpu.M = 1; cpu.T = 4; },

  /* ------------------------ 0xc ------------------------ */
  [OPCODES.RETNZ]: (cpu) => {
    cpu.M = 1; cpu.T = 4;
    if (!(cpu.F & 0x80)) {
      cpu.PC = cpu.mmu.read16(cpu.SP);
      cpu.SP += 2;
      cpu.M += 2; cpu.T += 8;
    }
  },
  [OPCODES.POPBC]: (cpu) => {
    cpu.C = cpu.mmu.read8(cpu, cpu.SP++);
    cpu.B = cpu.mmu.read8(cpu, cpu.SP++);
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.JPNZnn]: (cpu) => { cpu.M = 3; cpu.T = 12; if (!(cpu.F & 0x80)) { cpu.PC = cpu.mmu.read16(cpu.PC); cpu.M++; cpu.T += 4; } else { cpu.PC += 2; } },
  [OPCODES.JPnn]: (cpu) => { cpu.PC = cpu.mmu.read16(cpu.PC); cpu.M = 3; cpu.T = 12; },
  [OPCODES.CALLNZnn]: (cpu) => {
    cpu.M = 3; cpu.T = 12;
    if (!(cpu.F & 0x80)) {
      cpu.SP -= 2;
      cpu.mmu.write16(cpu.gpu, cpu.SP, cpu.PC + 2);
      cpu.PC = cpu.mmu.read16(cpu.PC);
      cpu.M += 2; cpu.T += 8;
    } else {
      cpu.PC += 2;
    }
  },
  [OPCODES.PUSHBC]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.gpu, cpu.SP, (cpu.B << 8) | cpu.C);
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.ADDAn]: (cpu) => {
    const val = cpu.mmu.read8(cpu, cpu.PC++);
    setFlags(cpu, cpu.A + val);
    setHalfCarry(cpu, cpu.A, val);
    cpu.A = (cpu.A + val) & 0xff;
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.RST00]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.gpu, cpu.SP, cpu.PC);
    cpu.PC = 0x00;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.RETZ]: (cpu) => {
    cpu.M = 1; cpu.T = 4;
    if (cpu.F & 0x80) {
      cpu.PC = cpu.mmu.read16(cpu.SP);
      cpu.SP += 2;
      cpu.M += 2; cpu.T += 8;
    }
  },
  [OPCODES.RET]: (cpu) => {
    cpu.PC = cpu.mmu.read16(cpu.SP);
    cpu.SP += 2;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.JPZnn]: (cpu) => { cpu.M = 3; cpu.T = 12; if (cpu.F & 0x80) { cpu.PC = cpu.mmu.read16(cpu.PC); cpu.M++; cpu.T += 4; } else { cpu.PC += 2; } },
  [OPCODES.EXTops]: (cpu) => { cpu; },
  [OPCODES.CALLZnn]: (cpu) => {
    cpu.M = 3; cpu.T = 12;
    if (cpu.F & 0x80) {
      cpu.SP -= 2;
      cpu.mmu.write16(cpu.gpu, cpu.SP, cpu.PC + 2);
      cpu.PC = cpu.mmu.read16(cpu.PC);
      cpu.M += 2; cpu.T += 8;
    } else {
      cpu.PC += 2;
    }
  },
  [OPCODES.CALLnn]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.gpu, cpu.SP, cpu.PC + 2);
    cpu.PC = cpu.mmu.read16(cpu.PC);
    cpu.M = 5; cpu.T = 20;
  },
  [OPCODES.ADCAn]: (cpu) => {
    const val = cpu.mmu.read8(cpu, cpu.PC++);
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + val + carry);
    setHalfCarry(cpu, cpu.A, val + carry);
    cpu.A = (cpu.A + val + carry) & 0xff;
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.RST08]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.gpu, cpu.SP, cpu.PC);
    cpu.PC = 0x08;
    cpu.M = 3; cpu.T = 12;
  },

  /* ------------------------ 0xd ------------------------ */
  [OPCODES.RETNC]: (cpu) => {
    cpu.M = 1; cpu.T = 4;
    if (!(cpu.F & 0x10)) {
      cpu.PC = cpu.mmu.read16(cpu.SP);
      cpu.SP += 2;
      cpu.M += 2; cpu.T += 8;
    }
  },
  [OPCODES.POPDE]: (cpu) => {
    cpu.E = cpu.mmu.read8(cpu, cpu.SP++);
    cpu.D = cpu.mmu.read8(cpu, cpu.SP++);
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.JPNCnn]: (cpu) => { cpu.M = 3; cpu.T = 12; if (!(cpu.F & 0x10)) { cpu.PC = cpu.mmu.read16(cpu.PC); cpu.M++; cpu.T += 4; } else { cpu.PC += 2; } },
  [OPCODES.CALLNCnn]: (cpu) => {
    cpu.M = 3; cpu.T = 12;
    if (!(cpu.F & 0x81)) {
      cpu.SP -= 2;
      cpu.mmu.write16(cpu.gpu, cpu.SP, cpu.PC + 2);
      cpu.PC = cpu.mmu.read16(cpu.PC);
      cpu.M += 2; cpu.T += 8;
    } else {
      cpu.PC += 2;
    }
  },
  [OPCODES.PUSHDE]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.gpu, cpu.SP, (cpu.D << 8) | cpu.E);
    cpu.M = 3; cpu.T = 21;
  },
  [OPCODES.SUBAn]: (cpu) => {
    const val = cpu.mmu.read8(cpu, cpu.PC++);
    setFlags(cpu, cpu.A - val, 1);
    setHalfCarry(cpu, cpu.A, val, 1);
    cpu.A = (cpu.A - val) & 0xff;
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.RST10]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.gpu, cpu.SP, cpu.PC);
    cpu.PC = 0x10;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.RETC]: (cpu) => {
    cpu.M = 1; cpu.T = 4;
    if (cpu.F & 0x10) {
      cpu.PC = cpu.mmu.read16(cpu.SP);
      cpu.SP += 2;
      cpu.M += 2; cpu.T += 8;
    }
  },
  [OPCODES.RETI]: (cpu) => {
    cpu.PC = cpu.mmu.read16(cpu.SP);
    cpu.SP += 2;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.JPCnn]: (cpu) => { cpu.M = 3; cpu.T = 12; if (cpu.F & 0x10) { cpu.PC = cpu.mmu.read16(cpu.PC); cpu.M++; cpu.T += 4; } else { cpu.PC += 2; } },
  [OPCODES.CALLCnn]: (cpu) => {
    cpu.M = 3; cpu.T = 12;
    if (cpu.F & 0x10) {
      cpu.SP -= 2;
      cpu.mmu.write16(cpu.gpu, cpu.SP, cpu.PC + 2);
      cpu.PC = cpu.mmu.read16(cpu.PC);
      cpu.M += 2; cpu.T += 8;
    } else {
      cpu.PC += 2;
    }
  },
  [OPCODES.SBCAn]: (cpu) => {
    const val = cpu.mmu.read8(cpu, cpu.PC++);
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - val - carry, 1);
    setHalfCarry(cpu, cpu.A, val + carry, 1);
    cpu.A = (cpu.A - val - carry) & 0xff;
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.RST18]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.gpu, cpu.SP, cpu.PC);
    cpu.PC = 0x18;
    cpu.M = 3; cpu.T = 12;
  },

  /* ------------------------ 0xe ------------------------ */
  [OPCODES.LDHnmA]: (cpu) => { cpu.mmu.write8(cpu.gpu, 0xff00 | cpu.mmu.read8(cpu, cpu.PC++), cpu.A); cpu.M = 3; cpu.T = 12; },
  [OPCODES.POPHL]: (cpu) => { cpu.L = cpu.mmu.read8(cpu, cpu.SP++); cpu.H = cpu.mmu.read8(cpu, cpu.SP++); cpu.M = 3; cpu.T = 12; },
  [OPCODES.LDHCmA]: (cpu) => { cpu.mmu.write8(cpu.gpu, 0xff00 | cpu.C, cpu.A); cpu.M = 2; cpu.T = 8; },
  [OPCODES.PUSHHL]: (cpu) => { cpu.SP -= 2; cpu.mmu.write16(cpu.gpu, cpu.SP, (cpu.H << 8) | cpu.L); cpu.M = 3; cpu.T = 12; },
  [OPCODES.ANDn]: (cpu) => { cpu.A &= cpu.mmu.read8(cpu, cpu.PC++); cpu.F = !cpu.A ? 0xa0 : 0x20; cpu.M = 2; cpu.T = 8; },
  [OPCODES.RST20]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.gpu, cpu.SP, cpu.PC);
    cpu.PC = 0x20;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.ADDSPd]: (cpu) => {
    let i = cpu.mmu.read8(cpu, cpu.PC++);
    if (i > 127) i = -((~i + 1) & 0xff);
    cpu.SP += i;
    cpu.F &= 0x30; // TODO set carry/half carry
    cpu.M = 4; cpu.T = 16;
  },
  [OPCODES.JPHLm]: (cpu) => { cpu.PC = (cpu.H << 8) | cpu.L; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDnnmA]: (cpu) => { cpu.mmu.write8(cpu.gpu, cpu.mmu.read16(cpu.PC), cpu.A); cpu.PC += 2; cpu.M = 4; cpu.T = 16; },
  [OPCODES.XORn]: (cpu) => { cpu.A ^= cpu.mmu.read8(cpu, cpu.PC++); cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 2; cpu.T = 8; },
  [OPCODES.RST28]: (cpu) => { cpu.SP -= 2; cpu.mmu.write16(cpu.gpu, cpu.SP, cpu.PC); cpu.PC = 0x28; cpu.M = 3; cpu.T = 12; },

  /* ------------------------ 0xf ------------------------ */
  [OPCODES.LDHAnm]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, 0xff00 | cpu.mmu.read8(cpu, cpu.PC++)); cpu.M = 3; cpu.T = 12; },
  [OPCODES.POPAF]: (cpu) => { cpu.F = cpu.mmu.read8(cpu, cpu.SP++) & 0xf0; cpu.A = cpu.mmu.read8(cpu, cpu.SP++); cpu.M = 3; cpu.T = 12; },
  [OPCODES.DI]: (cpu) => { cpu; cpu.M = 1; cpu.T = 4; },
  [OPCODES.PUSHAF]: (cpu) => { cpu.SP -= 2; cpu.mmu.write16(cpu.gpu, cpu.SP, (cpu.A << 8) | cpu.F); cpu.M = 3; cpu.T = 12; },
  [OPCODES.ORn]: (cpu) => { cpu.A |= cpu.mmu.read8(cpu, cpu.PC++); cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 2; cpu.T = 8; },
  [OPCODES.RST30]: (cpu) => { cpu.SP -= 2; cpu.mmu.write16(cpu.gpu, cpu.SP, cpu.PC); cpu.PC = 0x30; cpu.M = 3; cpu.T = 12; },
  [OPCODES.LDHLSPd]: (cpu) => {
    let i = cpu.mmu.read8(cpu, cpu.PC++);
    if (i > 127) i = -((~i + 1) & 0xff);
    i += cpu.SP; // TODO check arry flags
    cpu.H = (i >> 8) & 0xff;
    cpu.L = i & 0xff;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.LDSPHL]: (cpu) => { cpu.SP = (cpu.H << 8) | cpu.L; },
  [OPCODES.LDAnnm]: (cpu) => { const addr = cpu.mmu.read16(cpu.PC); cpu.A = cpu.mmu.read8(cpu, addr); cpu.PC += 2; cpu.M = 4; cpu.T = 16; },
  [OPCODES.EI]: (cpu) => { cpu; cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPn]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.PC++); setFlags(cpu, cpu.A - val, 1); setHalfCarry(cpu, cpu.A, val, 1); cpu.M = 2; cpu.T = 8; },
  [OPCODES.RST38]: (cpu) => { cpu.SP -= 2; cpu.mmu.write16(cpu.gpu, cpu.SP, cpu.PC); cpu.PC = 0x38; cpu.M = 3; cpu.T = 12; },
};


module.exports = {
  opcodes,
  OPCODES,
};
