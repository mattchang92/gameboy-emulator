const { cbopcodes } = require('./cbOpcodes');

const zFlag = 0x80;
const nFlag = 0x40;
const hFlag = 0x20;
const cFlag = 0x10;

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
  EXTops: 0xcb,
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
  RETI: 0xd9,
  JPCnn: 0xda,
  CALLCnn: 0xdc,
  SUBCAn: 0xde,
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
  LDAIOC: 0xf2, // NOTE copy pasted from other repo. docs say is invalid
  DI: 0xf3,
  PUSHAF: 0xf5,
  ORn: 0xf6,
  RST30: 0xf7,
  LDHLSPd: 0xf8,
  LDSPHL: 0xf9,
  LDAnnm: 0xfa,
  EI: 0xfb,
  CPn: 0xfe,
  RST38: 0xff,
};

// Flags = Z N H C
// Zero (0x80): Set if the last operation produced a result of 0;
// Operation (0x40): Set if the last operation was a subtraction;
// Half-carry (0x20): Set if, in the result of the last operation, the lower half of the byte overflowed past 15;
// Carry (0x10): Set if the last operation produced a result over 255 (for additions) or under 0 (for subtractions).
// fz: function(i,as) { Z80._r.f=0; if(!(i&255)) Z80._r.f|=128; Z80._r.f|=as?0x40:0; },

const setHalfCarry = (cpu, a, b, isSub, is16BitOp) => {
  const mask = is16BitOp ? 0x0fff : 0x0f;

  if (isSub) {
    if ((a & mask) < (b & mask)) {
      cpu.F |= 0x20;
    } else {
      cpu.F &= ~0x20;
    }
  } else if (((a & mask) + (b & mask)) > mask) {
    cpu.F |= 0x20;
  } else {
    cpu.F &= ~0x20;
  }
};

const setFlags = (cpu, a, b, isSub = 0, is16BitOp = 0) => {
  const overflowLimit = is16BitOp ? 0xffff : 0xff;
  const val = isSub ? a - b : a + b;

  cpu.F = 0;
  if (!(val & overflowLimit)) cpu.F |= 0x80;
  if (val > overflowLimit || val < 0) cpu.F |= 0x10;
  if (isSub) cpu.F |= 0x40;
  setHalfCarry(cpu, a, b, isSub, is16BitOp);
};

/* START REFACTOR -------------------------------------------------------------------------------------------------------------------*/

// LOADS
// 55
const LD_r_n = (cpu, r) => {
  cpu[r] = cpu.mmu.read8(cpu, cpu.PC++);
  cpu.M = 2; cpu.T = 8;
};

// 139
const LD_r1_r2 = (cpu, r1, r2) => {
  cpu[r1] = cpu[r2];
  cpu.M = 1; cpu.T = 4;
};

// 196
const LD_r_HLm = (cpu, r) => {
  cpu[r] = cpu.mmu.read8(cpu, cpu.HL);
  cpu.M = 2; cpu.T = 8;
};

// 211
const LD_HLm_r = (cpu, r) => {
  cpu.mmu.write8(cpu, cpu.HL, cpu[r]);
  cpu.M = 2; cpu.T = 8;
};

// 273
const LD_A_nnm = (cpu, nn) => {
  cpu.A = cpu.mmu.read8(cpu, cpu[nn]);
  cpu.M = 2; cpu.T = 8;
};

// 338
const LD_nm_A = (cpu, n) => {
  cpu.mmu.write8(cpu, cpu[n], cpu.A);
  cpu.M = 2; cpu.T = 8;
};

// 549
const LD_n_nn = (cpu, n) => {
  cpu[n] = cpu.mmu.read16(cpu, cpu.PC);
  cpu.PC += 2;
  cpu.M = 3; cpu.T = 12;
};

// 658
const PUSH_nn = (cpu, nn) => {
  cpu.SP -= 2;
  cpu.mmu.write16(cpu, cpu.SP, cpu[nn]);
  cpu.M = 4; cpu.T = 16;
};

