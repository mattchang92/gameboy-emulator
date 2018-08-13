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
  [OPCODES.NOP]: () => {},
  [OPCODES.LDBCnn]: (cpu) => {
    cpu.C = cpu.mmu.read8(cpu.PC++);
    cpu.B = cpu.mmu.read8(cpu.PC++);
  },
  [OPCODES.LDBCmA]: (cpu) => {
    cpu.mmu.write8(cpu.B << 8 | cpu.C, cpu.A);
  },
  [OPCODES.INCBC]: (cpu) => {
    cpu.C = (cpu.C + 1) & 0xff;
    if (!cpu.C) cpu.B = (cpu.B + 1) & 0xff;
  },
  [OPCODES.INCB]: (cpu) => {
    setFlags(cpu, cpu.B + 1);
    setHalfCarry(cpu, cpu.B, 1);
    cpu.B = ++cpu.B & 0xff;
  },
  [OPCODES.DECB]: (cpu) => {
    cpu.B--;
    setFlags(cpu, cpu.B, 1);
    cpu.B &= 0xff;
  },
  [OPCODES.LDBn]: (cpu) => {
    cpu.B = cpu.mmu.read8(cpu.PC++);
  },
  [OPCODES.RLCA]: (cpu) => {
    const bit = cpu.A >>> 7;
    cpu.A = ((cpu.A << 1) + bit) & 0xff;
    cpu.F = bit ? 0x10 : 0;
  },
  [OPCODES.LDnnSP]: (cpu) => {
    const address = cpu.mmu.read16(cpu.PC);
    cpu.mmu.write16(address, cpu.SP);
    cpu.PC += 2;
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
  },
  [OPCODES.LDABCm]: (cpu) => {
    const address = (cpu.B << 8) + cpu.C;
    cpu.A = cpu.mmu.read8(address);
  },
  [OPCODES.DECBC]: (cpu) => {
    cpu.C = (cpu.C - 1) & 0xff;
    if (cpu.C === 0xff) cpu.B = (cpu.B - 1) & 0xff;
  },
  [OPCODES.INCC]: (cpu) => {
    setFlags(cpu, cpu.C + 1);
    setHalfCarry(cpu, cpu.C, 1);
    cpu.C = ++cpu.C & 0xff;
  },
  [OPCODES.DECC]: (cpu) => {
    cpu.C--;
    setFlags(cpu, cpu.C, 1);
    cpu.C &= 0xff;
  },
  [OPCODES.LDCn]: (cpu) => {
    cpu.C = cpu.mmu.read8(cpu.PC++);
  },
  [OPCODES.RRCA]: (cpu) => {
    const bit = cpu.A & 1;
    cpu.A = ((cpu.A >>> 1) + (bit * 0x80)) & 0xff;
    cpu.F = bit ? 0x10 : 0;
  },

  /* ------------------------ 0x1 ------------------------ */
  [OPCODES.STOP]: (cpu) => {
    cpu.PC++;
  },
  [OPCODES.LDDEnn]: (cpu) => {
    cpu.E = cpu.mmu.read8(cpu.PC);
    cpu.D = cpu.mmu.read8((cpu.PC + 1) & 0xffff);
    cpu.PC += 2;
  },
  [OPCODES.LDDEmA]: (cpu) => {
    cpu.mmu.write8(cpu.D << 8 | cpu.E, cpu.A);
  },
  [OPCODES.INCDE]: (cpu) => {
    cpu.E = (cpu.E + 1) & 0xff;
    if (!cpu.E) cpu.D = (cpu.D + 1) & 0xff;
  },
  [OPCODES.INCD]: (cpu) => {
    setFlags(cpu, cpu.D + 1);
    setHalfCarry(cpu, cpu.D, 1);
    cpu.D = ++cpu.D & 0xff;
  },
  [OPCODES.DECD]: (cpu) => {
    cpu.D--;
    setFlags(cpu, cpu.D, 1);
    cpu.D &= 0xff;
  },
  [OPCODES.LDDn]: (cpu) => {
    cpu.D = cpu.mmu.read8(cpu.PC++);
  },
  [OPCODES.RLA]: (cpu) => {
    const bit = cpu.A >>> 7;
    const carry = (cpu.F >>> 4) && 0xff;
    cpu.F = bit ? 0x10 : 0;
    cpu.A = ((cpu.A << 1) + carry) & 0xff;
  },
  [OPCODES.JRn]: (cpu) => {
    let val = cpu.mmu.read8(cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    cpu.PC += val;
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
  },
  [OPCODES.LDADEm]: (cpu) => {
    const address = (cpu.D << 8) + cpu.E;
    cpu.A = cpu.mmu.read8(address);
  },
  [OPCODES.DECDE]: (cpu) => {
    cpu.E = (cpu.E - 1) & 0xff;
    if (cpu.E === 0xff) cpu.C = (cpu.C - 1) & 0xff;
  },
  [OPCODES.INCE]: (cpu) => {
    setFlags(cpu, cpu.E + 1);
    setHalfCarry(cpu, cpu.E, 1);
    cpu.E = ++cpu.E & 0xff;
  },
  [OPCODES.DECE]: (cpu) => {
    cpu.E--;
    setFlags(cpu, cpu.E, 1);
    cpu.E &= 0xff;
  },
  [OPCODES.LDEn]: (cpu) => {
    cpu.E = cpu.mmu.read8(cpu.PC++);
  },
  [OPCODES.RRA]: (cpu) => {
    const bit = cpu.A & 1;
    const carry = (cpu.F >>> 4) && 0xff;
    cpu.F = bit ? 0x10 : 0;
    cpu.A = ((cpu.A >>> 1) + (carry * 0x80)) & 0xff;
  },
  [OPCODES.JRNZn]: (cpu) => {
    const zero = (cpu.F >> 7) & 0xff;
    let val = cpu.mmu.read8(cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    if (!zero) cpu.PC += val;
  },
  [OPCODES.LDHLnn]: (cpu) => {
    cpu.L = cpu.mmu.read8(cpu.PC);
    cpu.H = cpu.mmu.read8(cpu.PC + 1);
    cpu.PC += 2;
  },
  [OPCODES.LDIHLmA]: (cpu) => {
    cpu.mmu.write8(cpu.H << 8 | cpu.L, cpu.A);
    cpu.L = (cpu.L + 1) & 0xff;
    if (!cpu.L) cpu.H = (cpu.H + 1) & 0xff;
  },
  [OPCODES.INCHL]: (cpu) => {
    cpu.L = (cpu.L + 1) & 0xff;
    if (!cpu.L) cpu.H = (cpu.H + 1) & 0xff;
  },
  [OPCODES.INCH]: (cpu) => {
    setFlags(cpu, cpu.H + 1);
    setHalfCarry(cpu, cpu.H, 1);
    cpu.H = ++cpu.H & 0xff;
  },
  [OPCODES.DECH]: (cpu) => {
    cpu.H--;
    setFlags(cpu, cpu.H, 1);
    cpu.H &= 0xff;
  },
  [OPCODES.LDHn]: (cpu) => {
    cpu.H = cpu.mmu.read8(cpu.PC++);
  },
  [OPCODES.DAA]: (cpu) => {
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
    let val = cpu.mmu.read8(cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    if (zero) cpu.PC += val;
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
  },
  [OPCODES.LDIAHLm]: (cpu) => {
    const address = (cpu.H << 8) + cpu.L;
    cpu.A = cpu.mmu.read8(address);
    cpu.L = (cpu.L + 1) & 0xff;
    if (!cpu.L) cpu.H = (cpu.H + 1) & 0xff;
  },
  [OPCODES.DECHL]: (cpu) => {
    cpu.L = (cpu.L - 1) & 0xff;
    if (cpu.L === 0xff) cpu.H = (cpu.H - 1) & 0xff;
  },
  [OPCODES.INCL]: (cpu) => {
    setFlags(cpu, cpu.L + 1);
    setHalfCarry(cpu, cpu.L, 1);
    cpu.L = ++cpu.L & 0xff;
  },
  [OPCODES.DECL]: (cpu) => {
    cpu.L--;
    setFlags(cpu, cpu.L, 1);
    cpu.L &= 0xff;
  },
  [OPCODES.LDLn]: (cpu) => {
    cpu.L = cpu.mmu.read8(cpu.PC++);
  },
  [OPCODES.CMPL]: (cpu) => {
    cpu.A = (~cpu.A) & 0xff;
    setFlags(cpu, cpu.A, 1);
  },

  /* ------------------------ 0x3 ------------------------ */
  [OPCODES.JRNCn]: (cpu) => {
    const carry = cpu.F & 0x10;
    let val = cpu.mmu.read8(cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    if (!carry) cpu.PC += val;
  },
  [OPCODES.LDSPnn]: (cpu) => {
    cpu.SP = cpu.mmu.read16(cpu.PC);
    cpu.PC += 2;
  },
  [OPCODES.LDDHLmA]: (cpu) => {
    cpu.mmu.write8(cpu.H << 8 | cpu.L, cpu.A);
    cpu.L = (cpu.L - 1) & 0xff;
    if (cpu.L === 0xff) cpu.H = (cpu.H - 1) & 0xff;
  },
  [OPCODES.INCSP]: cpu => (cpu.SP = (cpu.SP + 1) & 0xffff),
  [OPCODES.INCHLm]: (cpu) => {
    const val = (cpu.mmu.read8((cpu.H << 8) | cpu.L) + 1) & 0xff;
    cpu.mmu.write8((cpu.H << 8) | cpu.L);
    setFlags(cpu, val);
  },
  [OPCODES.DECHLm]: (cpu) => {
    const val = (cpu.mmu.read8((cpu.H << 8) | cpu.L) - 1) & 0xff;
    cpu.mmu.write8((cpu.H << 8) | cpu.L);
    setFlags(cpu, val, 1);
  },
  [OPCODES.LDHLmn]: (cpu) => {
    cpu.mmu.write8((cpu.H << 8) | cpu.L, cpu.mmu.read8(cpu.PC++));
  },
  [OPCODES.SCF]: cpu => (cpu.F |= 0x10),
  [OPCODES.JRZn]: (cpu) => {
    const carry = cpu.F & 0x10;
    let val = cpu.mmu.read8(cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    if (carry) cpu.PC += val;
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
  },
  [OPCODES.LDDAHLm]: (cpu) => {
    const address = (cpu.H << 8) + cpu.L;
    cpu.A = cpu.mmu.read8(address);
    cpu.L = (cpu.L - 1) & 0xff;
    if (cpu.L === 0xff) cpu.H = (cpu.H - 1) & 0xff;
  },
  [OPCODES.DECSP]: cpu => (cpu.SP = (cpu.SP - 1) & 0xffff),
  [OPCODES.INCA]: (cpu) => {
    setFlags(cpu, cpu.A + 1);
    setHalfCarry(cpu, cpu.A, 1);
    cpu.A = ++cpu.A & 0xff;
  },
  [OPCODES.DECA]: (cpu) => {
    cpu.A--;
    setFlags(cpu, cpu.A, 1);
    cpu.A &= 0xff;
  },
  [OPCODES.LDAn]: cpu => cpu.A = cpu.mmu.read8(cpu.PC++),
  [OPCODES.CFF]: cpu => cpu.F &= ~0x10,

  /* ------------------------ 0x4 ------------------------ */
  [OPCODES.LDBB]: cpu => cpu.B = cpu.B,
  [OPCODES.LDBC]: cpu => cpu.B = cpu.C,
  [OPCODES.LDBD]: cpu => cpu.B = cpu.D,
  [OPCODES.LDBE]: cpu => cpu.B = cpu.E,
  [OPCODES.LDBH]: cpu => cpu.B = cpu.H,
  [OPCODES.LDBL]: cpu => cpu.B = cpu.L,
  [OPCODES.LDBHLm]: cpu => cpu.B = cpu.mmu.read8(((cpu.H << 8) | cpu.L)),
  [OPCODES.LDBA]: cpu => cpu.B = cpu.A,
  [OPCODES.LDCB]: cpu => cpu.C = cpu.B,
  [OPCODES.LDCC]: cpu => cpu.C = cpu.C,
  [OPCODES.LDCD]: cpu => cpu.C = cpu.D,
  [OPCODES.LDCE]: cpu => cpu.C = cpu.E,
  [OPCODES.LDCH]: cpu => cpu.C = cpu.H,
  [OPCODES.LDCL]: cpu => cpu.C = cpu.L,
  [OPCODES.LDCHLm]: cpu => cpu.C = cpu.mmu.read8((cpu.H << 8) | cpu.L),
  [OPCODES.LDCA]: cpu => cpu.C = cpu.A,

  /* ------------------------ 0x5 ------------------------ */
  [OPCODES.LDDB]: cpu => cpu.D = cpu.B,
  [OPCODES.LDDC]: cpu => cpu.D = cpu.C,
  [OPCODES.LDDD]: cpu => cpu.D = cpu.D,
  [OPCODES.LDDE]: cpu => cpu.D = cpu.E,
  [OPCODES.LDDH]: cpu => cpu.D = cpu.H,
  [OPCODES.LDDL]: cpu => cpu.D = cpu.L,
  [OPCODES.LDDHLm]: cpu => cpu.D = cpu.mmu.read8((cpu.H << 8) | cpu.L),
  [OPCODES.LDDA]: cpu => cpu.D = cpu.A,
  [OPCODES.LDEB]: cpu => cpu.E = cpu.B,
  [OPCODES.LDEC]: cpu => cpu.E = cpu.C,
  [OPCODES.LDED]: cpu => cpu.E = cpu.D,
  [OPCODES.LDEE]: cpu => cpu.E = cpu.E,
  [OPCODES.LDEH]: cpu => cpu.E = cpu.H,
  [OPCODES.LDEL]: cpu => cpu.E = cpu.L,
  [OPCODES.LDEHLm]: cpu => cpu.E = cpu.mmu.read8((cpu.H << 8) | cpu.L),
  [OPCODES.LDEA]: cpu => cpu.E = cpu.A,

  /* ------------------------ 0x6 ------------------------ */
  [OPCODES.LDHB]: cpu => cpu.H = cpu.B,
  [OPCODES.LDHC]: cpu => cpu.H = cpu.C,
  [OPCODES.LDHD]: cpu => cpu.H = cpu.D,
  [OPCODES.LDHE]: cpu => cpu.H = cpu.E,
  [OPCODES.LDHH]: cpu => cpu.H = cpu.H,
  [OPCODES.LDHL]: cpu => cpu.H = cpu.L,
  [OPCODES.LDHHLm]: cpu => cpu.H = cpu.mmu.read8((cpu.H << 8) | cpu.L),
  [OPCODES.LDHA]: cpu => cpu.H = cpu.A,
  [OPCODES.LDLB]: cpu => cpu.L = cpu.B,
  [OPCODES.LDLC]: cpu => cpu.L = cpu.C,
  [OPCODES.LDLD]: cpu => cpu.L = cpu.D,
  [OPCODES.LDLE]: cpu => cpu.L = cpu.E,
  [OPCODES.LDLH]: cpu => cpu.L = cpu.H,
  [OPCODES.LDLL]: cpu => cpu.L = cpu.L,
  [OPCODES.LDLHLm]: cpu => cpu.L = cpu.mmu.read8((cpu.H << 8) | cpu.L),
  [OPCODES.LDLA]: cpu => cpu.L = cpu.A,

  /* ------------------------ 0x7 ------------------------ */
  [OPCODES.LDHLmB]: cpu => cpu.mmu.write8((cpu.H << 8) | cpu.L, cpu.B),
  [OPCODES.LDHLmC]: cpu => cpu.mmu.write8((cpu.H << 8) | cpu.L, cpu.C),
  [OPCODES.LDHLmD]: cpu => cpu.mmu.write8((cpu.H << 8) | cpu.L, cpu.D),
  [OPCODES.LDHLmE]: cpu => cpu.mmu.write8((cpu.H << 8) | cpu.L, cpu.E),
  [OPCODES.LDHLmH]: cpu => cpu.mmu.write8((cpu.H << 8) | cpu.L, cpu.H),
  [OPCODES.LDHLmL]: cpu => cpu.mmu.write8((cpu.H << 8) | cpu.L, cpu.L),
  [OPCODES.HALT]: cpu => cpu.HALT = 1,
  [OPCODES.LDHLmA]: cpu => cpu.mmu.write8((cpu.H << 8) | cpu.L, cpu.A),
  [OPCODES.LDAB]: cpu => cpu.A = cpu.B,
  [OPCODES.LDAC]: cpu => cpu.A = cpu.C,
  [OPCODES.LDAD]: cpu => cpu.A = cpu.D,
  [OPCODES.LDAE]: cpu => cpu.A = cpu.E,
  [OPCODES.LDAH]: cpu => cpu.A = cpu.H,
  [OPCODES.LDAL]: cpu => cpu.A = cpu.L,
  [OPCODES.LDAHLm]: cpu => cpu.A = cpu.mmu.read8((cpu)),
  [OPCODES.LDAA]: cpu => cpu.A = cpu.A,

  /* ------------------------ 0x8 ------------------------ */
  [OPCODES.ADDAB]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.B);
    setHalfCarry(cpu, cpu.A, cpu.B);
    cpu.A = (cpu.A + cpu.B) & 0xff;
  },
  [OPCODES.ADDAC]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.C);
    setHalfCarry(cpu, cpu.A, cpu.C);
    cpu.A = (cpu.A + cpu.C) & 0xff;
  },
  [OPCODES.ADDAD]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.D);
    setHalfCarry(cpu, cpu.A, cpu.D);
    cpu.A = (cpu.A + cpu.D) & 0xff;
  },
  [OPCODES.ADDAE]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.E);
    setHalfCarry(cpu, cpu.A, cpu.E);
    cpu.A = (cpu.A + cpu.E) & 0xff;
  },
  [OPCODES.ADDAH]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.H);
    setHalfCarry(cpu, cpu.A, cpu.H);
    cpu.A = (cpu.A + cpu.H) & 0xff;
  },
  [OPCODES.ADDAL]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.L);
    setHalfCarry(cpu, cpu.A, cpu.L);
    cpu.A = (cpu.A + cpu.L) & 0xff;
  },
  [OPCODES.ADDAHLm]: (cpu) => {
    const val = cpu.mmu.read8((cpu.H << 8) | cpu.L);
    setFlags(cpu, cpu.A + val);
    setHalfCarry(cpu, cpu.A, val);
    cpu.A = (cpu.A + val) & 0xff;
  },
  [OPCODES.ADDAA]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.A);
    setHalfCarry(cpu, cpu.A, cpu.A);
    cpu.A = (cpu.A + cpu.A) & 0xff;
  },
  [OPCODES.ADCAB]: (cpu) => {
    setFlags(cpu, cpu.A + cpu.L);
    setHalfCarry(cpu, cpu.A, cpu.L);
    cpu.A = (cpu.A + cpu.L) & 0xff;
  },
  [OPCODES.ADCAC]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + cpu.C + carry);
    setHalfCarry(cpu, cpu.A, cpu.C + carry);
    cpu.A = (cpu.A + cpu.C) & 0xff;
  },
  [OPCODES.ADCAD]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + cpu.D + carry);
    setHalfCarry(cpu, cpu.A, cpu.D + carry);
    cpu.A = (cpu.A + cpu.D) & 0xff;
  },
  [OPCODES.ADCAE]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + cpu.E + carry);
    setHalfCarry(cpu, cpu.A, cpu.E + carry);
    cpu.A = (cpu.A + cpu.E) & 0xff;
  },
  [OPCODES.ADCAH]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + cpu.H + carry);
    setHalfCarry(cpu, cpu.A, cpu.H + carry);
    cpu.A = (cpu.A + cpu.H) & 0xff;
  },
  [OPCODES.ADCAL]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + cpu.L + carry);
    setHalfCarry(cpu, cpu.A, cpu.L + carry);
    cpu.A = (cpu.A + cpu.L) & 0xff;
  },
  [OPCODES.ADCAHLm]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    const val = cpu.mmu.read8((cpu.H << 8) | cpu.L);
    setFlags(cpu, cpu.A + val + carry);
    setHalfCarry(cpu, cpu.A, val + carry);
    cpu.A = (cpu.A + val) & 0xff;
  },
  [OPCODES.ADCAA]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + cpu.A + carry);
    setHalfCarry(cpu, cpu.A, cpu.A + carry);
    cpu.A = (cpu.A + cpu.A) & 0xff;
  },

  /* ------------------------ 0x9 ------------------------ */
  [OPCODES.SUBAB]: (cpu) => {
    setFlags(cpu, cpu.A - cpu.B, 1);
    setHalfCarry(cpu, cpu.A, cpu.B, 1);
    cpu.A = (cpu.A - cpu.B) & 0xff;
  },
  [OPCODES.SUBAC]: (cpu) => {
    setFlags(cpu, cpu.A - cpu.C, 1);
    setHalfCarry(cpu, cpu.A, cpu.C, 1);
    cpu.A = (cpu.A - cpu.C) & 0xff;
  },
  [OPCODES.SUBAD]: (cpu) => {
    setFlags(cpu, cpu.A - cpu.D, 1);
    setHalfCarry(cpu, cpu.A, cpu.D, 1);
    cpu.A = (cpu.A - cpu.D) & 0xff;
  },
  [OPCODES.SUBAE]: (cpu) => {
    setFlags(cpu, cpu.A - cpu.E, 1);
    setHalfCarry(cpu, cpu.A, cpu.E, 1);
    cpu.A = (cpu.A - cpu.E) & 0xff;
  },
  [OPCODES.SUBAH]: (cpu) => {
    setFlags(cpu, cpu.A - cpu.H, 1);
    setHalfCarry(cpu, cpu.A, cpu.H, 1);
    cpu.A = (cpu.A - cpu.H) & 0xff;
  },
  [OPCODES.SUBAL]: (cpu) => {
    setFlags(cpu, cpu.A - cpu.L, 1);
    setHalfCarry(cpu, cpu.A, cpu.L, 1);
    cpu.A = (cpu.A - cpu.L) & 0xff;
  },
  [OPCODES.SUBAHLm]: (cpu) => {
    const val = cpu.mmu.read8((cpu.H << 8) | cpu.L);
    setFlags(cpu, cpu.A - val, 1);
    setHalfCarry(cpu, cpu.A, val, 1);
    cpu.A = (cpu.A - val) & 0xff;
  },
  [OPCODES.SUBAA]: (cpu) => {
    cpu.A = 0;
    cpu.F = 0xc0;
  },
  [OPCODES.SUBCAB]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.B - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.B + carry, 1);
    cpu.A = (cpu.A - cpu.B - carry) & 0xff;
  },
  [OPCODES.SUBCAC]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.C - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.C + carry, 1);
    cpu.A = (cpu.A - cpu.C - carry) & 0xff;
  },
  [OPCODES.SUBCAD]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.D - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.D + carry, 1);
    cpu.A = (cpu.A - cpu.D - carry) & 0xff;
  },
  [OPCODES.SUBCAE]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.E - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.E + carry, 1);
    cpu.A = (cpu.A - cpu.E - carry) & 0xff;
  },
  [OPCODES.SUBCAH]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.H - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.H + carry, 1);
    cpu.A = (cpu.A - cpu.H - carry) & 0xff;
  },
  [OPCODES.SUBCAL]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.L - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.L + carry, 1);
    cpu.A = (cpu.A - cpu.L - carry) & 0xff;
  },
  [OPCODES.SUBCAHLm]: (cpu) => {
    const val = cpu.mmu.read8((cpu.H << 8) | cpu.L);
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - val - carry, 1);
    setHalfCarry(cpu, cpu.A, val + carry, 1);
    cpu.A = (cpu.A - val - carry) & 0xff;
  },
  [OPCODES.SUBCAA]: (cpu) => {
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - cpu.B - carry, 1);
    setHalfCarry(cpu, cpu.A, cpu.B + carry, 1);
    cpu.A = (cpu.A - cpu.B - carry) & 0xff;
  },

  /* ------------------------ 0xa ------------------------ */
  [OPCODES.ANDB]: (cpu) => { cpu.A &= cpu.B; cpu.F = !cpu.A ? 0xa0 : 0x20; },
  [OPCODES.ANDC]: (cpu) => { cpu.A &= cpu.C; cpu.F = !cpu.A ? 0xa0 : 0x20; },
  [OPCODES.ANDD]: (cpu) => { cpu.A &= cpu.D; cpu.F = !cpu.A ? 0xa0 : 0x20; },
  [OPCODES.ANDE]: (cpu) => { cpu.A &= cpu.E; cpu.F = !cpu.A ? 0xa0 : 0x20; },
  [OPCODES.ANDH]: (cpu) => { cpu.A &= cpu.H; cpu.F = !cpu.A ? 0xa0 : 0x20; },
  [OPCODES.ANDL]: (cpu) => { cpu.A &= cpu.L; cpu.F = !cpu.A ? 0xa0 : 0x20; },
  [OPCODES.ANDHLm]: (cpu) => { cpu.A &= cpu.mmu.read8((cpu.H << 8) | cpu.L); cpu.F = !cpu.A ? 0xa0 : 0x20; },
  [OPCODES.ANDA]: (cpu) => { cpu.F = !cpu.A ? 0xa0 : 0x20; },
  [OPCODES.XORB]: (cpu) => { cpu.A ^= cpu.B; cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.XORC]: (cpu) => { cpu.A ^= cpu.C; cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.XORD]: (cpu) => { cpu.A ^= cpu.D; cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.XORE]: (cpu) => { cpu.A ^= cpu.E; cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.XORH]: (cpu) => { cpu.A ^= cpu.H; cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.XORL]: (cpu) => { cpu.A ^= cpu.L; cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.XORHLm]: (cpu) => { cpu.A ^= cpu.mmu.read8((cpu.H << 8) | cpu.L); cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.XORA]: (cpu) => { cpu.A = 0; cpu.F = 0x80; },

  /* ------------------------ 0xb ------------------------ */
  [OPCODES.ORB]: (cpu) => { cpu.A |= cpu.B; cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.ORC]: (cpu) => { cpu.A |= cpu.C; cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.ORD]: (cpu) => { cpu.A |= cpu.D; cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.ORE]: (cpu) => { cpu.A |= cpu.E; cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.ORH]: (cpu) => { cpu.A |= cpu.H; cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.ORL]: (cpu) => { cpu.A |= cpu.L; cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.ORHLm]: (cpu) => { cpu.A |= cpu.mmu.read8((cpu.H << 8) | cpu.L); cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.ORA]: (cpu) => { cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.CPB]: (cpu) => { setFlags(cpu, cpu.A - cpu.B, 1); setHalfCarry(cpu, cpu.A, cpu.B, 1); },
  [OPCODES.CPC]: (cpu) => { setFlags(cpu, cpu.A - cpu.C, 1); setHalfCarry(cpu, cpu.A, cpu.C, 1); },
  [OPCODES.CPD]: (cpu) => { setFlags(cpu, cpu.A - cpu.D, 1); setHalfCarry(cpu, cpu.A, cpu.D, 1); },
  [OPCODES.CPE]: (cpu) => { setFlags(cpu, cpu.A - cpu.E, 1); setHalfCarry(cpu, cpu.A, cpu.E, 1); },
  [OPCODES.CPH]: (cpu) => { setFlags(cpu, cpu.A - cpu.L, 1); setHalfCarry(cpu, cpu.A, cpu.H, 1); },
  [OPCODES.CPL]: (cpu) => { setFlags(cpu, cpu.A - cpu.B, 1); setHalfCarry(cpu, cpu.A, cpu.L, 1); },
  [OPCODES.CPHLm]: (cpu) => { const val = cpu.mmu.read8((cpu.H << 8) | cpu.L); setFlags(cpu, cpu.A - val, 1); setHalfCarry(cpu, cpu.A, val, 1); },
  [OPCODES.CPA]: (cpu) => { cpu.F = 0xc0; },

  /* ------------------------ 0xc ------------------------ */
  [OPCODES.RETNZ]: (cpu) => {
    if (!(cpu.F & 0x80)) {
      cpu.PC = cpu.mmu.read16(cpu.SP);
      cpu.SP += 2;
    }
  },
  [OPCODES.POPBC]: (cpu) => {
    cpu.C = cpu.mmu.read8(cpu.SP++);
    cpu.B = cpu.mmu.read8(cpu.SP++);
  },
  [OPCODES.JPNZnn]: (cpu) => { !(cpu.F & 0x80) ? cpu.PC = cpu.mmu.read16(cpu.PC) : cpu.PC += 2; },
  [OPCODES.JPnn]: (cpu) => { cpu.PC = cpu.mmu.read16(cpu.PC); },
  [OPCODES.CALLNZnn]: (cpu) => {
    if (!(cpu.F & 0x80)) {
      cpu.SP -= 2;
      cpu.mmu.write16(cpu.SP, cpu.PC + 2);
      cpu.PC = cpu.mmu.read16(cpu.PC);
    } else {
      cpu.PC += 2;
    }
  },
  [OPCODES.PUSHBC]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.SP, (cpu.B << 8) | cpu.C);
  },
  [OPCODES.ADDAn]: (cpu) => {
    const val = cpu.mmu.read8(cpu.PC++);
    setFlags(cpu, cpu.A + val);
    setHalfCarry(cpu, cpu.A, val);
    cpu.A = (cpu.A + val) & 0xff;
  },
  [OPCODES.RST00]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.SP, cpu.PC);
    cpu.PC = 0x00;
  },
  [OPCODES.RETZ]: (cpu) => {
    if (cpu.F & 0x80) {
      cpu.PC = cpu.mmu.read16(cpu.SP);
      cpu.SP += 2;
    }
  },
  [OPCODES.RET]: (cpu) => {
    cpu.PC = cpu.mmu.read16(cpu.SP);
    cpu.SP += 2;
  },
  [OPCODES.JPZnn]: (cpu) => { cpu.F & 0x80 ? cpu.PC = cpu.mmu.read16(cpu.PC) : cpu.PC += 2; },
  [OPCODES.EXTops]: (cpu) => { cpu; },
  [OPCODES.CALLZnn]: (cpu) => {
    if (cpu.F & 0x80) {
      cpu.SP -= 2;
      cpu.mmu.write16(cpu.SP, cpu.PC + 2);
      cpu.PC = cpu.mmu.read16(cpu.PC);
    } else {
      cpu.PC += 2;
    }
  },
  [OPCODES.CALLnn]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.SP, cpu.PC + 2);
    cpu.PC = cpu.mmu.read16(cpu.PC);
  },
  [OPCODES.ADCAn]: (cpu) => {
    const val = cpu.mmu.read8(cpu.PC++);
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A + val + carry);
    setHalfCarry(cpu, cpu.A, val + carry);
    cpu.A = (cpu.A + val + carry) & 0xff;
  },
  [OPCODES.RST08]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.SP, cpu.PC);
    cpu.PC = 0x08;
  },

  /* ------------------------ 0xd ------------------------ */
  [OPCODES.RETNC]: (cpu) => {
    if (!(cpu.F & 0x10)) {
      cpu.PC = cpu.mmu.read16(cpu.SP);
      cpu.SP += 2;
    }
  },
  [OPCODES.POPDE]: (cpu) => {
    cpu.E = cpu.mmu.read8(cpu.SP++);
    cpu.D = cpu.mmu.read8(cpu.SP++);
  },
  [OPCODES.JPNCnn]: (cpu) => { !(cpu.F & 0x10) ? cpu.PC = cpu.mmu.read16(cpu.PC) : cpu.PC += 2; },
  [OPCODES.CALLNCnn]: (cpu) => {
    if (!(cpu.F & 0x81)) {
      cpu.SP -= 2;
      cpu.mmu.write16(cpu.SP, cpu.PC + 2);
      cpu.PC = cpu.mmu.read16(cpu.PC);
    } else {
      cpu.PC += 2;
    }
  },
  [OPCODES.PUSHDE]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.SP, (cpu.D << 8) | cpu.E);
  },
  [OPCODES.SUBAn]: (cpu) => {
    const val = cpu.mmu.read8(cpu.PC++);
    setFlags(cpu, cpu.A - val, 1);
    setHalfCarry(cpu, cpu.A, val, 1);
    cpu.A = (cpu.A - val) & 0xff;
  },
  [OPCODES.RST10]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.SP, cpu.PC);
    cpu.PC = 0x10;
  },
  [OPCODES.RETC]: (cpu) => {
    if (cpu.F & 0x10) {
      cpu.PC = cpu.mmu.read16(cpu.SP);
      cpu.SP += 2;
    }
  },
  [OPCODES.RETI]: (cpu) => {
    cpu.PC = cpu.mmu.read16(cpu.SP);
    cpu.SP += 2;
  },
  [OPCODES.JPCnn]: (cpu) => { cpu.F & 0x10 ? cpu.PC = cpu.mmu.read16(cpu.PC) : cpu.PC += 2; },
  [OPCODES.CALLCnn]: (cpu) => {
    if (cpu.F & 0x10) {
      cpu.SP -= 2;
      cpu.mmu.write16(cpu.SP, cpu.PC + 2);
      cpu.PC = cpu.mmu.read16(cpu.PC);
    } else {
      cpu.PC += 2;
    }
  },
  [OPCODES.SBCAn]: (cpu) => {
    const val = cpu.mmu.read8(cpu.PC++);
    const carry = (cpu.F & 0x10) ? 1 : 0;
    setFlags(cpu, cpu.A - val - carry, 1);
    setHalfCarry(cpu, cpu.A, val + carry, 1);
    cpu.A = (cpu.A - val - carry) & 0xff;
  },
  [OPCODES.RST18]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.SP, cpu.PC);
    cpu.PC = 0x18;
  },

  /* ------------------------ 0xe ------------------------ */
  [OPCODES.LDHnmA]: (cpu) => { cpu.mmu.write8(0xff00 | cpu.mmu.read8(cpu.PC++), cpu.A); },
  [OPCODES.POPHL]: (cpu) => {
    cpu.L = cpu.mmu.read8(cpu.SP++);
    cpu.H = cpu.mmu.read8(cpu.SP++);
  },
  [OPCODES.LDHCmA]: (cpu) => { cpu.mmu.write8(0xff00 | cpu.C, cpu.A); },
  [OPCODES.PUSHHL]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.SP, (cpu.H << 8) | cpu.L);
  },
  [OPCODES.ANDn]: (cpu) => { cpu.A &= cpu.mmu.read8(cpu.PC++); cpu.F = !cpu.A ? 0xa0 : 0x20; },
  [OPCODES.RST20]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.SP, cpu.PC);
    cpu.PC = 0x20;
  },
  [OPCODES.ADDSPd]: (cpu) => {
    let i = cpu.mmu.read8(cpu.PC++);
    if (i > 127) i = -((~i + 1) & 0xff);
    cpu.SP += i;
    cpu.F &= 0x30; // TODO set carry/half carry
  },
  [OPCODES.JPHLm]: (cpu) => { cpu.PC = (cpu.H << 8) | cpu.L; },
  [OPCODES.LDnnmA]: (cpu) => {
    cpu.mmu.write8(cpu.mmu.read16(cpu.PC), cpu.A);
    cpu.PC += 2;
  },
  [OPCODES.XORn]: (cpu) => { cpu.A ^= cpu.mmu.read8(cpu.PC++); cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.RST28]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.SP, cpu.PC);
    cpu.PC = 0x28;
  },

  /* ------------------------ 0xf ------------------------ */
  [OPCODES.LDHAnm]: (cpu) => { cpu.A = cpu.mmu.read8(0xff00 | cpu.mmu.read8(cpu.PC++)); },
  [OPCODES.POPAF]: (cpu) => {
    cpu.F = cpu.mmu.read8(cpu.SP++) & 0xf0;
    cpu.A = cpu.mmu.read8(cpu.SP++);
  },
  [OPCODES.DI]: (cpu) => { cpu; },
  [OPCODES.PUSHAF]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.SP, (cpu.A << 8) | cpu.F);
  },
  [OPCODES.ORn]: (cpu) => { cpu.A |= cpu.mmu.read8(cpu.PC++); cpu.F = !cpu.A ? 0x80 : 0; },
  [OPCODES.RST30]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.SP, cpu.PC);
    cpu.PC = 0x30;
  },
  [OPCODES.LDHLSPd]: (cpu) => {
    let i = cpu.mmu.read8(cpu.PC++);
    if (i > 127) i = -((~i + 1) & 0xff);
    i += cpu.SP; // TODO check arry flags
    cpu.H = (i >> 8) & 0xff;
    cpu.L = i & 0xff;
  },
  [OPCODES.LDSPHL]: (cpu) => { cpu.SP = (cpu.H << 8) | cpu.L; },
  [OPCODES.LDAnnm]: (cpu) => {
    const addr = cpu.mmu.read16(cpu.PC);
    cpu.A = cpu.mmu.read8(addr);
    cpu.PC += 2;
  },
  [OPCODES.EI]: (cpu) => { cpu; },
  [OPCODES.CPn]: (cpu) => {
    const val = cpu.mmu.read8(cpu.PC++);
    setFlags(cpu, cpu.A - val, 1);
    setHalfCarry(cpu, cpu.A, val, 1);
  },
  [OPCODES.RST38]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu.SP, cpu.PC);
    cpu.PC = 0x38;
  },
};


module.exports = {
  opcodes,
  OPCODES,
};
