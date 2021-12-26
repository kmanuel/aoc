import fs from 'fs'
import { Scanner } from './Scanner'

export const loadScanners = (fileName: string): Scanner[] => {
  const scans = fs
    .readFileSync(`./${fileName}`, 'utf-8')
    .split(/^--- scanner \d+ ---$/gm)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)

  const scanBeacons = scans.map((scan) =>
    scan.split('\n').map((line) => line.split(',').map((n) => Number(n)))
  )

  return scanBeacons.map((sb, idx) => new Scanner(sb, idx))
}
