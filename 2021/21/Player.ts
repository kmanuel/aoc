export class Player {
  public score: number
  constructor(public position: number) {
    this.score = 0
  }

  moveForward(steps: number) {
    this.position = ((this.position + steps - 1) % 10) + 1
    this.score += this.position
  }
}
