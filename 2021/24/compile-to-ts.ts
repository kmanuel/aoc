import fs from 'fs'

let alu: { [k: string]: number } = { w: 0, x: 0, y: 0, z: 0 }

let nrs = [1, 3, 3]

const handle = (inst: Instruction) => {
  if (inst.method === 'inp') {
    alu[inst.targetReg] = nrs.splice(0, 1)[0]
    console.log('inp', { inst, alu })
    return
  }
  if (inst.method === 'add') {
    alu[inst.targetReg] += getInstructionValue(inst)
    return
  }
  if (inst.method === 'mul') {
    alu[inst.targetReg] *= getInstructionValue(inst)
    return
  }
  if (inst.method === 'div') {
    alu[inst.targetReg] = Math.floor(
      alu[inst.targetReg] / getInstructionValue(inst)
    )
    return
  }
  if (inst.method === 'mod') {
    alu[inst.targetReg] %= getInstructionValue(inst)
    return
  }
  if (inst.method === 'eql') {
    alu[inst.targetReg] =
      alu[inst.targetReg] === getInstructionValue(inst) ? 1 : 0
    return
  }
}

const runProgram = (instructions: Instruction[], inputs: number[]) => {
  nrs = inputs
  for (let inst of instructions) {
    handle(inst)
  }
}

const resetAlu = () => {
  alu = { w: 0, x: 0, y: 0, z: 0 }
}

type RegId = 'w' | 'x' | 'y' | 'z'

interface Instruction {
  method: 'inp' | 'add' | 'mul' | 'div' | 'mod' | 'eql'
  targetReg: RegId
  immediateValue?: number
  valueReg?: RegId
}

const getInstructionValue = (inst: Instruction) => {
  if (inst.valueReg) {
    return alu[inst.valueReg]
  }
  return inst.immediateValue!
}

const toInstructions = (source: string[]): Instruction[] => {
  const insts = source.map(mapInst)
  return insts.filter((i) => i !== null) as Instruction[]
}

const toSecondArguePart = (inst: string) => {
  let arg = inst.split(' ')[2]
  if (arg.match(/^-?[0-9]+$/)) {
    return {
      immediateValue: Number(arg),
    }
  } else {
    return {
      valueReg: arg as RegId,
    }
  }
}

const mapInst = (inst: string): Instruction | null => {
  if (inst.startsWith('inp')) {
    return {
      method: 'inp',
      targetReg: inst.split(' ')[1] as RegId,
    }
  }
  if (inst.startsWith('add')) {
    const valPart = toSecondArguePart(inst)
    return {
      method: 'add',
      targetReg: inst.split(' ')[1] as RegId,
      ...valPart,
    }
  }
  if (inst.startsWith('mul')) {
    const valPart = toSecondArguePart(inst)
    if (valPart.immediateValue && valPart.immediateValue === 1) {
      return null
    }
    return {
      method: 'mul',
      targetReg: inst.split(' ')[1] as RegId,
      ...valPart,
    }
  }
  if (inst.startsWith('div')) {
    const valPart = toSecondArguePart(inst)
    if (valPart.immediateValue && valPart.immediateValue === 1) {
      return null
    }
    return {
      method: 'div',
      targetReg: inst.split(' ')[1] as RegId,
      ...valPart,
    }
  }
  if (inst.startsWith('mod')) {
    const valPart = toSecondArguePart(inst)
    return {
      method: 'mod',
      targetReg: inst.split(' ')[1] as RegId,
      ...valPart,
    }
  }
  if (inst.startsWith('eql')) {
    const valPart = toSecondArguePart(inst)
    return {
      method: 'eql',
      targetReg: inst.split(' ')[1] as RegId,
      ...valPart,
    }
  }
  throw Error()
}

const run = () => {
  let source = fs.readFileSync('./source.txt', 'utf-8').split('\n')
  const instructions = toInstructions(source)
  if (!instructions) {
    throw Error()
  }
  let curr = 99999999999999
  let start = Date.now()
  // while (curr > 0) {
  if (curr % 10000 === 0) {
    console.log(curr)
  }
  const currStr = curr.toString()
  if (currStr.includes('0')) {
    curr--
    // continue
  }

  const nums = currStr.split('').map((c) => Number(c))
  runProgram(instructions, nums)
  if (alu.z === 0) {
    console.log('curr', curr)
    return
  }
  resetAlu()
  curr--
  // }
  let end = Date.now()
  console.log(end - start)
}

// run()

const compile = () => {
  let source = fs.readFileSync('./source.txt', 'utf-8').split('\n')
  const instructions = toInstructions(source)

  let lines: string[] = []
  lines.push('export function solve(invals: number[]) {')
  lines.push('let alu = { w: 0, x: 0, y: 0, z: 0 }')
  lines.push('let currInval = 0')
  for (let inst of instructions) {
    let target = `alu.${inst.targetReg}`
    let val =
      inst.immediateValue !== undefined
        ? `${inst.immediateValue}`
        : `alu.${inst.valueReg}`
    if (inst.method === 'inp') {
      lines.push(`${target} = invals[currInval++]`)
    } else if (inst.method === 'add') {
      lines.push(`${target} += ${val}`)
    } else if (inst.method === 'div') {
      lines.push(`${target} = Math.floor(${target}/${val})`)
    } else if (inst.method === 'eql') {
      lines.push(`${target} = ${target} === ${val} ? 1 : 0`)
    } else if (inst.method === 'mod') {
      lines.push(`${target} %= ${val}`)
    } else if (inst.method === 'mul') {
      lines.push(`${target} *= ${val}`)
    }
  }
  lines.push('return alu.z')
  lines.push('}')
  fs.writeFileSync('compiled.ts', lines.join('\n'))
}

compile()
