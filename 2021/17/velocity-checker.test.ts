import {
  yReachesTarget,
  maximizeY,
  getMaxYPosForVelocity,
} from './velocity-checker'

describe('Day 17', () => {
  describe('Part 1', () => {
    describe('isValidYVelocity', () => {
      describe('{x1: 20, x2: 30, y1: -10, y2: -5}', () => {
        const targetArea = {
          x1: 20,
          x2: 30,
          y1: -10,
          y2: -5,
        }
        const validVelocities = [
          [0, 0],
          [0, 1],
          [0, 2],
          [0, 3],
          [0, 4],
          [0, 5],
          [0, 6],
          [0, 7],
          [0, 8],
          [0, 9],
        ]

        validVelocities.forEach((v) => {
          it(JSON.stringify(v), () => {
            const reaches = yReachesTarget(v, targetArea)
            expect(reaches).toBe(true)
          })
        })

        const invalidVelocities = [[0, 10]]

        invalidVelocities.forEach((v) => {
          it(JSON.stringify(v), () => {
            const reaches = yReachesTarget(v, targetArea)
            expect(reaches).toBe(false)
          })
        })
      })
    })
    describe('maximizeY', () => {
      const targetArea = {
        x1: 20,
        x2: 30,
        y1: -10,
        y2: -5,
      }
      describe(JSON.stringify(targetArea), () => {
        it('should be 9', () => {
          const max = maximizeY(targetArea)
          expect(max).toBe(9)
        })
      })
    })

    describe('getMaxYPosForVelocity', () => {
      describe('9', () => {
        const max = getMaxYPosForVelocity(9)
        expect(max).toBe(45)
      })
    })
  })
})
