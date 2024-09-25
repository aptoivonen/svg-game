import type {
  Character,
  Path,
  Position,
  TerrainFeatureSymbol,
  TerrainSymbol
} from '@/types'
import { Store, useStore } from './store'
import { createSelector } from 'reselect'

export const selectGrid = (state: Store) => state.grid
export const selectTerrainFeatureGrid = (state: Store) =>
  state.terrainFeatureGrid

export const getGridWidth = (grid: TerrainSymbol[][]) => grid[0].length
export const selectGridWidth = (state: Store) => getGridWidth(selectGrid(state))

export const getGridHeight = (grid: TerrainSymbol[][]) => grid.length
export const selectGridHeight = (state: Store) =>
  getGridHeight(selectGrid(state))

export const getTile = (x: number, y: number, grid: TerrainSymbol[][]) =>
  grid[y][x]
export const getTerrainFeature = (
  x: number,
  y: number,
  terrainFeatureGrid: TerrainFeatureSymbol[][]
) => terrainFeatureGrid[y][x]
export const getTerrainFeatureSymbol = (
  x: number,
  y: number,
  terrainFeatureGrid: TerrainFeatureSymbol[][]
) => terrainFeatureGrid[y][x]

export const selectMode = (state: Store) => state.mode

export const selectCharacters = (state: Store) => state.characters

export const selectPlayerCharacters: (state: Store) => Map<string, Character> =
  createSelector(
    [selectCharacters],
    (characters) =>
      new Map([...characters].filter(([, char]) => char.owner === 'player'))
  )

export const selectAiCharacters: (state: Store) => Map<string, Character> =
  createSelector(
    [selectCharacters],
    (characters) =>
      new Map([...characters].filter(([, char]) => char.owner === 'ai'))
  )

export const selectCharactersList: (state: Store) => Character[] =
  createSelector([selectCharacters], (characters) => [...characters.values()])

export const selectPlayerCharactersList: (state: Store) => Character[] =
  createSelector([selectPlayerCharacters], (characters) => [
    ...characters.values()
  ])

export const selectAiCharactersList: (state: Store) => Character[] =
  createSelector([selectAiCharacters], (characters) => [...characters.values()])

export const selectCharacter: (
  state: Store,
  id: string
) => Character | undefined = (state: Store, id: string) =>
  selectCharacters(state).get(id)

export const selectIsEnemy = (state: Store, id1: string, id2: string) => {
  const character1 = selectCharacter(state, id1)
  const character2 = selectCharacter(state, id2)
  const isFound = !!character1 && !!character2
  if (!isFound) return false
  return character1.owner !== character2.owner
}

export const selectPosition: (state: Store, id: string) => Position | null = (
  state: Store,
  id: string
) => {
  const char = selectCharacter(state, id)
  if (!char) return null
  return char.position
}

export const selectPath: (state: Store, id: string) => Path | null = (
  state: Store,
  id: string
) => {
  const char = selectCharacter(state, id)
  if (!char) return null
  return char.path
}

export const selectHasPath = (state: Store, id: string) => {
  const char = selectCharacter(state, id)
  if (!char) return false
  return !!char.path
}

export const getHasMovementActionPoint = (character: Character) =>
  character.currentMovementActionPoints > 0

export const getMaxMovementPoints = (character: Character) =>
  character.currentMovementActionPoints * 100 * character.movementPoints

export const useGrid = () => useStore(selectGrid)
export const useGridWidth = () => useStore(selectGridWidth)
export const useGridHeight = () => useStore(selectGridHeight)
export const useTerrainFeatureGrid = () => useStore(selectTerrainFeatureGrid)
export const useMode = () => useStore(selectMode)
export const useCharacters = () => useStore(selectCharacters)
export const usePlayerCharacters = () => useStore(selectPlayerCharacters)
export const useAiCharacters = () => useStore(selectAiCharacters)
export const useCharactersList = () => useStore(selectCharactersList)
export const usePlayerCharactersList = () =>
  useStore(selectPlayerCharactersList)
export const useAiCharactersList = () => useStore(selectAiCharactersList)
export const useCharacter = (id: string) =>
  useStore((state) => selectCharacter(state, id))
export const useIsEnemy = (id1: string, id2: string) =>
  useStore((state) => selectIsEnemy(state, id1, id2))
export const usePosition = (id: string) =>
  useStore((state) => selectPosition(state, id))
export const usePath = (id: string) =>
  useStore((state) => selectPath(state, id))
export const useHasPath = (id: string) =>
  useStore((state) => selectHasPath(state, id))
