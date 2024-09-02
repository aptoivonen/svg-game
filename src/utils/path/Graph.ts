import GridNode from './GridNode'

export default class Graph {
  nodes: GridNode[]
  grid: GridNode[][]
  dirtyNodes: GridNode[]

  constructor(gridIn: number[][]) {
    this.nodes = []
    this.grid = []
    for (let x = 0; x < gridIn.length; x++) {
      this.grid[x] = []

      for (let y = 0, row = gridIn[x]; y < row.length; y++) {
        const node = new GridNode(x, y, row[y])
        this.grid[x][y] = node
        this.nodes.push(node)
      }
    }
    this.dirtyNodes = []
    this.#init()
  }

  #init() {
    for (let i = 0; i < this.nodes.length; i++) {
      this.#cleanNode(this.nodes[i])
    }
  }

  #cleanNode(node: GridNode) {
    node.f = 0
    node.pathCost = 0
    node.heuristic = 0
    node.visited = false
    node.closed = false
    node.parent = null
  }

  cleanDirty() {
    for (let i = 0; i < this.dirtyNodes.length; i++) {
      this.#cleanNode(this.dirtyNodes[i])
    }
    this.dirtyNodes = []
  }

  markDirty(node: GridNode) {
    this.dirtyNodes.push(node)
  }

  neighbors(node: GridNode): GridNode[] {
    const ret = [],
      x = node.x,
      y = node.y,
      grid = this.grid

    // West
    if (grid[x - 1] && grid[x - 1][y]) {
      ret.push(grid[x - 1][y])
    }

    // East
    if (grid[x + 1] && grid[x + 1][y]) {
      ret.push(grid[x + 1][y])
    }

    // South
    if (grid[x] && grid[x][y - 1]) {
      ret.push(grid[x][y - 1])
    }

    // North
    if (grid[x] && grid[x][y + 1]) {
      ret.push(grid[x][y + 1])
    }

    // Southwest
    if (grid[x - 1] && grid[x - 1][y - 1]) {
      ret.push(grid[x - 1][y - 1])
    }

    // Southeast
    if (grid[x + 1] && grid[x + 1][y - 1]) {
      ret.push(grid[x + 1][y - 1])
    }

    // Northwest
    if (grid[x - 1] && grid[x - 1][y + 1]) {
      ret.push(grid[x - 1][y + 1])
    }

    // Northeast
    if (grid[x + 1] && grid[x + 1][y + 1]) {
      ret.push(grid[x + 1][y + 1])
    }

    return ret
  }

  /** @type {() => string} */
  toString(): string {
    const graphString = []
    const nodes = this.grid // when using grid
    let rowDebug: number[], row: GridNode[], y: number, l: number
    for (let x = 0, len = nodes.length; x < len; x++) {
      rowDebug = []
      row = nodes[x]
      for (y = 0, l = row.length; y < l; y++) {
        rowDebug.push(row[y].weight)
      }
      graphString.push(rowDebug.join(' '))
    }
    return graphString.join('\n')
  }
}
