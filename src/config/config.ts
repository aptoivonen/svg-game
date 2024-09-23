export const TERRAIN = {
  '.': { movementCost: 100, name: 'Grass' },
  w: { movementCost: 0, name: 'Water' },
  f: { movementCost: 200, name: 'Forest' }
} as const

export const TILE_DATA = {
  '.': { id: 'grass', indexX: 17, indexY: 1 },
  f: { id: 'forest', indexX: 31, indexY: 12 },
  w: { id: 'water', indexX: 7, indexY: 1 }
}

/** Terrain tile size in original tile set */
export const TILE_IMAGE_SIZE = 20

export const TILESET_IMAGE_DIMENSIONS = {
  WIDTH: 640,
  HEIGHT: 780
}

/** Terrain tile visual size in css pixels */
export const TILE_CSS = {
  WIDTH: 40,
  HEIGHT: 40
}

export const CHARACTER_MOVE_DELAY_SECONDS = 0.3
