import fs from 'fs'

const run1 = () => {
  const lines = fs.readFileSync('./8/input.txt', 'utf-8').split('\n')
  const outputs = lines
    .map((l) => l.split('|')[1])
    .map((l) => l.split(' ').filter((l) => l.length > 0))

  let counts = 0

  for (let out of outputs) {
    counts += out
      .map((o) => o.length)
      .filter((ol) => [2, 4, 3, 7].includes(ol)).length
  }

  console.log(`Day 8, p1: `, counts)
}

// letters
//   1
//  2 3
//   4
//  5 6
//   7

// 0:      1:      2:      3:      4:
//  aaaa    ....    aaaa    aaaa    ....
// b    c  .    c  .    c  .    c  b    c
// b    c  .    c  .    c  .    c  b    c
//  ....    ....    dddd    dddd    dddd
// e    f  .    f  e    .  .    f  .    f
// e    f  .    f  e    .  .    f  .    f
//  gggg    ....    gggg    gggg    ....

// 5:      6:      7:      8:      9:
//  aaaa    aaaa    aaaa    aaaa    aaaa
// b    .  b    .  .    c  b    c  b    c
// b    .  b    .  .    c  b    c  b    c
//  dddd    dddd    ....    dddd    dddd
// .    f  e    f  .    f  e    f  .    f
// .    f  e    f  .    f  e    f  .    f
//  gggg    gggg    ....    gggg    gggg

const run2 = () => {
  const lines = fs.readFileSync('./8/input.txt', 'utf-8').split('\n')
  const lineResults = lines.map(solveLine)
  const sum = lineResults.reduce((acc, l) => acc + l)
  console.log(`Day 8, p2: `, sum)
}

function solveLine(line: string) {
  const left = line.split(' | ')[0]
  const numArr = solveLeft(left)
  const right = line.split(' | ')[1]
  const rightNums = right.split(' ')
  let num = ''
  for (let rightNum of rightNums) {
    const sortedNum = rightNum.split('').sort().join('')
    num += numArr.indexOf(sortedNum).toString()
  }
  return Number(num)
}

function solveLeft(line: string) {
  const letters = line.split(' ').map((l) => l.split('').sort().join(''))

  const one = letters.filter((l) => l.length === 2)[0]
  const seven = letters.filter((l) => l.length === 3)[0]
  const four = letters.filter((l) => l.length === 4)[0]
  const eight = letters.filter((l) => l.length === 7)[0]

  const three = letters.filter(
    (l) => l.length === 5 && containsAllChars(l, one)
  )[0]
  const nine = letters.filter(
    (l) => l.length === 6 && containsAllChars(l, three)
  )[0]
  const zero = letters.filter(
    (l) => l.length === 6 && containsAllChars(l, one) && l !== nine
  )[0]
  const six = letters.filter(
    (l) => l.length === 6 && l !== zero && l !== nine
  )[0]

  const topRightChar = eight.split('').filter((c) => !six.includes(c))[0]
  const two = letters.filter(
    (l) => l.length === 5 && l !== three && l.includes(topRightChar)
  )[0]
  const five = letters.filter(
    (l) => l.length === 5 && l !== two && l !== three
  )[0]
  const numArr = [zero, one, two, three, four, five, six, seven, eight, nine]
  return numArr
}

function containsAllChars(container: string, chars: string) {
  for (let c of chars) {
    if (!container.includes(c)) {
      return false
    }
  }
  return true
}

run1()
run2()
