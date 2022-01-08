import internal from 'stream'
import {
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
  step8,
  step9,
  step10,
  step11,
  step12,
  step13,
  step14,
} from './compiled_steps'

const baseAlu = {
  w: 0,
  x: 0,
  y: 0,
  z: 0,
}

const combinations: { z: number; w: number }[] = []

for (let z = 0; z <= 26; z++) {
  for (let w = 1; w <= 9; w++) {
    combinations.push({ w, z })
  }
}

let steps = [
  step1,
  step2,
  step3,
  step4,
  step5,
  step6,
  step7,
  step8,
  step9,
  step10,
  step11,
  step12,
  step13,
  step14,
]

let results: number[]

let stepCombis: { w: number; z: number }[][] = [
  [
    {
      w: 1,
      z: 0,
    },
    {
      w: 2,
      z: 0,
    },
    {
      w: 3,
      z: 0,
    },
    {
      w: 4,
      z: 0,
    },
    {
      w: 5,
      z: 0,
    },
    {
      w: 6,
      z: 0,
    },
    {
      w: 7,
      z: 0,
    },
    {
      w: 8,
      z: 0,
    },
    {
      w: 9,
      z: 0,
    },
  ],
]

// solve(13, 0)
// for (let i = steps.length - 1; i >= 0; i--) {
//   let possibleZs = combis[i + 1].map((c) => c.z)
//   for (let z of possibleZs) {
//     solve(i, z)
//   }
//   break
// }

const chunkRun = (from: number, to: number) => {
  const stepCaches: { [k: string]: boolean } = {}

  const solve = (z: number, path: number[] = []): boolean => {
    const stepIdx = path.length
    const key = `${stepIdx}-${z % 26}-${Math.floor(z / 26)}`
    if (stepCaches[key]) {
      return false
    }

    let step = steps[stepIdx]
    for (let w = 1; w <= 9; w++) {
      if (stepIdx === 0 && (w < from || w >= to)) {
        continue
      }
      const res = step({ ...baseAlu, w: w, z: z })
      if (stepIdx === 13) {
        if (res === 0) {
          console.log(JSON.stringify([...path, w].join('')))
          return true
        }
      } else {
        const terminated = solve(res, [...path, w])
        if (terminated) {
          return true
        }
      }
    }
    stepCaches[key] = true

    return false
  }
  solve(0, [])
}

for (let i = 0; i < 9; i++) {
  console.log('chunk', i)
  chunkRun(i + 1, i + 2)
}