const LOAD = {
  // LD_r_n 55
  LDBn: cpu => LD_r_n(cpu, 'B'),
  LDCn: cpu => LD_r_n(cpu, 'C'),
  LDDn: cpu => LD_r_n(cpu, 'D'),
  LDEn: cpu => LD_r_n(cpu, 'E'),
  LDHn: cpu => LD_r_n(cpu, 'H'),
  LDLn: cpu => LD_r_n(cpu, 'L'),

  // LD_r1_r2 139
  LDBB: cpu => LD_r1_r2(cpu, 'B', 'B'),
  LDBC: cpu => LD_r1_r2(cpu, 'B', 'C'),
  LDBD: cpu => LD_r1_r2(cpu, 'B', 'D'),
  LDBE: cpu => LD_r1_r2(cpu, 'B', 'E'),
  LDBH: cpu => LD_r1_r2(cpu, 'B', 'H'),
  LDBL: cpu => LD_r1_r2(cpu, 'B', 'L'),
  LDBA: cpu => LD_r1_r2(cpu, 'B', 'A'),

  LDCB: cpu => LD_r1_r2(cpu, 'C', 'B'),
  LDCC: cpu => LD_r1_r2(cpu, 'C', 'C'),
  LDCD: cpu => LD_r1_r2(cpu, 'C', 'D'),
  LDCE: cpu => LD_r1_r2(cpu, 'C', 'E'),
  LDCH: cpu => LD_r1_r2(cpu, 'C', 'H'),
  LDCL: cpu => LD_r1_r2(cpu, 'C', 'L'),
  LDCA: cpu => LD_r1_r2(cpu, 'C', 'A'),

  LDDB: cpu => LD_r1_r2(cpu, 'D', 'B'),
  LDDC: cpu => LD_r1_r2(cpu, 'D', 'C'),
  LDDD: cpu => LD_r1_r2(cpu, 'D', 'D'),
  LDDE: cpu => LD_r1_r2(cpu, 'D', 'E'),
  LDDH: cpu => LD_r1_r2(cpu, 'D', 'H'),
  LDDL: cpu => LD_r1_r2(cpu, 'D', 'L'),
  LDDA: cpu => LD_r1_r2(cpu, 'D', 'A'),

  LDEB: cpu => LD_r1_r2(cpu, 'E', 'B'),
  LDEC: cpu => LD_r1_r2(cpu, 'E', 'C'),
  LDED: cpu => LD_r1_r2(cpu, 'E', 'D'),
  LDEE: cpu => LD_r1_r2(cpu, 'E', 'E'),
  LDEH: cpu => LD_r1_r2(cpu, 'E', 'H'),
  LDEL: cpu => LD_r1_r2(cpu, 'E', 'L'),
  LDEA: cpu => LD_r1_r2(cpu, 'E', 'A'),

  LDHB: cpu => LD_r1_r2(cpu, 'H', 'B'),
  LDHC: cpu => LD_r1_r2(cpu, 'H', 'C'),
  LDHD: cpu => LD_r1_r2(cpu, 'H', 'D'),
  LDHE: cpu => LD_r1_r2(cpu, 'H', 'E'),
  LDHH: cpu => LD_r1_r2(cpu, 'H', 'H'),
  LDHL: cpu => LD_r1_r2(cpu, 'H', 'L'),
  LDHA: cpu => LD_r1_r2(cpu, 'H', 'A'),

  LDLB: cpu => LD_r1_r2(cpu, 'L', 'B'),
  LDLC: cpu => LD_r1_r2(cpu, 'L', 'C'),
  LDLD: cpu => LD_r1_r2(cpu, 'L', 'D'),
  LDLE: cpu => LD_r1_r2(cpu, 'L', 'E'),
  LDLH: cpu => LD_r1_r2(cpu, 'L', 'H'),
  LDLL: cpu => LD_r1_r2(cpu, 'L', 'L'),
  LDLA: cpu => LD_r1_r2(cpu, 'L', 'A'),

  LDAB: cpu => LD_r1_r2(cpu, 'A', 'B'),
  LDAC: cpu => LD_r1_r2(cpu, 'A', 'C'),
  LDAD: cpu => LD_r1_r2(cpu, 'A', 'D'),
  LDAE: cpu => LD_r1_r2(cpu, 'A', 'E'),
  LDAH: cpu => LD_r1_r2(cpu, 'A', 'H'),
  LDAL: cpu => LD_r1_r2(cpu, 'A', 'L'),
  LDAA: cpu => LD_r1_r2(cpu, 'A', 'A'),

  // LD_r_HLm 196
  LDBHLm: cpu => LD_r_HLm(cpu, 'B'),
  LDCHLm: cpu => LD_r_HLm(cpu, 'C'),
  LDDHLm: cpu => LD_r_HLm(cpu, 'D'),
  LDEHLm: cpu => LD_r_HLm(cpu, 'E'),
  LDHHLm: cpu => LD_r_HLm(cpu, 'H'),
  LDLHLm: cpu => LD_r_HLm(cpu, 'L'),

  // LD_HLm_r 211
  LDHLmB: cpu => LD_HLm_r(cpu, 'B'),
  LDHLmC: cpu => LD_HLm_r(cpu, 'C'),
  LDHLmD: cpu => LD_HLm_r(cpu, 'D'),
  LDHLmE: cpu => LD_HLm_r(cpu, 'E'),
  LDHLmH: cpu => LD_HLm_r(cpu, 'H'),
  LDHLmL: cpu => LD_HLm_r(cpu, 'L'),

  // LD_Mm_A
  LDABCm: cpu => LD_A_nnm(cpu, 'BC'),
  LDADEm: cpu => LD_A_nnm(cpu, 'DE'),
  LDAHLm: cpu => LD_A_nnm(cpu, 'HL'),

  // LD_nm_A 338
  LDBCmA: cpu => LD_nm_A(cpu, 'BC'),
  LDDEmA: cpu => LD_nm_A(cpu, 'DE'),
  LDHLmA: cpu => LD_nm_A(cpu, 'HL'),

  // LD_n_nn
  LDBCnn: cpu => LD_n_nn(cpu, 'BC'),
  LDDEnn: cpu => LD_n_nn(cpu, 'DE'),
  LDHLnn: cpu => LD_n_nn(cpu, 'HL'),
  LDSPnn: cpu => LD_n_nn(cpu, 'SP'),

  // PUSH_nn
  PUSHBC: cpu => PUSH_nn(cpu, 'BC'),
  PUSHDE: cpu => PUSH_nn(cpu, 'DE'),
  PUSHHL: cpu => PUSH_nn(cpu, 'HL'),
  PUSHAF: cpu => PUSH_nn(cpu, 'AF'),
};


/* END REFACTOR ---------------------------------------------------------------------------------------------------------------------*/

const RESTART = {
  RST40: (cpu) => { cpu.rstCalled = true; cpu.ime = 0; cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x0040; cpu.M = 3; cpu.T = 12; },
  RST48: (cpu) => { cpu.rstCalled = true; cpu.ime = 0; cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x0048; cpu.M = 3; cpu.T = 12; },
  RST50: (cpu) => { cpu.rstCalled = true; cpu.ime = 0; cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x0050; cpu.M = 3; cpu.T = 12; },
  RST58: (cpu) => { cpu.rstCalled = true; cpu.ime = 0; cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x0058; cpu.M = 3; cpu.T = 12; },
  RST60: (cpu) => { cpu.rstCalled = true; cpu.ime = 0; cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x0060; cpu.M = 3; cpu.T = 12; },
};

const INCREMENT = {
  // 8 bit increments. Flag = (* 0 * -)
  INCB: (cpu) => { setFlags(cpu, cpu.B, 1); cpu.B = ++cpu.B & 0xff; cpu.M = 1; cpu.T = 4; },
  INCC: (cpu) => { setFlags(cpu, cpu.C, 1); cpu.C = ++cpu.C & 0xff; cpu.M = 1; cpu.T = 4; },
  INCD: (cpu) => { setFlags(cpu, cpu.D, 1); cpu.D = ++cpu.D & 0xff; cpu.M = 1; cpu.T = 4; },
  INCE: (cpu) => { setFlags(cpu, cpu.E, 1); cpu.E = ++cpu.E & 0xff; cpu.M = 1; cpu.T = 4; },
  INCH: (cpu) => { setFlags(cpu, cpu.H, 1); cpu.H = ++cpu.H & 0xff; cpu.M = 1; cpu.T = 4; },
  INCL: (cpu) => { setFlags(cpu, cpu.L, 1); cpu.L = ++cpu.L & 0xff; cpu.M = 1; cpu.T = 4; },
  INCHLm: (cpu) => { const val = (cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L) + 1); setFlags(cpu, val - 1, 1); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val & 0xff); cpu.M = 3; cpu.T = 12; },
  INCA: (cpu) => { setFlags(cpu, cpu.A, 1); cpu.A = ++cpu.A & 0xff; cpu.M = 1; cpu.T = 4; },

  // 16 bit increments Flag = (- - - -)
  INCBC: (cpu) => { cpu.C = (cpu.C + 1) & 0xff; if (!cpu.C) { cpu.B = (cpu.B + 1) & 0xff; } cpu.M = 1; cpu.T = 4; },
  INCDE: (cpu) => { cpu.E = (cpu.E + 1) & 0xff; if (!cpu.E) { cpu.D = (cpu.D + 1) & 0xff; } cpu.M = 1; cpu.T = 4; },
  INCHL: (cpu) => { cpu.L = (cpu.L + 1) & 0xff; if (!cpu.L) { cpu.H = (cpu.H + 1) & 0xff; } cpu.M = 1; cpu.T = 4; },
  INCSP: (cpu) => { cpu.SP = (cpu.SP + 1) & 0xffff; cpu.M = 1; cpu.T = 4; },
};

