import { Position } from '@/types'
import GridNode from './GridNode'

export const diagonalHeuristics = {
  heuristicFunction: (pos0: GridNode, pos1: GridNode) =>
    diagonalHeuristics.distance([pos0.x, pos0.y], [pos1.x, pos1.y]),
  distance: (pos1: Position, pos2: Position) => {
    const [pos1X, pos1Y] = pos1
    const [pos2X, pos2Y] = pos2
    const deltaX = Math.abs(pos1X - pos2X)
    const deltaY = Math.abs(pos1Y - pos2Y)
    const [smallerDelta, biggerDelta] =
      deltaX < deltaY ? [deltaX, deltaY] : [deltaY, deltaX]
    return diagonalHeuristics.heuristicValue * smallerDelta + biggerDelta
  },
  heuristicValue: 1.5
}
