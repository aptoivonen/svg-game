import Graph from './Graph'
import search from './search'
import type { PathSegment, Position } from '@/types'

/**
 * Finds path to end position. If no path, returns path to position closest to end.
 * @param {Object} params
 * @param {number[][]} params.map
 * @param {Array<Position>} params.characterPositions
 * @param {Position} params.start
 * @param {Position} params.end
 * @returns {Array<{pathCost: number, position: Position}>}
 */
export default function path({
  map,
  characterPositions,
  start,
  end
}: {
  map: number[][]
  characterPositions: Position[]
  start: Position
  end: Position
}): PathSegment[] {
  const graph = new Graph(map)
  const [startX, startY] = start
  const [endX, endY] = end
  // flip x and y, algorithm has them the other way around
  const startNode = graph.grid[startY][startX]
  // flip x and y, algorithm has them the other way around
  const endNode = graph.grid[endY][endX]
  characterPositions.forEach(([charX, charY]) => {
    // weight 0 => cost is infinite
    graph.grid[charY][charX].weight = 0
  })

  return search(graph, startNode, endNode, { closest: true }).map((node) => ({
    pathCost: node.pathCost,
    // flip x and y, algorithm has them the other way around
    position: [node.y, node.x]
  }))
}
