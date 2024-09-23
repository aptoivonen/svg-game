export const TERRAIN = {
  '.': { movementCost: 100, name: 'Grass' },
  w: { movementCost: 0, name: 'Water' },
  f: { movementCost: 200, name: 'Forest' }
} as const

export const TILE_DATA = {
  '.': { id: 'grass', indexX: 22, indexY: 3 },
  w: { id: 'water', indexX: 10, indexY: 12 },
  f: { id: 'forest', indexX: 31, indexY: 12 }
}

/** Terrain tile size in original tile set */
export const TILE_IMAGE_SIZE = 32

export const TILESET_IMAGE_DIMENSIONS = {
  WIDTH: 1024,
  HEIGHT: 1024
}

/** Terrain tile visual size in css pixels */
export const TILE_CSS = {
  WIDTH: 40,
  HEIGHT: 40
}

export const CHARACTER_MOVE_DELAY_SECONDS = 0.3
