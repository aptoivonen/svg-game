import { TILE_DATA_TERRAIN_EDGES } from '@/config'
import { getGridHeight, getGridWidth, getTile } from '@/store'
import { TerrainSymbol } from '@/types'

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
  const isLand = !isWater(getTile(x, y, grid))

  // check if water or 2 opposite neighbors are water while this tile is land => skip finding edge icon
  if (
    !isLand ||
    (isLand && hasTwoOppositeWaterNeighbors(x, y, terrainSymbol, grid))
  ) {
    return null
  }

  // check if there's water in 4-neighborhood => get edge icon
  return getWaterEdgeIcon(x, y, grid)
}

function hasTwoOppositeWaterNeighbors(
  x: number,
  y: number,
  terrainSymbol: TerrainSymbol,
  grid: TerrainSymbol[][]
): boolean {
  const gridWidth = getGridWidth(grid)
  const gridHeight = getGridHeight(grid)

  const hasNorthSouthWaterNeighbors =
    !(y === 0 || y === gridHeight - 1) &&
    isWater(getTile(x, y - 1, grid)) &&
    isWater(getTile(x, y + 1, grid))
  const hasWestEastWaterNeighbors =
    !(x === 0 || x === gridWidth - 1) &&
    isWater(getTile(x - 1, y, grid)) &&
    isWater(getTile(x + 1, y, grid))

  return hasNorthSouthWaterNeighbors || hasWestEastWaterNeighbors
}

function getWaterEdgeIcon(
  x: number,
  y: number,
  grid: TerrainSymbol[][]
): { x: number; y: number; id: string } | null {
  const gridWidth = getGridWidth(grid)
  const gridHeight = getGridHeight(grid)

  const hasWaterInWest = !(x === 0) && isWater(getTile(x - 1, y, grid))
  const hasWaterInEast =
    !(x === gridWidth - 1) && isWater(getTile(x + 1, y, grid))
  const hasWaterInNorth = !(y === 0) && isWater(getTile(x, y - 1, grid))
  const hasWaterInSouth =
    !(y === gridHeight - 1) && isWater(getTile(x, y + 1, grid))
  const hasWaterInNorthWest =
    !(x === 0 || y === 0) && isWater(getTile(x - 1, y - 1, grid))
  const hasWaterInNorthEast =
    !(x === gridWidth - 1 || y === 0) && isWater(getTile(x + 1, y - 1, grid))
  const hasWaterInSouthEast =
    !(x === gridWidth - 1 || y === gridHeight - 1) &&
    isWater(getTile(x + 1, y + 1, grid))
  const hasWaterInSouthWest =
    !(x === 0 || y === gridHeight - 1) && isWater(getTile(x - 1, y + 1, grid))
  // overlay with water in three quarters
  if (hasWaterInNorth && hasWaterInWest)
    return { ...TILE_DATA_TERRAIN_EDGES['waterWNWN'], id: 'waterWNWN' }
  if (hasWaterInSouth && hasWaterInWest)
    return { ...TILE_DATA_TERRAIN_EDGES['waterWSWS'], id: 'waterWSWS' }
  if (hasWaterInNorth && hasWaterInEast)
    return { ...TILE_DATA_TERRAIN_EDGES['waterNNEE'], id: 'waterNNEE' }
  if (hasWaterInSouth && hasWaterInEast)
    return { ...TILE_DATA_TERRAIN_EDGES['waterESES'], id: 'waterESES' }
  // overlay with water in two quarters
  if (hasWaterInSouth)
    return { ...TILE_DATA_TERRAIN_EDGES['waterS'], id: 'waterS' }
  if (hasWaterInNorth)
    return { ...TILE_DATA_TERRAIN_EDGES['waterN'], id: 'waterN' }
  if (hasWaterInWest)
    return { ...TILE_DATA_TERRAIN_EDGES['waterW'], id: 'waterW' }
  if (hasWaterInEast)
    return { ...TILE_DATA_TERRAIN_EDGES['waterE'], id: 'waterE' }
  // overlay with water in one quarter
  if (hasWaterInNorthWest)
    return { ...TILE_DATA_TERRAIN_EDGES['waterNW'], id: 'waterNW' }
  if (hasWaterInNorthEast)
    return { ...TILE_DATA_TERRAIN_EDGES['waterNE'], id: 'waterNE' }
  if (hasWaterInSouthWest)
    return { ...TILE_DATA_TERRAIN_EDGES['waterSW'], id: 'waterSW' }
  if (hasWaterInSouthEast)
    return { ...TILE_DATA_TERRAIN_EDGES['waterSE'], id: 'waterSE' }

  return null
}

function isWater(tile: TerrainSymbol) {
  return tile === 'w'
}
