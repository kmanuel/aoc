import { Player } from './Player'
describe('Player', () => {
  it('moves player forward by 1', () => {
    const player = new Player(1)
    player.moveForward(1)
    expect(player.position).toBe(2)
    expect(player.score).toBe(2)
  })
  it('moves player forward by 2', () => {
    const player = new Player(1)
    player.moveForward(2)
    expect(player.position).toBe(3)
    expect(player.score).toBe(3)
  })
  it('moves player forward by 3 from 4', () => {
    const player = new Player(4)
    player.moveForward(3)
    expect(player.position).toBe(7)
    expect(player.score).toBe(7)
  })
  it('moves player forward by 2 from 9 to 1', () => {
    const player = new Player(9)
    player.moveForward(2)
    expect(player.position).toBe(1)
    expect(player.score).toBe(1)
  })
  it('sums scores of multiple steps', () => {
    const player = new Player(1)
    player.moveForward(1)
    // player is now at 2
    player.moveForward(2)
    // player is now at 4
    expect(player.position).toBe(4)
    expect(player.score).toBe(6)
  })
})
