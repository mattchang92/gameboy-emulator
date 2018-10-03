const {
  zFlag,
  nFlag,
  hFlag,
  cFlag,
} = require('../constants');

require('../utils/number');

// const testBit = (cpu, val) => {
//   cpu.F &= ~0xe0;
//   if (val === 0) cpu.F |= zFlag;
//   cpu.F |= hFlag;
// };

const swap = (cpu, n) => {
  const result = n << 4 | n >> 4;
  cpu.F = 0;
  if ((result & 0xff) === 0) cpu.F |= zFlag;

  return result;
};

// const rlc = (cpu, n) => {
//   const result = n << 1 | n >> 7;
//   cpu.F = 0;
//   if ((result & 0xff)) cpu.F |= zFlag;
//   if (n & 0x80 !== 0) cpu.F |= cFlag;

//   return result;
// };

// const rl = (cpu, n) => {
//   const carry = cpu.F >> 4 & 1;
//   const result = n << 1 | carry;

//   cpu.F = 0;
//   if ((result & 0xff) === 0) cpu.F |= zFlag;
//   if ((n & 0x80) !== 0) cpu.F |= cFlag;

//   return result;
// };

// const rrc = (cpu, n) => {
//   const result = n >> 1 | n << 7;

//   cpu.F = 0;
//   if ((result & 0xff) === 0) cpu.F |= zFlag;
//   if ((n & 1) !== 0) cpu.F |= cFlag;

//   return result;
// };

const rr = (cpu, n) => {
  const carry = cpu.F >> 4 & 1;
  const result = carry << 7 | n >> 1;

  cpu.F = 0;
  if ((result & 0xff) === 0) cpu.F |= zFlag;
  if ((n & 1) !== 0) cpu.F |= cFlag;

  return result;
};

// const sla = (cpu, n) => {
//   const result = n << 1;

//   cpu.F = 0;
//   if ((result & 0xff) === 0) cpu.F |= zFlag;
//   if ((n & 0x80) !== 0) cpu.F |= cFlag;

//   return result;
// };

// const sra = (cpu, n) => {
//   const result = n & 0x80 | n >> 1;

//   cpu.F = 0;
//   if ((result & 0xff) === 0) cpu.F |= zFlag;
//   if ((n & 1) !== 0) cpu.F |= cFlag;

//   return result;
// };

const srl = (cpu, n) => {
  const result = n >> 1;

  cpu.F = 0;
  if ((result & 0xff) === 0) cpu.F |= zFlag;
  if ((n & 1) !== 0) cpu.F |= cFlag;

  return result;
};

// // CB Opcodes
const SWAP_n = (cpu, n) => { cpu[n] = swap(cpu, cpu[n]); cpu.M = 1; cpu.T = 4; };
// const RLC_n = (cpu, n) => { cpu[n] = rlc(cpu, cpu[n]); cpu.M = 2; cpu.T = 8; };
// const RL_n = (cpu, n) => { cpu[n] = rl(cpu, cpu[n]); cpu.M = 2; cpu.T = 8; };
// const RRC_n = (cpu, n) => { cpu[n] = rrc(cpu, cpu[n]); cpu.M = 2; cpu.T = 8; };
const RR_n = (cpu, n) => { cpu[n] = rr(cpu, cpu[n]); cpu.M = 2; cpu.T = 8; };
// const SLA_n = (cpu, n) => { cpu[n] = sla(cpu, cpu[n]); cpu.M = 2; cpu.T = 8; };
// const SRA_n = (cpu, n) => { cpu[n] = sra(cpu, cpu[n]); cpu.M = 2; cpu.T = 8; };
const SRL_n = (cpu, n) => { cpu[n] = srl(cpu, cpu[n]); cpu.M = 2; cpu.T = 8; };


const add = (cpu, n) => {
  const sum = cpu.A + n;

  cpu.F = 0;
  if ((sum & 0xff) === 0) cpu.F |= zFlag;
  if (((cpu.A ^ n ^ sum) & 0x10) !== 0) cpu.F |= hFlag;
  if ((sum & 0x100) !== 0) cpu.F |= cFlag;

  return sum;
};

