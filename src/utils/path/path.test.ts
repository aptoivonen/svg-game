import path from './path'

describe('path', () => {
  test('finds route with a blocking character included', () => {
    const calculatedPath = path({
      targetPosition: [0, 4],
      characterToMove: { position: [0, 0] },
      maxMovementPoints: 100,
      grid: [
        ['.', '.', '.', '.'],
        ['w', 'w', '.', '.'],
        ['.', 'w', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.']
      ],
      terrainFeatureGrid: [
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
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

  test('finds route next to another character', () => {
    const calculatedPath = path({
      targetPosition: [0, 4],
      characterToMove: { position: [0, 0] },
      maxMovementPoints: 100,
      grid: [
        ['.', '.', '.', '.'],
        ['w', 'w', '.', '.'],
        ['.', 'w', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.']
      ],
      terrainFeatureGrid: [
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
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

  test('finds no route when no path exists', () => {
    const calculatedPath = path({
      targetPosition: [0, 2],
      characterToMove: { position: [3, 0] },
      maxMovementPoints: 100,
      grid: [
        ['.', '.', '.', '.'],
        ['w', 'w', '.', '.'],
        ['.', 'w', '.', '.'],
        ['w', 'w', '.', '.'],
        ['.', '.', '.', '.']
      ],
      terrainFeatureGrid: [
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.']
      ],
      charactersList: []
    })

    expect(calculatedPath.map((segment) => segment.position)).toEqual([])
  })

  test('finds no route when path is blocked by other characters', () => {
    const calculatedPath = path({
      targetPosition: [0, 2],
      characterToMove: { position: [3, 0] },
      maxMovementPoints: 100,
      grid: [
        ['.', '.', '.', '.'],
        ['w', 'w', '.', '.'],
        ['.', 'w', '.', '.'],
        ['.', 'w', '.', '.'],
        ['.', '.', '.', '.']
      ],
      terrainFeatureGrid: [
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.']
      ],
      charactersList: [{ position: [0, 3] }]
    })

    expect(calculatedPath.map((segment) => segment.position)).toEqual([])
  })

  test('finds route with a blocking terrain feature included', () => {
    const calculatedPath = path({
      targetPosition: [0, 4],
      characterToMove: { position: [0, 0] },
      maxMovementPoints: 100,
      grid: [
        ['.', '.', '.', '.'],
        ['w', 'w', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.']
      ],
      terrainFeatureGrid: [
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', 't', '.', '.'],
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

  test('finds no route when no path exists because of terrain features', () => {
    const calculatedPath = path({
      targetPosition: [0, 2],
      characterToMove: { position: [3, 0] },
      maxMovementPoints: 100,
      grid: [
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.'],
        ['.', '.', '.', '.']
      ],
      terrainFeatureGrid: [
        ['.', '.', '.', '.'],
        ['t', 't', '.', '.'],
        ['.', 't', '.', '.'],
        ['t', 't', '.', '.'],
        ['.', '.', '.', '.']
      ],
      charactersList: []
    })
    expect(calculatedPath.map((segment) => segment.position)).toEqual([])
  })
})
