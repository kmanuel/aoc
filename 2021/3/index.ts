import fs from 'fs'
import { computeAlphaGamma, findOxygen, findScrubber } from './calculator'

const run = () => {
  const inputs = fs.readFileSync('./3/input.txt', 'utf-8').split('\n')
  const { gamma, epsilon } = computeAlphaGamma(inputs)
  console.log(`Day 3, p1: `, gamma * epsilon)
}

const run2 = () => {
  const inputs = fs.readFileSync('./3/input.txt', 'utf-8').split('\n')
  const oxygen = findOxygen(inputs)
  const scrubber = findScrubber(inputs)
  console.log(`Day3, p2: `, parseInt(oxygen, 2) * parseInt(scrubber, 2))
}

run()
run2()