const DECREMENT = {
  // 8 bit decrements Flag = (* 1 * -)
  // Following working emu
  // DECB: (cpu) => { cpu.B--; cpu.B &= 0xff; cpu.F = cpu.B ? 0 : 0x80; cpu.M = 1; cpu.T = 4; },
  // DECC: (cpu) => { cpu.C--; cpu.C &= 0xff; cpu.F = cpu.C ? 0 : 0x80; cpu.M = 1; cpu.T = 4; },
  // DECD: (cpu) => { cpu.D--; cpu.D &= 0xff; cpu.F = cpu.D ? 0 : 0x80; cpu.M = 1; cpu.T = 4; },
  // DECE: (cpu) => { cpu.E--; cpu.E &= 0xff; cpu.F = cpu.E ? 0 : 0x80; cpu.M = 1; cpu.T = 4; },
  // DECH: (cpu) => { cpu.H--; cpu.H &= 0xff; cpu.F = cpu.H ? 0 : 0x80; cpu.M = 1; cpu.T = 4; },
  // DECL: (cpu) => { cpu.L--; cpu.L &= 0xff; cpu.F = cpu.L ? 0 : 0x80; cpu.M = 1; cpu.T = 4; },
  // DECHLm: (cpu) => { const val = (cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L) - 1); cpu.F = val ? 0 : 0x80; cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val & 0xff); cpu.M = 3; cpu.T = 12; },
  // DECA: (cpu) => { cpu.A--; cpu.A &= 0xff; cpu.F = cpu.A ? 0 : 0x80; cpu.M = 1; cpu.T = 4; },

  // Original
  DECB: (cpu) => { setFlags(cpu, cpu.B, 1, 1); cpu.B--; cpu.B &= 0xff; cpu.M = 1; cpu.T = 4; },
  DECC: (cpu) => { setFlags(cpu, cpu.C, 1, 1); cpu.C--; cpu.C &= 0xff; cpu.M = 1; cpu.T = 4; },
  DECD: (cpu) => { setFlags(cpu, cpu.D, 1, 1); cpu.D--; cpu.D &= 0xff; cpu.M = 1; cpu.T = 4; },
  DECE: (cpu) => { setFlags(cpu, cpu.E, 1, 1); cpu.E--; cpu.E &= 0xff; cpu.M = 1; cpu.T = 4; },
  DECH: (cpu) => { setFlags(cpu, cpu.H, 1, 1); cpu.H--; cpu.H &= 0xff; cpu.M = 1; cpu.T = 4; },
  DECL: (cpu) => { setFlags(cpu, cpu.L, 1, 1); cpu.L--; cpu.L &= 0xff; cpu.M = 1; cpu.T = 4; },
  DECHLm: (cpu) => { const val = (cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L) - 1); setFlags(cpu, val - 1, 1, 1); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val & 0xff); cpu.M = 3; cpu.T = 12; },
  DECA: (cpu) => { setFlags(cpu, cpu.A, 1, 1); cpu.A--; cpu.A &= 0xff; cpu.M = 1; cpu.T = 4; },

  // 16 bit decrements. Flag = (- - - -)
  DECBC: (cpu) => { cpu.C = (cpu.C - 1) & 0xff; if (cpu.C === 0xff) { cpu.B = (cpu.B - 1) & 0xff; } cpu.M = 1; cpu.T = 4; },
  DECDE: (cpu) => { cpu.E = (cpu.E - 1) & 0xff; if (cpu.E === 0xff) { cpu.C = (cpu.C - 1) & 0xff; } cpu.M = 1; cpu.T = 4; },
  DECHL: (cpu) => { cpu.L = (cpu.L - 1) & 0xff; if (cpu.L === 0xff) { cpu.H = (cpu.H - 1) & 0xff; } cpu.M = 1; cpu.T = 4; },
  DECSP: (cpu) => { cpu.SP = (cpu.SP - 1) & 0xffff; cpu.M = 2; cpu.T = 8; },
};

const ADD = {
  // 8 bit adds. Flag = (* 0 * *)
  ADDAB: (cpu) => { setFlags(cpu, cpu.A, cpu.B); cpu.A = (cpu.A + cpu.B) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADDAC: (cpu) => { setFlags(cpu, cpu.A, cpu.C); cpu.A = (cpu.A + cpu.C) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADDAD: (cpu) => { setFlags(cpu, cpu.A, cpu.D); cpu.A = (cpu.A + cpu.D) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADDAE: (cpu) => { setFlags(cpu, cpu.A, cpu.E); cpu.A = (cpu.A + cpu.E) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADDAH: (cpu) => { setFlags(cpu, cpu.A, cpu.H); cpu.A = (cpu.A + cpu.H) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADDAL: (cpu) => { setFlags(cpu, cpu.A, cpu.L); cpu.A = (cpu.A + cpu.L) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADDAHLm: (cpu) => { const val = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); setFlags(cpu, cpu.A, val); cpu.A = (cpu.A + val) & 0xff; cpu.M = 2; cpu.T = 8; },
  ADDAA: (cpu) => { setFlags(cpu, cpu.A, cpu.A); cpu.A = (cpu.A + cpu.A) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADDAn: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.PC++); setFlags(cpu, cpu.A, val); cpu.A = (cpu.A + val) & 0xff; cpu.M = 2; cpu.T = 8; },
  // 8 bit add with carry. Same flag as adds
  ADCAB: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.L + carry); cpu.A = (cpu.A + cpu.L + carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADCAC: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.C + carry); cpu.A = (cpu.A + cpu.C + carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADCAD: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.D + carry); cpu.A = (cpu.A + cpu.D + carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADCAE: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.E + carry); cpu.A = (cpu.A + cpu.E + carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADCAH: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.H + carry); cpu.A = (cpu.A + cpu.H + carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADCAL: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.L + carry); cpu.A = (cpu.A + cpu.L + carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADCAHLm: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; const val = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); setFlags(cpu, cpu.A, val + carry); cpu.A = (cpu.A + val + carry) & 0xff; cpu.M = 2; cpu.T = 8; },
  ADCAA: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.A + carry); cpu.A = (cpu.A + cpu.A + carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  ADCAn: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.PC++); const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, val + carry); cpu.A = (cpu.A + val + carry) & 0xff; cpu.M = 2; cpu.T = 8; },
  // 16 bit HL add. Flag = (- 0 * *)
  ADDHLBC: (cpu) => { let hl = (cpu.H << 8) + cpu.L; const val = (cpu.B << 8) + cpu.C; setFlags(cpu, hl, val, 0, 1); hl += val; cpu.H = (hl >>> 8) & 0xff; cpu.L = hl & 0xff; cpu.M = 3; cpu.T = 12; },
  ADDHLDE: (cpu) => { let hl = (cpu.H << 8) + cpu.L; const val = (cpu.D << 8) + cpu.E; setFlags(cpu, hl, val, 0, 1); hl += val; cpu.H = (hl >>> 8) & 0xff; cpu.L = hl & 0xff; cpu.M = 3; cpu.T = 12; },
  ADDHLHL: (cpu) => { let hl = (cpu.H << 8) + cpu.L; setFlags(cpu, hl, hl, 0, 1); hl <<= 1; cpu.H = (hl >>> 8) & 0xff; cpu.L = hl & 0xff; cpu.M = 3; cpu.T = 12; },
  ADDHLSP: (cpu) => { let hl = (cpu.H << 8) + cpu.L; setFlags(cpu, hl, cpu.SP, 0, 1); hl += cpu.SP; cpu.H = (hl >>> 8) & 0xff; cpu.L = hl & 0xff; cpu.M = 3; cpu.T = 12; },

  // 16 bit SP add. Flag = (0 0 * *)
  ADDSPd: (cpu) => {
    let i = cpu.mmu.read8(cpu, cpu.PC++);
    if (i > 127) i = -((~i + 1) & 0xff);
    setFlags(cpu, cpu.SP, i, 0, 1); // not sure if correct
    cpu.SP += i;
    cpu.M = 4; cpu.T = 16;
  },
};

