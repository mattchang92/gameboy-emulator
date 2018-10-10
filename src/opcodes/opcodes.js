require('../utils/number');

const { cbopcodes } = require('./cbOpcodes');

const {
  zFlag,
  nFlag,
  hFlag,
  cFlag,
} = require('../constants');

const {
  add,
  adc,
  sub,
  sbc,
  and,
  or,
  xor,
  inc,
  dec,
  LD_r_n,
  LD_r1_r2,
  LD_r_HLm,
  LD_HLm_r,
  LD_A_nnm,
  LD_nm_A,
  LD_n_nn,
  PUSH_nn,
  POP_nn,
  ADD_A_n,
  ADC_A_n,
  ADD_HL_n,
  SUB_n,
  SBC_A_n,
  OR_n,
  XOR_n,
  CP_n,
  INC_n,
  INC_nn,
  DEC_n,
  DEC_nn,
  JP_cc_nn,
  JR_cc_n,
  CALL_cc_nn,
  RET_cc,
} = require('./utils');

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
  // LDHLSPd: 0xf8,
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


const LOAD = {
  // // LD_r_n 55
  LDBn: cpu => LD_r_n(cpu, 'B'),
  LDCn: cpu => LD_r_n(cpu, 'C'),
  LDDn: cpu => LD_r_n(cpu, 'D'),
  LDEn: cpu => LD_r_n(cpu, 'E'),
  LDHn: cpu => LD_r_n(cpu, 'H'),
  LDLn: cpu => LD_r_n(cpu, 'L'),

  // // LD_r1_r2 139
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

  // // LD_r_HLm 196
  LDBHLm: cpu => LD_r_HLm(cpu, 'B'),
  LDCHLm: cpu => LD_r_HLm(cpu, 'C'),
  LDDHLm: cpu => LD_r_HLm(cpu, 'D'),
  LDEHLm: cpu => LD_r_HLm(cpu, 'E'),
  LDHHLm: cpu => LD_r_HLm(cpu, 'H'),
  LDLHLm: cpu => LD_r_HLm(cpu, 'L'),

  // // LD_HLm_r 211
  LDHLmB: cpu => LD_HLm_r(cpu, 'B'),
  LDHLmC: cpu => LD_HLm_r(cpu, 'C'),
  LDHLmD: cpu => LD_HLm_r(cpu, 'D'),
  LDHLmE: cpu => LD_HLm_r(cpu, 'E'),
  LDHLmH: cpu => LD_HLm_r(cpu, 'H'),
  LDHLmL: cpu => LD_HLm_r(cpu, 'L'),

  // // LD_Mm_A
  LDABCm: cpu => LD_A_nnm(cpu, 'BC'),
  LDADEm: cpu => LD_A_nnm(cpu, 'DE'),
  LDAHLm: cpu => LD_A_nnm(cpu, 'HL'),

  // // LD_nm_A 338
  LDBCmA: cpu => LD_nm_A(cpu, 'BC'),
  LDDEmA: cpu => LD_nm_A(cpu, 'DE'),
  LDHLmA: cpu => LD_nm_A(cpu, 'HL'),

  // // LD_n_nn
  LDBCnn: cpu => LD_n_nn(cpu, 'BC'),
  LDDEnn: cpu => LD_n_nn(cpu, 'DE'),
  LDHLnn: cpu => LD_n_nn(cpu, 'HL'),
  LDSPnn: cpu => LD_n_nn(cpu, 'SP'),

  // // PUSH_nn
  PUSHBC: cpu => PUSH_nn(cpu, 'BC'),
  PUSHDE: cpu => PUSH_nn(cpu, 'DE'),
  PUSHHL: cpu => PUSH_nn(cpu, 'HL'),
  PUSHAF: cpu => PUSH_nn(cpu, 'AF'),

  POPBC: cpu => POP_nn(cpu, 'BC'),
  POPDE: cpu => POP_nn(cpu, 'DE'),
  POPHL: cpu => POP_nn(cpu, 'HL'),
  POPAF: cpu => POP_nn(cpu, 'AF'),
};
const ADD = {
  // // 8 bit adds. Flag = (* 0 * *)
  ADDAB: cpu => ADD_A_n(cpu, 'B'),
  ADDAC: cpu => ADD_A_n(cpu, 'C'),
  ADDAD: cpu => ADD_A_n(cpu, 'D'),
  ADDAE: cpu => ADD_A_n(cpu, 'E'),
  ADDAH: cpu => ADD_A_n(cpu, 'H'),
  ADDAL: cpu => ADD_A_n(cpu, 'L'),
  ADDAHLm: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.A = add(cpu, val); cpu.M = 2; cpu.T = 8; },
  ADDAA: cpu => ADD_A_n(cpu, 'A'),
  ADDAn: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.PC++); cpu.A = add(cpu, val); cpu.M = 2; cpu.T = 8; },
  // // 8 bit add with carry. Same flag as adds
  ADCAB: cpu => ADC_A_n(cpu, 'B'),
  ADCAC: cpu => ADC_A_n(cpu, 'C'),
  ADCAD: cpu => ADC_A_n(cpu, 'D'),
  ADCAE: cpu => ADC_A_n(cpu, 'E'),
  ADCAH: cpu => ADC_A_n(cpu, 'H'),
  ADCAL: cpu => ADC_A_n(cpu, 'L'),
  ADCAHLm: (cpu) => { cpu.A = adc(cpu, cpu.mmu.read8(cpu, cpu.HL)); cpu.M = 2; cpu.T = 8; },
  ADCAA: cpu => ADC_A_n(cpu, 'A'),
  ADCAn: (cpu) => { cpu.A = adc(cpu, cpu.mmu.read8(cpu, cpu.PC++)); cpu.M = 2; cpu.T = 8; },
  // // 16 bit HL add. Flag = (- 0 * *)
  ADDHLBC: cpu => ADD_HL_n(cpu, 'BC'),
  ADDHLDE: cpu => ADD_HL_n(cpu, 'DE'),
  ADDHLHL: cpu => ADD_HL_n(cpu, 'HL'),
  ADDHLSP: cpu => ADD_HL_n(cpu, 'SP'),
  // // 16 bit SP add. Flag = (0 0 * *)
  ADDSPd: (cpu) => {
    const i = cpu.mmu.read8(cpu, cpu.PC).signed();
    const r = cpu.SP + i;

    const op = cpu.SP ^ i ^ r;

    cpu.F = 0;
    if ((op & 0x10) !== 0) cpu.F |= hFlag;
    if ((op & 0x100) !== 0) cpu.F |= cFlag;

    cpu.SP = r;
  },
};

