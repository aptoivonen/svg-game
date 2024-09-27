import { TILE_DATA_TERRAIN, TILE_DATA_TERRAIN_EDGE_DIFFS } from '@/config'
import { getGridHeight, getGridWidth, getTile } from '@/store'
import { EdgeKey, TerrainSymbol } from '@/types'

/** Calculates tile indeces in the tileset file */
type Props = {
  x: number
  y: number
  terrainSymbol: TerrainSymbol
  grid: TerrainSymbol[][]
}

export default function calculateTerrainEdgeIndeces({
  x,
  y,
  terrainSymbol,
  grid
}: Props): { x: number; y: number; id: string } | null {
  // check if 2 opposite neighbors are higher edge level tiles => skip finding edge icon
  if (hasTwoOppositeHigherEdgeLevelNeighbors(x, y, terrainSymbol, grid))
    return null

  // check if there's higher edge level tiles in 4-neighborhood => get edge icon
  return getEdgeIcon(x, y, terrainSymbol, grid)
}

function hasTwoOppositeHigherEdgeLevelNeighbors(
  x: number,
  y: number,
  terrainSymbol: TerrainSymbol,
  grid: TerrainSymbol[][]
): boolean {
  const gridWidth = getGridWidth(grid)
  const gridHeight = getGridHeight(grid)
  const tileEdgeLevel = TILE_DATA_TERRAIN[terrainSymbol].edgeLevel

  const hasNorthSouthHigherEdgeLevelNeighbors =
    !(y === 0 || y === gridHeight - 1) &&
    hasNeighborHigherEdgeLevel(x, y - 1, tileEdgeLevel, grid) &&
    hasNeighborHigherEdgeLevel(x, y + 1, tileEdgeLevel, grid)

  const hasWestEastHigherEdgeLevelNeighbors =
    !(x === 0 || x === gridWidth - 1) &&
    hasNeighborHigherEdgeLevel(x - 1, y, tileEdgeLevel, grid) &&
    hasNeighborHigherEdgeLevel(x + 1, y, tileEdgeLevel, grid)

  return (
    hasNorthSouthHigherEdgeLevelNeighbors || hasWestEastHigherEdgeLevelNeighbors
  )
}

