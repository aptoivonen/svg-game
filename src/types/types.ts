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
  mode: ModeState
  init: (scenarioData: ScenarioData) => void
  selectCharacter: (id: string) => void
  cancel: () => void
  leaveTile: () => void
  enterTile: (x: number, y: number) => void
  setPosition: (id: string, position: Position) => void
  setPath: (id: string, path: Path) => void
  clearPath: (id: string) => void
  executePath: (id: string) => Promise<void>
}

export type ModeState =
  | {
      name: 'viewing'
    }
  | {
      name: 'selectedCharacter'
      characterId: string
      tileX?: number
      tileY?: number
      path?: Path
    }
  | {
      name: 'aiTurn'
    }
  | {
      name: 'executing'
      characterId: string
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
  path: Path | null
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
