import { runExplosion } from './explosion'
import { SnailNumber, toSnailString } from './SnailNumber'
import { split } from './split'

export const runProcess = (sn: SnailNumber) => {
  let running = true
  while (running) {
    const exploded = runExplosion(sn)
    if (exploded) {
      continue
    }
    const splitted = split(sn)
    running = splitted
  }
}
