import { z } from 'zod'

export type Store = {
  grid: TerrainSymbol[][]
  characters: Map<string, Character>
  setGrid: () => void
}

export type Entity = {
  id: string
}

export type TerrainSymbol = '.' | 'w' | 'f'

export type Movable = {
  position: Position
  path: Array<PathSegment> | null
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
export const CharactersDataSchema = z.array(CharacterDataSchema)

export type CharacterData = z.infer<typeof CharacterDataSchema>
