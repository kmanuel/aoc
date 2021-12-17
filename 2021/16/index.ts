import fs from 'fs'
import { PacketDecoder } from './decoder'

const input = fs.readFileSync('./input.txt', 'utf-8')

const decoder = new PacketDecoder()
decoder.setHex(input)
const node = decoder.decode()[0]

console.log(`Day 16, p1: ${node.getVersionSum()}`)
console.log(`Day 16, p1: ${node.getValue()}`)
