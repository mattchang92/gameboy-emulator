# gameboy-emulator

**Copyright (C) 2018 Matt Chang**

A GameBoy emulator that utilizes HTML5 canvas to provide an emulation of the console. The goal of this project is to explore the world of emulation and to learn how basic computers work at a low level. Perfect cycle accuracy is not of primary concern.

[Current Version](http://gameboy.mattchang.ca/)

CPU instruction set accuracy test results (Blargg's test ROMs):
-----------------------------------------------------
Currently passes all CPU instruction tests.

|#|Test|Status|
|-|-|-|
|01|special|:white_check_mark:|
|02|interrupts|:white_check_mark:|
|03|op sp,hl|:white_check_mark:|
|04|op r,imm|:white_check_mark:|
|05|op rp|:white_check_mark:|
|06|ld r,r|:white_check_mark:|
|07|jr,jp,call,ret,rst|:white_check_mark:|
|08|misc instrs|:white_check_mark:|
|09|op r,r|:white_check_mark:|
|10|bit ops|:white_check_mark:|
|11|op a,(hl)|:white_check_mark:|
