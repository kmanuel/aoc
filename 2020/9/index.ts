import fs from 'fs'

function twoSum(nums: number[], target: number) {
  const sorted = nums.sort((a, b) => a - b)
  let left = 0
  let right = sorted.length - 1
  while (left < right) {
    const sum = sorted[left] + sorted[right]
    if (sum > target) {
      right--
    }
    if (sum < target) {
      left++
    }
    if (sum === target) {
      return true
    }
  }
  return false
}

function solveForLookback(nums: number[], lookback: number) {
  for (let i = lookback + 1; i < nums.length; i++) {
    const slice = nums.slice(i - lookback, i)
    const isTwo = twoSum(slice, nums[i])
    if (!isTwo) {
      return nums[i]
    }
  }
  throw Error()
}

function parse(file: string) {
  return fs
    .readFileSync(file, 'utf-8')
    .split('\n')
    .map((n) => parseInt(n, 10))
}

function solve1(file: string, lookback: number) {
  const nums = parse(file)
  return solveForLookback(nums, lookback)
}

function findSliceSummingTo(nums: number[], target: number) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let sum = 0
      for (let k = i; k <= j; k++) {
        sum += nums[k]
      }
      if (sum === target) {
        return nums.slice(i, j + 1)
      }
    }
  }
  throw Error()
}

function solve2(file: string, lookback: number) {
  const nums = parse(file)
  const failNum = solveForLookback(nums, lookback)
  const slice = findSliceSummingTo(nums, failNum)
  return addSmallestAndLargestValuesIn(slice)
}

console.log(`Day9 p1 sample.txt \t`, solve1('sample.txt', 5))
console.log(`Day9 p1 input.txt \t`, solve1('input.txt', 25))

console.log(`Day9 p2 sample.txt \t`, solve2('sample.txt', 5))
console.log(`Day9 p2 input.txt \t`, solve2('input.txt', 25))

function addSmallestAndLargestValuesIn(nums: number[]) {
  const sortedslice = nums.sort((a, b) => a - b)
  return sortedslice[0] + sortedslice[sortedslice.length - 1]
}
