import { Scanner } from './Scanner'
import { scannersMatch } from './scanner-match'
describe('scannersMatch', () => {
  it('finds match', () => {
    const sc1 = new Scanner(
      [
        [1, 2, 3],
        [4, 5, 6],
      ],
      1
    )
    const sc2 = new Scanner(
      [
        [2, 3, 4],
        [5, 6, 7],
      ],
      2
    )
    const match = scannersMatch(sc1, sc2, 2)
    expect(match).toBe(true)
  })
})
