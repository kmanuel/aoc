import fs from 'fs'

const getBasinSizes = (
  grid: number[][],
  lowPoints: { i: number; j: number }[]
) => {
  let basinSizes: number[] = []
  for (let point of lowPoints) {
    let frontier = [point]
    let visited = [point]
    while (frontier.length > 0) {
      let curr = frontier.splice(0, 1)[0]
      const left = {
        i: curr.i,
        j: curr.j - 1,
      }
      const right = {
        i: curr.i,
        j: curr.j + 1,
      }
      const top = {
        i: curr.i - 1,
        j: curr.j,
      }
      const bot = {
        i: curr.i + 1,
        j: curr.j,
      }
      let positions = [left, right, top, bot]
      for (let pos of positions) {
        if (isWithinBounds(pos, grid) && grid[pos.i][pos.j] !== 9) {
          if (!isWithin(pos, frontier) && !isWithin(pos, visited)) {
            frontier.push(pos)
            visited.push(pos)
          }
        }
      }
    }
    basinSizes.push(visited.length)
  }

  return basinSizes
}

const isWithin = (
  { i, j }: { i: number; j: number },
  nums: { i: number; j: number }[]
) => {
  for (let num of nums) {
    if (num.i === i && num.j === j) {
      return true
    }
  }
  return false
}

const isWithinBounds = (
  { i, j }: { i: number; j: number },
  grid: number[][]
) => {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[0].length
}

const getGrid = (inputFile: string) => {
  const lines = fs.readFileSync(inputFile, 'utf-8').split('\n')
  return lines.map((l) => l.split('').map((n) => Number(n)))
}

function findLowPointValues(grid: number[][]) {
  let lowPoints: number[] = []

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let curr = grid[i][j]
      let lowest = true
      if (i > 0) {
        lowest = curr < grid[i - 1][j]
      }
      if (lowest && j > 0) {
        lowest = curr < grid[i][j - 1]
      }
      if (lowest && i + 1 < grid.length) {
        lowest = curr < grid[i + 1][j]
      }
      if (lowest && j + 1 < grid[0].length) {
        lowest = curr < grid[i][j + 1]
      }
      if (lowest) {
        lowPoints.push(curr)
      }
    }
  }
  return lowPoints
}

function findLowPointPositions(grid: number[][]) {
  let lowPoints: { i: number; j: number }[] = []

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      let curr = grid[i][j]
      let lowest = true
      if (i > 0) {
        lowest = curr < grid[i - 1][j]
      }
      if (lowest && j > 0) {
        lowest = curr < grid[i][j - 1]
      }
      if (lowest && i + 1 < grid.length) {
        lowest = curr < grid[i + 1][j]
      }
      if (lowest && j + 1 < grid[0].length) {
        lowest = curr < grid[i][j + 1]
      }
      if (lowest) {
        lowPoints.push({ i, j })
      }
    }
  }
  return lowPoints
}

const run1 = () => {
  let grid = getGrid('./9/input.txt')
  let lowPoints: number[] = findLowPointValues(grid)
  const risks = lowPoints.map((lp) => lp + 1)
  const sum = risks.reduce((acc, el) => acc + el)
  console.log(`Day 9, p1: `, sum)
}

const run2 = () => {
  let grid = getGrid('./9/input.txt')
  let lowPoints = findLowPointPositions(grid)
  let basinSizes: number[] = getBasinSizes(grid, lowPoints)
  let largestBasins = basinSizes.sort((a, b) => b - a).slice(0, 3)
  const basinProduct = largestBasins.reduce((acc, el) => acc * el)
  console.log(`Day 9, p2: `, basinProduct)
}

run1()
run2()
