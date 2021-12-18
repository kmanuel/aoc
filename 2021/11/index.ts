import fs from 'fs'

const run1 = () => {
  const grid = fs
    .readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .map((l) => l.split('').map((n) => Number(n)))
  let flashes = 0
  for (let i = 0; i < 100; i++) {
    step1(grid)
    flashes += step2(grid)
    printGrid(i + 1, grid)
  }
  console.log(`Day 11, p1: `, flashes)
}

const run2 = () => {
  const grid = fs
    .readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .map((l) => l.split('').map((n) => Number(n)))
  let gridSize = grid.length * grid[0].length
  let i = 0
  while (true) {
    step1(grid)
    let flashes = step2(grid)
    i++
    if (flashes === gridSize) {
      console.log(`Day 11, p2: ${i}`)
      return
    }
  }
}

run1()
run2()

function step1(grid: number[][]) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j] + 1
    }
  }
}

function step2(grid: number[][]) {
  let flashes = 0
  let frontier: { i: number; j: number }[] = []

  while (true) {
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const curr = grid[i][j]
        if (curr > 9) {
          frontier.push({ i, j })
        }
      }
    }
    if (frontier.length <= 0) {
      return flashes
    }
    while (frontier.length > 0) {
      const curr = frontier.splice(0, 1)[0]
      flashes++
      grid[curr.i][curr.j] = 0

      let { i, j } = curr
      let _ = [
        { i: i - 1, j: j - 1 },
        { i: i, j: j - 1 },
        { i: i + 1, j: j - 1 },
        { i: i - 1, j: j },
        { i, j },
        { i: i + 1, j },
        { i: i - 1, j: j + 1 },
        { i, j: j + 1 },
        { i: i + 1, j: j + 1 },
      ]
        .filter((pos) => isWithinBoundsAndInc(grid, pos.i, pos.j))
        .forEach((pos) => (grid[pos.i][pos.j] = grid[pos.i][pos.j] + 1))
    }
  }
}

function isWithinBoundsAndInc(grid: number[][], i: number, j: number) {
  return (
    i >= 0 &&
    i < grid.length &&
    j >= 0 &&
    j < grid[0].length &&
    grid[i][j] !== 0
  )
}

function printGrid(step: number, grid: number[][]) {
  console.log(`After step ${step}:`)
  for (let row of grid) {
    console.log(row.join(''))
  }
  console.log()
}
