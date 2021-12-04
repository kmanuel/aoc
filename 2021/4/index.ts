import fs from 'fs'

class BoardField {
  value: number
  marked: boolean

  constructor(value: number, marked: boolean) {
    this.value = value
    this.marked = marked
  }
}

class Board {
  fields: BoardField[][]
  done: boolean

  constructor(boardStrings: string[]) {
    this.fields = boardStrings.map((s) =>
      s.split(/\s+/).map((s) => new BoardField(Number(s), false))
    )
    this.done = false
  }

  mark(num: number) {
    const hasWon = this.markField(num)
    if (hasWon) {
      const boardSum = this.calculateWinningScore()
      return boardSum * num
    }
    return null
  }

  private calculateWinningScore() {
    let sum = 0
    for (let boardRow of this.fields) {
      for (let col = 0; col < boardRow.length; col++) {
        if (!boardRow[col].marked) {
          sum += boardRow[col].value
        }
      }
    }
    return sum
  }

  private markField(num: number) {
    for (let fieldRow of this.fields) {
      for (let i = 0; i < fieldRow.length; i++) {
        if (fieldRow[i].value === num) {
          fieldRow[i].marked = true
          const rowWon = this.checkRowWon(fieldRow)
          if (rowWon) {
            return true
          }
          const colWOn = this.checkColumnWon(i)
          if (colWOn) {
            return true
          }
          return false
        }
      }
    }
  }

  private checkColumnWon(col: number) {
    return this.fields.every((row) => row[col].marked)
  }

  private checkRowWon(fieldRow: BoardField[]) {
    return fieldRow.every((f) => f.marked)
  }
}

const run1 = () => {
  const input = fs.readFileSync('./4/input.txt', 'utf-8').split('\n')
  const numbers = toDrawNumbers(input)
  const playBoards = toPlayBoards(input)

  for (let n of numbers) {
    for (let board of playBoards) {
      const score = board.mark(n)
      if (score) {
        console.log(`Day 4, p1: `, score)
        return
      }
    }
  }
}

const run2 = () => {
  const input = fs.readFileSync('./4/input.txt', 'utf-8').split('\n')
  const numbers = toDrawNumbers(input)
  const playBoards = toPlayBoards(input)

  for (let n of numbers) {
    for (let board of playBoards) {
      if (!board.done) {
        const score = board.mark(n)
        if (score && playBoards.filter((p) => !p.done).length === 1) {
          console.log(`Day 4, p2: `, score)
          return
        } else if (score) {
          board.done = true
        }
      }
    }
  }
}

function toDrawNumbers(input: string[]) {
  return input[0].split(',').map((n) => Number(n))
}

function toPlayBoards(input: string[]) {
  const boardInfo = input.slice(2)
  let boards: string[][] = []
  boards.push([])
  for (let line of boardInfo) {
    if (line === '') {
      boards.push([])
    } else {
      boards[boards.length - 1].push(line.trim())
    }
  }
  const playBoards = boards.map((b) => new Board(b))
  return playBoards
}

run1()
run2()
