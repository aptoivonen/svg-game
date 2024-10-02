import { z } from 'zod'

export const OwnerSchema = z.enum(['ai', 'player'])

export const PositionSchema = z.tuple([
  z.number().int().nonnegative(),
  z.number().int().nonnegative()
])

export const CharacterDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  position: PositionSchema,
  owner: OwnerSchema,
  movementPoints: z.number().int().nonnegative()
})

export const CharactersDataSchema = z.array(CharacterDataSchema)

export const GridDataSchema = z.array(z.string())

export const ScenarioDataSchema = z.object({
  name: z.string(),
  grid: GridDataSchema,
  terrainFeatureGrid: GridDataSchema,
  characters: CharactersDataSchema
})
