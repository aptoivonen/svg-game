// movementCost 0 means not passable

export const TERRAIN = {
  '.': { name: 'Grass', movementCost: 100 },
  w: { name: 'Water', movementCost: 0 },
  s: { name: 'Swamp', movementCost: 200 },
  m: { name: 'Mud', movementCost: 200 },
  a: { name: 'Sand', movementCost: 100 },
  d: { name: 'Dry Ground', movementCost: 100 },
  u: { name: 'Burrow', movementCost: 100 },
  t: { name: 'Tunnel', movementCost: 100 },
  l: { name: 'Lava', movementCost: 0 },
  b: { name: 'Burnt', movementCost: 100 },
  e: { name: 'Wheat', movementCost: 200 },
  h: { name: 'Hay', movementCost: 200 }
} as const

export const TILE_DATA_TERRAIN = {
  '.': { id: 'grass', x: 22, y: 3 },
  w: { id: 'water', x: 10, y: 12 },
  s: { id: 'swamp', x: 7, y: 27 },
  m: { id: 'mud', x: 4, y: 29 },
  a: { id: 'sand', x: 1, y: 12 },
  d: { id: 'dry', x: 16, y: 3 },
  u: { id: 'burrow', x: 25, y: 3 },
  t: { id: 'tunnel', x: 28, y: 3 },
  l: { id: 'lava', x: 16, y: 9 },
  b: { id: 'burnt', x: 19, y: 9 },
  e: { id: 'wheat', x: 1, y: 29 },
  h: { id: 'hay', x: 1, y: 23 }
}

// Optional movementCost to reset tile's movementCost
export const TERRAIN_FEATURES = {
  t: { name: 'Tree', movementCost: 0 }
} as const

export const TILE_DATA_TERRAIN_FEATURES = {
  t: { id: 'tree', x: 23, y: 18 }
}

export const TILE_DATA_TERRAIN_EDGES = {
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
