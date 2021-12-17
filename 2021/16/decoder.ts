const LITERAL_TYPE_ID = 4

export class PacketDecoder {
  constructor(
    private position = 0,
    private input = '',
    private children: Packet[] = []
  ) {}

  public setHex(input: string) {
    const binaryInput = this.toBinaryString(input)
    this.setRaw(binaryInput)
  }

  public setRaw(input: string) {
    this.input = input
  }

  public getCurrentHeader() {
    const packetVersion = this.readInt(3)
    const packetTypeId = this.readInt(3)
    return { packetVersion, packetTypeId }
  }

  readInt(bits: number) {
    const raw = this.readRaw(bits)
    return parseInt(raw, 2)
  }

  readRaw(n: number) {
    const reading = this.input.substring(this.position, this.position + n)
    this.position += n
    return reading
  }

  public decode() {
    while (!this.isFinished()) {
      this.children.push(this.readPacket())
    }
    return this.children
  }

  public resolveVersions() {
    let curr = this.children[0]
    while (curr !== null) {
      console.log(curr.getVersion())
    }
  }

  public isFinished = () =>
    this.input.substring(this.position).length === 0 ||
    this.input.substring(this.position).match(/^0+$/)

  private readPacket() {
    const header = this.getCurrentHeader()
    if (header.packetTypeId === LITERAL_TYPE_ID) {
      return this.readLiteral(header.packetVersion)
    } else {
      return this.readOperator(header.packetVersion, header.packetTypeId)
    }
  }

  readLiteral(version: number) {
    let numberBits = ''
    let running = true
    while (running) {
      if (this.readRaw(1) === '0') {
        running = false
      }
      numberBits += this.readRaw(4)
    }
    return new LiteralPacket(version, numberBits)
  }

  getChildren() {
    return this.children
  }

  readOperator(version: number, packetType: number) {
    const mode = this.readRaw(1) === '0' ? 15 : 11
    let children: Packet[] = []
    if (mode === 11) {
      const numSubPackets = this.readInt(mode)
      let packetsRead = 0
      while (packetsRead < numSubPackets && !this.isFinished()) {
        children.push(this.readPacket())
        packetsRead++
      }
    } else {
      const subPacketLength = this.readInt(mode)
      const subDecoder = new PacketDecoder()
      subDecoder.setRaw(
        this.input.substring(this.position, this.position + subPacketLength)
      )
      subDecoder.decode()
      children = subDecoder.getChildren()
      this.position += subPacketLength
    }
    switch (packetType) {
      case 0:
        return new SumPacket(version, children)
      case 1:
        return new ProductPacket(version, children)
      case 2:
        return new MinimumPacket(version, children)
      case 3:
        return new MaximumPacket(version, children)
      case 5:
        return new GreaterThanPacket(version, children)
      case 6:
        return new LessThanPacket(version, children)
      case 7:
        return new EqualPacket(version, children)
    }
    throw Error()
  }

  toBinaryString(data: string) {
    const bin = data
      .split('')
      .map((h) => parseInt(h, 16).toString(2).padStart(4, '0'))
      .join('')
    return bin
  }
}

interface Packet {
  getVersionSum(): number
  getValue(): bigint
  getVersion(): number
  getSubPackets(): Packet[]
}

abstract class BasePacket implements Packet {
  getVersionSum(): number {
    return (
      this.getVersion() +
      this.getSubPackets().reduce((acc, el) => acc + el.getVersionSum(), 0)
    )
  }
  abstract getValue(): bigint
  abstract getVersion(): number
  abstract getSubPackets(): Packet[]
}

class SumPacket extends BasePacket {
  constructor(private version: number, public subPackets: Packet[]) {
    super()
  }

  getValue() {
    return this.subPackets
      .map((p) => p.getValue())
      .reduce((acc, el) => acc + el, BigInt(0))
  }

  getVersion() {
    return this.version
  }

  getSubPackets(): Packet[] {
    return this.subPackets
  }

  toString() {
    return `(${this.subPackets.join(' + ')})`
  }
}

class ProductPacket extends BasePacket {
  constructor(private version: number, public subPackets: Packet[]) {
    super()
  }

  getValue() {
    return this.subPackets
      .map((p) => p.getValue())
      .reduce((acc, el) => acc * el, BigInt(1))
  }

  getVersion() {
    return this.version
  }

  getSubPackets(): Packet[] {
    return this.subPackets
  }

  toString() {
    return `(${this.subPackets.join(' * ')})`
  }
}

class MinimumPacket extends BasePacket {
  constructor(private version: number, public subPackets: Packet[]) {
    super()
  }

  getValue() {
    let min = this.subPackets[0].getValue()
    for (let pack of this.subPackets) {
      const val = pack.getValue()
      if (val < min) {
        min = val
      }
    }
    return min
  }

  getVersion() {
    return this.version
  }

  getSubPackets(): Packet[] {
    return this.subPackets
  }

  toString() {
    return `Math.min(${this.subPackets.join(',')})`
  }
}

class MaximumPacket extends BasePacket {
  constructor(private version: number, public subPackets: Packet[]) {
    super()
  }

  getValue() {
    let max = this.subPackets[0].getValue()
    for (let pack of this.subPackets) {
      const val = pack.getValue()
      if (val > max) {
        max = val
      }
    }
    return max
  }

  getVersion() {
    return this.version
  }

  getSubPackets(): Packet[] {
    return this.subPackets
  }

  toString() {
    return `Math.max(${this.subPackets.join(',')})`
  }
}

class LiteralPacket implements Packet {
  private value: bigint

  constructor(private version: number, bits: string) {
    this.value = BigInt(parseInt(bits, 2))
  }

  getVersionSum() {
    return this.version
  }

  getValue() {
    return this.value
  }

  getVersion() {
    return this.version
  }

  getSubPackets(): Packet[] {
    return []
  }

  toString() {
    return `${this.value}`
  }
}

class GreaterThanPacket extends BasePacket {
  constructor(private version: number, public subPackets: Packet[]) {
    super()
  }

  getValue() {
    return BigInt(
      this.subPackets[0].getValue() > this.subPackets[1].getValue() ? 1 : 0
    )
  }

  getVersion() {
    return this.version
  }

  getSubPackets(): Packet[] {
    return this.subPackets
  }

  toString() {
    return `(${this.subPackets[0]} > ${this.subPackets[1]} ? 1 : 0)`
  }
}

class LessThanPacket extends BasePacket {
  constructor(private version: number, public subPackets: Packet[]) {
    super()
  }

  getValue() {
    return BigInt(
      this.subPackets[0].getValue() < this.subPackets[1].getValue() ? 1 : 0
    )
  }

  getVersion() {
    return this.version
  }

  getSubPackets(): Packet[] {
    return this.subPackets
  }

  toString() {
    return `(${this.subPackets[0]} < ${this.subPackets[1]} ? 1 : 0)`
  }
}

class EqualPacket extends BasePacket {
  constructor(private version: number, public subPackets: Packet[]) {
    super()
  }

  getValue() {
    return BigInt(
      this.subPackets[0].getValue() === this.subPackets[1].getValue() ? 1 : 0
    )
  }

  getVersion() {
    return this.version
  }

  getSubPackets(): Packet[] {
    return this.subPackets
  }

  toString() {
    return `(${this.subPackets[0]} == ${this.subPackets[1]} ? 1 : 0)`
  }
}
