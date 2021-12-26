import { loadScanners } from './input-parser'
import { getMaxManhatten as getMaxManhattenDistance } from './scanner-manhatten'
import { scannersMatch } from './scanner-match'

let scanners = loadScanners('./2021/19/input.txt')

let refScanner = scanners.splice(0, 1)[0]

let scannerPositions: number[][] = []

while (scanners.length > 0) {
  console.log('unmatched scanners', scanners.length)
  let foundAMatch = false
  for (let sc of scanners) {
    const match = scannersMatch(refScanner, sc)
    if (match) {
      sc.setRotation(match.rot)
      sc.setShift([
        -1 * match.scannerPos[0],
        -1 * match.scannerPos[1],
        -1 * match.scannerPos[2],
      ])
      scannerPositions.push(match.scannerPos)
      const beacs = sc.getBeacons()
      refScanner.addBeacons(beacs)
      const removeIdx = scanners.findIndex((s) => s.scannerId === sc.scannerId)
      scanners.splice(removeIdx, 1)
      foundAMatch = true
    }
  }
  if (!foundAMatch) {
    throw Error(
      `went through all scanners, found no match for ${scanners.length} scanners`
    )
  }
}

const makeUnique = (beacons: number[][]): number[][] => {
  let uniqueBeacons: string[] = []
  const bStrings = beacons.map((b) => JSON.stringify(b))
  for (let str of bStrings) {
    if (!uniqueBeacons.includes(str)) {
      uniqueBeacons.push(str)
    }
  }
  return uniqueBeacons.map((b) => JSON.parse(b))
}

let allBeacons = refScanner.getBeacons()

const uniqueBeacons = makeUnique(allBeacons)
console.log(`Day 19, part1=${uniqueBeacons.length}`)
const maxDistance = getMaxManhattenDistance(scannerPositions)
console.log(`Day 19, part2=${maxDistance}`)
