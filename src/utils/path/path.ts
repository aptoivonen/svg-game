import { TERRAIN } from '@/config'
import Graph from './Graph'
import search from './search'
import type { Path, Position, TerrainSymbol, Positioned } from '@/types'
import { isEqual } from '@/utils'

/**
 * Finds path to end position. If no path, returns path to position closest to end.
 * @param {Object} params
 * @param {Position} params.targetPosition
 * @param {Positioned} params.characterToMove
 * @param {TerrainSymbol[][]} params.grid
 * @param {Positioned[]} params.charactersList
 * @returns
 */
export default function path({
  targetPosition,
  characterToMove,
  grid,
  charactersList
}: {
  targetPosition: Position
  characterToMove: Positioned
  grid: TerrainSymbol[][]
  charactersList: Positioned[]
}): Path {
  const [startX, startY] = characterToMove.position
  const [endX, endY] = targetPosition

  const movementCostGrid: number[][] = getMovementCostGrid(grid)

  mutateSetCharacterPositions(movementCostGrid, charactersList, targetPosition)

  const graph = new Graph(movementCostGrid)

  // flip x and y, Graph has them the other way around
  const startNode = graph.grid[startY][startX]
  const endNode = graph.grid[endY][endX]

  const resultPath = search(graph, startNode, endNode, { closest: false }).map(
    (node) => ({
      pathCost: node.pathCost,
      position: [node.y, node.x] as [number, number]
    })
  )

  mutateSetDropLastSegmentIfOccupied(resultPath, targetPosition, charactersList)

  return resultPath
}

/** set movement costs. 0 means not passable */
function getMovementCostGrid(terrainGrid: TerrainSymbol[][]): number[][] {
  return terrainGrid.map((row) =>
    row.map((terrainSymbol) => TERRAIN[terrainSymbol].movementCost)
  )
}

/** set character positions. 0 means position taken */
function mutateSetCharacterPositions(
  movementCostGrid: number[][],
  charactersList: Positioned[],
  targetPosition: Position
): void {
  charactersList.forEach((character) => {
    // if a character is standing on target, ignore him to find correct path
    if (isEqual(character.position, targetPosition)) return
    const [charX, charY] = character.position
    movementCostGrid[charY][charX] = 0
  })
}

/** drop last path segment if path was calculated ignoring the occupying character.
 * Algorithm fings suboptimal path if character was noted first.
 */
function mutateSetDropLastSegmentIfOccupied(
  path: Path,
  targetPosition: Position,
  charactersList: Positioned[]
): void {
  const lastPosition = path.at(-1)
  if (lastPosition) {
    charactersList.forEach((character) => {
      if (isEqual(character.position, targetPosition)) {
        path.pop()
      }
    })
  }
}
