import { Instruction } from './index'

export const toCubeSize = (inst: Instruction): number => {
  return (
    (inst.x1 - inst.x0 + 1) * (inst.y1 - inst.y0 + 1) * (inst.z1 - inst.z0 + 1)
  )
}
