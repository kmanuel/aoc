export class Dice {
  private currVal: number
  public rolls: number

  constructor() {
    this.currVal = 0
    this.rolls = 0
  }

  roll() {
    this.rolls++
    if (this.currVal === 100) {
      this.currVal = 1
    } else {
      this.currVal++
    }
    return this.currVal
  }
}
