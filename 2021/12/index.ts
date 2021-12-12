import fs from 'fs'

var run1Paths = 0

const run1 = () => {
  const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n')
  const connections: { [k: string]: string[] } = {}

  lines
    .map((l) => l.split('-'))
    .forEach((p) => {
      if (connections[p[0]]) {
        connections[p[0]].push(p[1])
      } else {
        connections[p[0]] = [p[1]]
      }
      if (connections[p[1]]) {
        connections[p[1]].push(p[0])
      } else {
        connections[p[1]] = [p[0]]
      }
    })

  let curr = 'start'
  const visited: string[] = []
  walk1(curr, visited, connections)
  console.log(`Day 12, p1: `, run1Paths)
}

const walk1 = (
  curr: string,
  visited: string[],
  connections: { [k: string]: string[] }
) => {
  if (curr === 'end') {
    run1Paths++
    return
  }
  const targets = connections[curr]
  if (!targets) {
    return
  }
  const possibilities = targets.filter(
    (p) => p !== 'start' && !(visited.includes(p) && p.toLowerCase() === p)
  )
  possibilities.forEach((p) => walk1(p, [...visited, curr], connections))
}

var run2Paths = 0

const run2 = () => {
  const lines = fs.readFileSync('./input.txt', 'utf-8').split('\n')
  const connections: { [k: string]: string[] } = {}

  lines
    .map((l) => l.split('-'))
    .forEach((p) => {
      if (connections[p[0]]) {
        connections[p[0]].push(p[1])
      } else {
        connections[p[0]] = [p[1]]
      }
      if (connections[p[1]]) {
        connections[p[1]].push(p[0])
      } else {
        connections[p[1]] = [p[0]]
      }
    })

  let curr = 'start'
  const visited: string[] = []
  walk2(curr, visited, connections)
  console.log(`Day 12, p2: `, run2Paths)
}

const walk2 = (
  curr: string,
  visited: string[],
  connections: { [k: string]: string[] }
) => {
  if (curr === 'end') {
    console.log(`visited: `, visited.join(','))
    run2Paths++
    return
  }
  const targets = connections[curr]
  if (!targets) {
    return
  }
  const hasTakenSmallCaveTwiceAlready = hasVisitedSmallCaveTwice([
    ...visited,
    curr,
  ])
  const possibilities = [
    ...targets
      .filter((p) => p !== 'start')
      .filter((p) => p.toUpperCase() !== p)
      .filter((p) => !visited.includes(p) || !hasTakenSmallCaveTwiceAlready),
    ...targets.filter((p) => p.toUpperCase() === p),
  ]
  possibilities.forEach((p) => walk2(p, [...visited, curr], connections))
}

run1()
run2()

function hasVisitedSmallCaveTwice(visited: string[]) {
  return !visited
    .filter((v) => v.toLowerCase() === v)
    .every((l) => visited.indexOf(l) === visited.lastIndexOf(l))
}
