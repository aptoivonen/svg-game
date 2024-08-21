export function initTerrain(grid: string[]): string[][] {
  return grid.map((row) => row.split(''))
}
