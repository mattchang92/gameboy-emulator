const {
  // testBit,
  // swap,
  // rlc,
  // rl,
  // rrc,
  // rr,
  // sla,
  // sra,
  // srl,
  // SWAP_n,
  // RLC_n,
  // RL_n,
  // RRC_n,
  // RR_n,
  // SLA_n,
  // SRA_n,
  // SRL_n,
} = require('./utils');

const CBOPCODES = {
  // RLCB: 0x00,
  // RLCC: 0x01,
  // RLCD: 0x02,
  // RLCE: 0x03,
  // RLCH: 0x04,
  // RLCL: 0x05,
  // RLCHLm: 0x06,
  // RLCA: 0x07,
  // RRCB: 0x08,
  // RRCC: 0x09,
  // RRCD: 0x0a,
  // RRCE: 0x0b,
  // RRCH: 0x0c,
  // RRCL: 0x0d,
  // RRCHLm: 0x0e,
  // RRCA: 0x0f,

  // RLB: 0x10,
  // RLC: 0x11,
  // RLD: 0x12,
  // RLE: 0x13,
  // RLH: 0x14,
  // RLL: 0x15,
  // RLHLm: 0x16,
  // RLA: 0x17,
  // RRB: 0x18,
  // RRC: 0x19,
  // RRD: 0x1a,
  // RRE: 0x1b,
  // RRH: 0x1c,
  // RRL: 0x1d,
  // RRHLm: 0x1e,
  // RRA: 0x1f,

  // SLAB: 0x20,
  // SLAC: 0x21,
  // SLAD: 0x22,
  // SLAE: 0x23,
  // SLAH: 0x24,
  // SLAL: 0x25,
  // SLAHLm: 0x26,
  // SLAA: 0x27,
  // SRAB: 0x28,
  // SRAC: 0x29,
  // SRAD: 0x2a,
  // SRAE: 0x2b,
  // SRAH: 0x2c,
  // SRAL: 0x2d,
  // SRAHLm: 0x2e,
  // SRAA: 0x2f,

  // SWAPB: 0x30,
  // SWAPC: 0x31,
  // SWAPD: 0x32,
  // SWAPE: 0x33,
  // SWAPH: 0x34,
  // SWAPL: 0x35,
  // SWAPHLm: 0x36,
  // SWAPA: 0x37,
  // SRLB: 0x38,
  // SRLC: 0x39,
  // SRLD: 0x3a,
  // SRLE: 0x3b,
  // SRLH: 0x3c,
  // SRLL: 0x3d,
  // SRLHLm: 0x3e,
  // SRLA: 0x3f,

  // BIT0B: 0x40,
  // BIT0C: 0x41,
  // BIT0D: 0x42,
  // BIT0E: 0x43,
  // BIT0H: 0x44,
  // BIT0L: 0x45,
  // BIT0HLm: 0x46,
  // BIT0A: 0x47,
  // BIT1B: 0x48,
  // BIT1C: 0x49,
  // BIT1D: 0x4a,
  // BIT1E: 0x4b,
  // BIT1H: 0x4c,
  // BIT1L: 0x4d,
  // BIT1HLm: 0x4e,
  // BIT1A: 0x4f,

  // BIT2B: 0x50,
  // BIT2C: 0x51,
  // BIT2D: 0x52,
  // BIT2E: 0x53,
  // BIT2H: 0x54,
  // BIT2L: 0x55,
  // BIT2HLm: 0x56,
  // BIT2A: 0x57,
  // BIT3B: 0x58,
  // BIT3C: 0x59,
  // BIT3D: 0x5a,
  // BIT3E: 0x5b,
  // BIT3H: 0x5c,
  // BIT3L: 0x5d,
  // BIT3HLm: 0x5e,
  // BIT3A: 0x5f,

  // BIT4B: 0x60,
  // BIT4C: 0x61,
  // BIT4D: 0x62,
  // BIT4E: 0x63,
  // BIT4H: 0x64,
  // BIT4L: 0x65,
  // BIT4HLm: 0x66,
  // BIT4A: 0x67,
  // BIT5B: 0x68,
  // BIT5C: 0x69,
  // BIT5D: 0x6a,
  // BIT5E: 0x6b,
  // BIT5H: 0x6c,
  // BIT5L: 0x6d,
  // BIT5HLm: 0x6e,
  // BIT5A: 0x6f,

  // BIT6B: 0x70,
  // BIT6C: 0x71,
  // BIT6D: 0x72,
  // BIT6E: 0x73,
  // BIT6H: 0x74,
  // BIT6L: 0x75,
  // BIT6HLm: 0x76,
  // BIT6A: 0x77,
  // BIT7B: 0x78,
  // BIT7C: 0x79,
  // BIT7D: 0x7a,
  // BIT7E: 0x7b,
  // BIT7H: 0x7c,
  // BIT7L: 0x7d,
  // BIT7HLm: 0x7e,
  // BIT7A: 0x7f,

  // RES0B: 0x80,
  // RES0C: 0x81,
  // RES0D: 0x82,
  // RES0E: 0x83,
  // RES0H: 0x84,
  // RES0L: 0x85,
  // RES0HLm: 0x86,
  // RES0A: 0x87,
  // RES1B: 0x88,
  // RES1C: 0x89,
  // RES1D: 0x8a,
  // RES1E: 0x8b,
  // RES1H: 0x8c,
  // RES1L: 0x8d,
  // RES1HLm: 0x8e,
  // RES1A: 0x8f,

  // RES2B: 0x90,
  // RES2C: 0x91,
  // RES2D: 0x92,
  // RES2E: 0x93,
  // RES2H: 0x94,
  // RES2L: 0x95,
  // RES2HLm: 0x96,
  // RES2A: 0x97,
  // RES3B: 0x98,
  // RES3C: 0x99,
  // RES3D: 0x9a,
  // RES3E: 0x9b,
  // RES3H: 0x9c,
  // RES3L: 0x9d,
  // RES3HLm: 0x9e,
  // RES3A: 0x9f,

  // RES4B: 0xa0,
  // RES4C: 0xa1,
  // RES4D: 0xa2,
  // RES4E: 0xa3,
  // RES4H: 0xa4,
  // RES4L: 0xa5,
  // RES4HLm: 0xa6,
  // RES4A: 0xa7,
  // RES5B: 0xa8,
  // RES5C: 0xa9,
  // RES5D: 0xaa,
  // RES5E: 0xab,
  // RES5H: 0xac,
  // RES5L: 0xad,
  // RES5HLm: 0xae,
  // RES5A: 0xaf,

  // RES6B: 0xb0,
  // RES6C: 0xb1,
  // RES6D: 0xb2,
  // RES6E: 0xb3,
  // RES6H: 0xb4,
  // RES6L: 0xb5,
  // RES6HLm: 0xb6,
  // RES6A: 0xb7,
  // RES7B: 0xb8,
  // RES7C: 0xb9,
  // RES7D: 0xba,
  // RES7E: 0xbb,
  // RES7H: 0xbc,
  // RES7L: 0xbd,
  // RES7HLm: 0xbe,
  // RES7A: 0xbf,

  // SET0B: 0xc0,
  // SET0C: 0xc1,
  // SET0D: 0xc2,
  // SET0E: 0xc3,
  // SET0H: 0xc4,
  // SET0L: 0xc5,
  // SET0HLm: 0xc6,
  // SET0A: 0xc7,
  // SET1B: 0xc8,
  // SET1C: 0xc9,
  // SET1D: 0xca,
  // SET1E: 0xcb,
  // SET1H: 0xcc,
  // SET1L: 0xcd,
  // SET1HLm: 0xce,
  // SET1A: 0xcf,

  // SET2B: 0xd0,
  // SET2C: 0xd1,
  // SET2D: 0xd2,
  // SET2E: 0xd3,
  // SET2H: 0xd4,
  // SET2L: 0xd5,
  // SET2HLm: 0xd6,
  // SET2A: 0xd7,
  // SET3B: 0xd8,
  // SET3C: 0xd9,
  // SET3D: 0xda,
  // SET3E: 0xdb,
  // SET3H: 0xdc,
  // SET3L: 0xdd,
  // SET3HLm: 0xde,
  // SET3A: 0xdf,

  // SET4B: 0xe0,
  // SET4C: 0xe1,
  // SET4D: 0xe2,
  // SET4E: 0xe3,
  // SET4H: 0xe4,
  // SET4L: 0xe5,
  // SET4HLm: 0xe6,
  // SET4A: 0xe7,
  // SET5B: 0xe8,
  // SET5C: 0xe9,
  // SET5D: 0xea,
  // SET5E: 0xeb,
  // SET5H: 0xec,
  // SET5L: 0xed,
  // SET5HLm: 0xee,
  // SET5A: 0xef,

  // SET6B: 0xf0,
  // SET6C: 0xf1,
  // SET6D: 0xf2,
  // SET6E: 0xf3,
  // SET6H: 0xf4,
  // SET6L: 0xf5,
  // SET6HLm: 0xf6,
  // SET6A: 0xf7,
  // SET7B: 0xf8,
  // SET7C: 0xf9,
  // SET7D: 0xfa,
  // SET7E: 0xfb,
  // SET7H: 0xfc,
  // SET7L: 0xfd,
  // SET7HLm: 0xfe,
  // SET7A: 0xff,
};

