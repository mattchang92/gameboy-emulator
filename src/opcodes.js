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
  LDABC: 0x0a,
  DECBC: 0x0b,
  INCC: 0x0c,
  DECC: 0x0d,
  LDCn: 0x0e,
  RRCA: 0x0f,
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
//   p.r.F &= 0x10;
//   if (h) p.r.F|=0x20;
//   if (z) p.r.F|=0x80;
//   p.clock.c += 4;
// }

const opcodes = {
  // 0x00
  [OPCODES.NOP]: () => {},
  // 0x01
  [OPCODES.LDBCnn]: (cpu) => {
    cpu.C = cpu.mmu.read8(cpu.PC);
    cpu.B = cpu.mmu.read8((cpu.PC + 1) & 0xffff);
    cpu.PC += 2;
  },
  // 0x02
  [OPCODES.LDBCmA]: (cpu) => {
    cpu.mmu.write8(cpu.B << 8 | cpu.C, cpu.A);
  },
  // 0x03
  [OPCODES.INCBC]: (cpu) => {
    cpu.B = (cpu.B + 1) & 0xff;
    cpu.C = (cpu.C + 1) & 0xff;
  },
  // 0x04
  [OPCODES.INCB]: (cpu) => {
    const b = cpu.B;
    cpu.B++;
    setFlags(cpu, cpu.B);
    setHalfCarry(cpu, b, 1);
    cpu.B &= 0xff;
  },
  // 0x05
  [OPCODES.DECB]: (cpu) => {
    cpu.B--;
    setFlags(cpu, cpu.B, 1);
    cpu.B &= 0xff;
  },
  // 0x06
  [OPCODES.LDBn]: (cpu) => {
    cpu.B = cpu.mmu.read8(cpu.PC);
    cpu.PC++;
  },
  // 0x07
  [OPCODES.RLCA]: (cpu) => {
    const bit = cpu.A >>> 7;
    cpu.A = ((cpu.A << 1) + bit) & 0xff;
    cpu.F = bit ? 0x10 : 0;
  },
  // 0x08
  [OPCODES.LDnnSP]: (cpu) => {
    const address = cpu.mmu.read16(cpu.PC);
    cpu.mmu.write16(address, cpu.SP);
    cpu.PC += 2;
  },
  // 0x09
  [OPCODES.ADDHLBC]: (cpu) => {
    let hl = (cpu.H << 8) + cpu.L;
    hl += (cpu.B << 8) + cpu.C;
    if (hl > 0xffff) {
      cpu.F |= 0x10;
    } else {
      cpu.F &= 0xef;
    }
    cpu.H = (hl >>> 8) & 0xff;
    cpu.L = hl & 0xff;
  },
  // 0x0a
  [OPCODES.LDABC]: (cpu) => {
    const address = (cpu.B << 8) + cpu.C;
    cpu.A = cpu.mmu.read8(address);
  },
  // 0x0b
  [OPCODES.DECBC]: (cpu) => {
    cpu.C = (cpu.C - 1) & 0xff;
    if (cpu.C === 0xff) cpu.B = (cpu.B - 1) & 0xff;
  },
  // 0x0c
  [OPCODES.INCC]: (cpu) => {
    const c = cpu.C;
    cpu.C++;
    setFlags(cpu, cpu.C);
    setHalfCarry(cpu, c, 1);
    cpu.C &= 0xff;
  },
  // 0x0d
  [OPCODES.DECC]: (cpu) => {
    cpu.C--;
    setFlags(cpu, cpu.C, 1);
    cpu.C &= 0xff;
  },
  // 0x0e
  [OPCODES.LDCn]: (cpu) => {
    cpu.C = cpu.mmu.read8(cpu.PC);
    cpu.PC++;
  },
  // 0x0f
  [OPCODES.RRCA]: (cpu) => {
    const bit = cpu.A & 1;
    cpu.A = ((cpu.A >>> 1) + (bit * 0x80)) & 0xff;
    cpu.F = bit ? 0x10 : 0;
  }
};



