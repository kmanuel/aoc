export const getMaxManhatten = (scannerPositions: number[][]): number => {
  let maxDist = 0
  for (let i = 0; i < scannerPositions.length - 1; i++) {
    for (let j = i + 1; j < scannerPositions.length; j++) {
      const s1 = scannerPositions[i]
      const s2 = scannerPositions[j]
      const dist =
        Math.abs(s1[0] - s2[0]) +
        Math.abs(s1[1] - s2[1]) +
        Math.abs(s1[2] - s2[2])
      if (dist > maxDist) {
        maxDist = dist
      }
    }
  }
  return maxDist
}
