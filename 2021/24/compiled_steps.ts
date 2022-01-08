interface Alu {
  w: number
  x: number
  y: number
  z: number
}

export function solve(invals: number[]) {
  let alu = { w: 0, x: 0, y: 0, z: 0 }
  let currInval = 0
  alu.w = invals[currInval++]
  step1(alu)
  alu.w = invals[currInval++]
  step2(alu)
  alu.w = invals[currInval++]
  step3(alu)
  alu.w = invals[currInval++]
  step4(alu)
  alu.w = invals[currInval++]
  step5(alu)
  alu.w = invals[currInval++]
  step6(alu)
  alu.w = invals[currInval++]
  step7(alu)
  alu.w = invals[currInval++]
  step8(alu)
  alu.w = invals[currInval++]
  step9(alu)
  alu.w = invals[currInval++]
  step10(alu)
  alu.w = invals[currInval++]
  step11(alu)
  alu.w = invals[currInval++]
  step12(alu)
  alu.w = invals[currInval++]
  step13(alu)
  alu.w = invals[currInval++]
  step14(alu)
  return alu.z
}
export function step14(alu: { w: number; x: number; y: number; z: number }) {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.z = Math.floor(alu.z / 26)
  alu.x += -8
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 3
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}

export function step13(alu: { w: number; x: number; y: number; z: number }) {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.z = Math.floor(alu.z / 26)
  alu.x += -6
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 10
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}

export function step12(alu: { w: number; x: number; y: number; z: number }) {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.x += 10
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 1
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}

export function step11(alu: { w: number; x: number; y: number; z: number }) {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.z = Math.floor(alu.z / 26)
  alu.x += -7
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 7
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}

export function step10(alu: { w: number; x: number; y: number; z: number }) {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.z = Math.floor(alu.z / 26)
  alu.x += -3
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 11
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}

export function step9(alu: { w: number; x: number; y: number; z: number }) {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.z = Math.floor(alu.z / 26)
  alu.x += -13
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 5
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}

export function step8(alu: { w: number; x: number; y: number; z: number }) {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.x += 14
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 15
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}

export function step7(alu: { w: number; x: number; y: number; z: number }) {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.x += 14
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 2
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}

export function step6(alu: { w: number; x: number; y: number; z: number }) {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.x += 15
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 3
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}

export function step5(alu: { w: number; x: number; y: number; z: number }) {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.z = Math.floor(alu.z / 26)
  alu.x += -4
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 9
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}
export function step4(alu: { w: number; x: number; y: number; z: number }) {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.z = Math.floor(alu.z / 26)
  alu.x += -8
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 5
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}

export function step3(alu: { w: number; x: number; y: number; z: number }) {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.x += 15
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 16
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}

export function step2(alu: { w: number; x: number; y: number; z: number }) {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.x += 12
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 1
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}

export const step1 = (alu: Alu) => {
  alu.x *= 0
  alu.x += alu.z
  alu.x %= 26
  alu.x += 12
  alu.x = alu.x === alu.w ? 1 : 0
  alu.x = alu.x === 0 ? 1 : 0
  alu.y *= 0
  alu.y += 25
  alu.y *= alu.x
  alu.y += 1
  alu.z *= alu.y
  alu.y *= 0
  alu.y += alu.w
  alu.y += 1
  alu.y *= alu.x
  alu.z += alu.y
  return alu.z
}
