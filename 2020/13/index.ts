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
