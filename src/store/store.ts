import { create } from 'zustand'
import type { Path, Position, ScenarioData, Store } from '@/types'
import { selectCharacter, selectCharacters, selectPath } from './selectors'
import { initTerrain, initCharacters } from './helpers'
import { wait } from '@/utils'
import { CHARACTER_MOVE_DELAY_SECONDS } from '@/config'

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
      await wait(CHARACTER_MOVE_DELAY_SECONDS * 1000)
    }
  }
}))

export { useStore }
