import { z } from 'zod'

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

const OwnerSchema = z.enum(['ai', 'player'])
export type Owner = z.infer<typeof OwnerSchema>

const PositionSchema = z.tuple([
  z.number().int().nonnegative(),
  z.number().int().nonnegative()
])
export type Position = z.infer<typeof PositionSchema>

const CharacterDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: PositionSchema,
  owner: OwnerSchema
})
export type CharacterData = z.infer<typeof CharacterDataSchema>

export const CharactersDataSchema = z.array(CharacterDataSchema)

export const GridDataSchema = z.array(z.string())

export const ScenarioDataScema = z.object({
  name: z.string(),
  grid: GridDataSchema,
  characters: CharactersDataSchema
})
export type ScenarioData = z.infer<typeof ScenarioDataScema>
