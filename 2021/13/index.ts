import fs from 'fs'

const run1 = () => {
  const [dotIn, foldIn] = fs.readFileSync('./input.txt', 'utf-8').split(/^$/gm)
  let dotPositions = dotIn
    .split('\n')
    .filter((l) => l.length > 0)
    .map((d) => d.split(','))
    .map((d) => [Number(d[0]), Number(d[1])])

  let folds = foldIn
    .split('\n')
    .map((inst) => inst.split(' '))
    .map((inst) => inst[inst.length - 1])
    .map((inst) => inst.match(/(x|y)=(\d+)/))
    .filter((f) => f && f.length > 0)

  const fold = folds[0]
  if (!fold || fold.length <= 0) {
    throw Error()
  }
  if (fold[1] === 'x') {
    dotPositions = foldX(dotPositions, Number(fold[2]))
  } else {
    dotPositions = foldY(dotPositions, Number(fold[2]))
  }
  const res = count(dotPositions)
  console.log(`Day 13, p1: `, res)
}

const foldY = (dots: number[][], y: number) => {
  return dots.map((dot) => {
    if (dot[1] >= y) {
      return [dot[0], y - (dot[1] - y)]
    }
    return dot
  })
}

const foldX = (dots: number[][], x: number) => {
  return dots.map((dot) => {
    if (dot[0] >= x) {
      return [x - (dot[0] - x), dot[1]]
    }
    return dot
  })
}

const run2 = () => {
  const [dotIn, foldIn] = fs.readFileSync('./input.txt', 'utf-8').split(/^$/gm)
  let dotPositions = dotIn
    .split('\n')
    .filter((l) => l.length > 0)
    .map((d) => d.split(','))
    .map((d) => [Number(d[0]), Number(d[1])])

  let folds = foldIn
    .split('\n')
    .map((inst) => inst.split(' '))
    .map((inst) => inst[inst.length - 1])
    .map((inst) => inst.match(/(x|y)=(\d+)/))
    .filter((f) => f && f.length > 0)

  for (let fold of folds) {
    if (!fold) {
      continue
    }
    if (fold[1] === 'x') {
      dotPositions = foldX(dotPositions, Number(fold[2]))
    } else {
      dotPositions = foldY(dotPositions, Number(fold[2]))
    }
  }
  print(dotPositions)
}

const print = (dots: number[][]) => {
  const xMax = dots.sort((a, b) => b[0] - a[0])[0][0]
  const yMax = dots.sort((a, b) => b[1] - a[1])[0][1]

  for (let i = 0; i <= yMax; i++) {
    let row = ''
    for (let j = 0; j <= xMax; j++) {
      if (dots.filter((d) => d[0] === j && d[1] === i).length > 0) {
        row += '#'
      } else {
        row += '.'
      }
    }
    console.log(row)
  }
}

const count = (dots: number[][]) => {
  let count = 0
  const xMax = dots.sort((a, b) => b[0] - a[0])[0][0]
  const yMax = dots.sort((a, b) => b[1] - a[1])[0][1]
  for (let i = 0; i <= yMax; i++) {
    for (let j = 0; j <= xMax; j++) {
      if (dots.filter((d) => d[0] === j && d[1] === i).length > 0) {
        count++
      }
    }
  }
  return count
}

run1()
run2()
