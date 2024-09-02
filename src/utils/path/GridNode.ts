import { diagonalHeuristics } from './heuristics'

export default class GridNode {
  x: number
  y: number
  weight: number
  heuristic: number
  pathCost: number
  f: number
  visited: boolean
  closed: boolean
  parent: GridNode | null

  constructor(x: number, y: number, weight: number) {
    this.x = x
    this.y = y
    this.weight = weight
    this.heuristic = 0
    this.pathCost = 0
    this.f = 0
    this.visited = false
    this.closed = false
    this.parent = null
  }

  toString(): string {
    return '[' + this.x + ' ' + this.y + ']'
  }

  getCost(fromNeighbor: GridNode): number {
    // Take diagonal weight into consideration.
    if (fromNeighbor && fromNeighbor.x != this.x && fromNeighbor.y != this.y) {
      return this.weight * diagonalHeuristics.heuristicValue
    }
    return this.weight
  }

  isWall(): boolean {
    return this.weight === 0
  }
}
