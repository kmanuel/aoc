import { Instruction } from './index'

export const getRangeSize = (inst: Instruction) => {
  return (inst.x1 - inst.x0) * (inst.y1 - inst.y0) * (inst.z1 - inst.z0)
}
