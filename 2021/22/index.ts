import fs from 'fs'
import { sliceCubes } from './slice'
import { toCubeSize } from './cube-size'
import { toInstruction } from './parser'

export interface Instruction {
  mode: 'on' | 'off'
  x0: number
  x1: number
  y0: number
  y1: number
  z0: number
  z1: number
}

const solve1 = () => {
  const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n')
  const instructions = lines.map(toInstruction)
  const onFields: { [k: string]: boolean } = {}

  for (let inst of instructions) {
    const { x0, x1, y0, y1, z0, z1 } = inst
    for (let x = Math.max(-50, x0); x <= Math.min(x1, 50); x++) {
      for (let y = Math.max(-50, y0); y <= Math.min(y1, 50); y++) {
        for (let z = Math.max(-50, z0); z <= Math.min(z1, 50); z++) {
          let key = `${x}-${y}-${z}`
          if (inst.mode === 'on') {
            onFields[key] = true
          } else {
            delete onFields[key]
          }
        }
      }
    }
  }

  console.log(Object.keys(onFields).length)
}

const solve2 = () => {
  const smpls = fs
    .readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .map(toInstruction)

  let areas: Instruction[] = []

  for (let inst of smpls) {
    areas = areas.flatMap((a) => sliceCubes(a, inst))
    if (inst.mode === 'on') {
      areas.push(inst)
    }
  }

  const cubeSizes = areas.map(toCubeSize)
  console.log(cubeSizes.reduce((acc, el) => acc + el))
}
