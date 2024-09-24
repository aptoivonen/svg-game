import { z } from 'zod'
import {
  OwnerSchema,
  PositionSchema,
  CharacterDataSchema,
  ScenarioDataSchema
} from './schemas'
import {
  TERRAIN,
  TERRAIN_FEATURES,
  TILE_DATA_TERRAIN_EDGE_DIFFS
} from '@/config'

export type TerrainSymbol = keyof typeof TERRAIN
export type TerrainFeatureSymbol = keyof typeof TERRAIN_FEATURES
export type EdgeKey = keyof typeof TILE_DATA_TERRAIN_EDGE_DIFFS

export type Entity = {
  id: string
}

export type BaseCharacter = {
  name: string
  owner: Owner
  movementPoints: number
  currentActionPoints: number
  currentMovementActionPoints: number
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