const SWAP = {
  // SWAPB: cpu => SWAP_n(cpu, 'B'),
  // SWAPC: cpu => SWAP_n(cpu, 'C'),
  // SWAPD: cpu => SWAP_n(cpu, 'D'),
  // SWAPE: cpu => SWAP_n(cpu, 'E'),
  // SWAPH: cpu => SWAP_n(cpu, 'H'),
  // SWAPL: cpu => SWAP_n(cpu, 'L'),
  // SWAPA: cpu => SWAP_n(cpu, 'A'),

  // SWAPHLm: (cpu) => {
  //   const n = cpu.mmu.read8(cpu, cpu.HL);
  //   cpu.mmu.write8(cpu, cpu.HL, swap(cpu, n));
  //   cpu.M = 3; cpu.T = 12;
  // },
};

const ROTATE = {
  // RLCB: cpu => RLC_n(cpu, 'B'),
  // RLCC: cpu => RLC_n(cpu, 'C'),
  // RLCD: cpu => RLC_n(cpu, 'D'),
  // RLCE: cpu => RLC_n(cpu, 'E'),
  // RLCH: cpu => RLC_n(cpu, 'H'),
  // RLCL: cpu => RLC_n(cpu, 'L'),
  // RLCA: cpu => RLC_n(cpu, 'A'),
  // RLCHLm: (cpu) => {
  //   const n = cpu.mmu.read8(cpu, cpu.HL);
  //   cpu.mmu.write8(cpu, cpu.HL, rlc(cpu, n));
  //   cpu.M = 4; cpu.T = 16;
  // },

  // RLB: cpu => RL_n(cpu, 'B'),
  // RLC: cpu => RL_n(cpu, 'C'),
  // RLD: cpu => RL_n(cpu, 'D'),
  // RLE: cpu => RL_n(cpu, 'E'),
  // RLH: cpu => RL_n(cpu, 'H'),
  // RLL: cpu => RL_n(cpu, 'L'),
  // RLA: cpu => RL_n(cpu, 'A'),
  // RLHLm: (cpu) => {
  //   const n = cpu.mmu.read8(cpu, cpu.HL);
  //   cpu.mmu.write8(cpu, cpu.HL, rl(cpu, n));
  //   cpu.M = 4; cpu.T = 16;
  // },

  // RRCB: cpu => RRC_n(cpu, 'B'),
  // RRCC: cpu => RRC_n(cpu, 'C'),
  // RRCD: cpu => RRC_n(cpu, 'D'),
  // RRCE: cpu => RRC_n(cpu, 'E'),
  // RRCH: cpu => RRC_n(cpu, 'H'),
  // RRCL: cpu => RRC_n(cpu, 'L'),
  // RRCA: cpu => RRC_n(cpu, 'A'),
  // RRCHLm: (cpu) => {
  //   const n = cpu.mmu.read8(cpu, cpu.HL);
  //   cpu.mmu.write8(cpu, cpu.HL, rrc(cpu, n));
  //   cpu.M = 4; cpu.T = 16;
  // },

  // RRB: cpu => RR_n(cpu, 'B'),
  // RRC: cpu => RR_n(cpu, 'C'),
  // RRD: cpu => RR_n(cpu, 'D'),
  // RRE: cpu => RR_n(cpu, 'E'),
  // RRH: cpu => RR_n(cpu, 'H'),
  // RRL: cpu => RR_n(cpu, 'L'),
  // RRA: cpu => RR_n(cpu, 'A'),
  // RRHLm: (cpu) => {
  //   const n = cpu.mmu.read8(cpu, cpu.HL);
  //   cpu.mmu.write8(cpu, cpu.HL, rr(cpu, n));
  //   cpu.M = 4; cpu.T = 16;
  // },
};