const SUBTRACT = {
  // // 8 bit subtract. Flag = (* 1 * *)
  SUBAB: cpu => SUB_n(cpu, 'B'),
  SUBAC: cpu => SUB_n(cpu, 'C'),
  SUBAD: cpu => SUB_n(cpu, 'D'),
  SUBAE: cpu => SUB_n(cpu, 'E'),
  SUBAH: cpu => SUB_n(cpu, 'H'),
  SUBAL: cpu => SUB_n(cpu, 'L'),
  SUBAHLm: (cpu) => { cpu.A = sub(cpu, cpu.mmu.read8(cpu, cpu.HL)); cpu.M = 2; cpu.T = 8; },
  SUBAA: cpu => SUB_n(cpu, 'A'),
  SUBAn: (cpu) => { cpu.A = sub(cpu, cpu.mmu.read8(cpu, cpu.PC++)); cpu.M = 2; cpu.T = 8; },

  // // 8 bit subtract with carry. Same flag as above
  SUBCAB: cpu => SBC_A_n(cpu, 'B'),
  SUBCAC: cpu => SBC_A_n(cpu, 'C'),
  SUBCAD: cpu => SBC_A_n(cpu, 'D'),
  SUBCAE: cpu => SBC_A_n(cpu, 'E'),
  SUBCAH: cpu => SBC_A_n(cpu, 'H'),
  SUBCAL: cpu => SBC_A_n(cpu, 'L'),
  SUBCAHLm: (cpu) => { cpu.A = sbc(cpu, cpu.mmu.read8(cpu, cpu.HL)); cpu.M = 2; cpu.T = 8; },
  SUBCAA: cpu => SBC_A_n(cpu, 'A'),
  SUBCAn: (cpu) => { cpu.A = sbc(cpu, cpu.mmu.read8(cpu, cpu.PC++)); cpu.M = 2; cpu.T = 8; },
};

