export const TERRAIN = {
  '.': { movementCost: 100, name: 'Plain' },
  w: { movementCost: 0, name: 'Water' },
  f: { movementCost: 200, name: 'Forest' }
} as const

/** Terrain tile size in outer svg viewbox context */
export const TILE = {
  WIDTH: 10,
  HEIGHT: 10
}

/** Terrain tile visual size in css pixels */
export const TILE_CSS = {
  WIDTH: 40,
  HEIGHT: 40
}

export const CHARACTER_MOVE_DELAY_SECONDS = 0.3
