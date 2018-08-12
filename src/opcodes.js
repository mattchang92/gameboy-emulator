const OPCODES = {
  NOPE: 0x00,
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
  CPL: 0x2f,
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

const setHalfCarry = (cpu, val, num) => {
  const halfCarry = ((val & 0xf) + num) & 0x10;
  if (halfCarry) cpu.F |= 0x20;
};

// function (p, r1) {
//   var h = ((p.r[r1] & 0xF) + 1) & 0x10;
//   p.wr(r1, (p.r[r1] + 1) & 0xFF);
//   var z = p.r[r1]==0;
//   cpu.F &= 0x10;
//   if (h) cpu.F|=0x20;
//   if (z) cpu.F|=0x80;
//   p.clock.c += 4;
// }

const opcodes = {
  [OPCODES.NOP]: () => {},
  [OPCODES.LDBCnn]: (cpu) => {
    cpu.C = cpu.mmu.read8(cpu.PC);
    cpu.B = cpu.mmu.read8(cpu.PC + 1);
    cpu.PC += 2;
  },
  [OPCODES.LDBCmA]: (cpu) => {
    cpu.mmu.write8(cpu.B << 8 | cpu.C, cpu.A);
  },
  [OPCODES.INCBC]: (cpu) => {
    cpu.C = (cpu.C + 1) & 0xff;
    if (!cpu.C) cpu.B = (cpu.B + 1) & 0xff;
  },
  [OPCODES.INCB]: (cpu) => {
    const b = cpu.B;
    cpu.B++;
    setFlags(cpu, cpu.B);
    setHalfCarry(cpu, b, 1);
    cpu.B &= 0xff;
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
    const c = cpu.C;
    cpu.C++;
    setFlags(cpu, cpu.C);
    setHalfCarry(cpu, c, 1);
    cpu.C &= 0xff;
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
    const d = cpu.D;
    cpu.D++;
    setFlags(cpu, cpu.D);
    setHalfCarry(cpu, d, 1);
    cpu.D &= 0xff;
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
    const e = cpu.E;
    cpu.E++;
    setFlags(cpu, cpu.E);
    setHalfCarry(cpu, e, 1);
    cpu.E &= 0xff;
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
    const h = cpu.H;
    cpu.H++;
    setFlags(cpu, cpu.H);
    setHalfCarry(cpu, h, 1);
    cpu.H &= 0xff;
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
    const l = cpu.L;
    cpu.L++;
    setFlags(cpu, cpu.L);
    setHalfCarry(cpu, l, 1);
    cpu.L &= 0xff;
  },
  [OPCODES.DECL]: (cpu) => {
    cpu.L--;
    setFlags(cpu, cpu.L, 1);
    cpu.L &= 0xff;
  },
  [OPCODES.LDLn]: (cpu) => {
    cpu.L = cpu.mmu.read8(cpu.PC++);
  },
  [OPCODES.CPL]: (cpu) => {
    cpu.A = (~cpu.A) & 0xff;
    setFlags(cpu, cpu.A, 1);
  },
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
    const a = cpu.A;
    cpu.A++;
    setFlags(cpu, cpu.A);
    setHalfCarry(cpu, a, 1);
    cpu.A &= 0xff;
  },
  [OPCODES.DECA]: (cpu) => {
    cpu.A--;
    setFlags(cpu, cpu.A, 1);
    cpu.A &= 0xff;
  },
  [OPCODES.LDAn]: cpu => cpu.A = cpu.mmu.read8(cpu.PC++),
  [OPCODES.CFF]: cpu => cpu.F &= ~0x10,
};


module.exports = {
  opcodes,
  OPCODES,
};
