import path from './path'

test('path finds route with a blocking character included', () => {
  const pathWithObstacles = path({
    map: [
      [1, 1, 1, 1],
      [0, 0, 1, 1],
      [1, 0, 1, 1],
      [1, 1, 1, 1],
      [1, 1, 1, 1]
    ],
    characterPositions: [[2, 1]],
    start: [0, 0],
    end: [0, 4]
  })

  expect(pathWithObstacles.map((segment) => segment.position)).toEqual([
    [1, 0],
    [2, 0],
    [3, 1],
    [2, 2],
    [1, 3],
    [0, 4]
  ])
})