const SHIFT = {
  // SLAB: cpu => SLA_n(cpu, 'B'),
  // SLAC: cpu => SLA_n(cpu, 'C'),
  // SLAD: cpu => SLA_n(cpu, 'D'),
  // SLAE: cpu => SLA_n(cpu, 'E'),
  // SLAH: cpu => SLA_n(cpu, 'H'),
  // SLAL: cpu => SLA_n(cpu, 'L'),
  // SLAA: cpu => SLA_n(cpu, 'A'),
  // SLAHLm: (cpu) => {
  //   const n = cpu.mmu.read8(cpu, cpu.HL);
  //   cpu.mmu.write8(cpu, cpu.HL, sla(cpu, n));
  //   cpu.M = 4; cpu.T = 16;
  // },

  // SRAB: cpu => SRA_n(cpu, 'B'),
  // SRAC: cpu => SRA_n(cpu, 'C'),
  // SRAD: cpu => SRA_n(cpu, 'D'),
  // SRAE: cpu => SRA_n(cpu, 'E'),
  // SRAH: cpu => SRA_n(cpu, 'H'),
  // SRAL: cpu => SRA_n(cpu, 'L'),
  // SRAA: cpu => SRA_n(cpu, 'A'),
  // SRAHLm: (cpu) => {
  //   const n = cpu.mmu.read8(cpu, cpu.HL);
  //   cpu.mmu.write8(cpu, cpu.HL, sra(cpu, n));
  //   cpu.M = 4; cpu.T = 16;
  // },

  // SRLB: cpu => SRL_n(cpu, 'B'),
  // SRLC: cpu => SRL_n(cpu, 'C'),
  // SRLD: cpu => SRL_n(cpu, 'D'),
  // SRLE: cpu => SRL_n(cpu, 'E'),
  // SRLH: cpu => SRL_n(cpu, 'H'),
  // SRLL: cpu => SRL_n(cpu, 'L'),
  // SRLA: cpu => SRL_n(cpu, 'A'),
  // SRLHLm: (cpu) => {
  //   const n = cpu.mmu.read8(cpu, cpu.HL);
  //   cpu.mmu.write8(cpu, cpu.HL, srl(cpu, n));
  //   cpu.M = 4; cpu.T = 16;
  // },
};

