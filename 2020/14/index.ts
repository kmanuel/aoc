import fs from 'fs'

function read(file: string) {
  return fs.readFileSync(file, 'utf-8').split('\n')
}

function part1(instructions: string[]) {
  let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  let memory: { [n: number]: string } = {}

  const writeToMemory = (pos: number, val: number) => {
    let binary = val.toString(2).padStart(mask.length, '0')
    let res = ''
    for (let i = 0; i < binary.length; i++) {
      if (mask.charAt(i) !== 'X') {
        res = res + mask.charAt(i)
      } else {
        res = res + binary.charAt(i)
      }
    }
    memory[pos] = res
  }

  for (let inst of instructions) {
    if (inst.startsWith('mem')) {
      const match = inst.match(/mem\[(\d+)\] = (\d+)/)
      if (!match) {
        throw Error()
      }
      writeToMemory(Number(match[1]), Number(match[2]))
    } else if (inst.startsWith('mask')) {
      const match = inst.match(/^mask = (.*)$/)
      if (!match) {
        throw Error()
      }
      mask = match[1]
    }
  }

  let res = Object.values(memory).map((m) => parseInt(m, 2))
  console.log(res.reduce((acc, el) => acc + el))
}

part1(read('input.txt'))
part2(read('input.txt'))

function part2(instructions: string[]) {
  let mask = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'
  let memory: { [n: number]: number } = {}

  const writeToMemory = (pos: number, val: number) => {
    let binary = pos.toString(2).padStart(mask.length, '0')
    let res = ''
    for (let i = 0; i < binary.length; i++) {
      if (mask.charAt(i) === '0') {
        res = res + binary.charAt(i)
      } else {
        res = res + mask.charAt(i)
      }
    }
    let memAddresses = toPossibleSpaces(res).map((space) => parseInt(space, 2))
    for (let addr of memAddresses) {
      memory[addr] = val
    }
  }

  for (let inst of instructions) {
    if (inst.startsWith('mem')) {
      const match = inst.match(/mem\[(\d+)\] = (\d+)/)
      if (!match) {
        throw Error()
      }
      writeToMemory(Number(match[1]), Number(match[2]))
    } else if (inst.startsWith('mask')) {
      const match = inst.match(/^mask = (.*)$/)
      if (!match) {
        throw Error()
      }
      mask = match[1]
    }
  }

  console.log('part2: ' + Object.values(memory).reduce((acc, el) => acc + el))
}

function toPossibleSpaces(address: string, acc: string[] = ['']): string[] {
  if (address.length === 0) {
    return acc
  }
  let curr = address.charAt(0)
  if (curr === 'X') {
    acc = [...acc.map((a) => a + '1'), ...acc.map((a) => a + '0')]
  } else {
    acc = acc.map((a) => a + curr)
  }
  return toPossibleSpaces(address.slice(1), acc)
}

function findMaxX(instructions: string[]) {
  const counts = instructions.map(
    (inst) => inst.split('').filter((c) => c === 'X').length
  )
  let max = 0
  for (let c of counts) {
    max = Math.max(c, max)
  }
}
