import fs from 'fs'

function parse(file: string) {
  return fs
    .readFileSync(file, 'utf-8')
    .split('\n')
    .map((s) => s.split(''))
}

function copyGrid(grid: string[][]): string[][] {
  return JSON.parse(JSON.stringify(grid))
}

function countOccupiedNeighbours(grid: string[][], row: number, col: number) {
  let occupiedNeighbours = 0
  let rowFrom = Math.max(0, row - 1)
  let rowTo = Math.min(row + 1, grid.length - 1)
  let colFrom = Math.max(0, col - 1)
  let colTo = Math.min(col + 1, grid[0].length - 1)
  for (let i = rowFrom; i <= rowTo; i++) {
    for (let j = colFrom; j <= colTo; j++) {
      if (i === row && j === col) {
        continue
      }
      if (isOccupiedSeat(grid, i, j)) {
        occupiedNeighbours++
      }
    }
  }
  return occupiedNeighbours
}

function isOccupiedInDirection(
  grid: string[][],
  rowFrom: number,
  colFrom: number,
  direction: number[]
): boolean {
  let pos = [rowFrom + direction[0], colFrom + direction[1]]
  let isWithinBounds = (pos: number[]) =>
    pos[0] >= 0 &&
    pos[0] < grid.length &&
    pos[1] >= 0 &&
    pos[1] <= grid[0].length

  while (
    isWithinBounds(pos) &&
    grid[pos[0]][pos[1]] !== 'L' &&
    grid[pos[0]][pos[1]] !== '#'
  ) {
    pos[0] += direction[0]
    pos[1] += direction[1]
  }

  return isWithinBounds(pos) && isOccupiedSeat(grid, pos[0], pos[1])
}

function countOccupiedVisible(grid: string[][], row: number, col: number) {
  let directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ]
  const isOccupiedSeatVisible = (direction: number[]) =>
    isOccupiedInDirection(grid, row, col, direction)
  return directions.filter(isOccupiedSeatVisible).length
}

function isOccupiedSeat(grid: string[][], row: number, col: number) {
  return grid[row][col] === '#'
}

function isEmptySeat(grid: string[][], row: number, col: number) {
  return grid[row][col] === 'L'
}

function shouldOccupy1(grid: string[][], row: number, col: number) {
  return (
    isEmptySeat(grid, row, col) && countOccupiedNeighbours(grid, row, col) === 0
  )
}

function shouldOccupy2(grid: string[][], row: number, col: number) {
  return (
    isEmptySeat(grid, row, col) && countOccupiedVisible(grid, row, col) === 0
  )
}

function shouldLeave1(grid: string[][], row: number, col: number) {
  const occupiedNeighbours = countOccupiedNeighbours(grid, row, col)
  return isOccupiedSeat(grid, row, col) && occupiedNeighbours >= 4
}

function shouldLeave2(grid: string[][], row: number, col: number) {
  const occupiedNeighbours = countOccupiedVisible(grid, row, col)
  return isOccupiedSeat(grid, row, col) && occupiedNeighbours >= 5
}

function iterate(
  grid: string[][],
  shouldOccupy: (grid: string[][], row: number, col: number) => boolean,
  shouldLeave: (grid: string[][], row: number, col: number) => boolean
): string[][] {
  const copy = copyGrid(grid)
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      const occupy = shouldOccupy(grid, i, j)
      if (occupy) {
        copy[i][j] = '#'
      }
      const leave = shouldLeave(grid, i, j)
      if (leave) {
        copy[i][j] = 'L'
      }
    }
  }
  return copy
}

function countOccupiedSeats(grid: string[][]) {
  let count = 0
  for (let row of grid) {
    count += row.filter((r) => r === '#').length
  }
  return count
}

function solve1(file: string) {
  let grid = parse(file)
  let iterations = 0
  let running = true
  while (running) {
    const newGrid = iterate(grid, shouldOccupy1, shouldLeave1)
    iterations++
    if (JSON.stringify(newGrid) === JSON.stringify(grid)) {
      running = false
    }
    grid = newGrid
  }
  const count = countOccupiedSeats(grid)
  console.log(count)
}

function solve2(file: string) {
  let grid = parse(file)
  let iterations = 0
  let running = true
  while (running) {
    const newGrid = iterate(grid, shouldOccupy2, shouldLeave2)
    iterations++
    if (JSON.stringify(newGrid) === JSON.stringify(grid)) {
      running = false
    }
    grid = newGrid
  }
  const count = countOccupiedSeats(grid)
  console.log(count)
}

solve1('sample.txt')
solve1('input.txt')

solve2('sample.txt')
solve2('input.txt')
