import type { Character, Path, Position, Store } from '@/types'
import { useStore } from './store'

export const selectGrid = (state: Store) => state.grid
export const selectGridWidth = (state: Store) => selectGrid(state)[0].length
export const selectGridHeight = (state: Store) => selectGrid(state).length

export const selectCharacters = (state: Store) => state.characters
export const selectCharactersList: (state: Store) => Character[] = (
  state: Store
) => [...selectCharacters(state).values()]
export const selectCharacter: (
  state: Store,
  id: string
) => Character | undefined = (state: Store, id: string) =>
  selectCharacters(state).get(id)
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

export const useGrid = () => useStore(selectGrid)
export const useGridWidth = () => useStore(selectGridWidth)
export const useGridHeight = () => useStore(selectGridHeight)
export const useCharacters = () => useStore(selectCharacters)
export const useCharactersList = () => useStore(selectCharactersList)
export const useCharacter = (id: string) =>
  useStore((state) => selectCharacter(state, id))
export const usePosition = (id: string) =>
  useStore((state) => selectPosition(state, id))
export const usePath = (id: string) =>
  useStore((state) => selectPath(state, id))
export const useHasPath = (id: string) =>
  useStore((state) => selectHasPath(state, id))
