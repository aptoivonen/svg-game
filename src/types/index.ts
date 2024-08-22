export type Store = {
  grid: TerrainSymbol[][]
  setGrid: () => void
}

export type Entity = {
  id: string
}

export type TerrainSymbol = '.' | 'w' | 'f'

export type Owner = 'ai' | 'player'

export type Position = [number, number]

/** Character info that comes from json */
export type CharacterData = {
  name: string
  position: Position
  owner: Owner
} & Entity

export type Movable = {
  position: Position
  path: Array<PathSegment>
}

export type PathSegment = {
  pathCost: number
  position: Position
}

export type Character = {
  name: string
  owner: Owner
} & Movable &
  Entity