function getEdgeIcon(
  x: number,
  y: number,
  terrainSymbol: TerrainSymbol,
  grid: TerrainSymbol[][]
): { x: number; y: number; id: string } | null {
  const gridWidth = getGridWidth(grid)
  const gridHeight = getGridHeight(grid)
  const tileEdgeLevel = TILE_DATA_TERRAIN[terrainSymbol].edgeLevel

  const hasNeighborHigherEdgeLevelInWest =
    !(x === 0) && hasNeighborHigherEdgeLevel(x - 1, y, tileEdgeLevel, grid)
  const hasNeighborHigherEdgeLevelInEast =
    !(x === gridWidth - 1) &&
    hasNeighborHigherEdgeLevel(x + 1, y, tileEdgeLevel, grid)
  const hasNeighborHigherEdgeLevelInNorth =
    !(y === 0) && hasNeighborHigherEdgeLevel(x, y - 1, tileEdgeLevel, grid)
  const hasNeighborHigherEdgeLevelInSouth =
    !(y === gridHeight - 1) &&
    hasNeighborHigherEdgeLevel(x, y + 1, tileEdgeLevel, grid)
  const hasNeighborHigherEdgeLevelInNorthWest =
    !(x === 0 || y === 0) &&
    hasNeighborHigherEdgeLevel(x - 1, y - 1, tileEdgeLevel, grid)
  const hasNeighborHigherEdgeLevelInNorthEast =
    !(x === gridWidth - 1 || y === 0) &&
    hasNeighborHigherEdgeLevel(x + 1, y - 1, tileEdgeLevel, grid)
  const hasNeighborHigherEdgeLevelInSouthEast =
    !(x === gridWidth - 1 || y === gridHeight - 1) &&
    hasNeighborHigherEdgeLevel(x + 1, y + 1, tileEdgeLevel, grid)
  const hasNeighborHigherEdgeLevelInSouthWest =
    !(x === 0 || y === gridHeight - 1) &&
    hasNeighborHigherEdgeLevel(x - 1, y + 1, tileEdgeLevel, grid)
  // overlay with Neighbor with Higher Edge Level in three quarters
  let edgeIconIndeces: { x: number; y: number; id: string } | undefined
  if (hasNeighborHigherEdgeLevelInNorth && hasNeighborHigherEdgeLevelInWest) {
    edgeIconIndeces = getEdgeIconIndeces(x, y - 1, 'WNWN', grid)
  } else if (
    hasNeighborHigherEdgeLevelInSouth &&
    hasNeighborHigherEdgeLevelInWest
  ) {
    edgeIconIndeces = getEdgeIconIndeces(x, y + 1, 'WSWS', grid)
  } else if (
    hasNeighborHigherEdgeLevelInNorth &&
    hasNeighborHigherEdgeLevelInEast
  ) {
    edgeIconIndeces = getEdgeIconIndeces(x, y - 1, 'NNEE', grid)
  } else if (
    hasNeighborHigherEdgeLevelInSouth &&
    hasNeighborHigherEdgeLevelInEast
  ) {
    edgeIconIndeces = getEdgeIconIndeces(x, y + 1, 'ESES', grid)
  }
  // overlay with Neighbor with Higher Edge Level in two quarters
  else if (hasNeighborHigherEdgeLevelInSouth) {
    edgeIconIndeces = getEdgeIconIndeces(x, y + 1, 'S', grid)
  } else if (hasNeighborHigherEdgeLevelInNorth) {
    edgeIconIndeces = getEdgeIconIndeces(x, y - 1, 'N', grid)
  } else if (hasNeighborHigherEdgeLevelInWest) {
    edgeIconIndeces = getEdgeIconIndeces(x - 1, y, 'W', grid)
  } else if (hasNeighborHigherEdgeLevelInEast) {
    edgeIconIndeces = getEdgeIconIndeces(x + 1, y, 'E', grid)
  }
  // overlay with Neighbor with Higher Edge Level in one quarter
  else if (hasNeighborHigherEdgeLevelInNorthWest) {
    edgeIconIndeces = getEdgeIconIndeces(x - 1, y - 1, 'NW', grid)
  } else if (hasNeighborHigherEdgeLevelInNorthEast) {
    edgeIconIndeces = getEdgeIconIndeces(x + 1, y - 1, 'NE', grid)
  } else if (hasNeighborHigherEdgeLevelInSouthWest) {
    edgeIconIndeces = getEdgeIconIndeces(x - 1, y + 1, 'SW', grid)
  } else if (hasNeighborHigherEdgeLevelInSouthEast) {
    edgeIconIndeces = getEdgeIconIndeces(x + 1, y + 1, 'SE', grid)
  }

  return edgeIconIndeces ? edgeIconIndeces : null
}

function hasNeighborHigherEdgeLevel(
  neighborX: number,
  neighborY: number,
  tileEdgeLevel: number,
  grid: TerrainSymbol[][]
): boolean {
  return (
    TILE_DATA_TERRAIN[getTile(neighborX, neighborY, grid)].edgeLevel >
    tileEdgeLevel
  )
}

function getEdgeIconIndeces(
  neighborX: number,
  neighborY: number,
  edgeKey: EdgeKey,
  grid: TerrainSymbol[][]
): { x: number; y: number; id: string } {
  const { x: terrainTileX, y: terrainTileY } =
    TILE_DATA_TERRAIN[getTile(neighborX, neighborY, grid)]
  const result = {
    x: terrainTileX + TILE_DATA_TERRAIN_EDGE_DIFFS[edgeKey].dx,
    y: terrainTileY + TILE_DATA_TERRAIN_EDGE_DIFFS[edgeKey].dy,
    id: `${TILE_DATA_TERRAIN[getTile(neighborX, neighborY, grid)].id}${edgeKey}`
  }
  return result
}
