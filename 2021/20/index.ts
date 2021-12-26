import fs from 'fs'

class Image {
  constructor(private fields: string[][], private nullPixel: string) {}

  getPixelAt(row: number, col: number) {
    if (row < 0 || row >= this.fields.length) {
      return this.nullPixel
    }
    if (col < 0 || col >= this.fields[0].length) {
      return this.nullPixel
    }
    return this.fields[row][col]
  }

  getPixelArea(row: number, col: number) {
    let fields = []
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const pixel = this.getPixelAt(row + i, col + j)
        fields.push(pixel)
      }
    }
    return fields
  }

  setFields(fields: string[][]) {
    this.fields = JSON.parse(JSON.stringify(fields))
  }

  getFields(): string[][] {
    return JSON.parse(JSON.stringify(this.fields))
  }

  getDimensions() {
    return [this.fields.length, this.fields[0].length]
  }

  getLitPixelCount() {
    return this.fields
      .map((row) => row.filter((rf) => rf === '#').length)
      .reduce((acc, el) => acc + el)
  }

  toString() {
    return this.fields.map((fRow) => fRow.join('')).join('\n')
  }

  print() {
    console.log(this.toString())
  }
}

const translateAreaToBinary = (pixelArea: string[]) => {
  return pixelArea.map((s) => (s === '#' ? 1 : 0)).join('')
}

const pixelAreaToDecimal = (pixelArea: string[]) => {
  const binary = translateAreaToBinary(pixelArea)
  return parseInt(binary, 2)
}

const pixelAreaToEnhancementField = (
  pixelArea: string[],
  enhancement: string
) => {
  const dec = pixelAreaToDecimal(pixelArea)
  return enhancement[dec]
}

const growFields = (fields: string[][], nullPixel: string) => {
  let currCols = fields[0].length
  let newFields = [Array(currCols + 2).fill(nullPixel)]
  for (let row of fields) {
    newFields.push([nullPixel, ...row, nullPixel])
  }
  newFields.push(Array(currCols + 2).fill(nullPixel))
  return newFields
}

const solve = (iterations: number) => {
  const [enhancement, imageLines] = fs
    .readFileSync('./input.txt', 'utf-8')
    .split(/^$/gm)

  const imageFields = imageLines
    .split('\n')
    .filter((s) => s.length > 0)
    .map((i) => i.split(''))

  let currentNullPixel = '.'

  const bufferedInputImageFields = growFields(
    growFields(imageFields, currentNullPixel),
    currentNullPixel
  )

  let currImage = new Image(bufferedInputImageFields, currentNullPixel)

  for (let i = 0; i < iterations; i++) {
    let imgDimensions = currImage.getDimensions()

    let fieldsCopy = currImage.getFields()
    for (let row = 0; row < imgDimensions[0]; row++) {
      for (let col = 0; col < imgDimensions[1]; col++) {
        const area = currImage.getPixelArea(row, col)
        const enhancementField = pixelAreaToEnhancementField(area, enhancement)
        fieldsCopy[row][col] = enhancementField
      }
    }
    currentNullPixel = pixelAreaToEnhancementField(
      Array<string>(9).fill(currentNullPixel),
      enhancement
    )

    currImage = new Image(
      growFields(fieldsCopy, currentNullPixel),
      currentNullPixel
    )
  }
  return currImage.getLitPixelCount()
}

const part1 = solve(2)
const part2 = solve(50)

console.log(`Day 20, part1=${part1}`)
console.log(`Day 20, part2=${part2}`)
