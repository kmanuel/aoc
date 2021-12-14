import fs from 'fs'

const run1 = (input: string) => {
  const iterations = 10
  const res = runIterations(input, iterations)
  console.log(`Day 14, ${input} p1: `, res)
}

const run2 = (input: string) => {
  const iterations = 40
  const res = runIterations(input, iterations)
  console.log(`Day 14, ${input} p2: `, res)
}

function runIterations(input: string, iterations: number) {
  const parts = fs.readFileSync(`./${input}.txt`, 'utf-8').split(/^$/gm)
  const pairMap = getPairInsertions(parts)
  let template = parts[0].trim()
  let pairOccurrences = getOccurrences(template)
  for (let i = 0; i < iterations; i++) {
    pairOccurrences = runPairInsertionProcess(pairOccurrences, pairMap)
  }
  let totals = toCharacterOccurrences(pairOccurrences)
  let { max, min } = findMinMax(totals)
  const res = max - min + 1
  return res
}

function toCharacterOccurrences(pairOccurrences: { [k: string]: number }) {
  let totals: { [k: string]: number } = {}
  for (let occ of Object.keys(pairOccurrences)) {
    const val = pairOccurrences[occ]
    let ch1 = occ.split('')[0]
    totals[ch1] = (totals[ch1] || 0) + val
  }
  return totals
}

function runPairInsertionProcess(
  pairOccurrences: { [k: string]: number },
  pairMap: { [to: string]: { left: string; right: string } }
) {
  const nextOccurrences: { [k: string]: number } = {}
  for (let key of Object.keys(pairOccurrences)) {
    const val = pairOccurrences[key] || 0
    const { left, right } = pairMap[key]
    nextOccurrences[left] = (nextOccurrences[left] || 0) + val
    nextOccurrences[right] = (nextOccurrences[right] || 0) + val
  }
  pairOccurrences = nextOccurrences
  return pairOccurrences
}

function getPairInsertions(parts: string[]) {
  const pairs = parts[1]
    .trim()
    .split('\n')
    .map((p) => p.split(' -> '))

  return pairs.reduce<{
    [to: string]: { left: string; right: string }
  }>((acc, el) => {
    const key = el[0]
    const val = el[1]
    acc[key] = {
      left: key.charAt(0) + val,
      right: val + key.charAt(1),
    }
    return acc
  }, {})
}

function findMinMax(totals: { [k: string]: number }) {
  let max = 0
  let min = Number.MAX_VALUE
  for (let key of Object.keys(totals)) {
    const val = totals[key]
    if (val > max) {
      max = val
    }
    if (val < min) {
      min = val
    }
  }
  return { max, min }
}

function getOccurrences(template: string) {
  const pairOccurrences: { [k: string]: number } = {}
  for (let i = 0; i < template.length - 1; i++) {
    let curr = template.substring(i, i + 2)
    if (!pairOccurrences[curr]) {
      pairOccurrences[curr] = 0
    }
    pairOccurrences[curr]++
  }
  return pairOccurrences
}

run1(`sample`)
run2(`sample`)
run1(`input`)
run2(`input`)
