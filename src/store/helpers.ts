import type { Character, Position, TerrainSymbol } from '@/types'
import { CharactersDataSchema } from '@/types'
import { selectCharacter, selectCharacters, selectPath } from './selectors'
import { wait } from '@/utils'
import { CHARACTER_MOVE_DELAY_SECONDS } from '@/config'
import { Store } from './store'

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

export async function executePath(
  id: string,
  get: () => Store,
  set: (
    partial:
      | Store
      | Partial<Store>
      | ((state: Store) => Store | Partial<Store>),
    replace?: boolean | undefined
  ) => void
) {
  const char = selectCharacter(get(), id)
  if (!char) {
    return
  }
  const path = selectPath(get(), id)
  if (!path) {
    return
  }

  let remainingPath = path
  while (remainingPath.length > 0) {
    const step = remainingPath[0]

    remainingPath = remainingPath.slice(1).map((pathSegment) => ({
      pathCost: pathSegment.pathCost - step.pathCost,
      position: pathSegment.position
    }))
    get().setPath(id, remainingPath)
    await setPosition(id, step.position, set)
  }

  get().clearPath(id)
}

async function setPosition(
  id: string,
  position: Position,
  set: (
    partial:
      | Store
      | Partial<Store>
      | ((state: Store) => Store | Partial<Store>),
    replace?: boolean | undefined
  ) => void
) {
  set((state) => {
    const char = selectCharacter(state, id)
    if (!char) return state
    return {
      characters: new Map(selectCharacters(state)).set(id, {
        ...char,
        position
      })
    }
  })
  await wait(CHARACTER_MOVE_DELAY_SECONDS * 1000)
}
