import { domainToASCII } from 'url'

const TEMPLATE = [
  '#############',
  '#...........#',
  '###.#.#.#.###',
  '###.#.#.#.###',
  '#############',
]

const data = [
  '#############',
  '#...........#',
  '###B#A#A#D###',
  '###B#C#D#C###',
  '#############',
]

interface Field {
  row: number
  col: number
  symbol: string
  neighbours: Field[]
}

const toFields = (d: string[]): Field[] => {
  const matrix = d.map((dataRow) => dataRow.split(''))
  let fields: Field[] = []
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const symbol = d[row][col]
      if (symbol !== '#') {
        fields.push({
          col,
          row,
          neighbours: [],
          symbol,
        })
      }
    }
  }
  for (let field of fields) {
    field.neighbours = fields.filter(
      (f) =>
        (f.col === field.col &&
          (f.row === field.row - 1 || f.row === field.row + 1)) ||
        (f.row === field.row &&
          (f.col === field.col - 1 || f.col === field.col + 1))
    )
  }
  return fields
}

const symbolGoalCols = {
  A: 3,
  B: 5,
  C: 7,
  D: 9,
}

const isWalkable = (field: Field): boolean => {
  return field.symbol === '.'
}

const getGoalFieldFor = (field: Field, allFields: Field[]): Field | null => {
  const goalCol = symbolGoalCols[field.symbol as 'A' | 'B' | 'C' | 'D']
  const goalFields = allFields.filter(
    (f) => f.col === goalCol && (f.row === 2 || f.row === 3)
  )
  const lastGoal = goalFields.filter((f) => f.row === 3)[0]
  if (lastGoal.symbol !== '.' && lastGoal.symbol !== field.symbol) {
    return null
  }
  const isLastOccupied = lastGoal.symbol === field.symbol
  if (isLastOccupied) {
    return goalFields.filter((f) => f.row === 2)[0]
  }
  return goalFields.filter((f) => f.row === 3)[0]
}

const getHallwayTargets = (fields: Field[]) => {
  return fields.filter((f) => f.row === 1 && ![3, 5, 7, 9].includes(f.col))
}

const canWalkFromTo = (from: Field, to: Field) => {
  const walkableNeighboursFrom = (field: Field) => {
    return field.neighbours
      .filter(isWalkable)
      .filter((n) => !visited.includes(n))
  }

  const visited: Field[] = [from]
  const frontier = walkableNeighboursFrom(from)
  while (frontier.length > 0) {
    let curr = frontier.splice(0, 1)[0]
    if (curr === to) {
      return true
    }
    visited.push(curr)
    frontier.push(...walkableNeighboursFrom(curr))
  }

  return false
}

const getCostMultiplier = (symbol: string): number => {
  switch (symbol) {
    case 'A':
      return 1
    case 'B':
      return 10
    case 'C':
      return 100
    case 'D':
      return 1000
    default:
      throw Error()
  }
}

const walkFromTo = (from: Field, to: Field, config: Config): Config => {
  const copy: Field[] = toFields(toData(config.fields))
  const copyFrom = copy.filter(
    (f) => f.col === from.col && f.row === from.row
  )[0]
  const copyTo = copy.filter((f) => f.col === to.col && f.row === to.row)[0]
  copyFrom.symbol = to.symbol
  copyTo.symbol = from.symbol
  const manDist = Math.abs(from.col - to.col) + Math.abs(from.row - to.row)
  const costMultiplier = getCostMultiplier(from.symbol)
  const movementCost = manDist * costMultiplier
  return {
    fields: copy,
    cost: config.cost + movementCost,
  }
}

const toData = (fields: Field[]): string[] => {
  const matrix = TEMPLATE.map((row) => row.split(''))
  for (let f of fields) {
    matrix[f.row][f.col] = f.symbol
  }
  return matrix.map((row) => row.join(''))
}

const isInHallway = (field: Field) => {
  return field.row === 1
}

const getWalkers = (fields: Field[]) => {
  return fields.filter((f) => f.symbol !== '.')
}

const hasReachedGoal = (field: Field) => {
  if (field.symbol === '.') {
    throw Error()
  }
  if (field.row === 2 || field.row === 3) {
    if (field.symbol === 'A' && field.col === 3) {
      return true
    }
    if (field.symbol === 'B' && field.col === 5) {
      return true
    }
    if (field.symbol === 'C' && field.col === 7) {
      return true
    }
    if (field.symbol === 'D' && field.col === 9) {
      return true
    }
  }
  return false
}

const allInGoalsForSymbol = (symbol: string, fields: Field[]): boolean => {
  return fields.filter((f) => f.symbol === symbol).every(hasReachedGoal)
}

const shouldWalkerMove = (field: Field, fields: Field[]) => {
  return !allInGoalsForSymbol(field.symbol, fields)
}

let configCache: { [k: string]: boolean } = {}

let counter = 0

interface Config {
  fields: Field[]
  cost: number
}

const solveIt = (config: Config): boolean => {
  console.log(counter++)
  const strData = toData(config.fields)
  const cacheKey = strData.join('')
  if (configCache[cacheKey]) {
    return false
  }
  configCache[cacheKey] = true

  let walkers = getWalkers(config.fields).filter((w) =>
    shouldWalkerMove(w, config.fields)
  )

  while (true) {
    let hasOneWalked = false
    walkers = getWalkers(config.fields).filter((w) =>
      shouldWalkerMove(w, config.fields)
    )
    for (let walker of walkers) {
      if (isInHallway(walker)) {
        const goalField = getGoalFieldFor(walker, config.fields)
        if (goalField) {
          if (canWalkFromTo(walker, goalField)) {
            config = walkFromTo(walker, goalField, config)
            hasOneWalked = true
          }
        }
      }
    }
    if (!hasOneWalked) {
      break
    }
  }

  walkers = getWalkers(config.fields).filter((w) =>
    shouldWalkerMove(w, config.fields)
  )

  console.log(toData(config.fields))

  if (walkers.length === 0) {
    console.log('solved')
    console.log('cost: ', config.cost)
    console.log(toData(config.fields))
    return true
  }

  walkers = walkers.sort((a, b) => a.symbol.localeCompare(b.symbol))

  for (let walker of walkers) {
    if (!isInHallway(walker)) {
      const reachableHallways = getHallwayTargets(config.fields).filter(
        (target) => canWalkFromTo(walker, target)
      )
      const newConfigs = reachableHallways.map((target) =>
        walkFromTo(walker, target, config)
      )
      for (let conf of newConfigs) {
        if (solveIt(conf)) {
          return true
        }
      }
    }
  }
  return false
}

const targs = toFields(data)
solveIt({
  fields: targs,
  cost: 0,
})

// let from = fields.filter((f) => f.row === 2 && f.col === 3)[0]
// let to = fields.filter((f) => f.row === 1 && f.col === 1)[0]
// console.log(canWalkFromTo(from, to))
// const walked = walkFromTo(from, to, fields)
// console.log(toData(walked))

// const dataCopy = toData(fields)
// console.log(dataCopy)
