import type { TerrainSymbol } from '@/types'

export function initTerrain(grid: string[]): TerrainSymbol[][] {
  return grid.map((row) => row.split('')) as TerrainSymbol[][]
}
