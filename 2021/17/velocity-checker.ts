import { isWithin } from './helpers'
import { TargetArea } from './types'

// brute force "algorithm"
export function maximizeY(targetArea: TargetArea) {
  let v = 0
  let lastValidOne = 0
  while (v < 20000) {
    const reaches = yReachesTarget([0, v], targetArea)
    if (reaches) {
      lastValidOne = v
    }
    v++
  }
  return lastValidOne
}

export function getMaxYPosForVelocity(yVelocity: number) {
  let yPos = 0
  while (yVelocity >= 0) {
    yPos += yVelocity
    yVelocity--
  }
  return yPos
}

export function yReachesTarget(
  initialVelocity: number[],
  targetArea: TargetArea
) {
  let position = [0, 0]
  let velocity = [...initialVelocity]
  let minY = Math.min(targetArea.y1, targetArea.y2)
  let maxY = Math.max(targetArea.y1, targetArea.y2)

  while (velocity[1] > 0) {
    position[1] = position[1] + velocity[1]
    velocity[1] = velocity[1] - 1
    if (isWithinYArea()) {
      return true
    }
  }

  if (isWithinYArea()) {
    return true
  }

  while (position[1] > minY) {
    if (isWithinYArea()) {
      return true
    }
    position[1] = position[1] + velocity[1]
    velocity[1] = velocity[1] - 1
  }

  return isWithinYArea()

  function isWithinYArea() {
    return position[1] <= maxY && position[1] >= minY
  }
}

export function velocityReachesTargetArea(
  initialVelocity: number[],
  targetArea: TargetArea
) {
  let probePosition = { x: 0, y: 0 }
  let probePath = [{ ...probePosition }]

  let targetMinY = Math.min(targetArea.y1, targetArea.y2)
  let velocity = [...initialVelocity]
  let step = 0

  while (
    !isWithin(probePosition, targetArea) &&
    !(probePosition.y < targetMinY && velocity[1] < 0)
  ) {
    probePath.push({ ...probePosition })
    probePosition.x += velocity[0]
    probePosition.y += velocity[1]
    step++
    if (velocity[0] < 0) {
      velocity[0] += 1
    } else if (velocity[0] > 0) {
      velocity[0] -= 1
    }
    velocity[1] -= 1
  }
  return isWithin(probePosition, targetArea)
}
