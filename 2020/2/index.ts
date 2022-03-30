import fs from 'fs'

const readLines = (fileName: string): string[] => {
  return fs.readFileSync(fileName, 'utf-8').split('\n')
}

interface PasswordInput {
  min: number
  max: number
  requiredChar: string
  password: string
}

const parseLine = (line: string): PasswordInput => {
  const pwRegex = /(\d+)-(\d+) (\w): (\w+)/
  const match = line.match(pwRegex)
  if (!match) {
    throw Error()
  }
  const min = parseInt(match[1], 10)
  const max = parseInt(match[2], 10)
  const requiredChar = match[3]
  const password = match[4]

  return {
    min,
    max,
    requiredChar,
    password,
  }
}

const parseFile = (fileName: string): PasswordInput[] => {
  const lines = readLines(fileName)
  return lines.map(parseLine)
}

const solve = (
  name: string,
  inputFile: string,
  isValidPasswordInput: (input: PasswordInput) => boolean
) => {
  const passwordInputs = parseFile(inputFile)
  const validPasswordCount = passwordInputs.filter(isValidPasswordInput).length
  console.log(`${name}: ${validPasswordCount}`)
}

const validateOccurrenceCount = (input: PasswordInput): boolean => {
  const { min, max, requiredChar, password } = input
  const requiredCharOccurrences = password
    .split('')
    .filter((c) => c === requiredChar).length
  return requiredCharOccurrences >= min && requiredCharOccurrences <= max
}

const validatePosition = (input: PasswordInput): boolean => {
  const { min, max, requiredChar, password } = input
  const pos1 = min - 1
  const pos2 = max - 1
  return (
    password.charAt(pos1) !== password.charAt(pos2) &&
    (password.charAt(pos1) === requiredChar ||
      password.charAt(pos2) === requiredChar)
  )
}

solve('Sample p1', 'sample.txt', validateOccurrenceCount)
solve('Input p1', 'input.txt', validateOccurrenceCount)
solve('Sample p2', 'sample.txt', validatePosition)
solve('Input p2', 'input.txt', validatePosition)
