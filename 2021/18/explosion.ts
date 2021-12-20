import {
  SnailNumber,
  isLeaf,
  findLeftNeighbor,
  findRightNeighbor,
} from './SnailNumber'

export const findExplosionPair = (
  sn: SnailNumber,
  depth = 0
): SnailNumber | null => {
  let explosionNode: SnailNumber | null = null
  if (depth === 4 && !isLeaf(sn)) {
    explosionNode = sn
  }
  if (!explosionNode && sn.left) {
    explosionNode = findExplosionPair(sn.left, depth + 1)
  }
  if (!explosionNode && sn.right) {
    explosionNode = findExplosionPair(sn.right, depth + 1)
  }
  return explosionNode
}

export const explodePair = (sn: SnailNumber) => {
  const left = findLeftNeighbor(sn)
  const right = findRightNeighbor(sn)
  if (left) {
    left.value! += sn.left!.value!
  }
  if (right) {
    right.value! += sn.right!.value!
  }
  sn.left = undefined
  sn.right = undefined
  sn.value = 0
}

export const runExplosion = (sn: SnailNumber): boolean => {
  const explosionPair = findExplosionPair(sn)
  if (!explosionPair) {
    return false
  }
  explodePair(explosionPair)
  return true
}
