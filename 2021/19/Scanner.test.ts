import { Scanner } from './Scanner'

describe('Scanner', () => {
  const inputBeacons = [
    [1, 2, 3],
    [4, 5, 6],
  ]

  it('should return beacons without rot and diff', () => {
    const sc = new Scanner(inputBeacons, 1)
    const beacons = sc.getBeacons()
    expect(beacons).toEqual(inputBeacons)
  })
  it('should rotate beacons', () => {
    const sc = new Scanner(inputBeacons, 1)
    sc.setRotation(['-y', 'x', 'z'])
    const beacons = sc.getBeacons()
    expect(beacons).toEqual([
      [-2, 1, 3],
      [-5, 4, 6],
    ])
  })
  it('should shift to first beacon', () => {
    const sc = new Scanner(inputBeacons, 1)
    sc.setShift(inputBeacons[0])
    const beacons = sc.getBeacons()
    expect(beacons).toEqual([
      [0, 0, 0],
      [3, 3, 3],
    ])
  })
  it('should shift to second beacon', () => {
    const sc = new Scanner(inputBeacons, 2)
    sc.setShift(inputBeacons[1])
    const beacons = sc.getBeacons()
    expect(beacons).toEqual([
      [-3, -3, -3],
      [0, 0, 0],
    ])
  })
})
