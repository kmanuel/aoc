import { toSnailNum } from './parser'
import {
  findLeftNeighbor,
  findRightNeighbor,
  toSnailString,
} from './SnailNumber'

describe('findLeftMostNeighbour', () => {
  it('finds, existing left', () => {
    const sn = toSnailNum('[[1,[5,2]],[3,4]]')
    const from = sn.right!
    const n = findLeftNeighbor(from)
    expect(toSnailString(n!)).toBe('2')
  })
  it('finds nothing', () => {
    const sn = toSnailNum('[[1,[5,2]],[3,4]]')
    const from = sn.left!
    const n = findLeftNeighbor(from)
    expect(n).toBeNull()
  })
})

describe('findRightMostNeighbour', () => {
  it('finds, existing right', () => {
    const sn = toSnailNum('[[1,[5,2]],[3,4]]')
    const from = sn.left!.right!
    const n = findRightNeighbor(from)
    expect(toSnailString(n!)).toBe('3')
  })
  it('finds nothing', () => {
    const sn = toSnailNum('[[1,[5,2]],[3,4]]')
    const from = sn.right!
    const n = findRightNeighbor(from)
    expect(n).toBeNull()
  })
})
