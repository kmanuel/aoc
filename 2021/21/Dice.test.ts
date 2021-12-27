import { Dice } from './Dice'

describe('Dice', () => {
  it('rolls', () => {
    const dice = new Dice()
    expect(dice.roll()).toBe(1)
    expect(dice.roll()).toBe(2)
    expect(dice.roll()).toBe(3)
    expect(dice.roll()).toBe(4)
  })
  it('rolls 1 after 100 rolls', () => {
    const dice = new Dice()
    for (let i = 0; i < 100; i++) {
      dice.roll()
    }
    expect(dice.roll()).toBe(1)
  })
})
