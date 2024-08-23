import { create } from 'zustand'
import { initTerrain, initCharacters } from './helpers'
import { wait } from '@/utils'
import type { Character, Path, Position, ScenarioData, Store } from '@/types'

const useStore = create<Store>((set, get) => ({
  name: '',
  grid: [[]],
  characters: new Map(),
  init: (scenarioData: ScenarioData) =>
    set(() => ({
      name: scenarioData.name,
      grid: initTerrain(scenarioData.grid),
      characters: initCharacters(scenarioData.characters)
    })),
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
    }),
  setPath: (id: string, path: Path) => {
    set((state) => {
      const char = selectCharacter(state, id)
      if (!char) return state
      return {
        characters: new Map(selectCharacters(state)).set(id, {
          ...char,
          path
        })
      }
    })
  },
  executePath: async (id: string) => {
    const char = selectCharacter(get(), id)
    if (!char) return
    const path = selectPath(get(), id)
    if (!path) return
    for (const pathSegment of path) {
      get().setPosition(id, pathSegment.position)
      await wait(1000)
    }
  }
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

useStore.getState().setPath('pc-1', [
  { pathCost: 0, position: [0, 1] },
  { pathCost: 0, position: [1, 1] },
  { pathCost: 0, position: [1, 2] }
])
useStore.getState().executePath('pc-1')

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
