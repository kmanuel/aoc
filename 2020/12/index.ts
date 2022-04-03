import fs from 'fs'

function parse(file: string) {
  return fs
    .readFileSync(file, 'utf-8')
    .split('\n')
    .map((instr) => instr.match(/(\w)(\d+)/)!.slice(1, 3))
}

const DIRECTIONS = ['N', 'E', 'S', 'W']

class Ship {
  direction = 'E'
  xDiff = 0
  yDiff = 0

  sailAll(instructions: string[][]) {
    for (let instruction of instructions) {
      this.sail(instruction)
    }
  }

  sail(instruction: string[]) {
    const dir = instruction[0]
    const value = parseInt(instruction[1], 10)

    if (dir === 'F') {
      this.sailForward(value)
    }
    if (dir === 'W') {
      this.moveWest(value)
    }
    if (dir === 'E') {
      this.moveEast(value)
    }
    if (dir === 'N') {
      this.moveNorth(value)
    }
    if (dir === 'S') {
      this.moveSouth(value)
    }
    if (dir === 'L') {
      let dirIdx = value / 90
      while (dirIdx > 0) {
        this.turnLeft()
        dirIdx--
      }
    }
    if (dir === 'R') {
      let dirIdx = value / 90
      while (dirIdx > 0) {
        this.turnRight()
        dirIdx--
      }
    }
  }

  turnLeft() {
    if (this.direction === 'E') {
      this.direction = 'N'
      return
    }
    if (this.direction === 'N') {
      this.direction = 'W'
      return
    }
    if (this.direction === 'W') {
      this.direction = 'S'
      return
    }
    if (this.direction === 'S') {
      this.direction = 'E'
      return
    }
  }

  turnRight() {
    if (this.direction === 'E') {
      this.direction = 'S'
      return
    }
    if (this.direction === 'N') {
      this.direction = 'E'
      return
    }
    if (this.direction === 'W') {
      this.direction = 'N'
      return
    }
    if (this.direction === 'S') {
      this.direction = 'W'
      return
    }
  }

  moveEast(value: number) {
    this.xDiff += value
  }

  moveWest(value: number) {
    this.xDiff -= value
  }

  moveNorth(value: number) {
    this.yDiff -= value
  }

  moveSouth(value: number) {
    this.yDiff += value
  }

  sailForward(value: number) {
    if (this.direction === 'E') {
      this.moveEast(value)
    }
    if (this.direction === 'W') {
      this.moveWest(value)
    }
    if (this.direction === 'N') {
      this.moveNorth(value)
    }
    if (this.direction === 'S') {
      this.moveSouth(value)
    }
  }

  getManDistance() {
    return Math.abs(this.xDiff) + Math.abs(this.yDiff)
  }
}

function part1(file: string) {
  const inst = parse(file)
  const ship = new Ship()
  ship.sailAll(inst)
  console.log(ship.getManDistance())
}

// part1('sample.txt')
// part1('sample2.txt')
// part1('input.txt')

class WayPoint {
  xPos = 10
  yPos = -1

  rotLeft(value: number) {
    let val = value / 90
    while (val > 0) {
      this.rotRight(270)
      val--
    }
  }

  rotRight(value: number) {
    let val = value / 90
    while (val > 0) {
      let tmp = this.yPos
      this.yPos = this.xPos
      this.xPos = -tmp
      val--
    }
  }

  moveEast(value: number) {
    this.xPos += value
  }

  moveWest(value: number) {
    this.xPos -= value
  }

  moveNorth(value: number) {
    this.yPos -= value
  }

  moveSouth(value: number) {
    this.yPos += value
  }
}

class WayPointShip {
  private waypoint: WayPoint
  private xDiff = 0
  private yDiff = 0
  constructor() {
    this.waypoint = new WayPoint()
  }

  sailAll(instructions: string[][]) {
    for (let instruction of instructions) {
      this.sail(instruction)
    }
  }

  sail(instruction: string[]) {
    let inst = instruction[0]
    let val = parseInt(instruction[1], 10)
    if (inst === 'E') {
      this.waypoint.moveEast(val)
    }
    if (inst === 'W') {
      this.waypoint.moveWest(val)
    }
    if (inst === 'N') {
      this.waypoint.moveNorth(val)
    }
    if (inst === 'S') {
      this.waypoint.moveSouth(val)
    }
    if (inst === 'L') {
      this.waypoint.rotLeft(val)
    }
    if (inst === 'R') {
      this.waypoint.rotRight(val)
    }
    if (inst === 'F') {
      this.xDiff += this.waypoint.xPos * val
      this.yDiff += this.waypoint.yPos * val
    }
  }

  getManDistance() {
    return Math.abs(this.xDiff) + Math.abs(this.yDiff)
  }
}

function part2(file: string) {
  const inst = parse(file)
  const ship = new WayPointShip()
  ship.sailAll(inst)
  console.log(ship.getManDistance())
}

part2('sample.txt')
part2('input.txt')
