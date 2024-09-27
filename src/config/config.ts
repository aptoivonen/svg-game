// movementCost 0 means not passable
export const TERRAIN = {
  '.': { name: 'Grass', movementCost: 100 },
  w: { name: 'Water', movementCost: 0 },
  s: { name: 'Swamp', movementCost: 200 },
  m: { name: 'Mud', movementCost: 200 },
  a: { name: 'Sand', movementCost: 100 },
  d: { name: 'Dry Ground', movementCost: 100 },
  u: { name: 'Cavern Floor', movementCost: 100 },
  t: { name: 'Tunnel Floor', movementCost: 100 },
  l: { name: 'Lava', movementCost: 0 },
  b: { name: 'Burnt', movementCost: 100 },
  e: { name: 'Wheat', movementCost: 200 },
  h: { name: 'Hay', movementCost: 200 }
} as const

// edge level denotes which terrain has priority of 'encrouching' on neighboring tiles
export const TILE_DATA_TERRAIN = {
  '.': { id: 'grass', x: 22, y: 3, edgeLevel: 0 },
  w: { id: 'water', x: 10, y: 12, edgeLevel: 100 },
  s: { id: 'swamp', x: 7, y: 27, edgeLevel: 60 },
  m: { id: 'mud', x: 4, y: 29, edgeLevel: 65 },
  a: { id: 'sand', x: 1, y: 12, edgeLevel: 1 },
  d: { id: 'dry', x: 16, y: 3, edgeLevel: 2 },
  u: { id: 'cavernFloor', x: 25, y: 3, edgeLevel: 95 },
  t: { id: 'tunnelFloor', x: 28, y: 3, edgeLevel: 93 },
  l: { id: 'lava', x: 16, y: 9, edgeLevel: 70 },
  b: { id: 'burnt', x: 19, y: 9, edgeLevel: 3 },
  e: { id: 'wheat', x: 1, y: 29, edgeLevel: 90 },
  h: { id: 'hay', x: 1, y: 23, edgeLevel: 80 }
}

// Optional blocksMovement
export const TERRAIN_FEATURES = {
  '.': { name: null },
  t: { name: 'Tree', blocksMovement: true }
} as const

// '.' means no feature on tile
export const TILE_DATA_TERRAIN_FEATURES = {
  '.': { id: '', x: 0, y: 0 },
  t: { id: 'tree', x: 23, y: 18 }
}

export const TILE_DATA_TERRAIN_EDGE_DIFFS = {
  SE: { dx: -1, dy: -1 },
  SW: { dx: 1, dy: -1 },
  NE: { dx: -1, dy: 1 },
  NW: { dx: 1, dy: 1 },
  E: { dx: -1, dy: 0 },
  W: { dx: 1, dy: 0 },
  N: { dx: 0, dy: 1 },
  S: { dx: 0, dy: -1 },
  WSWS: { dx: 0, dy: -2 },
  WNWN: { dx: 0, dy: -3 },
  NNEE: { dx: 1, dy: -3 },
  ESES: { dx: 1, dy: -2 }
} as const

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
