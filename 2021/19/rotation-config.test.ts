import { getAllRots } from './rotation-config'

describe('rotation-config', () => {
  it('contains root rot', () => {
    const rots = getAllRots()
    const res = rots.find((r) => r[0] === 'x' && r[1] === 'y' && r[2] === 'z')
    expect(res).toBeDefined()
  })
})
