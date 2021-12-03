import { findOxygen, findScrubber } from './calculator'

const NUMS = [
  '00100',
  '11110',
  '10110',
  '10111',
  '10101',
  '01111',
  '00111',
  '11100',
  '10000',
  '11001',
  '00010',
  '01010',
]

describe('findRating', () => {
  it('should calculate oxygen', () => {
    const rating = findOxygen(NUMS)
    expect(rating).toBe('10111')
  })
  it('shoudl calculate scrubber', () => {
    const rating = findScrubber(NUMS)
    expect(rating).toBe('01010')
  })
})
