export class Scanner {
  private rotation = ['x', 'y', 'z']
  private shift = [0, 0, 0]

  constructor(private beacons: number[][], public scannerId: number) {}

  private makeUnique() {
    const beacons = this.beacons
    let uniqueBeacons: string[] = []
    const bStrings = beacons.map((b) => JSON.stringify(b))
    for (let str of bStrings) {
      if (!uniqueBeacons.includes(str)) {
        uniqueBeacons.push(str)
      }
    }
    this.beacons = uniqueBeacons.map((b) => JSON.parse(b))
  }

  addBeacons(beacs: number[][]) {
    this.beacons.push(...beacs)
    this.makeUnique()
  }

  setRotation(rot: string[]) {
    this.rotation = rot
  }

  setShift(shift: number[]) {
    this.shift = shift
  }

  getBeacons() {
    const rotatedBeacons = this.getRotatedBeacons(this.rotation)
    const shift = this.shift
    const shiftedBeacons = rotatedBeacons.map((b) => [
      b[0] - shift[0],
      b[1] - shift[1],
      b[2] - shift[2],
    ])
    return shiftedBeacons
  }

  getRotatedBeacons(rotation: string[]) {
    let rots = rotation.map((r) => r.replace('-', ''))
    let idxs = [rots.indexOf('x'), rots.indexOf('y'), rots.indexOf('z')]
    let negs = rotation.map((r) => (r.startsWith('-') ? -1 : 1))

    let newBeacons: number[][] = []
    for (let beacon of this.beacons) {
      newBeacons.push([
        negs[0] * beacon[idxs[0]],
        negs[1] * beacon[idxs[1]],
        negs[2] * beacon[idxs[2]],
      ])
    }
    return newBeacons
  }
}