const LOGICAL = {
  ORB: cpu => OR_n(cpu, 'B'),
  ORC: cpu => OR_n(cpu, 'C'),
  ORD: cpu => OR_n(cpu, 'D'),
  ORE: cpu => OR_n(cpu, 'E'),
  ORH: cpu => OR_n(cpu, 'H'),
  ORL: cpu => OR_n(cpu, 'L'),
  ORA: cpu => OR_n(cpu, 'A'),
  ORHLm: (cpu) => { cpu.A = or(cpu, cpu.mmu.read8(cpu, cpu.HL)); cpu.M = 1; cpu.T = 4; },
  ORn: (cpu) => { cpu.A = or(cpu, cpu.mmu.read8(cpu, cpu.PC++)); cpu.M = 2; cpu.T = 8; },

  XORB: cpu => XOR_n(cpu, 'B'),
  XORC: cpu => XOR_n(cpu, 'C'),
  XORD: cpu => XOR_n(cpu, 'D'),
  XORE: cpu => XOR_n(cpu, 'E'),
  XORH: cpu => XOR_n(cpu, 'H'),
  XORL: cpu => XOR_n(cpu, 'L'),
  XORA: (cpu) => { XOR_n(cpu, 'A'); },
  XORHLm: (cpu) => { cpu.A = xor(cpu, cpu.mmu.read8(cpu, cpu.HL)); cpu.M = 2; cpu.T = 8; },
  XORn: (cpu) => { cpu.A = xor(cpu, cpu.mmu.read8(cpu, cpu.PC++)); cpu.M = 2; cpu.T = 8; },

  CPB: cpu => CP_n(cpu, 'B'),
  CPC: cpu => CP_n(cpu, 'C'),
  CPD: cpu => CP_n(cpu, 'D'),
  CPE: cpu => CP_n(cpu, 'E'),
  CPH: cpu => CP_n(cpu, 'H'),
  CPL: cpu => CP_n(cpu, 'L'),
  CPA: cpu => CP_n(cpu, 'A'),
  CPHLm: (cpu) => { sub(cpu, cpu.mmu.read8(cpu, cpu.HL)); cpu.M = 2; cpu.T = 8; },
  CPn: (cpu) => { sub(cpu, cpu.mmu.read8(cpu, cpu.PC++)); cpu.M = 2; cpu.T = 8; },
};

const INCREMENT = {
  // // 8 bit increments. Flag = (* 0 * -)
  INCB: cpu => INC_n(cpu, 'B'),
  INCC: cpu => INC_n(cpu, 'C'),
  INCD: cpu => INC_n(cpu, 'D'),
  INCE: cpu => INC_n(cpu, 'E'),
  INCH: cpu => INC_n(cpu, 'H'),
  INCL: cpu => INC_n(cpu, 'L'),
  INCHLm: (cpu) => {
    const val = cpu.mmu.read8(cpu, cpu.HL);
    cpu.mmu.write8(cpu, cpu.HL, inc(cpu, val));
    cpu.M = 3; cpu.T = 12;
  },
  INCA: cpu => INC_n(cpu, 'A'),

  // // 16 bit increments Flag = (- - - -)
  INCBC: cpu => INC_nn(cpu, 'BC'),
  INCDE: cpu => INC_nn(cpu, 'DE'),
  INCHL: cpu => INC_nn(cpu, 'HL'),
  INCSP: cpu => INC_nn(cpu, 'SP'),
};


const DECREMENT = {
  // // 8 bit decrements Flag = (* 1 * -)
  DECB: cpu => DEC_n(cpu, 'B'),
  DECC: cpu => DEC_n(cpu, 'C'),
  DECD: cpu => DEC_n(cpu, 'D'),
  DECE: cpu => DEC_n(cpu, 'E'),
  DECH: cpu => DEC_n(cpu, 'H'),
  DECL: cpu => DEC_n(cpu, 'L'),
  DECHLm: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, cpu.HL, dec(cpu, val)); cpu.M = 3; cpu.T = 12; },
  DECA: cpu => DEC_n(cpu, 'A'),

  // // 16 bit decrements. Flag = (- - - -)
  DECBC: cpu => DEC_nn(cpu, 'BC'),
  DECDE: cpu => DEC_nn(cpu, 'DE'),
  DECHL: cpu => DEC_nn(cpu, 'HL'),
  DECSP: cpu => DEC_nn(cpu, 'SP'),
};

