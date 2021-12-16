import fs from 'fs'

const run1 = (input: string) => {
  const riskLevels = getRiskLevels(input)
  return calculateMinRisk(riskLevels)
}

const run2 = (input: string) => {
  const riskLevels = getRiskLevels(input)
  const fiveXriskLevels = fiveXBlock(riskLevels)
  return calculateMinRisk(fiveXriskLevels)
}

function calculateMinRisk(riskLevels: number[][]) {
  const height = riskLevels.length
  const width = riskLevels[0].length

  const visited = initialize2D<boolean>(width, height, false)
  const costs = initialize2D<number>(width, height, Number.POSITIVE_INFINITY)

  costs[0][0] = 0
  let frontier = [[0, 0]]

  while (frontier.length > 0 && !visited[height - 1][width - 1]) {
    frontier = frontier
      .filter((n) => !visited[n[0]][n[1]])
      .sort((a, b) => costs[a[0]][a[1]] - costs[b[0]][b[1]])
    let curr = frontier.splice(0, 1)[0]
    if (!curr) {
      break
    }
    visited[curr[0]][curr[1]] = true
    const unvisitedNeighbours = getUnvisitedNeighbours(
      curr[0],
      curr[1],
      visited
    )
    for (let n of unvisitedNeighbours) {
      costs[n[0]][n[1]] = Math.min(
        costs[n[0]][n[1]],
        costs[curr[0]][curr[1]] + riskLevels[n[0]][n[1]]
      )
    }
    frontier.push(...unvisitedNeighbours)
  }
  return costs[height - 1][width - 1]
}

function initialize2D<T>(
  width: number,
  height: number,
  initialValue: T
): T[][] {
  return Array(width)
    .fill(initialValue)
    .map(() => Array(height).fill(initialValue))
}

function getUnvisitedNeighbours(x: number, y: number, visited: boolean[][]) {
  return [
    [x - 1, y],
    [x + 1, y],
    [x, y - 1],
    [x, y + 1],
  ].filter(
    (n) =>
      n[0] >= 0 &&
      n[0] < visited.length &&
      n[1] >= 0 &&
      n[1] < visited[0].length &&
      !visited[n[0]][n[1]]
  )
}

function getRiskLevels(input: string) {
  return fs
    .readFileSync(`./${input}.txt`, 'utf-8')
    .split('\n')
    .map((s) => s.split('').map((s) => Number(s)))
}

console.log(`Day 15, sample, p1: `, run1(`sample`))
console.log(`Day 15, input, p1: `, run1(`input`))
console.log(`Day 15, sample, p2: `, run2(`sample`))
console.log(`Day 15, input, p2: `, run2(`input`))

function fiveXBlock(block: number[][]) {
  let rows: number[][] = []
  for (let i = 0; i < 5; i++) {
    for (let row of block) {
      rows.push(fiveXRow(row, i))
    }
  }
  return rows
}

function fiveXRow(row: number[], base: number = 0) {
  let fiveX = []
  for (let j = 0; j < 5; j++) {
    for (let el of row) {
      let val = el + j + base
      if (val >= 10) {
        val = val - 9
      }
      fiveX.push(val)
    }
  }
  return fiveX
}
