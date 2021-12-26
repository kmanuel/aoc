export const countBeaconMatches = (
  beacons1: number[][],
  beacons2: number[][]
) => {
  let matches = 0
  for (let b1 of beacons1) {
    for (let b2 of beacons2) {
      if (isSameBeacon(b1, b2)) {
        matches++
      }
    }
  }
  return matches
}

const isSameBeacon = (b1: number[], b2: number[]) => {
  return b1[0] === b2[0] && b1[1] === b2[1] && b1[2] === b2[2]
}
