import fs from 'fs'
const solve1 = () => {
  let position = {
    horizontal: 0,
    depth: 0,
  }
  const lines = fs.readFileSync('./2/input.txt', 'utf-8').split('\n')
  for (let line of lines) {
    const match = line.match(/^(forward|down|up) (\d)+$/)
    if (!match) {
      throw Error("command didn't match")
    }
    const command = match[1]
    const value = Number(match[2])
    switch (command) {
      case 'forward':
        position.horizontal += value
        break
      case 'down':
        position.depth += value
        break
      case 'up':
        position.depth -= value
        break
    }
  }
  console.log(`Day 2, p1: ${position.horizontal * position.depth}`)
}

const solve2 = () => {
  let position = {
    horizontal: 0,
    depth: 0,
    aim: 0,
  }
  const lines = fs.readFileSync('./2/input.txt', 'utf-8').split('\n')
  for (let line of lines) {
    const match = line.match(/^(forward|down|up) (\d)+$/)
    if (!match) {
      throw Error("command didn't match")
    }
    const command = match[1]
    const value = Number(match[2])
    switch (command) {
      case 'forward':
        position.horizontal += value
        position.depth += position.aim * value
        break
      case 'down':
        position.aim += value
        break
      case 'up':
        position.aim -= value
        break
    }
  }
  console.log(`Day 2, p2: ${position.horizontal * position.depth}`)
}

solve1()
solve2()
