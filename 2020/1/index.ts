import fs from 'fs'
const run1 = () => {
  const numbers = fs
    .readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .map((n) => Number(n))
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      if (numbers[i] + numbers[j] === 2020) {
        console.log(`Day 1, p1: `, numbers[i] * numbers[j])
      }
    }
  }
}

const run2 = () => {
  const numbers = fs
    .readFileSync('./input.txt', 'utf-8')
    .split('\n')
    .map((n) => Number(n))
  for (let i = 0; i < numbers.length; i++) {
    for (let j = i + 1; j < numbers.length; j++) {
      for (let k = j + 1; k < numbers.length; k++) {
        if (numbers[i] + numbers[j] + numbers[k] === 2020) {
          console.log(`Day 1, p2: `, numbers[i] * numbers[j] * numbers[k])
        }
      }
    }
  }
}

run1()
run2()
