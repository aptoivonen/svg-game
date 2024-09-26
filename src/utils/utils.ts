import { Position } from '@/types'
import { diagonalHeuristics } from './path/heuristics'

export function map2D<T, R>(
  twoDArray: T[][],
  callback: (item: T, x: number, y: number) => R
): R[] {
  const newArr: R[] = []
  twoDArray.forEach((row, y) =>
    row.forEach((item, x) => newArr.push(callback(item, x, y)))
  )
  return newArr
}

export async function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay)
  })
}

export function isEqual(position1: Position, position2: Position) {
  const [pos1X, pos1Y] = position1
  const [pos2X, pos2Y] = position2
  return pos1X === pos2X && pos1Y === pos2Y
}

export function last<T>(array: T[]): T {
  return array[array.length - 1]
}

export function distance(position1: Position, position2: Position) {
  return diagonalHeuristics.distance(position1, position2)
}
