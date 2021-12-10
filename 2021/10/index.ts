import fs from 'fs'

const run1 = () => {
  const lines = fs.readFileSync('./10/input.txt', 'utf-8').split('\n')
  let violators: string[] = []
  for (let line of lines) {
    const violatingChar = getViolatingChar(line)
    if (violatingChar) {
      violators.push(violatingChar)
    }
  }
  const sum = violators.map(charToNumber).reduce((acc, el) => acc + el)
  console.log(`Day 10, p1: `, sum)
}

const run2 = () => {
  const lines = fs.readFileSync('./10/input.txt', 'utf-8').split('\n')
  let scores: number[] = []
  for (let line of lines) {
    const openChars = getOpenChars(line)
    if (!openChars) {
      continue
    }
    const closingChars: string[] = mapToClosingChars(openChars)
    const lineScore = mapToLineScore(closingChars)
    scores.push(lineScore)
  }
  const sortedScores = scores.sort((a, b) => b - a)
  const midPos = Math.floor(sortedScores.length / 2)
  const middleScore = sortedScores[midPos]
  console.log(`Day 10, p2: `, middleScore)
}

function mapToClosingChars(openChars: string[]): string[] {
  return openChars.reverse().map((o) => {
    if (o === '{') return '}'
    if (o === '[') return ']'
    if (o === '<') return '>'
    else return ')'
  })
}

function mapToLineScore(closingChars: string[]): number {
  let score = 0
  for (let ch of closingChars) {
    score *= 5
    if (ch === ')') {
      score += 1
    } else if (ch === ']') {
      score += 2
    } else if (ch === '}') {
      score += 3
    } else if (ch === '>') {
      score += 4
    }
  }
  return score
}

function charToNumber(ch: string): number {
  if (ch === ')') {
    return 3
  }
  if (ch === ']') {
    return 57
  }
  if (ch === '}') {
    return 1197
  }
  if (ch === '>') {
    return 25137
  }
  throw Error()
}

function getViolatingChar(line: string) {
  let opens = '([{<'
  let currentlyOpen: string[] = []
  for (let ch of line) {
    if (opens.includes(ch)) {
      currentlyOpen.push(ch)
    } else {
      const openChar = currentlyOpen.pop()
      if (!openChar) {
        return ch
      }
      if (!charsMatch(openChar, ch)) {
        return ch
      }
    }
  }
  return null
}

function getOpenChars(line: string) {
  let opens = '([{<'
  let currentlyOpen: string[] = []
  for (let ch of line) {
    if (opens.includes(ch)) {
      currentlyOpen.push(ch)
    } else {
      const openChar = currentlyOpen.pop()
      if (!openChar) {
        return null
      }
      if (!charsMatch(openChar, ch)) {
        return null
      }
    }
  }
  if (currentlyOpen.length > 0) {
    return currentlyOpen
  }
  return null
}

function charsMatch(ch1: string, ch2: string) {
  return (
    (ch1 === '(' && ch2 === ')') ||
    (ch1 === '[' && ch2 === ']') ||
    (ch1 === '<' && ch2 === '>') ||
    (ch1 === '{' && ch2 === '}')
  )
}

run1()
run2()
