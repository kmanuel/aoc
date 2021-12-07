import fs from 'fs'

const run1 = () => {
  const crabPositions = fs
    .readFileSync('./7/input.txt', 'utf-8')
    .split(',')
    .map((n) => Number(n))

  let max = 0
  for (let pos of crabPositions) {
    max = Math.max(max, pos)
  }
  let minFuel = Number.MAX_VALUE
  for (let i = 0; i < max; i++) {
    let iFuel = 0
    for (let pos of crabPositions) {
      iFuel += Math.abs(pos - i)
    }
    if (iFuel < minFuel) {
      minFuel = iFuel
    }
  }
  console.log(`Day 7, p1: ` + minFuel)
}

const run2 = () => {
  const crabPositions = fs
    .readFileSync('./7/input.txt', 'utf-8')
    .split(',')
    .map((n) => Number(n))

  let max = 0
  for (let pos of crabPositions) {
    max = Math.max(max, pos)
  }
  let minFuel = Number.MAX_VALUE
  for (let i = 0; i < max; i++) {
    let iFuel = 0
    for (let pos of crabPositions) {
      const moveN = Math.abs(pos - i)
      iFuel += (moveN * (moveN + 1)) / 2
    }
    if (iFuel < minFuel) {
      minFuel = iFuel
    }
  }
  console.log(`Day 7, p2: ` + minFuel)
}

run1()
run2()
