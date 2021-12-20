export interface SnailNumber {
  value?: number
  left?: SnailNumber
  right?: SnailNumber
  parent?: SnailNumber
}

export const isLeaf = (sn: SnailNumber) => {
  return typeof sn.value === 'number'
}

export const toSnailString = (sn: SnailNumber) => {
  if (typeof sn.value === 'number') {
    return sn.value.toString()
  }
  let str = '['
  str += toSnailString(sn.left!)
  str += ','
  str += toSnailString(sn.right!)
  str += ']'
  return str
}

export const findLeftNeighbor = (sn: SnailNumber) => {
  let curr: SnailNumber | undefined = sn
  while (curr.parent && curr.parent.left === curr) {
    curr = curr.parent
  }
  if (!curr) {
    return null
  }
  curr = curr?.parent?.left
  if (!curr) {
    return null
  }
  while (curr.right) {
    curr = curr.right
  }
  return curr
}

export const findRightNeighbor = (sn: SnailNumber) => {
  let curr: SnailNumber | undefined = sn
  while (curr.parent && curr.parent.right === curr) {
    curr = curr.parent
  }
  if (!curr) {
    return null
  }
  curr = curr?.parent?.right
  if (!curr) {
    return null
  }
  while (curr.left) {
    curr = curr.left
  }
  return curr
}

export const add = (sn1: SnailNumber, sn2: SnailNumber): SnailNumber => {
  const res = {
    left: sn1,
    right: sn2,
  }
  res.left.parent = res
  res.right.parent = res
  return res
}

export const toMagnitude = (sn: SnailNumber): number => {
  if (typeof sn.value !== 'undefined') {
    return sn.value
  }
  return toMagnitude(sn.left!) * 3 + toMagnitude(sn.right!) * 2
}
