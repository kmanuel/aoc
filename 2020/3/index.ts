import fs from 'fs'

class Field {
  static fromFile(fileName: string): Field {
    const lines = fs.readFileSync(fileName, 'utf-8').split('\n')
    const grid = lines.map((l) => l.split(''))
    return new Field(grid)
  }

  getRows() {
    return this.grid.length - 1
  }

  isTreeAt(row: number, col: number) {
    const columns = this.grid[0].length
    return this.grid[row][col % columns] === '#'
  }

  private constructor(private grid: string[][]) {}
}

class Toboggan {
  private treesEncountered: number
  private row: number
  private col: number

  constructor(private slope = [1, 3]) {
    this.treesEncountered = 0
    this.row = 0
    this.col = 0
  }

  private move() {
    this.row += this.slope[1]
    this.col += this.slope[0]
  }

  moveToBottom(field: Field) {
    while (this.row <= field.getRows()) {
      const isAtTree = field.isTreeAt(this.row, this.col)
      if (isAtTree) {
        this.treesEncountered++
      }
      this.move()
    }
  }

  getTreesEncountered() {
    return this.treesEncountered
  }
}

const solve1 = (fileName: string) => {
  const toboggan = new Toboggan()
  const field = Field.fromFile(fileName)
  toboggan.moveToBottom(field)
  console.log(toboggan.getTreesEncountered())
}

solve1('sample.txt')
solve1('input.txt')

const solve2 = (fileName: string) => {
  const field = Field.fromFile(fileName)
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ]
  const toboggans = slopes.map((slope) => new Toboggan(slope))
  toboggans.forEach((t) => t.moveToBottom(field))
  const treeEncounters = toboggans.map((t) => t.getTreesEncountered())
  const result = treeEncounters.reduce((acc, el) => acc * el)
  console.log(result)
}

solve2('sample.txt')
solve2('input.txt')
