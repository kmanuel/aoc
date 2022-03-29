import fs from 'fs'

const parseInput = (fileName: string) => {
  return fs
    .readFileSync(fileName, 'utf-8')
    .split('\n')
    .map((n) => parseInt(n, 10))
}

const run1 = (input: string) => {
  const nums = parseInput(input)
  const result = solve1(nums)
  console.log(`Day1 ${input}: ${result}`)
}

const solve1 = (nums: number[]) => {
  for (let i = 0; i < nums.length; i++) {
    let n1 = nums[i]
    for (let j = i + 1; j < nums.length; j++) {
      let n2 = nums[j]
      if (n1 + n2 === 2020) {
        return n1 * n2
      }
    }
  }
  throw Error('Could not find result')
}

const solve2 = (nums: number[]) => {
    for (let i = 0; i < nums.length; i++) {
        let n1 = nums[i]
        for (let j = i+1; j < nums.length; j++) {
            let n2 = nums[j]
            for (let k = j+1; k < nums.length; k++) {
                let n3 = nums[k]
                if (n1 + n2 + n3 === 2020) {
                    return n1 * n2 * n3
                }
            }
        }
    }
    return -1
}

const run2 = (input: string) => {
    const nums = parseInput(input)
    const result = solve2(nums)
    console.log(`Day1 p2 ${input}: ${result}`)
}

run1('sample.txt')
run1('input.txt')

run2('sample.txt')
run2('input.txt')