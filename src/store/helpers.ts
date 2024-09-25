import type {
  Character,
  Position,
  TerrainFeatureSymbol,
  TerrainSymbol
} from '@/types'
import { CharactersDataSchema } from '@/types'
import { selectCharacter, selectCharacters, selectPath } from './selectors'
import { wait } from '@/utils'
import { CHARACTER_MOVE_DELAY_SECONDS } from '@/config'
import { Store } from './store'

type Get = () => Store
type Set = (
  partial: Store | Partial<Store> | ((state: Store) => Store | Partial<Store>),
  replace?: boolean | undefined
) => void

export function initTerrain(grid: string[]): TerrainSymbol[][] {
  return grid.map((row) => row.split('')) as TerrainSymbol[][]
}

export function initTerrainFeatureGrid(
  terrainFeatureGrid: string[]
): TerrainFeatureSymbol[][] {
  return terrainFeatureGrid.map((row) =>
    row.split('')
  ) as TerrainFeatureSymbol[][]
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
        movementPoints: character.movementPoints,
        path: null,
        currentActionPoints: 3,
        currentMovementActionPoints: 2
      }
    ])
  )
}

export function setCharacterProp(
  id: string,
  prop: Partial<Character>,
  set: Set
) {
  set((state) => {
    const char = selectCharacter(state, id)
    if (!char) return state
    return {
      characters: new Map(selectCharacters(state)).set(id, {
        ...char,
        ...prop
      })
    }
  })
}

export async function executePath(id: string, get: Get, set: Set) {
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

async function setPosition(id: string, position: Position, set: Set) {
  setCharacterProp(id, { position }, set)
  await wait(CHARACTER_MOVE_DELAY_SECONDS * 1000)
}
