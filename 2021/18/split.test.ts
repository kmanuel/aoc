import { toSnailNum } from './parser'
import { toSnailString } from './SnailNumber'
import { split } from './split'
describe('split', () => {
  it('returns true on split', () => {
    const sn = toSnailNum('[[[[0,7],4],[15,[0,13]]],[1,1]]')
    const result = split(sn)
    expect(result).toBe(true)
  })
  it('splits numbers correctly', () => {
    const sn = toSnailNum('[[[[0,7],4],[15,[0,13]]],[1,1]]')
    split(sn)
    const str = toSnailString(sn)
    expect(str).toBe('[[[[0,7],4],[[7,8],[0,13]]],[1,1]]')
  })
})
