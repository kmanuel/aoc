import { countBeaconMatches } from './beacon-compare'
describe('beacon-compare', () => {
  it('should detect zero matches', () => {
    const b1s = [
      [1, 2, 3],
      [4, 5, 6],
    ]
    const b2s = [
      [1, 2, 2],
      [5, 4, 6],
    ]

    const matches = countBeaconMatches(b1s, b2s)
    expect(matches).toBe(0)
  })

  it('should detect 1 match', () => {
    const b1s = [
      [4, 5, 6],
      [1, 2, 2],
    ]
    const b2s = [
      [1, 2, 2],
      [5, 4, 6],
    ]

    const matches = countBeaconMatches(b1s, b2s)
    expect(matches).toBe(1)
  })

  it('should detect 2 matches', () => {
    const b1s = [
      [4, 5, 6],
      [1, 2, 2],
    ]

    const b2s = [
      [1, 2, 2],
      [4, 5, 6],
    ]

    const matches = countBeaconMatches(b1s, b2s)
    expect(matches).toBe(2)
  })
})
