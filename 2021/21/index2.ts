const rollz = [1, 2, 3]

interface PlayerConfig {
  position: number
  score: number
}

function move(
  playerConfig: PlayerConfig,
  steps: number,
  countMove: boolean
): PlayerConfig {
  const position = ((playerConfig.position + steps - 1) % 10) + 1
  let score = playerConfig.score
  if (countMove) {
    score += position
  }
  return {
    position,
    score,
  }
}

const scoreCache: { [k: string]: { p1: number; p2: number } } = {}

const toCacheKey = (
  p1: PlayerConfig,
  p2: PlayerConfig,
  p1Turn: boolean,
  rollsLeft: number
): string => {
  return JSON.stringify({ p1, p2, p1Turn, rollsLeft })
}

const play = (
  p1: PlayerConfig,
  p2: PlayerConfig,
  p1Turn: boolean,
  rollsLeft: number
): { p1: number; p2: number } => {
  let player1 = p1
  let player2 = p2
  if (p1.score >= 21) {
    return { p1: 1, p2: 0 }
  }
  if (p2.score >= 21) {
    return { p1: 0, p2: 1 }
  }
  if (scoreCache[toCacheKey(p1, p2, p1Turn, rollsLeft)]) {
    return scoreCache[toCacheKey(p1, p2, p1Turn, rollsLeft)]
  }
  return rollz
    .map((roll) => {
      player1 = p1
      player2 = p2
      let newRolls = rollsLeft - 1
      if (p1Turn) {
        player1 = move(player1, roll, newRolls === 0)
      } else {
        player2 = move(player2, roll, newRolls === 0)
      }
      let player = p1Turn
      if (newRolls === 0) {
        newRolls = 3
        player = !p1Turn
      }
      const score = play(player1, player2, player, newRolls)
      const cacheKey = toCacheKey(player1, player2, player, newRolls)
      scoreCache[cacheKey] = score
      return score
    })
    .reduce(
      (acc, el) => {
        acc.p2 += el.p2
        acc.p1 += el.p1
        return acc
      },
      {
        p1: 0,
        p2: 0,
      }
    )
}

let player1 = { position: 6, score: 0 }
let player2 = { position: 7, score: 0 }

const wins = play(player1, player2, true, 3)

console.log(`Day 21, p2: ${Math.max(wins.p1, wins.p2)}`)