const cbopcodes = {
  // /* ------------------------ 0x0------------------------ */
  // [CBOPCODES.RLCB]: ROTATE.RLCB,
  // [CBOPCODES.RLCC]: ROTATE.RLCC,
  // [CBOPCODES.RLCD]: ROTATE.RLCD,
  // [CBOPCODES.RLCE]: ROTATE.RLCE,
  // [CBOPCODES.RLCH]: ROTATE.RLCH,
  // [CBOPCODES.RLCL]: ROTATE.RLCL,
  // [CBOPCODES.RLCHLm]: ROTATE.RLCHLm,
  // [CBOPCODES.RLCA]: ROTATE.RLCA,
  // [CBOPCODES.RRCB]: ROTATE.RRCB,
  // [CBOPCODES.RRCC]: ROTATE.RRCC,
  // [CBOPCODES.RRCD]: ROTATE.RRCD,
  // [CBOPCODES.RRCE]: ROTATE.RRCE,
  // [CBOPCODES.RRCH]: ROTATE.RRCHL,
  // [CBOPCODES.RRCL]: ROTATE.RRCA,
  // [CBOPCODES.RRCHLm]: ROTATE.RRCHLm,
  // [CBOPCODES.RRCA]: ROTATE.RRCA,

  // /* ------------------------ 0x1------------------------ */
  // [CBOPCODES.RLB]: ROTATE.RLB,
  // [CBOPCODES.RLC]: ROTATE.RLC,
  // [CBOPCODES.RLD]: ROTATE.RLD,
  // [CBOPCODES.RLE]: ROTATE.RLE,
  // [CBOPCODES.RLH]: ROTATE.RLH,
  // [CBOPCODES.RLL]: ROTATE.RLL,
  // [CBOPCODES.RLHLm]: ROTATE.RLHLm,
  // [CBOPCODES.RLA]: ROTATE.RLA,
  // [CBOPCODES.RRB]: ROTATE.RRB,
  // [CBOPCODES.RRC]: ROTATE.RRC,
  // [CBOPCODES.RRD]: ROTATE.RRD,
  // [CBOPCODES.RRE]: ROTATE.RRE,
  // [CBOPCODES.RRH]: ROTATE.RRH,
  // [CBOPCODES.RRL]: ROTATE.RRL,
  // [CBOPCODES.RRHLm]: ROTATE.RRHLm,
  // [CBOPCODES.RRA]: ROTATE.RRA,

  // /* ------------------------ 0x2------------------------ */
  // [CBOPCODES.SLAB]: SHIFT.SLAB,
  // [CBOPCODES.SLAC]: SHIFT.SLAC,
  // [CBOPCODES.SLAD]: SHIFT.SLAD,
  // [CBOPCODES.SLAE]: SHIFT.SLAE,
  // [CBOPCODES.SLAH]: SHIFT.SLAH,
  // [CBOPCODES.SLAL]: SHIFT.SLAL,
  // [CBOPCODES.SLAHLm]: SHIFT.SLAHLm,
  // [CBOPCODES.SLAA]: SHIFT.SLAA,
  // [CBOPCODES.SRAB]: SHIFT.SRAB,
  // [CBOPCODES.SRAC]: SHIFT.SRAC,
  // [CBOPCODES.SRAD]: SHIFT.SRAD,
  // [CBOPCODES.SRAE]: SHIFT.SRAE,
  // [CBOPCODES.SRAH]: SHIFT.SRAH,
  // [CBOPCODES.SRAL]: SHIFT.SRAL,
  // [CBOPCODES.SRAHLm]: SHIFT.SRAHLm,
  // [CBOPCODES.SRAA]: SHIFT.SRAA,

  // /* ------------------------ 0x3------------------------ */
  // [CBOPCODES.SWAPB]: SWAP.SWAPB,
  // [CBOPCODES.SWAPC]: SWAP.SWAPC,
  // [CBOPCODES.SWAPD]: SWAP.SWAPD,
  // [CBOPCODES.SWAPE]: SWAP.SWAPE,
  // [CBOPCODES.SWAPH]: SWAP.SWAPL,
  // [CBOPCODES.SWAPL]: SWAP.SWAP,
  // [CBOPCODES.SWAPHLm]: SWAP.SWAPHLm,
  // [CBOPCODES.SWAPA]: SWAP.SWAPA,
  // [CBOPCODES.SRLB]: SHIFT.SRLB,
  // [CBOPCODES.SRLC]: SHIFT.SRLC,
  // [CBOPCODES.SRLD]: SHIFT.SRLD,
  // [CBOPCODES.SRLE]: SHIFT.SRLE,
  // [CBOPCODES.SRLH]: SHIFT.SRLH,
  // [CBOPCODES.SRLL]: SHIFT.SRLL,
  // [CBOPCODES.SRLHLm]: SHIFT.SRLHLm,
  // [CBOPCODES.SRLA]: SHIFT.SRLA,

  // /* ------------------------ 0x4------------------------ */
  // [CBOPCODES.BIT0B]: (cpu) => { testBit(cpu, cpu.B & 0x01); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT0C]: (cpu) => { testBit(cpu, cpu.C & 0x01); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT0D]: (cpu) => { testBit(cpu, cpu.D & 0x01); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT0E]: (cpu) => { testBit(cpu, cpu.E & 0x01); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT0H]: (cpu) => { testBit(cpu, cpu.H & 0x01); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT0L]: (cpu) => { testBit(cpu, cpu.L & 0x01); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT0HLm]: (cpu) => { testBit(cpu, cpu.mmu.read8(cpu, cpu.HL) & 0x01); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.BIT0A]: (cpu) => { testBit(cpu, cpu.A & 0x01); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT1B]: (cpu) => { testBit(cpu, cpu.B & 0x02); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT1C]: (cpu) => { testBit(cpu, cpu.C & 0x02); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT1D]: (cpu) => { testBit(cpu, cpu.D & 0x02); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT1E]: (cpu) => { testBit(cpu, cpu.E & 0x02); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT1H]: (cpu) => { testBit(cpu, cpu.H & 0x02); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT1L]: (cpu) => { testBit(cpu, cpu.L & 0x02); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT1HLm]: (cpu) => { testBit(cpu, cpu.mmu.read8(cpu, cpu.HL) & 0x02); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.BIT1A]: (cpu) => { testBit(cpu, cpu.A & 0x02); cpu.M = 2; cpu.T = 8; },

  // /* ------------------------ 0x5------------------------ */
  // [CBOPCODES.BIT2B]: (cpu) => { testBit(cpu, cpu.B & 0x04); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT2C]: (cpu) => { testBit(cpu, cpu.C & 0x04); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT2D]: (cpu) => { testBit(cpu, cpu.D & 0x04); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT2E]: (cpu) => { testBit(cpu, cpu.E & 0x04); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT2H]: (cpu) => { testBit(cpu, cpu.H & 0x04); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT2L]: (cpu) => { testBit(cpu, cpu.L & 0x04); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT2HLm]: (cpu) => { testBit(cpu, cpu.mmu.read8(cpu, cpu.HL) & 0x04); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.BIT2A]: (cpu) => { testBit(cpu, cpu.A & 0x04); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT3B]: (cpu) => { testBit(cpu, cpu.B & 0x08); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT3C]: (cpu) => { testBit(cpu, cpu.C & 0x08); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT3D]: (cpu) => { testBit(cpu, cpu.D & 0x08); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT3E]: (cpu) => { testBit(cpu, cpu.E & 0x08); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT3H]: (cpu) => { testBit(cpu, cpu.H & 0x08); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT3L]: (cpu) => { testBit(cpu, cpu.L & 0x08); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT3HLm]: (cpu) => { testBit(cpu, cpu.mmu.read8(cpu, cpu.HL) & 0x08); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.BIT3A]: (cpu) => { testBit(cpu, cpu.A & 0x08); cpu.M = 2; cpu.T = 8; },

  // /* ------------------------ 0x6------------------------ */
  // [CBOPCODES.BIT4B]: (cpu) => { testBit(cpu, cpu.B & 0x10); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT4C]: (cpu) => { testBit(cpu, cpu.C & 0x10); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT4D]: (cpu) => { testBit(cpu, cpu.D & 0x10); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT4E]: (cpu) => { testBit(cpu, cpu.E & 0x10); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT4H]: (cpu) => { testBit(cpu, cpu.H & 0x10); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT4L]: (cpu) => { testBit(cpu, cpu.L & 0x10); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT4HLm]: (cpu) => { testBit(cpu, cpu.mmu.read8(cpu, cpu.HL) & 0x10); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.BIT4A]: (cpu) => { testBit(cpu, cpu.A & 0x10); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT5B]: (cpu) => { testBit(cpu, cpu.B & 0x20); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT5C]: (cpu) => { testBit(cpu, cpu.C & 0x20); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT5D]: (cpu) => { testBit(cpu, cpu.D & 0x20); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT5E]: (cpu) => { testBit(cpu, cpu.E & 0x20); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT5H]: (cpu) => { testBit(cpu, cpu.H & 0x20); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT5L]: (cpu) => { testBit(cpu, cpu.L & 0x20); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT5HLm]: (cpu) => { testBit(cpu, cpu.mmu.read8(cpu, cpu.HL) & 0x20); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.BIT5A]: (cpu) => { testBit(cpu, cpu.A & 0x20); cpu.M = 2; cpu.T = 8; },

  // /* ------------------------ 0x7------------------------ */
  // [CBOPCODES.BIT6B]: (cpu) => { testBit(cpu, cpu.B & 0x40); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT6C]: (cpu) => { testBit(cpu, cpu.C & 0x40); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT6D]: (cpu) => { testBit(cpu, cpu.D & 0x40); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT6E]: (cpu) => { testBit(cpu, cpu.E & 0x40); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT6H]: (cpu) => { testBit(cpu, cpu.H & 0x40); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT6L]: (cpu) => { testBit(cpu, cpu.L & 0x40); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT6HLm]: (cpu) => { testBit(cpu, cpu.mmu.read8(cpu, cpu.HL) & 0x40); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.BIT6A]: (cpu) => { testBit(cpu, cpu.A & 0x40); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT7B]: (cpu) => { testBit(cpu, cpu.B & 0x80); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT7C]: (cpu) => { testBit(cpu, cpu.C & 0x80); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT7D]: (cpu) => { testBit(cpu, cpu.D & 0x80); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT7E]: (cpu) => { testBit(cpu, cpu.E & 0x80); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT7H]: (cpu) => { testBit(cpu, cpu.H & 0x80); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT7L]: (cpu) => { testBit(cpu, cpu.L & 0x80); cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.BIT7HLm]: (cpu) => { testBit(cpu, cpu.mmu.read8(cpu, cpu.HL) & 0x80); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.BIT7A]: (cpu) => { testBit(cpu, cpu.A & 0x80); cpu.M = 2; cpu.T = 8; },

  // /* ------------------------ 0x8------------------------ */
  // [CBOPCODES.RES0B]: (cpu) => { cpu.B &= ~0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES0C]: (cpu) => { cpu.C &= ~0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES0D]: (cpu) => { cpu.D &= ~0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES0E]: (cpu) => { cpu.E &= ~0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES0H]: (cpu) => { cpu.H &= ~0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES0L]: (cpu) => { cpu.L &= ~0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES0HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val & ~0x01); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.RES0A]: (cpu) => { cpu.A &= ~0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES1B]: (cpu) => { cpu.B &= ~0x02; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES1C]: (cpu) => { cpu.C &= ~0x02; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES1D]: (cpu) => { cpu.D &= ~0x02; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES1E]: (cpu) => { cpu.E &= ~0x02; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES1H]: (cpu) => { cpu.H &= ~0x02; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES1L]: (cpu) => { cpu.L &= ~0x02; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES1HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val & ~0x02); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.RES1A]: (cpu) => { cpu.A &= ~0x02; cpu.M = 2; cpu.T = 8; },

  // /* ------------------------ 0x9------------------------ */
  // [CBOPCODES.RES2B]: (cpu) => { cpu.B &= ~0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES2C]: (cpu) => { cpu.C &= ~0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES2D]: (cpu) => { cpu.D &= ~0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES2E]: (cpu) => { cpu.E &= ~0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES2H]: (cpu) => { cpu.H &= ~0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES2L]: (cpu) => { cpu.L &= ~0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES2HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val & ~0x04); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.RES2A]: (cpu) => { cpu.A &= ~0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES3B]: (cpu) => { cpu.B &= ~0x08; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES3C]: (cpu) => { cpu.C &= ~0x08; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES3D]: (cpu) => { cpu.D &= ~0x08; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES3E]: (cpu) => { cpu.E &= ~0x08; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES3H]: (cpu) => { cpu.H &= ~0x08; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES3L]: (cpu) => { cpu.L &= ~0x08; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES3HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val & ~0x08); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.RES3A]: (cpu) => { cpu.A &= ~0x08; cpu.M = 2; cpu.T = 8; },

  // /* ------------------------ 0xa------------------------ */
  // [CBOPCODES.RES4B]: (cpu) => { cpu.B &= ~0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES4C]: (cpu) => { cpu.C &= ~0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES4D]: (cpu) => { cpu.D &= ~0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES4E]: (cpu) => { cpu.E &= ~0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES4H]: (cpu) => { cpu.H &= ~0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES4L]: (cpu) => { cpu.L &= ~0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES4HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val & ~0x10); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.RES4A]: (cpu) => { cpu.A &= ~0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES5B]: (cpu) => { cpu.B &= ~0x20; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES5C]: (cpu) => { cpu.C &= ~0x20; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES5D]: (cpu) => { cpu.D &= ~0x20; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES5E]: (cpu) => { cpu.E &= ~0x20; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES5H]: (cpu) => { cpu.H &= ~0x20; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES5L]: (cpu) => { cpu.L &= ~0x20; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES5HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val & ~0x20); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.RES5A]: (cpu) => { cpu.A &= ~0x20; cpu.M = 2; cpu.T = 8; },

  // /* ------------------------ 0xb------------------------ */
  // [CBOPCODES.RES6B]: (cpu) => { cpu.B &= ~0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES6C]: (cpu) => { cpu.C &= ~0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES6D]: (cpu) => { cpu.D &= ~0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES6E]: (cpu) => { cpu.E &= ~0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES6H]: (cpu) => { cpu.H &= ~0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES6L]: (cpu) => { cpu.L &= ~0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES6HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val & ~0x40); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.RES6A]: (cpu) => { cpu.A &= ~0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES7B]: (cpu) => { cpu.B &= ~0x80; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES7C]: (cpu) => { cpu.C &= ~0x80; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES7D]: (cpu) => { cpu.D &= ~0x80; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES7E]: (cpu) => { cpu.E &= ~0x80; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES7H]: (cpu) => { cpu.H &= ~0x80; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES7L]: (cpu) => { cpu.L &= ~0x80; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.RES7HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val & ~0x80); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.RES7A]: (cpu) => { cpu.A &= ~0x80; cpu.M = 2; cpu.T = 8; },

  // /* ------------------------ 0xc------------------------ */
  // [CBOPCODES.SET0B]: (cpu) => { cpu.B |= 0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET0C]: (cpu) => { cpu.C |= 0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET0D]: (cpu) => { cpu.D |= 0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET0E]: (cpu) => { cpu.E |= 0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET0H]: (cpu) => { cpu.H |= 0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET0L]: (cpu) => { cpu.L |= 0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET0HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val | 0x01); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.SET0A]: (cpu) => { cpu.A |= 0x01; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET1B]: (cpu) => { cpu.B |= 0x02; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET1C]: (cpu) => { cpu.C |= 0x02; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET1D]: (cpu) => { cpu.D |= 0x02; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET1E]: (cpu) => { cpu.E |= 0x02; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET1H]: (cpu) => { cpu.H |= 0x02; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET1L]: (cpu) => { cpu.L |= 0x02; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET1HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val | 0x02); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.SET1A]: (cpu) => { cpu.A |= 0x02; cpu.M = 2; cpu.T = 8; },

  // /* ------------------------ 0xd------------------------ */
  // [CBOPCODES.SET2B]: (cpu) => { cpu.B |= 0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET2C]: (cpu) => { cpu.C |= 0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET2D]: (cpu) => { cpu.D |= 0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET2E]: (cpu) => { cpu.E |= 0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET2H]: (cpu) => { cpu.H |= 0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET2L]: (cpu) => { cpu.L |= 0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET2HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val | 0x04); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.SET2A]: (cpu) => { cpu.A |= 0x04; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET3B]: (cpu) => { cpu.B |= 0x08; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET3C]: (cpu) => { cpu.C |= 0x08; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET3D]: (cpu) => { cpu.D |= 0x08; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET3E]: (cpu) => { cpu.E |= 0x08; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET3H]: (cpu) => { cpu.H |= 0x08; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET3L]: (cpu) => { cpu.L |= 0x08; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET3HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val | 0x08); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.SET3A]: (cpu) => { cpu.A |= 0x08; cpu.M = 2; cpu.T = 8; },

  // /* ------------------------ 0xe------------------------ */
  // [CBOPCODES.SET4B]: (cpu) => { cpu.B |= 0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET4C]: (cpu) => { cpu.C |= 0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET4D]: (cpu) => { cpu.D |= 0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET4E]: (cpu) => { cpu.E |= 0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET4H]: (cpu) => { cpu.H |= 0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET4L]: (cpu) => { cpu.L |= 0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET4HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val | 0x10); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.SET4A]: (cpu) => { cpu.A |= 0x10; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET5B]: (cpu) => { cpu.B |= 0x20; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET5C]: (cpu) => { cpu.C |= 0x20; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET5D]: (cpu) => { cpu.D |= 0x20; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET5E]: (cpu) => { cpu.E |= 0x20; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET5H]: (cpu) => { cpu.H |= 0x20; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET5L]: (cpu) => { cpu.L |= 0x20; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET5HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val | 0x20); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.SET5A]: (cpu) => { cpu.A |= 0x20; cpu.M = 2; cpu.T = 8; },

  // /* ------------------------ 0xf------------------------ */
  // [CBOPCODES.SET6B]: (cpu) => { cpu.B |= 0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET6C]: (cpu) => { cpu.C |= 0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET6D]: (cpu) => { cpu.D |= 0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET6E]: (cpu) => { cpu.E |= 0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET6H]: (cpu) => { cpu.H |= 0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET6L]: (cpu) => { cpu.L |= 0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET6HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val | 0x40); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.SET6A]: (cpu) => { cpu.A |= 0x40; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET7B]: (cpu) => { cpu.B |= 0x80; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET7C]: (cpu) => { cpu.C |= 0x80; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET7D]: (cpu) => { cpu.D |= 0x80; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET7E]: (cpu) => { cpu.E |= 0x80; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET7H]: (cpu) => { cpu.H |= 0x80; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET7L]: (cpu) => { cpu.L |= 0x80; cpu.M = 2; cpu.T = 8; },
  // [CBOPCODES.SET7HLm]: (cpu) => { const val = cpu.mmu.read8(cpu, cpu.HL); cpu.mmu.write8(cpu, (cpu.H << 8) | cpu.L, val | 0x80); cpu.M = 3; cpu.T = 12; },
  // [CBOPCODES.SET7A]: (cpu) => { cpu.A |= 0x80; cpu.M = 2; cpu.T = 8; },
};

module.exports = {
  CBOPCODES,
  cbopcodes,
};