const JUMP = {
  JPnn: (cpu) => { cpu.PC = cpu.mmu.read16(cpu, cpu.PC); cpu.M = 4; cpu.T = 16; },

  JPNZnn: cpu => JP_cc_nn(cpu, !(cpu.F & zFlag)),
  JPNCnn: cpu => JP_cc_nn(cpu, !(cpu.F & cFlag)),
  JPZnn: cpu => JP_cc_nn(cpu, (cpu.F & zFlag)),
  JPCnn: cpu => JP_cc_nn(cpu, (cpu.F & cFlag)),

  JPHLm: (cpu) => { cpu.PC = cpu.HL; cpu.M = 1; cpu.T = 4; },

  JRn: (cpu) => {
    const val = cpu.mmu.read8(cpu, cpu.PC++).signed();
    cpu.PC += val;
    cpu.M = 3; cpu.T = 12;
  },

  JRNZn: cpu => JR_cc_n(cpu, !(cpu.F & zFlag)),
  JRNCn: cpu => JR_cc_n(cpu, !(cpu.F & cFlag)),
  JRZn: cpu => JR_cc_n(cpu, (cpu.F & zFlag)),
  JRCn: cpu => JR_cc_n(cpu, (cpu.F & cFlag)),
};


const CALL = {
  CALLnn: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu, cpu.SP, cpu.PC + 2);
    cpu.PC = cpu.mmu.read16(cpu, cpu.PC);
    cpu.M = 6; cpu.T = 24;
  },

  CALLNZnn: cpu => CALL_cc_nn(cpu, !(cpu.F & zFlag)),
  CALLNCnn: cpu => CALL_cc_nn(cpu, !(cpu.F & cFlag)),
  CALLZnn: cpu => CALL_cc_nn(cpu, (cpu.F & zFlag)),
  CALLCnn: cpu => CALL_cc_nn(cpu, (cpu.F & cFlag)),
};

const RETURN = {
  RET: (cpu) => {
    cpu.PC = cpu.mmu.read16(cpu, cpu.SP);
    cpu.SP += 2;
    cpu.M = 4; cpu.T = 16;
  },

  RETNZ: cpu => RET_cc(cpu, !(cpu.F & zFlag)),
  RETNC: cpu => RET_cc(cpu, !(cpu.F & cFlag)),
  RETZ: cpu => RET_cc(cpu, (cpu.F & zFlag)),
  RETC: cpu => RET_cc(cpu, (cpu.F & cFlag)),

  RETI: (cpu) => {
    cpu.ime = 1;
    cpu.PC = cpu.mmu.read16(cpu, cpu.SP);
    cpu.SP += 2;
    cpu.M = 3; cpu.T = 12;
  },
};

const RESTART = {
  RST40: (cpu) => { cpu.rstCalled = true; cpu.ime = 0; cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x0040; cpu.M = 3; cpu.T = 12; },
  RST48: (cpu) => { cpu.rstCalled = true; cpu.ime = 0; cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x0048; cpu.M = 3; cpu.T = 12; },
  RST50: (cpu) => { cpu.rstCalled = true; cpu.ime = 0; cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x0050; cpu.M = 3; cpu.T = 12; },
  RST58: (cpu) => { cpu.rstCalled = true; cpu.ime = 0; cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x0058; cpu.M = 3; cpu.T = 12; },
  RST60: (cpu) => { cpu.rstCalled = true; cpu.ime = 0; cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x0060; cpu.M = 3; cpu.T = 12; },
};


