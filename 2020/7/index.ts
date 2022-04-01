import fs from 'fs'
class Bag {
  color: string
  contains: { bag: Bag; count: number }[]
  containedBy: Bag[]

  constructor(color: string) {
    this.color = color
    this.contains = []
    this.containedBy = []
  }

  addContains(bag: Bag, count: number) {
    this.contains.push({ bag, count })
    bag.containedBy.push(this)
  }
}

function parseInput(fileName: string) {
  const lines = fs.readFileSync(fileName, 'utf-8').split('\n')
  const bags: { [color: string]: Bag } = {}
  for (let l of lines) {
    const bagColor = l.split('bags')[0].trim()
    if (!bags[bagColor]) {
      bags[bagColor] = new Bag(bagColor)
    }

    if (l.includes('no other bags')) {
      continue
    }
    const regex = new RegExp(/((\d+)\s*([\w\s]+) bag)/, 'gm')
    let match = regex.exec(l)
    while (match !== null) {
      const count = parseInt(match[2], 10)
      const col = match[3]
      let bag: Bag | null = bags[col]
      if (!bag) {
        bags[col] = new Bag(col)
        bag = bags[col]
      }
      bags[bagColor].addContains(bag, count)
      match = regex.exec(l)
    }
  }
  return bags
}

function canEventuallyContain(
  bags: { [color: string]: Bag },
  bagColor: string
) {
  let visited: string[] = []
  let frontier: Bag[] = bags[bagColor].containedBy

  while (frontier.length > 0) {
    let container = frontier.splice(0, 1)[0]
    if (visited.includes(container.color)) {
      continue
    }
    visited.push(container.color)
    frontier.push(...container.containedBy)
  }

  return visited
}

function solve1(fileName: string) {
  const bags = parseInput(fileName)
  const containers = canEventuallyContain(bags, 'shiny gold')
  console.log(`Day 7 p1 ${fileName} \t${containers.length}`)
}

function solve2(fileName: string) {
  const bags = parseInput(fileName)
  const subCount = getSubBagCount(bags['shiny gold']) - 1
  console.log(`Day 7 p2 ${fileName} \t${subCount}`)
}

function getSubBagCount(bag: Bag) {
  const containedBags = bag.contains
  let subCount = 1
  for (let containedBag of containedBags) {
    subCount += containedBag.count * getSubBagCount(containedBag.bag)
  }
  return subCount
}

solve1('sample.txt')
solve1('input.txt')
solve2('sample.txt')
solve2('sample2.txt')
solve2('input.txt')
