import { loadScanners } from './input-parser'
describe('loadScanners', () => {
  it('loads scanners', () => {
    const scanners = loadScanners('./2021/19/input-test.txt')

    const sc1Beacons = scanners[0].getBeacons()
    expect(sc1Beacons).toEqual([
      [-1, -2, -3],
      [4, 5, 6],
    ])

    const sc2Beacons = scanners[1].getBeacons()
    expect(sc2Beacons).toEqual([
      [9, -8, 7],
      [-6, 5, -5],
    ])
  })
})
