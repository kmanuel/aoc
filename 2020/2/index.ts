import fs from 'fs'
const run1 = () => {
  const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n')
  const validPasswordsCount = lines.filter(isValidPassword).length
  console.log(`Day 2, p1: `, validPasswordsCount)
}

const isValidPassword = (passwordLine: string): boolean => {
  const match = passwordLine.match(/(\d+)-(\d+) (\w): (.*)/)
  if (!match) {
    throw Error()
  }
  const from = Number(match[1])
  const to = Number(match[2])
  const char = match[3]
  const pw = match[4]

  const occurrences = pw.split('').filter((c) => c === char).length
  return occurrences >= from && occurrences <= to
}

const run2 = () => {
  const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n')
  const validPasswordsCount = lines.filter(isValidPassword2).length
  console.log(`Day 2, p2: `, validPasswordsCount)
}

const isValidPassword2 = (passwordLine: string): boolean => {
  const match = passwordLine.match(/(\d+)-(\d+) (\w): (.*)/)
  if (!match) {
    throw Error()
  }
  const from = Number(match[1]) - 1
  const to = Number(match[2]) - 1
  const char = match[3]
  const pw = match[4]

  return (
    pw.charAt(from) !== pw.charAt(to) &&
    (pw.charAt(from) === char || pw.charAt(to) === char)
  )
}

run1()
run2()
