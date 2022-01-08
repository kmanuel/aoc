import fs from 'fs'

const copy = (fields: string[][]) => JSON.parse(JSON.stringify(fields))

const step = (fields: string[][]) => {
  let fs = fields
  let { fields: fs1, moved: moved1 } = stepRight(fs)
  let { fields: fs2, moved: moved2 } = stepDown(fs1)
  return { fields: fs2, moved: moved1 || moved2 }
}

const stepRight = (fields: string[][]) => {
  let moved = false
  let fieldCopy: string[][] = copy(fields)
  for (let row = 0; row < fields.length; row++) {
    for (let col = 0; col < fields[0].length; col++) {
      const right = (col + 1) % fields[0].length
      if (fields[row][col] === '>' && fields[row][right] === '.') {
        fieldCopy[row][right] = fields[row][col]
        fieldCopy[row][col] = '.'
        moved = true
      }
    }
  }
  return { fields: fieldCopy, moved }
}
const stepDown = (fields: string[][]) => {
  let moved = false
  let fieldCopy: string[][] = copy(fields)
  for (let row = 0; row < fields.length; row++) {
    for (let col = 0; col < fields[0].length; col++) {
      const down = (row + 1) % fields.length
      if (fields[row][col] === 'v' && fields[down][col] === '.') {
        fieldCopy[down][col] = fields[row][col]
        fieldCopy[row][col] = '.'
        moved = true
      }
    }
  }
  return { fields: fieldCopy, moved }
}

const print = (fields: string[][]) => {
  console.log('---------')
  for (let line of fields) {
    console.log(line.join(''))
  }
}

let fields = fs
  .readFileSync('./input.txt', 'utf-8')
  .split('\n')
  .map((line) => line.split(''))

let stepCount = 0
while (true) {
  stepCount++
  const res = step(fields)
  if (!res.moved) {
    break
  }
  fields = res.fields
}
console.log(stepCount)
print(fields)
