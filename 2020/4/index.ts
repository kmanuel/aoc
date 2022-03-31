import fs from 'fs'

class Passport {
  constructor(private fields: string[]) {}

  hasField(name: string) {
    return !!this.getField(name)
  }

  getField(name: string) {
    return this.fields.filter((f) => f.startsWith(name))?.[0]
  }

  getFields(): string[] {
    return this.fields
  }
}

const parse = (fileName: string) => {
  const passportFieldGroups = fs.readFileSync(fileName, 'utf-8').split(/^\n/gm)
  let passports: Passport[] = []
  for (let passport of passportFieldGroups) {
    const fields = passport.trim().split(/\s/gm)
    const newPassport = new Passport(fields)
    passports.push(newPassport)
  }
  return passports
}

const hasRequiredFields = (passport: Passport) => {
  return (
    passport.hasField('byr') &&
    passport.hasField('iyr') &&
    passport.hasField('eyr') &&
    passport.hasField('hgt') &&
    passport.hasField('hcl') &&
    passport.hasField('ecl') &&
    passport.hasField('pid')
  )
}

const fieldValidators: any = {
  byr: (line: string) => {
    const value = parseInt(line.split(':')[1], 10)
    return value >= 1920 && value <= 2002
  },
  iyr: (line: string) => {
    const value = parseInt(line.split(':')[1], 10)
    return value >= 2010 && value <= 2020
  },
  eyr: (line: string) => {
    const value = parseInt(line.split(':')[1], 10)
    return value >= 2020 && value <= 2030
  },
  hgt: (line: string) => {
    const match = line.match(/^hgt:(\d+)(cm|in)$/)
    if (!match) {
      return false
    }
    const value = parseInt(match[1], 10)
    if (line.endsWith('in')) {
      return value >= 59 && value <= 76
    }
    if (line.endsWith('cm')) {
      return value >= 150 && value <= 193
    }
    throw Error()
  },
  hcl: (line: string) => {
    const match = line.match(/^hcl:#[0-9a-f]{6}$/)
    return !!match
  },
  ecl: (line: string) => {
    const match = line.match(/^ecl:(amb|blu|brn|gry|grn|hzl|oth)$/)
    return !!match
  },
  pid: (line: string) => {
    const match = line.match(/^pid:\d{9}$/)
    return !!match
  },
  cid: (line: string) => {
    return true
  },
}

const validateField = (field: string) => {
  const validationFn = getValidationFn(field)
  if (!validationFn) {
    return false
  }
  return validationFn(field)
}

function getValidationFn(field: string) {
  const fieldName = field.split(':')[0]
  return fieldValidators[fieldName]
}

const validatePassport = (passport: Passport) => {
  const fields = passport.getFields()
  return fields.every(validateField)
}

const filterValidPassports = (passports: Passport[]) => {
  return passports.filter(validatePassport)
}

const solve1 = (fileName: string) => {
  const passports = parse(fileName)
  const validPassports = passports.filter(hasRequiredFields)
  const validPassportCount = validPassports.length
  console.log(`Day4 p1 \t${fileName} \t ${validPassportCount}`)
}

const solve2 = (fileName: string) => {
  const passports = parse(fileName)
  const passportsWithAllFields = passports.filter(hasRequiredFields)
  const validPassports = filterValidPassports(passportsWithAllFields)
  const validCount = validPassports.length
  console.log(`Day4 p2 \t${fileName}\t${validCount}`)
}

solve1('sample.txt')
solve1('input.txt')

solve2('sample.txt')
solve2('input.txt')
