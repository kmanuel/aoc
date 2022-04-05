import fs from 'fs'

function parse(file: string) {
  const lines = fs.readFileSync(file, 'utf-8').split('\n')
  return {
    departure: parseInt(lines[0], 10),
    buses: lines[1]
      .split(',')
      .filter((p) => p !== 'x')
      .map((p) => parseInt(p, 10)),
  }
}

function solve1(file: string) {
  const schedule = parse(file)
  let minBus = Number.MAX_SAFE_INTEGER
  let minWait = Number.MAX_SAFE_INTEGER
  for (let s of schedule.buses) {
    let wait = s - (schedule.departure % s)
    if (wait < minWait) {
      minWait = wait
      minBus = s
    }
  }
  console.log(`day13 p1 ${file} \t${minBus * minWait}`)
}

solve1('sample.txt')
solve1('input.txt')

function solve2(file: string) {
  const [start, busesLine] = fs.readFileSync(file, 'utf-8').split('\n')
  let busParts = busesLine.split(',')
  let buses: { offset: number; id: number }[] = []
  for (let i = 0; i < busParts.length; i++) {
    if (busParts[i] === 'x') {
      continue
    }
    buses.push({ offset: i, id: Number(busParts[i]) })
  }

  let time = buses[0].id
  let stepSize = buses[0].id

  for (let bus of buses.slice(1)) {
    while ((bus.offset + time) % bus.id !== 0) {
      time += stepSize
    }
    stepSize *= bus.id
  }

  console.log(time)
}

solve2('sample.txt')
solve2('sample1.txt')
solve2('sample2.txt')
solve2('sample3.txt')
solve2('input.txt')
