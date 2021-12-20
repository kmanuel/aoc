import { toSnailNum } from './parser'
import { runProcess } from './process'
import { toSnailString } from './SnailNumber'

describe('runProcess', () => {
  it('processes', () => {
    const sn = toSnailNum('[[[[[4,3],4],4],[7,[[8,4],9]]],[1,1]]')
    runProcess(sn)
    const str = toSnailString(sn)
    expect(str).toBe('[[[[0,7],4],[[7,8],[6,0]]],[8,1]]')
  })
})
