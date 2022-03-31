import fs from 'fs'

function partitionParser(
  takeLowerSymbol: string,
  takeUpperSymbol: string,
  range: number
) {
  return function (positionDescription: string) {
    let low = 0
    let up = range
    for (let takeSymbol of positionDescription.split('')) {
      const half = Math.ceil((up - low) / 2)
      if (takeSymbol === takeLowerSymbol) {
        up -= half
      } else if (takeSymbol === takeUpperSymbol) {
        low += half
      } else {
        throw Error(
          `unexpected symbol ${takeSymbol} expected ${takeLowerSymbol} or ${takeUpperSymbol}`
        )
      }
    }
    return low
  }
}

function determineRow(positionDescription: string) {
  return partitionParser('F', 'B', 127)(positionDescription)
}

function determineColumn(positionDescription: string) {
  return partitionParser('L', 'R', 7)(positionDescription)
}

function determinePosition(description: string) {
  const row = getRow(description)
  const col = getCol(description)
  return {
    row,
    col,
  }
}

function getSeatId(description: string) {
  const { row, col } = determinePosition(description)
  return row * 8 + col
}

function getCol(description: string) {
  const colDescription = description.substring(7)
  const col = determineColumn(colDescription)
  return col
}

function getRow(description: string) {
  const rowDescription = description.substring(0, 7)
  const row = determineRow(rowDescription)
  return row
}

function findMaxSeatId(inputFile: string) {
  return getSortedSeatIds(inputFile)[0]
}

function mySeat(inputfile: string) {
  const sortedIds = getSortedSeatIds(inputfile)
  for (let i = 1; i < sortedIds.length; i++) {
    if (sortedIds[i - 1] - sortedIds[i] === 2) {
      return sortedIds[i] + 1
    }
  }
  throw Error('failed to find my seat')
}

function getSortedSeatIds(inputFile: string) {
  return fs
    .readFileSync(inputFile, 'utf-8')
    .split('\n')
    .map(getSeatId)
    .sort((a, b) => b - a)
}

console.log(`Day5 p1 sample = ${findMaxSeatId('sample.txt')}`)
console.log(`Day5 p1 input = ${findMaxSeatId('input.txt')}`)
console.log(`Day5 p2 input = ${mySeat('input.txt')}`)
