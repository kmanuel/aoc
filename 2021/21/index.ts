import { Player } from './Player'
import { Dice } from './Dice'

const player1 = new Player(6)
const player2 = new Player(7)
const dice = new Dice()

const takeTurn = (player: Player) => {
  const move = dice.roll() + dice.roll() + dice.roll()
  player.moveForward(move)
}

let p1 = true

while (player1.score < 1000 && player2.score < 1000) {
  if (p1) {
    takeTurn(player1)
  } else {
    takeTurn(player2)
  }
  p1 = !p1
}

console.log(player1.score)
console.log(player2.score)
console.log(dice.rolls)

const res = Math.min(player1.score, player2.score) * dice.rolls
console.log(`Day 21, p1: ${res}`)