const SUBTRACT = {
  // 8 bit subtract. Flag = (* 1 * *)
  SUBAB: (cpu) => { setFlags(cpu, cpu.A, cpu.B, 1); cpu.A = (cpu.A - cpu.B) & 0xff; cpu.M = 1; cpu.T = 4; },
  SUBAC: (cpu) => { setFlags(cpu, cpu.A, cpu.C, 1); cpu.A = (cpu.A - cpu.C) & 0xff; cpu.M = 1; cpu.T = 4; },
  SUBAD: (cpu) => { setFlags(cpu, cpu.A, cpu.D, 1); cpu.A = (cpu.A - cpu.D) & 0xff; cpu.M = 1; cpu.T = 4; },
  SUBAE: (cpu) => { setFlags(cpu, cpu.A, cpu.E, 1); cpu.A = (cpu.A - cpu.E) & 0xff; cpu.M = 1; cpu.T = 4; },
  SUBAH: (cpu) => { setFlags(cpu, cpu.A, cpu.H, 1); cpu.A = (cpu.A - cpu.H) & 0xff; cpu.M = 1; cpu.T = 4; },
  SUBAL: (cpu) => { setFlags(cpu, cpu.A, cpu.L, 1); cpu.A = (cpu.A - cpu.L) & 0xff; cpu.M = 1; cpu.T = 4; },
  SUBAHLm: (cpu) => { const val = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); setFlags(cpu, cpu.A, val, 1); cpu.A = (cpu.A - val) & 0xff; cpu.M = 2; cpu.T = 8; },
  SUBAA: (cpu) => { cpu.A = 0; cpu.F = 0xc0; cpu.M = 1; cpu.T = 4; },
  SUBAn: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.PC++); setFlags(cpu, cpu.A, val, 1); cpu.A = (cpu.A - val) & 0xff; cpu.M = 2; cpu.T = 8; },

  // 8 bit subtract with carry. Same flag as above
  SUBCAB: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.B + carry, 1); cpu.A = (cpu.A - cpu.B - carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  SUBCAC: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.C + carry, 1); cpu.A = (cpu.A - cpu.C - carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  SUBCAD: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.D + carry, 1); cpu.A = (cpu.A - cpu.D - carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  SUBCAE: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.E + carry, 1); cpu.A = (cpu.A - cpu.E - carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  SUBCAH: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.H + carry, 1); cpu.A = (cpu.A - cpu.H - carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  SUBCAL: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.L + carry, 1); cpu.A = (cpu.A - cpu.L - carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  SUBCAHLm: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; const val = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); setFlags(cpu, cpu.A, val + carry, 1); cpu.A = (cpu.A - val - carry) & 0xff; cpu.M = 2; cpu.T = 8; },
  SUBCAA: (cpu) => { const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, cpu.B + carry, 1); cpu.A = (cpu.A - cpu.B - carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  SUBCAn: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.PC++); const carry = (cpu.F & 0x10) ? 1 : 0; setFlags(cpu, cpu.A, val + carry, 1); cpu.A = (cpu.A - val - carry) & 0xff; cpu.M = 2; cpu.T = 8; },
};