const adc = (cpu, n) => {
  const carry = cpu.F >> 4 & 1;
  const sum = cpu.A + n + carry;

  cpu.F = 0;
  if ((sum & 0xff) === 0) cpu.F |= zFlag;
  if (((cpu.A ^ n ^ sum) & 0x10) !== 0) cpu.F |= hFlag;
  if ((sum & 0x100) !== 0) cpu.F |= cFlag;

  return sum;
};

const sub = (cpu, n) => {
  const diff = cpu.A - n;

  cpu.F = nFlag;
  if ((diff & 0xff) === 0) cpu.F |= zFlag;
  if (((cpu.A ^ n ^ diff) & 0x10) !== 0) cpu.F |= hFlag;
  // if ((diff & 0xf) > (cpu.A & 0xf)) cpu.F |= hFlag;
  if ((diff & 0x100) !== 0) cpu.F |= cFlag;

  return diff;
};

// const sbc = (cpu, n) => {
//   const carry = cpu.F >> 4 & 1;
//   const diff = cpu.A - n - carry;

//   cpu.F = nFlag;
//   if ((diff & 0xff) === 0) cpu.F |= zFlag;
//   if (((cpu.A ^ n ^ diff) & 0x10) !== 0) cpu.F |= hFlag;
//   if ((diff & 0x100) !== 0) cpu.F |= cFlag;

//   return diff;
// };

const and = (cpu, n) => {
  const result = cpu.A & n;
  cpu.F = hFlag;
  if ((result & 0xff) === 0) cpu.F |= zFlag;

  return result;
};

const or = (cpu, n) => {
  const result = cpu.A | n;
  cpu.F = 0;
  if ((result & 0xff) === 0) cpu.F |= zFlag;

  return result;
};

const xor = (cpu, n) => {
  const result = cpu.A ^ n;
  cpu.F = 0;
  if ((result & 0xff) === 0) cpu.F |= zFlag;

  return result;
};

const inc = (cpu, n) => {
  const result = n + 1;
  cpu.F &= ~0xe0;
  if ((result & 0xff) === 0) cpu.F |= zFlag;
  if ((n & 0xf) === 0xf) cpu.F |= hFlag;

  return result;
};

const dec = (cpu, n) => {
  const result = n - 1;
  cpu.F &= ~0xe0;
  if ((result & 0xff) === 0) cpu.F |= zFlag;
  cpu.F |= nFlag;
  if ((n & 0xf) === 0) cpu.F |= hFlag;

  return result;
};

const LD_r_n = (cpu, r) => { cpu[r] = cpu.mmu.read8(cpu, cpu.PC++); cpu.M = 2; cpu.T = 8; };
const LD_r1_r2 = (cpu, r1, r2) => { cpu[r1] = cpu[r2]; cpu.M = 1; cpu.T = 4; };
const LD_r_HLm = (cpu, r) => { cpu[r] = cpu.mmu.read8(cpu, cpu.HL); cpu.M = 2; cpu.T = 8; };
const LD_HLm_r = (cpu, r) => { cpu.mmu.write8(cpu, cpu.HL, cpu[r]); cpu.M = 2; cpu.T = 8; };
const LD_A_nnm = (cpu, nn) => { cpu.A = cpu.mmu.read8(cpu, cpu[nn]); cpu.M = 2; cpu.T = 8; };
const LD_nm_A = (cpu, n) => { cpu.mmu.write8(cpu, cpu[n], cpu.A); cpu.M = 2; cpu.T = 8; };
const LD_n_nn = (cpu, n) => { cpu[n] = cpu.mmu.read16(cpu, cpu.PC); cpu.PC += 2; cpu.M = 3; cpu.T = 12; };
const PUSH_nn = (cpu, nn) => { cpu.SP -= 2; cpu.mmu.write16(cpu, cpu.SP, cpu[nn]); cpu.M = 4; cpu.T = 16; };
const POP_nn = (cpu, nn) => { cpu[nn] = cpu.mmu.read16(cpu, cpu.SP); cpu.SP += 2; cpu.M = 3; cpu.T = 12; };
// const ADD_A_n = (cpu, n) => { cpu.A = add(cpu, cpu[n]); cpu.M = 1; cpu.M = 4; };
// const ADC_A_n = (cpu, n) => { cpu.A = adc(cpu, cpu[n]); cpu.M = 1; cpu.T = 4; };

