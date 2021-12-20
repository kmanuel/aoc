import { toSnailNum } from './parser'
import { findExplosionPair, runExplosion } from './explosion'
import { toSnailString } from './SnailNumber'

const cases = [
  {
    from: '[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]',
    expected: '[4,3]',
  },
  {
    from: '[[[[0,7],4],[7,[[8,4],9]]],[1,1]]',
    expected: '[8,4]',
  },
  {
    from: '[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]',
    expected: '[6,7]',
  },
  {
    from: '[[[[[9,8],1],2],3],4]',
    expected: '[9,8]',
  },
  {
    from: '[7,[6,[5,[4,[3,2]]]]]',
    expected: '[3,2]',
  },
  {
    from: '[[6,[5,[4,[3,2]]]],1]',
    expected: '[3,2]',
  },
  {
    from: '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]',
    expected: '[7,3]',
  },
  {
    from: '[[3,[2,[8,0]]],[9,[5,[4,[3,2]]]]]',
    expected: '[3,2]',
  },
  {
    from: '[[3,[2,[1,[7,3]]]],[6,[5,[4,[3,2]]]]]',
    expected: '[7,3]',
  },
]

describe('findExplosionPair', () => {
  cases.forEach(({ from, expected }) => {
    it(`finds ${expected} in ${from}`, () => {
      const sn = toSnailNum(from)
      const explosionPair = findExplosionPair(sn)
      const resultString = toSnailString(explosionPair!)
      expect(resultString).toBe(expected)
    })
  })
})

describe('runExplosion', () => {
  it('t1', () => {
    const sn = toSnailNum('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]')
    const res = runExplosion(sn)
    expect(res).toBe(true)
    const str = toSnailString(sn)
    expect(str).toBe('[[[[0,7],4],[7,[[8,4],9]]],[1,1]]')
  })
  it('t2', () => {
    const sn = toSnailNum('[[[[0,7],4],[7,[[8,4],9]]],[1,1]]')
    const res = runExplosion(sn)
    expect(res).toBe(true)
    const str = toSnailString(sn)
    expect(str).toBe('[[[[0,7],4],[15,[0,13]]],[1,1]]')
  })
  it('t3', () => {
    const sn = toSnailNum('[[[[0,7],4],[15,[0,13]]],[1,1]]')
    const res = runExplosion(sn)
    expect(res).toBe(false)
  })
  it('multiexplosions', () => {
    const sn = toSnailNum('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]')
    let res = true
    res = runExplosion(sn)
    expect(res).toBe(true)
    res = runExplosion(sn)
    expect(res).toBe(true)
    res = runExplosion(sn)
    expect(res).toBe(false)
    res = runExplosion(sn)
    expect(res).toBe(false)
    expect(toSnailString(sn)).toBe('[[[[0,7],4],[15,[0,13]]],[1,1]]')
  })
  it('explodes [[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]', () => {
    const sn = toSnailNum('[[[[0,7],4],[[7,8],[0,[6,7]]]],[1,1]]')
    runExplosion(sn)
    expect(toSnailString(sn)).toBe('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')
  })
})
