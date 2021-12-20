import fs from 'fs'

const run1 = () => {
  const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n')
  const seatIds = lines.map(toSeatId)
  const largestSeatId = seatIds.sort((a, b) => b - a)[0]
  console.log(`Day5, p1: `, largestSeatId)
}

const run2 = () => {
  const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n')
  const seatIds = lines.map(toSeatId)
  const missingSeatId = getMissingSeat(seatIds)
  console.log(`Day5, p2: `, missingSeatId)
}

run1()
run2()

const toSeatId = (line: string): number => {
  const rowDesc = line.slice(0, 7)
  const row = partSearch(rowDesc, 0, 127)
  const colDesc = line.slice(7)
  const transformedColDesc = colDesc.replace(/L/g, 'F').replace(/R/g, 'B')
  const col = partSearch(transformedColDesc, 0, 7)
  const seatId = row * 8 + col
  return seatId
}

function getMissingSeat(seatIds: number[]) {
  const sorted = seatIds.sort((a, b) => b - a)
  for (let i = 0; i < sorted.length - 1; i++) {
    let curr = sorted[i]
    let next = sorted[i + 1]
    if (curr - next == 2) {
      return curr - 1
    }
  }
  throw Error()
}

function partSearch(desc: string, lower: number, upper: number): number {
  let c = desc.charAt(0)
  if (upper - lower < 2) {
    if (c === 'F') {
      return lower
    } else {
      return upper
    }
  }
  const center = (upper + lower) / 2
  if (c === 'F') {
    upper = Math.floor(center)
  } else {
    lower = Math.ceil(center)
  }
  return partSearch(desc.slice(1), lower, upper)
}
