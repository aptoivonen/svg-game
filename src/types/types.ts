import { z } from 'zod'
import {
  OwnerSchema,
  PositionSchema,
  CharacterDataSchema,
  ScenarioDataSchema
} from './schemas'

export type Store = {
  name: string
  grid: TerrainSymbol[][]
  characters: Map<string, Character>
  init: (scenarioData: ScenarioData) => void
  setPosition: (id: string, position: Position) => void
  setPath: (id: string, path: Path) => void
  executePath: (id: string) => Promise<void>
}

export type Entity = {
  id: string
}

export type TerrainSymbol = '.' | 'w' | 'f'

export type Movable = {
  position: Position
  path: Path | null
}

export type PathSegment = {
  pathCost: number
  position: Position
}

export type Path = Array<PathSegment>

export type Character = {
  name: string
  owner: Owner
} & Movable &
  Entity

export type Owner = z.infer<typeof OwnerSchema>

export type Position = z.infer<typeof PositionSchema>

export type CharacterData = z.infer<typeof CharacterDataSchema>

export type ScenarioData = z.infer<typeof ScenarioDataSchema>
