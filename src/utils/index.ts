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
