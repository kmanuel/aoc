import { Instruction } from './index'

type Section = Pick<Instruction, 'x0' | 'x1' | 'y0' | 'y1' | 'z0' | 'z1'>

export const sliceCubes = (orig: Instruction, slicer: Instruction) => {
  if (slicer.x0 > orig.x1 || slicer.x1 < orig.x0) {
    return [orig]
  }
  if (slicer.y0 > orig.y1 || slicer.y1 < orig.y0) {
    return [orig]
  }
  if (slicer.z0 > orig.z1 || slicer.z1 < orig.z0) {
    return [orig]
  }

  let p1 = {
    ...orig,
    x1: slicer.x0 - 1,
  }
  let p2 = {
    ...orig,
    x0: slicer.x0,
    x1: slicer.x1,
    y1: slicer.y0 - 1,
  }
  let p3 = {
    ...orig,
    x0: slicer.x0,
    x1: slicer.x1,
    y0: slicer.y1 + 1,
  }
  let p4 = {
    ...orig,
    x0: slicer.x1 + 1,
  }
  let p5 = {
    ...slicer,
    z0: orig.z0,
    z1: slicer.z0 - 1,
  }
  let p6 = {
    ...slicer,
    z0: slicer.z1 + 1,
    z1: orig.z1,
  }

  let parts = [p1, p2, p3, p4, p5, p6]

  parts = parts.map((p) => ({
    mode: p.mode,
    x0: Math.max(p.x0, orig.x0),
    x1: Math.min(p.x1, orig.x1),
    y0: Math.max(p.y0, orig.y0),
    y1: Math.min(p.y1, orig.y1),
    z0: Math.max(p.z0, orig.z0),
    z1: Math.min(p.z1, orig.z1),
  }))

  return parts.filter(
    (p) =>
      p.x0 <= p.x1 &&
      p.x0 >= orig.x0 &&
      p.x1 <= orig.x1 &&
      p.y0 <= p.y1 &&
      p.y0 >= orig.y0 &&
      p.y1 <= orig.y1 &&
      p.z0 <= p.z1 &&
      p.z0 >= orig.z0 &&
      p.z1 <= orig.z1
  )
}
