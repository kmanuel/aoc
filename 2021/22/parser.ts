import { Instruction } from './index'
export const toInstruction = (line: string): Instruction => {
  const match = line.match(
    /^(on|off) x=(-?\d+)..(-?\d+),y=(-?\d+)..(-?\d+),z=(-?\d+)..(-?\d+)$/
  )
  if (!match || (match[1] !== 'on' && match[1] !== 'off')) {
    throw Error()
  }
  return {
    mode: match[1],
    x0: Number(match[2]),
    x1: Number(match[3]),
    y0: Number(match[4]),
    y1: Number(match[5]),
    z0: Number(match[6]),
    z1: Number(match[7]),
  }
}
