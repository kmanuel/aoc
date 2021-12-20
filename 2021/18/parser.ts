import { SnailNumber } from './SnailNumber'

export const toSnailNum = (input: string) => {
  const arr = JSON.parse(input)
  return parse(arr)
}

const parse = (arr: any): SnailNumber => {
  if (typeof arr === 'number') {
    return {
      value: arr,
    }
  } else {
    const n = {
      left: parse(arr[0]),
      right: parse(arr[1]),
    }
    n.left.parent = n
    n.right.parent = n
    return n
  }
}
