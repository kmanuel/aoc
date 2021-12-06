import fs from 'fs'
const run1 = () => {
  const input = getFish()
  const days = 80

  for (let i = 0; i < days; i++) {
    let newFish = []
    for (let j = 0; j < input.length; j++) {
      const fish = input[j]
      if (fish === 0) {
        newFish.push(8)
        input[j] = 6
      } else {
        input[j] = fish - 1
      }
    }
    input.push(...newFish)
  }

  console.log(`Day 6, p1: ` + input.length)
}

const run2 = () => {
  const fishes = getFish()
  let fishesPerAge = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  for (let fish of fishes) {
    fishesPerAge[fish] = fishesPerAge[fish] + 1
  }
  for (let i = 0; i < 256; i++) {
    let tmp = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let j = 0; j < fishesPerAge.length; j++) {
      if (j === 0) {
        tmp[8] += fishesPerAge[0]
        tmp[6] += fishesPerAge[0]
      } else {
        tmp[j - 1] += fishesPerAge[j]
      }
    }
    fishesPerAge = tmp
  }
  console.log(`Day 6, p2: ` + fishesPerAge.reduce((acc, el) => acc + el))
}

run1()
run2()

function getFish() {
  return fs
    .readFileSync('./6/input.txt', 'utf-8')
    .split(',')
    .map((i) => Number(i))
}
