import { getRangeSize } from './ranges'
import { Instruction } from './index'
import { sliceCubes } from './slice'
import { toInstruction } from './parser'
describe('ranges', () => {
  describe('getRangeSize', () => {
    test('3x3x3=27', () => {
      const size = getRangeSize({
        mode: 'on',
        x0: 0,
        x1: 3,
        y0: 0,
        y1: 3,
        z0: 0,
        z1: 3,
      })
      expect(size).toBe(27)
    })
  })

  describe('slice', () => {
    test('example', () => {
      const s1: Instruction = {
        mode: 'on',
        x0: 0,
        x1: 3,
        y0: 0,
        y1: 3,
        z0: 0,
        z1: 3,
      }
      const s2: Instruction = {
        mode: 'on',
        x0: -2,
        x1: -1,
        y0: -2,
        y1: -1,
        z0: -2,
        z1: -1,
      }
      const res = sliceCubes(s1, s2)
      expect(res?.length).toBe(1)
    })
    test('slice corner', () => {
      const s1: Instruction = {
        mode: 'on',
        x0: 0,
        x1: 3,
        y0: 0,
        y1: 3,
        z0: 0,
        z1: 3,
      }
      const s2: Instruction = {
        mode: 'on',
        x0: 0,
        x1: 1,
        y0: 0,
        y1: 1,
        z0: 0,
        z1: 1,
      }
      const res = sliceCubes(s1, s2)
      expect(res?.length).toBe(3)
    })
    test('slice middleedge', () => {
      const s1: Instruction = {
        mode: 'on',
        x0: 0,
        x1: 3,
        y0: 0,
        y1: 3,
        z0: 0,
        z1: 3,
      }
      const s2: Instruction = {
        mode: 'on',
        x0: 1,
        x1: 2,
        y0: 0,
        y1: 1,
        z0: 0,
        z1: 1,
      }
      const res = sliceCubes(s1, s2)
      console.log(res)
      expect(res?.length).toBe(4)
    })
    test('slice center', () => {
      const s1: Instruction = {
        mode: 'on',
        x0: 0,
        x1: 3,
        y0: 0,
        y1: 3,
        z0: 0,
        z1: 3,
      }
      const s2: Instruction = {
        mode: 'on',
        x0: 1,
        x1: 2,
        y0: 1,
        y1: 2,
        z0: 1,
        z1: 2,
      }
      const res = sliceCubes(s1, s2)
      console.log(res)
      expect(res?.length).toBe(6)
    })
    test('destroying slice', () => {
      const s1: Instruction = {
        mode: 'on',
        x0: 1,
        x1: 2,
        y0: 1,
        y1: 2,
        z0: 1,
        z1: 2,
      }
      const s2: Instruction = {
        mode: 'off',
        x0: 1,
        x1: 2,
        y0: 1,
        y1: 2,
        z0: 1,
        z1: 2,
      }
      const slices = sliceCubes(s1, s2)
      expect(slices.length).toBe(0)
    })
    test('unit cube cut', () => {
      const s1: Instruction = {
        mode: 'on',
        x0: 0,
        x1: 10,
        y0: 0,
        y1: 10,
        z0: 0,
        z1: 0,
      }
    })
    test('slices correct points', () => {
      let insts = ['on x=0..2,y=0..2,z=0..2', 'off x=0..0,y=0..0,z=0..0'].map(
        toInstruction
      )
      const slices = sliceCubes(insts[0], insts[1])
      expect(countPoints(slices)).toBe(26)
    })
    test('slices end point', () => {
      let insts = ['on x=0..2,y=0..2,z=0..2', 'off x=2..3,y=2..2,z=2..2'].map(
        toInstruction
      )
      const slices = [...sliceCubes(insts[0], insts[1])]
      //   expect(countPoints([insts[1]])).toBe(27)

      expect(countPoints(slices)).toBe(26)
    })
  })
})

const countPoints = (instructions: Instruction[]) => {
  let cache: { [k: string]: boolean } = {}
  for (let inst of instructions) {
    for (let x = inst.x0; x <= inst.x1; x++) {
      for (let y = inst.y0; y <= inst.y1; y++) {
        for (let z = inst.z0; z <= inst.z1; z++) {
          cache[`${x}-${y}-${z}`] = true
        }
      }
    }
  }

  console.log(Object.keys(cache).sort())
  return Object.keys(cache).length
}
