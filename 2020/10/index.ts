import { count } from 'console'
import fs from 'fs'

function parse(file: string) {
  return fs
    .readFileSync(file, 'utf-8')
    .split('\n')
    .map((n) => parseInt(n, 10))
}

function solve1(file: string) {
  const inputs = parse(file)
  inputs.sort((a, b) => a - b)

  //   initialize with joltdiff 3 to one, because last plug is always max(jolts) + 3
  const joltDiffs = [0, 0, 0, 1]

  joltDiffs[inputs[0]]++
  for (let i = 1; i < inputs.length; i++) {
    const joltDiff = inputs[i] - inputs[i - 1]
    joltDiffs[joltDiff] = joltDiffs[joltDiff] + 1
  }

  console.log(joltDiffs)
  return joltDiffs[1] * joltDiffs[3]
}

function isValidArrangement(nums: number[]) {
  let tempNums = [...nums]
  for (let i = 1; i < tempNums.length; i++) {
    if (tempNums[i] - tempNums[i - 1] > 3) {
      return false
    }
  }
  return true
}

function countArrangements(nums: number[]) {
  for (let i = nums.length - 1; i > 0; i--) {}
}

function solve2(file: string) {
  const inputs = parse(file)
  inputs.sort((a, b) => a - b)
  const occs = Array(inputs[inputs.length - 1]).fill(0)
  occs[0] = 1

  for (let i = 0; i < inputs.length; i++) {
    let value = inputs[i]
    let occ = 0
    if (value >= 1) {
      occ += occs[value - 1]
    }
    if (value >= 2) {
      occ += occs[value - 2]
    }
    if (value >= 3) {
      occ += occs[value - 3]
    }
    occs[value] = occ
  }

  return occs[occs.length - 1]
}

console.log(`Day10 p1, sample1.txt \t${solve1('sample1.txt')}`)
console.log(`Day10 p1, sample2.txt \t${solve1('sample2.txt')}`)
console.log(`Day10 p1, input.txt \t${solve1('input.txt')}`)

console.log(`Day10 p2, sample1.txt \t${solve2('sample1.txt')}`)
console.log(`Day10 p2, sample2.txt \t${solve2('sample2.txt')}`)
console.log(`Day10 p2, input.txt \t${solve2('input.txt')}`)
