import fs from 'fs'

const parseInput = (fileName: string) => {
  const groups = fs
    .readFileSync(fileName, 'utf-8')
    .split(/^\n/gm)
    .filter((l) => l.length > 0)
    .map((group) => group.split('\n').filter((l) => l.trim().length > 0))
  return groups
}

const findAllAnswers = (givenAnswers: string[]) => {
  const answersFound = new Set<string>()
  for (let givenAnswer of givenAnswers) {
    givenAnswer.split('').forEach((answer) => answersFound.add(answer))
  }
  return answersFound
}

const toYesCount = (givenAnswers: string[]) => {
  return findAllAnswers(givenAnswers).size
}

const toAllYesCount = (givenAnswers: string[]) => {
  const allAnswers = findAllAnswers(givenAnswers)
  let allPosCount = 0
  allAnswers.forEach((answer) => {
    if (givenAnswers.every((a) => a.includes(answer))) {
      allPosCount++
    }
  })
  return allPosCount
}

const sumUp = (nums: number[]) => nums.reduce((acc, el) => acc + el)

const solve = (file: string) => {
  const groups = parseInput(file)
  const groupYesCounts = groups.map(toYesCount)
  const countSum = sumUp(groupYesCounts)
  console.log(`Day6 p1 ${file}\t${countSum}`)
}

const solve2 = (file: string) => {
  const groups = parseInput(file)
  const groupsAllYesCounts = groups.map(toAllYesCount)
  const sum = sumUp(groupsAllYesCounts)
  console.log(`Day6 p2 ${file}\t${sum}`)
}

solve('sample.txt')
solve('input.txt')
solve2('sample.txt')
solve2('input.txt')
