import fs from 'fs'
import { toSnailNum } from './parser'
import { runProcess } from './process'
import { add, toMagnitude, toSnailString } from './SnailNumber'

const p1 = () => {
  const nums = fs.readFileSync('./input.txt', 'utf-8').split('\n')
  const first = toSnailNum(nums[0])
  let curr = first
  let adds = nums.slice(1)
  for (let addNumber of adds) {
    curr = add(curr, toSnailNum(addNumber))
    runProcess(curr)
  }
  console.log(toMagnitude(curr))
}

const addSolve = (s1: string, s2: string) => {
  const addRes = add(toSnailNum(s1), toSnailNum(s2))
  runProcess(addRes)
  return toMagnitude(addRes)
}

const p2 = () => {
  let max = 0
  const nums = fs.readFileSync('./input.txt', 'utf-8').split('\n')
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      let n1 = nums[i]
      let n2 = nums[j]
      const r1 = addSolve(n1, n2)
      if (r1 > max) {
        max = r1
      }
      const r2 = addSolve(n2, n1)
      if (r2 > max) {
        max = r2
      }
    }
  }
  return max
}

const max = p2()
console.log(max)
