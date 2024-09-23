export const TERRAIN = {
  '.': { movementCost: 100, name: 'Grass' },
  w: { movementCost: 0, name: 'Water' },
  f: { movementCost: 200, name: 'Forest' }
} as const

export const TILE_DATA_TERRAIN = {
  '.': { id: 'grass', x: 22, y: 3 },
  w: { id: 'water', x: 10, y: 12 },
  f: { id: 'forest', x: 31, y: 12 }
}

export const TILE_DATA_EDGES = {
  waterSE: { x: 9, y: 11 },
  waterSW: { x: 11, y: 11 },
  waterNE: { x: 9, y: 13 },
  waterNW: { x: 11, y: 13 },
  waterE: { x: 9, y: 12 },
  waterW: { x: 11, y: 12 },
  waterN: { x: 10, y: 13 },
  waterS: { x: 10, y: 11 },
  waterWSWS: { x: 10, y: 10 },
  waterWNWN: { x: 10, y: 9 },
  waterNNEE: { x: 11, y: 9 },
  waterESES: { x: 11, y: 10 }
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