const ROTATE = {
  // Flag = (0 0 0 *)
  RLCA: (cpu) => {
    const carry = cpu.A & 0x80 ? 1 : 0;
    cpu.F = carry ? cFlag : 0;
    cpu.A = ((cpu.A << 1) | carry) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  RLA: (cpu) => {
    const carry = cpu.F & 0x10 ? 1 : 0;
    const overflow = cpu.A & 0x80 ? cFlag : 0;
    cpu.A = (cpu.A << 1) | carry;
    cpu.F = overflow;
    cpu.M = 1; cpu.T = 4;
  },
  RRCA: (cpu) => {
    const carry = cpu.A & 1 ? 0x80 : 0;
    cpu.F = carry ? cFlag : 0;
    cpu.A = ((cpu.A >> 1) | carry) & 0xff;
    cpu.M = 1; cpu.T = 4;
  },
  RRA: (cpu) => {
    const carry = cpu.F & cFlag ? 0x80 : 0;
    cpu.F = cpu.A & 1 ? 0x10 : 0;
    cpu.A = (cpu.A >> 1) | carry;
    cpu.M = 1; cpu.T = 4;
  },
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
  [OPCODES.LDABCm]: LOAD.LDABCm,
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
  [OPCODES.JRn]: JUMP.JRn,
  [OPCODES.ADDHLDE]: ADD.ADDHLDE,
  [OPCODES.LDADEm]: LOAD.LDADEm,
  [OPCODES.DECDE]: DECREMENT.DECDE,
  [OPCODES.INCE]: INCREMENT.INCE,
  [OPCODES.DECE]: DECREMENT.DECE,
  [OPCODES.LDEn]: LOAD.LDEn,
  [OPCODES.RRA]: ROTATE.RRA,

  /* ------------------------ 0x2------------------------ */
  [OPCODES.JRNZn]: JUMP.JRNZn,
  [OPCODES.LDHLnn]: LOAD.LDHLnn,
  [OPCODES.LDIHLmA]: (cpu) => { cpu.mmu.write8(cpu, cpu.HL++, cpu.A); cpu.M = 2; cpu.T = 8; },
  [OPCODES.INCHL]: INCREMENT.INCHL,
  [OPCODES.INCH]: INCREMENT.INCH,
  [OPCODES.DECH]: DECREMENT.DECH,
  [OPCODES.LDHn]: LOAD.LDHn,
  [OPCODES.DAA]: (cpu) => {
    // const isSub = (cpu.F & 0x40) ? 1 : 0;
    // const half = (cpu.F & 0x20) ? 1 : 0;
    // const carry = (cpu.F & 0x10) ? 1 : 0;

    // if (isSub) {
    //   if (carry || cpu.A > 0x99) { cpu.A = (cpu.A + 0x60) & 0xff; cpu.F |= 0x10; }
    //   if (half || (cpu.A & 0x0f) > 0x09) { cpu.A = (cpu.A + 0x6) & 0xff; }
    // } else {
    //   if (carry) { cpu.A = (cpu.A - 0x60) & 0xff; }
    //   if (half) { cpu.A = (cpu.A - 0x6) & 0xff; }
    // }

    // cpu.F |= (cpu.A === 0 ? 0x80 : 0);
    // cpu.F &= ~0x20;

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


    let r;
    let adjust = 0;

    if (cpu.F & hFlag) adjust |= 0x06;
    if (cpu.F & cFlag) adjust |= 0x60;

    if (cpu.F & nFlag) r = cpu.A - adjust;
    else {
      if ((cpu.A & 0xf) > 0x9) adjust |= 0x06;
      if (cpu.A > 0x99) adjust |= 0x60;
      r = cpu.A + adjust;
    }

    cpu.F &= ~0xb0;
    if ((r & 0xff) === 0) cpu.F |= zFlag;
    if ((adjust & 0x60) !== 0) cpu.F |= cFlag;

    cpu.A = r;
  },
  [OPCODES.JRZn]: JUMP.JRZn,
  [OPCODES.ADDHLHL]: ADD.ADDHLHL,
  [OPCODES.LDIAHLm]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, cpu.HL++); cpu.M = 2; cpu.T = 8; },
  [OPCODES.DECHL]: DECREMENT.DECHL,
  [OPCODES.INCL]: INCREMENT.INCL,
  [OPCODES.DECL]: DECREMENT.DECL,
  [OPCODES.LDLn]: LOAD.LDLn,
  [OPCODES.CMPL]: (cpu) => {
    cpu.A ^= 0xff;
    cpu.F |= 0x60;
    cpu.M = 1; cpu.T = 4;
  },

  /* ------------------------ 0x3 ------------------------ */
  [OPCODES.JRNCn]: JUMP.JRNCn,
  [OPCODES.LDSPnn]: LOAD.LDSPnn,
  [OPCODES.LDDHLmA]: (cpu) => {
    cpu.mmu.write8(cpu, cpu.HL--, cpu.A);
    cpu.M = 2; cpu.T = 8;
  },
  [OPCODES.INCSP]: INCREMENT.INCSP,
  [OPCODES.INCHLm]: INCREMENT.INCHLm,
  [OPCODES.DECHLm]: DECREMENT.DECHLm,
  [OPCODES.LDHLmn]: (cpu) => { cpu.mmu.write8(cpu, cpu.HL, cpu.mmu.read8(cpu, cpu.PC++)); cpu.M = 3; cpu.T = 12; },
  [OPCODES.SCF]: (cpu) => { cpu.F &= ~0x60; cpu.F |= cFlag; cpu.M = 1; cpu.T = 4; },
  [OPCODES.JRCn]: JUMP.JRCn,
  [OPCODES.ADDHLSP]: ADD.ADDHLSP,
  [OPCODES.LDDAHLm]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, cpu.HL--); cpu.M = 2; cpu.T = 8; },
  [OPCODES.DECSP]: DECREMENT.DECSP,
  [OPCODES.INCA]: INCREMENT.INCA,
  [OPCODES.DECA]: DECREMENT.DECA,
  [OPCODES.LDAn]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, cpu.PC++); cpu.M = 2; cpu.T = 8; },
  [OPCODES.CFF]: (cpu) => { cpu.F &= ~0x60; cpu.F ^= cFlag; cpu.M = 1; cpu.T = 4; },

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
  [OPCODES.ANDHLm]: (cpu) => { cpu.A &= cpu.mmu.read8(cpu, cpu.HL); cpu.F = !cpu.A ? 0xa0 : 0x20; cpu.M = 2; cpu.T = 8; },
  [OPCODES.ANDA]: (cpu) => { cpu.F = !cpu.A ? 0xa0 : 0x20; cpu.M = 1; cpu.T = 4; },
  [OPCODES.XORB]: LOGICAL.XORB,
  [OPCODES.XORC]: LOGICAL.XORC,
  [OPCODES.XORD]: LOGICAL.XORD,
  [OPCODES.XORE]: LOGICAL.XORE,
  [OPCODES.XORH]: LOGICAL.XORH,
  [OPCODES.XORL]: LOGICAL.XORL,
  [OPCODES.XORHLm]: LOGICAL.XORHLm,
  [OPCODES.XORA]: LOGICAL.XORA,

  /* ------------------------ 0xb ------------------------ */
  [OPCODES.ORB]: LOGICAL.ORB,
  [OPCODES.ORC]: LOGICAL.ORC,
  [OPCODES.ORD]: LOGICAL.ORD,
  [OPCODES.ORE]: LOGICAL.ORE,
  [OPCODES.ORH]: LOGICAL.ORH,
  [OPCODES.ORL]: LOGICAL.ORL,
  [OPCODES.ORHLm]: LOGICAL.ORHLm,
  [OPCODES.ORA]: LOGICAL.ORA,
  [OPCODES.CPB]: LOGICAL.CPB,
  [OPCODES.CPC]: LOGICAL.CPC,
  [OPCODES.CPD]: LOGICAL.CPD,
  [OPCODES.CPE]: LOGICAL.CPE,
  [OPCODES.CPH]: LOGICAL.CPH,
  [OPCODES.CPL]: LOGICAL.CPL,
  [OPCODES.CPHLm]: LOGICAL.CPHLm,
  [OPCODES.CPA]: LOGICAL.CPA,

  /* ------------------------ 0xc ------------------------ */
  [OPCODES.RETNZ]: RETURN.RETNZ,
  [OPCODES.POPBC]: LOAD.POPBC,
  [OPCODES.JPNZnn]: JUMP.JPNZnn,
  [OPCODES.JPnn]: JUMP.JPnn,
  [OPCODES.CALLNZnn]: CALL.CALLNZnn,
  [OPCODES.PUSHBC]: LOAD.PUSHBC,
  [OPCODES.ADDAn]: ADD.ADDAn,
  [OPCODES.RST00]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu, cpu.SP, cpu.PC);
    cpu.PC = 0x00;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.RETZ]: RETURN.RETZ,
  [OPCODES.RET]: RETURN.RET,
  [OPCODES.JPZnn]: JUMP.JPZnn,
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
  [OPCODES.CALLZnn]: CALL.CALLZnn,
  [OPCODES.CALLnn]: CALL.CALLnn,
  [OPCODES.ADCAn]: ADD.ADCAn,
  [OPCODES.RST08]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu, cpu.SP, cpu.PC);
    cpu.PC = 0x08;
    cpu.M = 3; cpu.T = 12;
  },

  /* ------------------------ 0xd ------------------------ */
  [OPCODES.RETNC]: RETURN.RETNC,
  [OPCODES.POPDE]: LOAD.POPDE,
  [OPCODES.JPNCnn]: JUMP.JPNCnn,
  [OPCODES.CALLNCnn]: CALL.CALLNCnn,
  [OPCODES.PUSHDE]: LOAD.PUSHDE,
  [OPCODES.SUBAn]: SUBTRACT.SUBAn,
  [OPCODES.RST10]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu, cpu.SP, cpu.PC);
    cpu.PC = 0x10;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.RETC]: RETURN.RETC,
  [OPCODES.RETI]: RETURN.RETI,
  [OPCODES.JPCnn]: JUMP.JPCnn,
  [OPCODES.CALLCnn]: CALL.CALLCnn,
  [OPCODES.SUBCAn]: SUBTRACT.SUBCAn,
  [OPCODES.RST18]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu, cpu.SP, cpu.PC);
    cpu.PC = 0x18;
    cpu.M = 3; cpu.T = 12;
  },

  /* ------------------------ 0xe ------------------------ */
  [OPCODES.LDHnmA]: (cpu) => { cpu.mmu.write8(cpu, 0xff00 | cpu.mmu.read8(cpu, cpu.PC++), cpu.A); cpu.M = 3; cpu.T = 12; },
  [OPCODES.POPHL]: LOAD.POPHL,
  [OPCODES.LDHCmA]: (cpu) => { cpu.mmu.write8(cpu, 0xff00 | cpu.C, cpu.A); cpu.M = 2; cpu.T = 8; },
  [OPCODES.PUSHHL]: LOAD.PUSHHL,
  [OPCODES.ANDn]: (cpu) => { cpu.A = and(cpu, cpu.mmu.read8(cpu, cpu.PC++)); cpu.M = 2; cpu.T = 8; },
  [OPCODES.RST20]: (cpu) => {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu, cpu.SP, cpu.PC);
    cpu.PC = 0x20;
    cpu.M = 3; cpu.T = 12;
  },
  [OPCODES.ADDSPd]: ADD.ADDSPd,
  [OPCODES.JPHLm]: JUMP.JPHLm,
  [OPCODES.LDnnmA]: (cpu) => { cpu.mmu.write8(cpu, cpu.mmu.read16(cpu, cpu.PC), cpu.A); cpu.PC += 2; cpu.M = 4; cpu.T = 16; },
  [OPCODES.XORn]: LOGICAL.XORn,
  [OPCODES.RST28]: (cpu) => { cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x28; cpu.M = 3; cpu.T = 12; },

  // /* ------------------------ 0xf ------------------------ */
  [OPCODES.LDHAnm]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, 0xff00 | cpu.mmu.read8(cpu, cpu.PC++)); cpu.M = 3; cpu.T = 12; },
  [OPCODES.POPAF]: LOAD.POPAF,
  [OPCODES.LDAIOC]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, 0xff00 | cpu.C); cpu.M = 2; cpu.T = 8; },
  [OPCODES.DI]: (cpu) => { cpu.ime = 0; cpu.M = 1; cpu.T = 4; },
  [OPCODES.PUSHAF]: LOAD.PUSHAF,
  [OPCODES.ORn]: LOGICAL.ORn,
  [OPCODES.RST30]: (cpu) => { cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu.PC); cpu.PC = 0x30; cpu.M = 3; cpu.T = 12; },
  // [OPCODES.LDHLSPd]: (cpu) => {
  //   const i = cpu.mmu.read8(cpu, cpu.PC++).signed();
  //   const result = cpu.SP + i;
  //   const op = cpu.SP ^ i ^ result;

  //   cpu.F = 0;
  //   if ((op & 0x10) !== 0) cpu.F |= hFlag;
  //   if ((op & 0x100) !== 0) cpu.F |= cFlag;
  //   cpu.HL = result;
  //   cpu.M = 3; cpu.T = 12;
  // },
  [OPCODES.LDSPHL]: (cpu) => { cpu.SP = cpu.HL; cpu.M = 2; cpu.T = 8; },
  [OPCODES.LDAnnm]: (cpu) => { cpu.A = cpu.mmu.read8(cpu, cpu.mmu.read16(cpu, cpu.PC)); cpu.PC += 2; cpu.M = 4; cpu.T = 16; },
  [OPCODES.EI]: (cpu) => { cpu.ime = 1; cpu.M = 1; cpu.T = 4; },
  [OPCODES.CPn]: LOGICAL.CPn,
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
