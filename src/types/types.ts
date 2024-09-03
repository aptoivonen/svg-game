import { z } from 'zod'
import {
  OwnerSchema,
  PositionSchema,
  CharacterDataSchema,
  ScenarioDataSchema
} from './schemas'
import { TERRAIN } from '@/config'

export type Store = {
  name: string
  grid: TerrainSymbol[][]
  characters: Map<string, Character>
  init: (scenarioData: ScenarioData) => void
  setPosition: (id: string, position: Position) => void
  setPath: (id: string, path: Path) => void
  executePath: (id: string) => Promise<void>
}

export type TerrainSymbol = keyof typeof TERRAIN

export type Entity = {
  id: string
}

export type BaseCharacter = {
  name: string
  owner: Owner
}

export type Positioned = {
  position: Position
}

export type HasPath = {
  path: Path
}

export type PathSegment = {
  pathCost: number
  position: Position
}

export type Path = Array<PathSegment>

export type Character = BaseCharacter & Positioned & HasPath & Entity

export type Owner = z.infer<typeof OwnerSchema>

export type Position = z.infer<typeof PositionSchema>

export type CharacterData = z.infer<typeof CharacterDataSchema>

export type ScenarioData = z.infer<typeof ScenarioDataSchema>
