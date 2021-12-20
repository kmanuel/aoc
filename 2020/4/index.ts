import fs from 'fs'

const run1 = () => {
  const passports = fs
    .readFileSync('./input.txt', 'utf-8')
    .split(/^$/gm)
    .map((p) => p.trim())
    .map((p) => p.split(/\s/gm))

  const res = passports.filter(isValid1).length

  console.log(`Day4, p1: `, res)
}

const isValid1 = (passport: string[]) => {
  let fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  return fields.every((f) => containsField(passport, f))
}

const isValid2 = (passport: string[]) => {
  let fields: {
    [k: string]: (val: string) => boolean
  } = {
    byr: (val: string) => Number(val) >= 1920 && Number(val) <= 2002,
    iyr: (val: string) => Number(val) >= 2010 && Number(val) <= 2020,
    eyr: (val: string) => Number(val) >= 2020 && Number(val) <= 2030,
    hgt: (val: string) => {
      const match = val.match(/(\d+)(cm|in)/)
      if (!match) {
        return false
      }
      let value = Number(match[1])
      let unit = match[2]
      if (unit === 'cm') {
        return value >= 150 && value <= 193
      }
      if (unit === 'in') {
        return value >= 59 && value <= 76
      }
      return false
    },
    hcl: (val: string) => !!val.match(/^#[a-z0-9]{6}$/),
    ecl: (val: string) => !!val.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/),
    pid: (val: string) => !!val.match(/^[0-9]{9}$/),
    cid: (val: string) => true,
  }

  if (!isValid1(passport)) {
    return false
  }

  return passport.map((f) => f.split(':')).every((sp) => fields[sp[0]](sp[1]))
}

const run2 = () => {
  const passports = fs
    .readFileSync('./input.txt', 'utf-8')
    .split(/^$/gm)
    .map((p) => p.trim())
    .map((p) => p.split(/\s/gm))

  const res = passports.filter(isValid2).length

  console.log(`Day4, p2: `, res)
}

run1()
run2()

function containsField(passport: string[], field: string) {
  return passport.findIndex((p) => p.startsWith(field + ':')) !== -1
}
