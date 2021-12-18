import { isWithin } from './helpers'
describe('17', () => {
  describe('helper', () => {
    describe('isWithin', () => {
      const targetArea = {
        x1: 0,
        x2: 1,
        y1: 2,
        y2: 3,
      }
      describe(`within ${JSON.stringify(targetArea)}`, () => {
        const cases = [
          // to the left of target
          { x: -1, y: 2, expected: false },
          //   in target
          { x: 0, y: 2, expected: true },
          { x: 0, y: 3, expected: true },
          { x: 1, y: 2, expected: true },
          { x: 1, y: 3, expected: true },
          //   over target
          { x: 0, y: 4, expected: false },
          //   under target
          { x: 0, y: 1, expected: false },
        ]
        cases.forEach((c) =>
          it(`[${c.x},${c.y}] is ${!c.expected && 'not '}within`, () => {
            const result = isWithin(c, targetArea)
            expect(result).toBe(c.expected)
          })
        )
      })
    })
  })
})
