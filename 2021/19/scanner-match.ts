import { Scanner } from './Scanner'
import { getAllRots } from './rotation-config'
import { countBeaconMatches } from './beacon-compare'

export const scannersMatch = (
  sc1: Scanner,
  sc2: Scanner,
  beaconMatchRequired: number = 12
) => {
  const sc1Beacons = sc1.getBeacons()
  for (let refBeacon1 of sc1Beacons) {
    // move scanner1's center to refBeacon1
    sc1.setShift(refBeacon1)
    const sc1s = sc1.getBeacons()
    // for every rotation
    for (let rot of getAllRots()) {
      sc2.setRotation(rot)
      // for every rotated sc2 beacon
      sc2.setShift([0, 0, 0])
      const sc2Beacs = sc2.getBeacons()
      for (let refBeacon2 of sc2Beacs) {
        // set it as the center of sc2
        sc2.setShift(refBeacon2)
        const sc2s = sc2.getBeacons()
        // and try to match sc1 and sc2 beacons
        const matches = countBeaconMatches(sc1s, sc2s)
        if (matches >= beaconMatchRequired) {
          sc2.setRotation(['x', 'y', 'z'])
          sc2.setShift([0, 0, 0])
          sc1.setShift([0, 0, 0])
          const scannerPos = [
            refBeacon1[0] - refBeacon2[0],
            refBeacon1[1] - refBeacon2[1],
            refBeacon1[2] - refBeacon2[2],
          ]
          return { rot, shift1: refBeacon1, shift2: refBeacon2, scannerPos }
        }
      }
    }
  }
  sc1.setShift([0, 0, 0])
  sc2.setRotation(['x', 'y', 'z'])
  sc2.setShift([0, 0, 0])
  return null
}
