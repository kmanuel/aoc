import fs from 'fs'

class HandheldComputer {
  constructor(
    private acc = 0,
    private pos = 0,
    private visitedPositions: number[] = [],
    private isExecuctionSuccess: boolean = false
  ) {}

  runProgram(instructions: Instruction[]) {
    this.acc = 0
    this.pos = 0
    this.visitedPositions = []
    this.isExecuctionSuccess = false
    while (true) {
      if (this.pos >= instructions.length) {
        if (this.pos === instructions.length) {
          this.isExecuctionSuccess = true
        }
        return this.acc
      }
      const instruction = instructions[this.pos]
      const deltas = instruction.execute()
      const newPosition = this.pos + deltas.pos
      if (this.visitedPositions.includes(newPosition)) {
        return this.acc
      }
      this.visitedPositions.push(newPosition)
      this.pos = newPosition
      this.acc += deltas.acc
    }
  }

  hasExecutedSuccessfully() {
    return this.isExecuctionSuccess
  }
}

abstract class Instruction {
  protected constructor(protected value: number) {}

  abstract execute(): { pos: number; acc: number }

  static from(line: string): Instruction {
    const match = line.match(/(nop|acc|jmp) ([+-]\d+)/)
    if (!match) {
      throw Error('invalid program')
    }
    const value = parseInt(match[2], 10)
    switch (match[1]) {
      case 'nop':
        return new NopInstruction(value)
      case 'acc':
        return new AccInstruction(value)
      case 'jmp':
        return new JumpInstruction(value)
    }
    throw Error(line)
  }
}

class NopInstruction extends Instruction {
  execute() {
    return {
      pos: 1,
      acc: 0,
    }
  }
}

class AccInstruction extends Instruction {
  execute() {
    return {
      pos: 1,
      acc: this.value,
    }
  }
}

class JumpInstruction extends Instruction {
  execute() {
    return {
      pos: this.value,
      acc: 0,
    }
  }
}

function parse(file: string) {
  return fs.readFileSync(file, 'utf-8').split('\n')
}

function toProgram(lines: string[]) {
  const program = lines
    .map((l) => l.trim())
    .filter((l) => l.length > 0)
    .map(Instruction.from)
  return program
}

function solve(file: string) {
  const program = toProgram(parse(file))
  const computer = new HandheldComputer()
  const result = computer.runProgram(program)
  console.log(result)
}

function generateVariations(lines: string[]): string[][] {
  let variations: string[][] = []
  for (let i = 0; i < lines.length; i++) {
    let newLines = [...lines]
    if (lines[i].startsWith('nop')) {
      newLines[i] = lines[i].replace('nop', 'jmp')
      variations.push(newLines)
    } else if (lines[i].startsWith('jmp')) {
      newLines[i] = lines[i].replace('jmp', 'nop')
      variations.push(newLines)
    }
  }
  return variations
}

function solve2(file: string) {
  const lines = parse(file)
  const variations = generateVariations(lines)
  const computer = new HandheldComputer()
  for (let programLines of variations) {
    const program = toProgram(programLines)
    const result = computer.runProgram(program)
    if (computer.hasExecutedSuccessfully()) {
      console.log(result)
      return
    }
  }
}

solve('sample.txt')
solve('input.txt')

solve2('sample.txt')
solve2('input.txt')
