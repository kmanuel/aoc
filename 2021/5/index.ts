import fs from 'fs'

interface HydroLinePoints {
  x1: number
  y1: number
  x2: number
  y2: number
}

const toHydroLine = (line: string): HydroLinePoints => {
  const match = line.match(/(\d+),(\d+) -> (\d+),(\d+)/)
  if (!match) {
    throw new Error('invalid line')
  }
  return {
    x1: Number(match[1]),
    y1: Number(match[2]),
    x2: Number(match[3]),
    y2: Number(match[4]),
  }
}

const filterHorizontalAndVerticalLines = (
  lines: { x1: number; y1: number; x2: number; y2: number }[]
) => {
  return lines.filter((l) => l.x1 === l.x2 || l.y1 === l.y2)
}

const lineToPointList = (line: HydroLinePoints) => {
  let minX = Math.min(line.x1, line.x2)
  let maxX = Math.max(line.x1, line.x2)
  let minY = Math.min(line.y1, line.y2)
  let maxY = Math.max(line.y1, line.y2)
  let xDir = line.x1 === line.x2 ? 0 : line.x1 < line.x2 ? 1 : -1
  let yDir = line.y1 === line.y2 ? 0 : line.y1 < line.y2 ? 1 : -1
  let maxDiff = Math.max(maxX - minX, maxY - minY)
  let points = []
  for (let i = 0; i <= maxDiff; i++) {
    points.push({ x: line.x1 + i * xDir, y: line.y1 + i * yDir })
  }
  return points
}

function countOverlaps(flatPoints: { x: number; y: number }[]) {
  let atLeastTwoCount = 0
  const hydroPoints: any = {}
  for (let point of flatPoints) {
    const pointKey = `${point.x},${point.y}`
    const existingVal = hydroPoints[pointKey]
    if (!existingVal) {
      hydroPoints[pointKey] = 1
    } else {
      if (existingVal === 1) {
        hydroPoints[pointKey] = hydroPoints[pointKey] + 1
        atLeastTwoCount++
      }
    }
  }
  return atLeastTwoCount
}

const run1 = () => {
  const lines = fs.readFileSync('./5/input.txt', 'utf-8').split('\n')
  const hydroLines = lines.map(toHydroLine)
  let filteredLines = filterHorizontalAndVerticalLines(hydroLines)
  const pointLists = filteredLines.map(lineToPointList)
  const flatPoints = pointLists.flat()
  const atLeastTwoCount = countOverlaps(flatPoints)
  console.log(`Day 5, p1: ${atLeastTwoCount}`)
}

const run2 = () => {
  const lines = fs.readFileSync('./5/input.txt', 'utf-8').split('\n')
  const hydroLines = lines.map(toHydroLine)
  const pointLists = hydroLines.map(lineToPointList)
  const flatPoints = pointLists.flat()
  const atLeastTwoCount = countOverlaps(flatPoints)
  console.log(`Day 5, p2: ${atLeastTwoCount}`)
}

run1()
run2()
