import { SnailNumber } from './SnailNumber'

export const split = (sn: SnailNumber): boolean => {
  if (typeof sn.value === 'number') {
    if (sn.value >= 10) {
      sn.left = {
        value: Math.floor(sn.value / 2),
      }
      sn.right = {
        value: Math.ceil(sn.value / 2),
      }
      sn.left.parent = sn
      sn.right.parent = sn
      sn.value = undefined
      return true
    }
    return false
  }
  return split(sn.left!) || split(sn.right!)
}
