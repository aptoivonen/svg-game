import { create } from 'zustand'
import { initTerrain, initCharacters } from './helpers'
import type { Character, Path, Position, Store } from '@/types'
import scenario from '@/data/scenario1.json'

const useStore = create<Store>((set) => ({
  grid: initTerrain(scenario.grid),
  characters: initCharacters(scenario.characters),
  setPosition: (id: string, position: Position) =>
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
}))

const selectGrid = (state: Store) => state.grid
const selectGridWidth = (state: Store) => selectGrid(state)[0].length
const selectGridHeight = (state: Store) => selectGrid(state).length

const selectCharacters = (state: Store) => state.characters
const selectCharactersList: (state: Store) => Character[] = (state: Store) => [
  ...selectCharacters(state).values()
]
const selectCharacter: (state: Store, id: string) => Character | undefined = (
  state: Store,
  id: string
) => selectCharacters(state).get(id)
const selectPosition: (state: Store, id: string) => Position | null = (
  state: Store,
  id: string
) => {
  const char = selectCharacter(state, id)
  if (!char) return null
  return char.position
}
const selectPath: (state: Store, id: string) => Path | null = (
  state: Store,
  id: string
) => {
  const char = selectCharacter(state, id)
  if (!char) return null
  return char.path
}
const selectHasPath = (state: Store, id: string) => {
  const char = selectCharacter(state, id)
  if (!char) return false
  return !!char.path
}

const useGrid = () => useStore(selectGrid)
const useGridWidth = () => useStore(selectGridWidth)
const useGridHeight = () => useStore(selectGridHeight)
const useCharacters = () => useStore(selectCharacters)
const useCharactersList = () => useStore(selectCharactersList)
const useCharacter = (id: string) =>
  useStore((state) => selectCharacter(state, id))
const usePosition = (id: string) =>
  useStore((state) => selectPosition(state, id))
const usePath = (id: string) => useStore((state) => selectPath(state, id))
const useHasPath = (id: string) => useStore((state) => selectHasPath(state, id))

export {
  useStore,
  useGrid,
  useGridWidth,
  useGridHeight,
  useCharacters,
  useCharactersList,
  useCharacter,
  usePosition,
  usePath,
  useHasPath,
  selectCharacters,
  selectCharactersList,
  selectCharacter,
  selectPosition,
  selectPath,
  selectHasPath
}