const ADD_HL_n = (cpu, n) => {
  const result = cpu.HL + cpu[n];
  cpu.F &= ~0x70;
  if (((cpu.HL ^ cpu[n] ^ result) & 0x1000) !== 0) cpu.F |= hFlag;
  if ((result & 0x10000) !== 0) cpu.F |= cFlag;

  cpu.HL = result;
  cpu.M = 2; cpu.T = 8;
};

// const SUB_n = (cpu, n) => { cpu.A = sub(cpu, cpu[n]); cpu.M = 1; cpu.T = 4; };
// const SBC_A_n = (cpu, n) => { cpu.A = sbc(cpu, cpu[n]); cpu.M = 1; cpu.T = 4; };

const OR_n = (cpu, n) => {
  cpu.A = or(cpu, cpu[n]);
  cpu.M = 1; cpu.T = 4;
};

const XOR_n = (cpu, n) => { cpu.A = xor(cpu, cpu[n]); cpu.M = 1; cpu.T = 4; };
const CP_n = (cpu, n) => { sub(cpu, cpu[n]); cpu.M = 1; cpu.T = 4; };
const INC_n = (cpu, n) => { cpu[n] = inc(cpu, cpu[n]); cpu.M = 1; cpu.T = 4; };
const INC_nn = (cpu, nn) => { cpu[nn]++; cpu.M = 2; cpu.T = 8; };
const DEC_n = (cpu, n) => { cpu[n] = dec(cpu, cpu[n]); cpu.M = 1; cpu.T = 4; };
// const DEC_nn = (cpu, nn) => { cpu[nn]--; cpu.M = 2; cpu.T = 8; };

const JP_cc_nn = (cpu, cc) => {
  if (cc) {
    cpu.PC = cpu.mmu.read16(cpu, cpu.PC);
    cpu.M = 4; cpu.T = 16;
  } else {
    cpu.PC += 2;
    cpu.M = 3; cpu.T = 12;
  }
};

const JR_cc_n = (cpu, cc) => {
  if (cc) {
    const val = cpu.mmu.read8(cpu, cpu.PC++).signed();
    cpu.PC += val;
    cpu.M = 3; cpu.T = 12;
  } else {
    cpu.PC++;
    cpu.M = 2; cpu.T = 8;
  }
};

const CALL_cc_nn = (cpu, cc) => {
  if (cc) {
    cpu.SP -= 2;
    cpu.mmu.write16(cpu, cpu.SP, cpu.PC + 2);
    cpu.PC = cpu.mmu.read16(cpu, cpu.PC);
    cpu.M = 6; cpu.T = 24;
  } else {
    cpu.PC += 2;
    cpu.M = 3; cpu.T = 12;
  }
};

const RET_cc = (cpu, cc) => {
  if (cc) {
    cpu.PC = cpu.mmu.read16(cpu, cpu.SP);
    cpu.SP += 2;
    cpu.M = 5; cpu.T = 20;
  } else {
    cpu.M = 2; cpu.T = 8;
  }
};


module.exports = {
  // // cb opcodes
  // testBit,
  // swap,
  // rlc,
  // rl,
  // rrc,
  // rr,
  // sla,
  // sra,
  // srl,
  SWAP_n,
  // RLC_n,
  // RL_n,
  // RRC_n,
  RR_n,
  // SLA_n,
  // SRA_n,
  SRL_n,

  // // opcodes
  add,
  adc,
  sub,
  // sbc,
  and,
  or,
  xor,
  // inc,
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
  // ADD_A_n,
  // ADC_A_n,
  ADD_HL_n,
  // SUB_n,
  // SBC_A_n,
  OR_n,
  XOR_n,
  CP_n,
  INC_n,
  INC_nn,
  DEC_n,
  // DEC_nn,
  JP_cc_nn,
  JR_cc_n,
  CALL_cc_nn,
  RET_cc,
};
