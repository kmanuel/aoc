type RatingType = 'oxygen' | 'scrubber'

export const findOxygen = (nums: string[]) => {
  return findRating(nums, 'oxygen')
}

export const findScrubber = (nums: string[]) => {
  return findRating(nums, 'scrubber')
}

const findRating = (nums: string[], type: RatingType) => {
  let numsInGame = [...nums]
  for (let i = 0; i < nums[0].split('').length && numsInGame.length > 1; i++) {
    let bit = getMostCommonBit(numsInGame, i)
    if (type === 'scrubber') {
      bit = bit === '1' ? '0' : '1'
    }
    numsInGame = numsInGame.filter((n) => n.charAt(i) === bit)
  }
  return numsInGame[0]
}

export const getMostCommonBit = (nums: string[], position: number) => {
  const onesCount = nums.filter((n) => n.charAt(position) === '1').length
  return onesCount >= nums.length / 2 ? '1' : '0'
}

export function computeAlphaGamma(inputs: string[]) {
  const mostCommonBits = findMostCommonBitString(inputs)
  const leastCommonBits = reverseBitString(mostCommonBits)
  const gamma = parseInt(mostCommonBits, 2)
  const epsilon = parseInt(leastCommonBits, 2)
  return { gamma, epsilon }
}

function reverseBitString(mostCommonBits: string) {
  return mostCommonBits
    .split('')
    .map((c) => (c === '1' ? '0' : '1'))
    .join('')
}

function findMostCommonBitString(inputs: string[]) {
  const oneCounts = get1sPerColumn(inputs)
  const mostCommonBits = oneCounts
    .map((c) => (c > inputs.length / 2 ? '1' : '0'))
    .join('')
  return mostCommonBits
}

function get1sPerColumn(inputs: string[]) {
  const oneCounts = []
  for (let i = 0; i < inputs[0].length; i++) {
    oneCounts.push(0)
  }
  for (let input of inputs) {
    for (let i = 0; i < inputs[0].length; i++) {
      const char = input.charAt(i)
      if (char === '1') {
        oneCounts[i]++
      }
    }
  }
  return oneCounts
}
