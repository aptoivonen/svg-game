import type { Character, TerrainSymbol } from '@/types'
import { CharactersDataSchema } from '@/types'

export function initTerrain(grid: string[]): TerrainSymbol[][] {
  return grid.map((row) => row.split('')) as TerrainSymbol[][]
}

export function initCharacters(characters: unknown[]): Map<string, Character> {
  const validatedCharacters = CharactersDataSchema.safeParse(characters)
  if (!validatedCharacters.success) {
    console.log('error parsing scenario characters')
    return new Map<string, Character>()
  }
  return new Map(
    validatedCharacters.data.map((character) => [
      character.id,
      {
        id: character.id,
        name: character.name,
        owner: character.owner,
        position: character.position,
        path: null
      }
    ])
  )
}
