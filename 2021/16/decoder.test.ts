import { PacketDecoder } from './decoder'

describe('PacketDecoder', () => {
  describe('part1', () => {
    it('sample1', () => {
      testPart1('8A004A801A8002F478', 16)
    })
    it('sample2', () => {
      testPart1('620080001611562C8802118E34', 12)
    })
    it('sample3', () => {
      testPart1('C0015000016115A2E0802F182340', 23)
    })
    it('sample4', () => {
      testPart1('A0016C880162017C3686B18A3D4780', 31)
    })
  })
  describe('part2', () => {
    it('should decode 1+2 to 3', () => {
      test('C200B40A82', 3)
    })
    it('should decode 6+9 to 54', () => {
      test('04005AC33890', 54)
    })
    it('should decode min(7,8,9) to 7', () => {
      test('880086C3E88112', 7)
    })
    it('should decode max(7,8,9) to 9', () => {
      test('CE00C43D881120', 9)
    })
    it('should decode 5<15 to 1', () => {
      test('D8005AC2A8F0', 1)
    })
    it('should decode 5>15 to 0', () => {
      test('F600BC2D8F', 0)
    })
    it('should decode 5=15 to 0', () => {
      test('9C005AC2F8F0', 0)
    })
    it('should decode 1+3=2*2 to 1', () => {
      test('9C0141080250320F1802104A08', 1)
    })
    it('should decode (1 + min(3 * 5, 10))', () => {
      test('22008c0950044c0118330a6414', 11)
    })
    it('should decode (1 + min(3 * 5, 3 + 7) * (3 + 4))', () => {
      test('22008c09300454011300460cc29100460cc39100460cc20', 71)
    })
    it('should decode', () => {
      test(
        '3600888023024c01150044c0118330a440118330e44011833085c0118522008c29870',
        1
      )
    })
    it('should decode (1 + min(3 * 5, 3 + 7) * (3 + 4)) > max(5, 5 + 7) * 30 * min(2,max(1,5))', () => {
      test(
        '3600888023024c01150044c0118330a440118330e44011833084c0197004614880230a61cc8b8a8023045c0118130a',
        0
      )
    })
    it('should decode (1 + min(3 * 5, 3 + 7) * (3 + 4)) < max(5, 5 + 7) * 30 * min(2,max(1,5))', () => {
      test(
        '3a00888023024c01150044c0118330a440118330e44011833084c0197004614880230a61cc8b8a8023045c0118130a',
        1
      )
    })
    it('should decode 1>0', () => {
      test('36008c09800', 1)
    })
    it('should decode 1>1', () => {
      test('36008c09810', 0)
    })
    it('should decode 0>1', () => {
      test('36008c01810', 0)
    })
    it('should decode 32F5DF3B128', () => {
      test('32F5DF3B128', 123456789)
    })
    it('should decode 1+2+3+4', () => {
      test('22010c0982306610', 10)
    })
    it('should decode 1+2+3+4*5', () => {
      test('22010c09823064c0118430a', 26)
    })
    it('should decode (1+2+3+4)*5', () => {
      test('260088804302608c198430a', 50)
    })
  })
})

function testPart1(value: string, expected: number) {
  const decoder = new PacketDecoder()
  decoder.setHex(value)
  const nodes = decoder.decode()
  const result = nodes[0].getVersionSum()
  expect(result).toBe(expected)
}

function test(value: string, expected: number) {
  const decoder = new PacketDecoder()
  decoder.setHex(value)
  const nodes = decoder.decode()
  const result = nodes[0].getValue()
  expect(result).toBe(BigInt(expected))
}
