import path from './path'

test('path finds route with a blocking character included', () => {
  const calculatedPath = path({
    targetPosition: [0, 4],
    characterToMove: { position: [0, 0] },
    grid: [
      ['.', '.', '.', '.'],
      ['w', 'w', '.', '.'],
      ['.', 'w', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.']
    ],
    charactersList: [{ position: [2, 1] }]
  })

  expect(calculatedPath.map((segment) => segment.position)).toEqual([
    [1, 0],
    [2, 0],
    [3, 1],
    [2, 2],
    [1, 3],
    [0, 4]
  ])
})

test('path finds route next to another character', () => {
  const calculatedPath = path({
    targetPosition: [0, 4],
    characterToMove: { position: [0, 0] },
    grid: [
      ['.', '.', '.', '.'],
      ['w', 'w', '.', '.'],
      ['.', 'w', '.', '.'],
      ['.', '.', '.', '.'],
      ['.', '.', '.', '.']
    ],
    charactersList: [{ position: [2, 1] }, { position: [0, 4] }]
  })

  expect(calculatedPath.map((segment) => segment.position)).toEqual([
    [1, 0],
    [2, 0],
    [3, 1],
    [2, 2],
    [1, 3]
  ])
})