const ROTATE = {
  // Flag = (0 0 0 *)
  RLCA: (cpu) => { const carry = cpu.A & 0x80 ? 1 : 0; cpu.F = cpu.A & 0x80 ? 0x10 : 0; cpu.A = ((cpu.A << 1) | carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  RLA: (cpu) => { const carry = cpu.F & 0x10 ? 1 : 0; const overflow = cpu.A & 0x80 ? 0x10 : 0; cpu.A = ((cpu.A << 1) | carry) & 0xff; cpu.F = (cpu.F & 0xef) | overflow; cpu.M = 1; cpu.T = 4; }, // verified
  RRCA: (cpu) => { const carry = cpu.A & 1 ? 0x80 : 0; cpu.F = cpu.A & 1 ? 0x10 : 0; cpu.A = ((cpu.A >>> 1) | carry) & 0xff; cpu.M = 1; cpu.T = 4; },
  RRA: (cpu) => { const carry = cpu.F & 0x10 ? 0x80 : 0; cpu.F = cpu.A & 1 ? 0x10 : 0; cpu.A = ((cpu.A >>> 1) | carry) & 0xff; cpu.M = 1; cpu.T = 4; },
};

const opcodes = {
  /* ------------------------ 0x0 ------------------------ */
  [OPCODES.NOP]: (cpu) => { cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDBCnn]: LOAD.LDBCnn,
  [OPCODES.LDBCmA]: LOAD.LDBCmA,
  [OPCODES.INCBC]: INCREMENT.INCBC,
  [OPCODES.INCB]: INCREMENT.INCB,
  [OPCODES.DECB]: DECREMENT.DECB,
  [OPCODES.LDBn]: LOAD.LDBn,
  [OPCODES.RLCA]: ROTATE.RLCA,
  [OPCODES.LDnnSP]: (cpu) => {
    cpu.mmu.write16(cpu, cpu.mmu.read16(cpu, cpu.PC), cpu.SP);
    cpu.PC += 2;
    cpu.M = 5; cpu.T = 20;
  },
  [OPCODES.ADDHLBC]: ADD.ADDHLBC,
  [OPCODES.LDABCm]: (cpu) => {
    const address = (cpu.B << 8) + cpu.C;
    cpu.A = cpu.mmu.read8(cpu, address);
    if (cpu.A === undefined) console.log('A is undefined at 1', address);
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.DECBC]: DECREMENT.DECBC,
  [OPCODES.INCC]: INCREMENT.INCC,
  [OPCODES.DECC]: DECREMENT.DECC,
  [OPCODES.LDCn]: LOAD.LDCn,
  [OPCODES.RRCA]: ROTATE.RRCA,

  /* ------------------------ 0x1 ------------------------ */
  [OPCODES.STOP]: (cpu) => {
    cpu.PC++;
  },
  [OPCODES.LDDEnn]: LOAD.LDDEnn,
  [OPCODES.LDDEmA]: LOAD.LDDEmA,
  [OPCODES.INCDE]: INCREMENT.INCDE,
  [OPCODES.INCD]: INCREMENT.INCD,
  [OPCODES.DECD]: DECREMENT.DECD,
  [OPCODES.LDDn]: LOAD.LDDn,
  [OPCODES.RLA]: ROTATE.RLA,
  [OPCODES.JRn]: (cpu) => {
    let val = cpu.mmu.read8(cpu, cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    cpu.PC += val;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.ADDHLDE]: ADD.ADDHLDE,
  [OPCODES.LDADEm]: (cpu) => {
    const address = (cpu.D << 8) | cpu.E;
    cpu.A = cpu.mmu.read8(cpu, address);
    if (cpu.A === undefined) console.log('A is undefined at 2', address);
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.DECDE]: DECREMENT.DECDE,
  [OPCODES.INCE]: INCREMENT.INCE,
  [OPCODES.DECE]: DECREMENT.DECE,
  [OPCODES.LDEn]: LOAD.LDEn,
  [OPCODES.RRA]: ROTATE.RRA,

  /* ------------------------ 0x2------------------------ */
  [OPCODES.JRNZn]: (cpu) => {
    const zero = cpu.F & 0x80;
    let val = cpu.mmu.read8(cpu, cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    cpu.M = 2; cpu.T = 8;
    if (!zero) {
      cpu.PC += val;
      cpu.M++; cpu.T += 4;
    }
  },
  [OPCODES.LDHLnn]: LOAD.LDHLnn,
  [OPCODES.LDIHLmA]: (cpu) => { cpu.mmu.write8(cpu, cpu.HL++, cpu.A); cpu.M = 2; cpu.T = 8; },
  [OPCODES.INCHL]: INCREMENT.INCHL,
  [OPCODES.INCH]: INCREMENT.INCH,
  [OPCODES.DECH]: DECREMENT.DECH,
  [OPCODES.LDHn]: LOAD.LDHn,
  [OPCODES.DAA]: (cpu) => {
    const sub = (cpu.F & 0x40) ? 1 : 0;
    const half = (cpu.F & 0x20) ? 1 : 0;
    const carry = (cpu.F & 0x10) ? 1 : 0;

    if (sub) {
      if (carry || cpu.A > 0x99) { cpu.A = (cpu.A + 0x60) & 0xff; cpu.F |= 0x10; }
      if (half || (cpu.A & 0x0f) > 0x09) { cpu.A = (cpu.A + 0x6) & 0xff; }
    } else {
      if (carry) { cpu.A = (cpu.A - 0x60) & 0xff; }
      if (half) { cpu.A = (cpu.A - 0x6) & 0xff; }
    }

    cpu.F |= (cpu.A === 0 ? 0x80 : 0);
    cpu.F &= ~0x20;

    // const sub = (cpu.F & 0x40) ? 1 : 0;
    // const half = (cpu.F & 0x20) ? 1 : 0;
    // let carry = (cpu.F & 0x10) ? 1 : 0;
    // if (sub) {
    //   if (carry) cpu.A -= 0x60;
    //   if (half) cpu.A = (cpu.A - 0x6) & 0xFF;
    // } else {
    //   if ((cpu.A & 0xF) > 9 || half) cpu.A += 0x6;
    //   if (cpu.A > 0x9F || carry) cpu.A += 0x60;
    // }

    // if (cpu.A & 0x100) carry = 1;

    // cpu.A &= 0xFF;
    // cpu.F &= 0x40;

    // if (cpu.A === 0) cpu.F |= 0x80;
    // if (carry) cpu.F |= 0x10;
  },
  [OPCODES.JRZn]: (cpu) => {
    const zero = (cpu.F >> 7) & 0xff;
    let val = cpu.mmu.read8(cpu, cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    if (zero) cpu.PC += val;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.ADDHLHL]: ADD.ADDHLHL,
  [OPCODES.LDIAHLm]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, cpu.HL++); cpu.M = 2; cpu.T = 8; },
  [OPCODES.DECHL]: DECREMENT.DECHL,
  [OPCODES.INCL]: INCREMENT.INCL,
  [OPCODES.DECL]: DECREMENT.DECL,
  [OPCODES.LDLn]: LOAD.LDLn,
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
  [OPCODES.LDSPnn]: LOAD.LDSPnn,
  [OPCODES.LDDHLmA]: (cpu) => {
    cpu.mmu.write8(cpu, cpu.HL--, cpu.A);
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.INCSP]: INCREMENT.INCSP,
  [OPCODES.INCHLm]: INCREMENT.INCHLm,
  [OPCODES.DECHLm]: DECREMENT.DECHLm,
  [OPCODES.LDHLmn]: (cpu) => { cpu.mmu.write8(cpu, cpu.HL, cpu.mmu.read8(cpu, cpu.PC++)); cpu.M = 3; cpu.T = 12; },
  [OPCODES.SCF]: (cpu) => { cpu.F |= 0x10; cpu.M = 1; cpu.T = 4; },
  [OPCODES.JRCn]: (cpu) => {
    cpu.M = 2; cpu.T = 8;
    const carry = cpu.F & 0x10;
    let val = cpu.mmu.read8(cpu, cpu.PC++);
    if (val > 127) val = -((~val + 1) & 0xff);
    if (carry) { cpu.PC += val; cpu.M++; cpu.T += 4; }
  },
  [OPCODES.ADDHLSP]: ADD.ADDHLSP,
  [OPCODES.LDDAHLm]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, cpu.HL--); cpu.M = 2; cpu.T = 8; },
  [OPCODES.DECSP]: DECREMENT.DECSP,
  [OPCODES.INCA]: INCREMENT.INCA,
  [OPCODES.DECA]: DECREMENT.DECA,
  [OPCODES.LDAn]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, cpu.PC++); cpu.M = 2; cpu.T = 8; },
  [OPCODES.CFF]: (cpu) => { cpu.F &= ~0x10; cpu.M = 1; cpu.T = 4; },

  /* ------------------------ 0x4 ------------------------ */
  [OPCODES.LDBB]: LOAD.LDBB,
  [OPCODES.LDBC]: LOAD.LDBC,
  [OPCODES.LDBD]: LOAD.LDBD,
  [OPCODES.LDBE]: LOAD.LDBE,
  [OPCODES.LDBH]: LOAD.LDBH,
  [OPCODES.LDBL]: LOAD.LDBL,
  [OPCODES.LDBHLm]: LOAD.LDBHLm,
  [OPCODES.LDBA]: LOAD.LDBA,
  [OPCODES.LDCB]: LOAD.LDCB,
  [OPCODES.LDCC]: LOAD.LDCC,
  [OPCODES.LDCD]: LOAD.LDCD,
  [OPCODES.LDCE]: LOAD.LDCE,
  [OPCODES.LDCH]: LOAD.LDCH,
  [OPCODES.LDCL]: LOAD.LDCL,
  [OPCODES.LDCHLm]: LOAD.LDCHLm,
  [OPCODES.LDCA]: LOAD.LDCA,

  /* ------------------------ 0x5 ------------------------ */
  [OPCODES.LDDB]: LOAD.LDDB,
  [OPCODES.LDDC]: LOAD.LDDC,
  [OPCODES.LDDD]: LOAD.LDDD,
  [OPCODES.LDDE]: LOAD.LDDE,
  [OPCODES.LDDH]: LOAD.LDDH,
  [OPCODES.LDDL]: LOAD.LDDL,
  [OPCODES.LDDHLm]: LOAD.LDDHLm,
  [OPCODES.LDDA]: LOAD.LDDA,
  [OPCODES.LDEB]: LOAD.LDEB,
  [OPCODES.LDEC]: LOAD.LDEC,
  [OPCODES.LDED]: LOAD.LDED,
  [OPCODES.LDEE]: LOAD.LDEE,
  [OPCODES.LDEH]: LOAD.LDEH,
  [OPCODES.LDEL]: LOAD.LDEL,
  [OPCODES.LDEHLm]: LOAD.LDEHLm,
  [OPCODES.LDEA]: LOAD.LDEA,

  /* ------------------------ 0x6 ------------------------ */
  [OPCODES.LDHB]: LOAD.LDHB,
  [OPCODES.LDHC]: LOAD.LDHC,
  [OPCODES.LDHD]: LOAD.LDHD,
  [OPCODES.LDHE]: LOAD.LDHE,
  [OPCODES.LDHH]: LOAD.LDHH,
  [OPCODES.LDHL]: LOAD.LDHL,
  [OPCODES.LDHHLm]: LOAD.LDHHLm,
  [OPCODES.LDHA]: LOAD.LDHA,
  [OPCODES.LDLB]: LOAD.LDLB,
  [OPCODES.LDLC]: LOAD.LDLC,
  [OPCODES.LDLD]: LOAD.LDLD,
  [OPCODES.LDLE]: LOAD.LDLE,
  [OPCODES.LDLH]: LOAD.LDLH,
  [OPCODES.LDLL]: LOAD.LDLL,
  [OPCODES.LDLHLm]: LOAD.LDLHLm,
  [OPCODES.LDLA]: LOAD.LDLA,

  /* ------------------------ 0x7 ------------------------ */
  [OPCODES.LDHLmB]: LOAD.LDHLmB,
  [OPCODES.LDHLmC]: LOAD.LDHLmC,
  [OPCODES.LDHLmD]: LOAD.LDHLmD,
  [OPCODES.LDHLmE]: LOAD.LDHLmE,
  [OPCODES.LDHLmH]: LOAD.LDHLmH,
  [OPCODES.LDHLmL]: LOAD.LDHLmL,
  [OPCODES.HALT]: (cpu) => { cpu.HALT = 1; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDHLmA]: LOAD.LDHLmA,
  [OPCODES.LDAB]: LOAD.LDAB,
  [OPCODES.LDAC]: LOAD.LDAC,
  [OPCODES.LDAD]: LOAD.LDAD,
  [OPCODES.LDAE]: LOAD.LDAE,
  [OPCODES.LDAH]: LOAD.LDAH,
  [OPCODES.LDAL]: LOAD.LDAL,
  [OPCODES.LDAHLm]: LOAD.LDAHLm,
  [OPCODES.LDAA]: LOAD.LDAA,

  /* ------------------------ 0x8 ------------------------ */
  [OPCODES.ADDAB]: ADD.ADDAB,
  [OPCODES.ADDAC]: ADD.ADDAC,
  [OPCODES.ADDAD]: ADD.ADDAD,
  [OPCODES.ADDAE]: ADD.ADDAE,
  [OPCODES.ADDAH]: ADD.ADDAH,
  [OPCODES.ADDAL]: ADD.ADDAL,
  [OPCODES.ADDAHLm]: ADD.ADDAHLm,
  [OPCODES.ADDAA]: ADD.ADDAA,
  [OPCODES.ADCAB]: ADD.ADCAB,
  [OPCODES.ADCAC]: ADD.ADCAC,
  [OPCODES.ADCAD]: ADD.ADCAD,
  [OPCODES.ADCAE]: ADD.ADCAE,
  [OPCODES.ADCAH]: ADD.ADCAH,
  [OPCODES.ADCAL]: ADD.ADCAL,
  [OPCODES.ADCAHLm]: ADD.ADCAHLm,
  [OPCODES.ADCAA]: ADD.ADCAA,

  /* ------------------------ 0x9 ------------------------ */
  [OPCODES.SUBAB]: SUBTRACT.SUBAB,
  [OPCODES.SUBAC]: SUBTRACT.SUBAC,
  [OPCODES.SUBAD]: SUBTRACT.SUBAD,
  [OPCODES.SUBAE]: SUBTRACT.SUBAE,
  [OPCODES.SUBAH]: SUBTRACT.SUBAH,
  [OPCODES.SUBAL]: SUBTRACT.SUBAL,
  [OPCODES.SUBAHLm]: SUBTRACT.SUBAHLm,
  [OPCODES.SUBAA]: SUBTRACT.SUBAA,
  [OPCODES.SUBCAB]: SUBTRACT.SUBCAB,
  [OPCODES.SUBCAC]: SUBTRACT.SUBCAC,
  [OPCODES.SUBCAD]: SUBTRACT.SUBCAD,
  [OPCODES.SUBCAE]: SUBTRACT.SUBCAE,
  [OPCODES.SUBCAH]: SUBTRACT.SUBCAH,
  [OPCODES.SUBCAL]: SUBTRACT.SUBCAL,
  [OPCODES.SUBCAHLm]: SUBTRACT.SUBCAHLm,
  [OPCODES.SUBCAA]: SUBTRACT.SUBCAA,

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
  [OPCODES.CPB]: (cpu) => { setFlags(cpu, cpu.A, cpu.B, 1); cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPC]: (cpu) => { setFlags(cpu, cpu.A, cpu.C, 1); cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPD]: (cpu) => { setFlags(cpu, cpu.A, cpu.D, 1); cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPE]: (cpu) => { setFlags(cpu, cpu.A, cpu.E, 1); cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPH]: (cpu) => { setFlags(cpu, cpu.A, cpu.L, 1); cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPL]: (cpu) => { setFlags(cpu, cpu.A, cpu.B, 1); cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPHLm]: (cpu) => { const val = cpu.mmu.read8(cpu, (cpu.H << 8) | cpu.L); setFlags(cpu, cpu.A, val, 1); cpu.M = 2; cpu.T = 8; },
  [OPCODES.CPA]: (cpu) => { cpu.F = 0xc0; cpu.M = 1; cpu.T = 4; },

  /* ------------------------ 0xc ------------------------ */
  [OPCODES.RETNZ]: (cpu) => {
    cpu.M = 1; cpu.T = 4;
    if (!(cpu.F & 0x80)) {
      cpu.PC = cpu.mmu.read16(cpu, cpu.SP);
      cpu.SP += 2;
      cpu.M += 2; cpu.T += 8;
    }
  },
  [OPCODES.POPBC]: (cpu) => {
    cpu.C = cpu.mmu.read8(cpu, cpu.SP++);
    cpu.B = cpu.mmu.read8(cpu, cpu.SP++);
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.JPNZnn]: (cpu) => { cpu.M = 3; cpu.T = 12; if (!(cpu.F & 0x80)) { cpu.PC = cpu.mmu.read16(cpu, cpu.PC); cpu.M++; cpu.T += 4; } else { cpu.PC += 2; } },
  [OPCODES.JPnn]: (cpu) => { cpu.PC = cpu.mmu.read16(cpu, cpu.PC); cpu.M = 3; cpu.T = 12; },
  [OPCODES.CALLNZnn]: (cpu) => {
    cpu.M = 3; cpu.T = 12;
    if (!(cpu.F & 0x80)) {
      cpu.SP -= 2;
      cpu.mmu.write16(cpu, cpu.SP, cpu.PC + 2);
      cpu.PC = cpu.mmu.read16(cpu, cpu.PC);
      cpu.M += 2; cpu.T += 8;
    } else {
      cpu.PC += 2;
    }
  },
  [OPCODES.PUSHBC]: LOAD.PUSHBC,
  [OPCODES.ADDAn]: ADD.ADDAn,
  [OPCODES.RST00]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu, cpu.SP, cpu.PC);
    cpu.PC = 0x00;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.RETZ]: (cpu) => {
    cpu.M = 1; cpu.T = 4;
    if (cpu.F & 0x80) {
      cpu.PC = cpu.mmu.read16(cpu, cpu.SP);
      cpu.SP += 2;
      cpu.M += 2; cpu.T += 8;
    }
  },
  [OPCODES.RET]: (cpu) => {
    cpu.PC = cpu.mmu.read16(cpu, cpu.SP);
    cpu.SP += 2;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.JPZnn]: (cpu) => { cpu.M = 3; cpu.T = 12; if (cpu.F & 0x80) { cpu.PC = cpu.mmu.read16(cpu, cpu.PC); cpu.M++; cpu.T += 4; } else { cpu.PC += 2; } },
  [OPCODES.EXTops]: (cpu) => {
    // cpu.F = 0; cpu.PC++;
    // console.log(cpu.mmu.biosExecuted);
    // console.log('startin extops', cpu.PC);
    const op = cpu.mmu.read8(cpu, cpu.PC++);
    if (cbopcodes[op]) {
      // if (cpu.logsEnabled && cpu.counter < cpu.limit) {
      if (cpu.logsEnabled) {
        console.log('inside extops', op.toString(16));
      }
      cbopcodes[op](cpu);
    } else {
      console.log('No CB opcode instruction found', op.toString(16));
    }
  },
  [OPCODES.CALLZnn]: (cpu) => {
    cpu.M = 3; cpu.T = 12;
    if (cpu.F & 0x80) {
      cpu.SP -= 2;
      cpu.mmu.write16(cpu, cpu.SP, cpu.PC + 2);
      cpu.PC = cpu.mmu.read16(cpu, cpu.PC);
      cpu.M += 2; cpu.T += 8;
    } else {
      cpu.PC += 2;
    }
  },
  [OPCODES.CALLnn]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu, cpu.SP, cpu.PC + 2);
    cpu.PC = cpu.mmu.read16(cpu, cpu.PC);
    cpu.M = 5; cpu.T = 20;
  },
  [OPCODES.ADCAn]: ADD.ADCAn,
  [OPCODES.RST08]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu, cpu.SP, cpu.PC);
    cpu.PC = 0x08;
    cpu.M = 3; cpu.T = 12;
  },

  /* ------------------------ 0xd ------------------------ */
  [OPCODES.RETNC]: (cpu) => {
    cpu.M = 1; cpu.T = 4;
    if (!(cpu.F & 0x10)) {
      cpu.PC = cpu.mmu.read16(cpu, cpu.SP);
      cpu.SP += 2;
      cpu.M += 2; cpu.T += 8;
    }
  },
  [OPCODES.POPDE]: (cpu) => {
    cpu.E = cpu.mmu.read8(cpu, cpu.SP++);
    cpu.D = cpu.mmu.read8(cpu, cpu.SP++);
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.JPNCnn]: (cpu) => { cpu.M = 3; cpu.T = 12; if (!(cpu.F & 0x10)) { cpu.PC = cpu.mmu.read16(cpu, cpu.PC); cpu.M++; cpu.T += 4; } else { cpu.PC += 2; } },
  [OPCODES.CALLNCnn]: (cpu) => {
    cpu.M = 3; cpu.T = 12;
    if (!(cpu.F & 0x81)) {
      cpu.SP -= 2;
      cpu.mmu.write16(cpu, cpu.SP, cpu.PC + 2);
      cpu.PC = cpu.mmu.read16(cpu, cpu.PC);
      cpu.M += 2; cpu.T += 8;
    } else {
      cpu.PC += 2;
    }
  },
  [OPCODES.PUSHDE]: LOAD.PUSHDE,
  [OPCODES.SUBAn]: SUBTRACT.SUBAn,
  [OPCODES.RST10]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu, cpu.SP, cpu.PC);
    cpu.PC = 0x10;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.RETC]: (cpu) => {
    cpu.M = 1; cpu.T = 4;
    if (cpu.F & 0x10) {
      cpu.PC = cpu.mmu.read16(cpu, cpu.SP);
      cpu.SP += 2;
      cpu.M += 2; cpu.T += 8;
    }
  },
  [OPCODES.RETI]: (cpu) => {
    cpu.ime = 1;
    cpu.PC = cpu.mmu.read16(cpu, cpu.SP);
    cpu.SP += 2;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.JPCnn]: (cpu) => { cpu.M = 3; cpu.T = 12; if (cpu.F & 0x10) { cpu.PC = cpu.mmu.read16(cpu, cpu.PC); cpu.M++; cpu.T += 4; } else { cpu.PC += 2; } },
  [OPCODES.CALLCnn]: (cpu) => {
    cpu.M = 3; cpu.T = 12;
    if (cpu.F & 0x10) {
      cpu.SP -= 2;
      cpu.mmu.write16(cpu, cpu.SP, cpu.PC + 2);
      cpu.PC = cpu.mmu.read16(cpu, cpu.PC);
      cpu.M += 2; cpu.T += 8;
    } else {
      cpu.PC += 2;
    }
  },
  // 0xdd: (cpu) => { console.log('unmapped opcode'); },
  [OPCODES.SUBCAn]: SUBTRACT.SUBCAn,
  [OPCODES.RST18]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu, cpu.SP, cpu.PC);
    cpu.PC = 0x18;
    cpu.M = 3; cpu.T = 12;
  },

  /* ------------------------ 0xe ------------------------ */
  [OPCODES.LDHnmA]: (cpu) => { cpu.mmu.write8(cpu, 0xff00 | cpu.mmu.read8(cpu, cpu.PC++), cpu.A); cpu.M = 3; cpu.T = 12; },
  [OPCODES.POPHL]: (cpu) => { cpu.L = cpu.mmu.read8(cpu, cpu.SP++); cpu.H = cpu.mmu.read8(cpu, cpu.SP++); cpu.M = 3; cpu.T = 12; },
  [OPCODES.LDHCmA]: (cpu) => { cpu.mmu.write8(cpu, 0xff00 | cpu.C, cpu.A); cpu.M = 2; cpu.T = 8; },
  [OPCODES.PUSHHL]: LOAD.PUSHHL,
  [OPCODES.ANDn]: (cpu) => { cpu.A &= cpu.mmu.read8(cpu, cpu.PC++); cpu.F = !cpu.A ? 0xa0 : 0x20; cpu.M = 2; cpu.T = 8; },
  [OPCODES.RST20]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu, cpu.SP, cpu.PC);
    cpu.PC = 0x20;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.ADDSPd]: ADD.ADDSPd,
  [OPCODES.JPHLm]: (cpu) => { cpu.PC = (cpu.H << 8) | cpu.L; cpu.M = 1; cpu.T = 4; },
  [OPCODES.LDnnmA]: (cpu) => { cpu.mmu.write8(cpu, cpu.mmu.read16(cpu, cpu.PC), cpu.A); cpu.PC += 2; cpu.M = 4; cpu.T = 16; },
  [OPCODES.XORn]: (cpu) => { cpu.A ^= cpu.mmu.read8(cpu, cpu.PC++); cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 2; cpu.T = 8; },
  [OPCODES.RST28]: (cpu) => { cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x28; cpu.M = 3; cpu.T = 12; },

  /* ------------------------ 0xf ------------------------ */
  [OPCODES.LDHAnm]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, 0xff00 | cpu.mmu.read8(cpu, cpu.PC++)); cpu.M = 3; cpu.T = 12; },
  [OPCODES.POPAF]: (cpu) => { cpu.F = cpu.mmu.read8(cpu, cpu.SP++) & 0xf0; cpu.A = cpu.mmu.read8(cpu, cpu.SP++); cpu.M = 3; cpu.T = 12; if (cpu.A === undefined) console.log('A is undefined at 8'); },
  [OPCODES.LDAIOC]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, 0xff00 | cpu.C); cpu.M = 2; cpu.T = 8; },
  [OPCODES.DI]: (cpu) => { cpu.ime = 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.PUSHAF]: LOAD.PUSHAF,
  [OPCODES.ORn]: (cpu) => { cpu.A |= cpu.mmu.read8(cpu, cpu.PC++); cpu.F = !cpu.A ? 0x80 : 0; cpu.M = 2; cpu.T = 8; },
  [OPCODES.RST30]: (cpu) => { cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x30; cpu.M = 3; cpu.T = 12; },
  [OPCODES.LDHLSPd]: (cpu) => {
    let i = cpu.mmu.read8(cpu, cpu.PC++);
    if (i > 127) i = -((~i + 1) & 0xff);
    const r = cpu.SP + i;
    const op = cpu.SP ^ r ^ r;

    cpu.F = 0;
    if ((op & 0x10) !== 0) cpu.F |= hFlag;
    if ((op & 0x100) !== 0) cpu.F |= cFlag;
    cpu.HL = r;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.LDSPHL]: (cpu) => { cpu.SP = cpu.HL; cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDAnnm]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, cpu.mmu.read16(cpu, cpu.PC)); cpu.PC += 2; cpu.M = 4; cpu.T = 16; },
  [OPCODES.EI]: (cpu) => { cpu.ime = 1; cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPn]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.PC++); setFlags(cpu, cpu.A, val, 1); cpu.M = 2; cpu.T = 8; },
  [OPCODES.RST38]: (cpu) => { cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x38; cpu.M = 3; cpu.T = 12; },
};

const interrupts = [
  RESTART.RST40,
  RESTART.RST48,
  RESTART.RST50,
  RESTART.RST58,
  RESTART.RST60,
];


module.exports = {
  opcodes,
  OPCODES,
  interrupts,
};
