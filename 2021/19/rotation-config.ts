const rotAxis = (from: string[], axisNr: 0 | 1 | 2): string[] => {
  if (axisNr === 0) {
    return [from[0], from[2], flip(from[1])]
  } else if (axisNr === 1) {
    return [flip(from[2]), from[1], from[0]]
  } else if (axisNr === 2) {
    return [flip(from[1]), from[0], from[2]]
  }
  return []
}

const flip = (str: string): string => {
  if (str.startsWith('-')) {
    return str.replace('-', '')
  } else {
    return '-' + str
  }
}

export const getAllRots = () => {
  let curr = ['x', 'y', 'z']
  let allRots: string[][] = []
  for (let j = 0; j < 4; j++) {
    curr = rotAxis(curr, 1)
    for (let i = 0; i < 4; i++) {
      curr = rotAxis(curr, 2)
      allRots.push(curr)
    }
  }
  curr = rotAxis(curr, 0)
  for (let i = 0; i < 4; i++) {
    curr = rotAxis(curr, 2)
    allRots.push(curr)
  }
  curr = rotAxis(curr, 0)
  curr = rotAxis(curr, 0)
  for (let i = 0; i < 4; i++) {
    curr = rotAxis(curr, 2)
    allRots.push(curr)
  }

  return allRots
}
