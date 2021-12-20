import fs from 'fs'
const run1 = () => {
  const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n')
  let trees = countTreesPerSlope(lines, { x: 3, y: 1 })
  console.log(`Day3, p1: `, trees)
}

const run2 = () => {
  const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n')
  const slopes = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ]
  const res = slopes
    .map((s) => countTreesPerSlope(lines, s))
    .reduce((acc, el) => acc * el)
  console.log(`Day3, p2: `, res)
}

run1()
run2()

function countTreesPerSlope(lines: string[], slope: { x: number; y: number }) {
  const gridWidth = lines[0].length
  const gridHeight = lines.length
  let x = 0
  let y = 0
  let trees = 0
  for (let i = 0; i < gridHeight && y < gridHeight; i++) {
    if (lines[y].charAt(x) === '#') {
      trees++
    }
    x += slope.x
    y += slope.y
    x = x % gridWidth
  }
  return trees
}
