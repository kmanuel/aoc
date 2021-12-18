import { TargetArea } from './types'
import {
  getMaxYPosForVelocity as getHeighestYForVelocity,
  maximizeY as getMaxYVelocity,
  velocityReachesTargetArea,
} from './velocity-checker'

function part1(area: TargetArea) {
  const maxYVelocity = getMaxYVelocity(area)
  const maxYPos = getHeighestYForVelocity(maxYVelocity)
  return maxYPos
}

function part2(area: TargetArea) {
  const minYVelocity = Math.min(area.y1, area.y2)
  const maxYVelocity = getMaxYVelocity(area)
  let velocities: number[][] = []
  for (let x = 0; x <= area.x2; x++) {
    for (let y = minYVelocity; y <= maxYVelocity; y++) {
      const reachedTarget = velocityReachesTargetArea([x, y], area)
      if (reachedTarget) {
        velocities.push([x, y])
      }
    }
  }
  return velocities.length
}

const inputArea = {
  x1: 240,
  x2: 292,
  y1: -90,
  y2: -57,
}

const sampleArea = {
  x1: 20,
  x2: 30,
  y1: -10,
  y2: -5,
}

console.log(`Day 17, sample, p1=${part1(sampleArea)}`)
console.log(`Day 17, sample, p2=${part2(sampleArea)}`)
console.log(`Day 17, input, p1=${part1(inputArea)}`)
console.log(`Day 17, input, p2=${part2(inputArea)}`)
