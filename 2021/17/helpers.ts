import { Position, TargetArea } from './types'

export function isWithin(position: Position, area: TargetArea) {
  return (
    position.x >= Math.min(area.x1, area.x2) &&
    position.x <= Math.max(area.x1, area.x2) &&
    position.y >= Math.min(area.y1, area.y2) &&
    position.y <= Math.max(area.y1, area.y2)
  )
}
