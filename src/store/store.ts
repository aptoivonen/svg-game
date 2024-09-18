import { create } from 'zustand'
import type {
  Character,
  Path,
  Position,
  ScenarioData,
  TerrainSymbol
} from '@/types'
import {
  selectCharacter,
  selectCharacters,
  selectCharactersList,
  selectGrid,
  selectMode
} from './selectors'
import { initTerrain, initCharacters, executePath } from './helpers'
import { path } from '@/utils'

export type Store = {
  name: string
  grid: TerrainSymbol[][]
  characters: Map<string, Character>
  mode: ModeState
  init: (scenarioData: ScenarioData) => void
  selectCharacter: (id: string) => void
  cancel: () => void
  leaveTile: () => void
  enterTile: (x: number, y: number) => void
  setPath: (id: string, path: Path) => void
  clearPath: (id: string) => void
  executeSelectedCharacterPath: () => Promise<void>
  executeAiCharacterPath: (id: string) => Promise<void>
}

type ModeState =
  | {
      name: 'viewing'
    }
  | {
      name: 'selectedCharacter'
      characterId: string
      tileX?: number
      tileY?: number
      path?: Path
    }
  | {
      name: 'aiTurn'
    }
  | {
      name: 'executing'
      characterId: string
    }

const useStore = create<Store>((set, get) => ({
  name: '',
  grid: [[]],
  mode: { name: 'viewing' },
  characters: new Map(),
  init: (scenarioData: ScenarioData) =>
    set(() => ({
      name: scenarioData.name,
      grid: initTerrain(scenarioData.grid),
      characters: initCharacters(scenarioData.characters)
    })),
  selectCharacter: (id: string) =>
    set((state) => {
      const mode = selectMode(state)
      const canSelectCharacter =
        mode.name === 'viewing' || mode.name === 'selectedCharacter'
      if (!canSelectCharacter) {
        return state
      }
      return { mode: { name: 'selectedCharacter', characterId: id } }
    }),
  cancel: () =>
    set((state) => {
      const mode = selectMode(state)
      const canCancel = mode.name === 'selectedCharacter'
      if (!canCancel) {
        return state
      }
      return { mode: { name: 'viewing' } }
    }),
  leaveTile: () =>
    set((state) => {
      const mode = selectMode(state)
      const canLeaveTile = mode.name === 'selectedCharacter'
      if (!canLeaveTile) {
        return state
      }
      return {
        mode: { name: 'selectedCharacter', characterId: mode.characterId }
      }
    }),
  enterTile: (x: number, y: number) =>
    set((state) => {
      const mode = selectMode(state)
      const canEnterTile = mode.name === 'selectedCharacter'
      if (!canEnterTile) {
        return state
      }
      const targetPosition: Position = [x, y]
      const characterToMove = selectCharacter(state, mode.characterId)
      if (!characterToMove) {
        return state
      }
      const grid = selectGrid(state)
      const charactersList = selectCharactersList(state)
      const characterPath = path({
        targetPosition,
        characterToMove,
        grid,
        charactersList
      })
      return {
        mode: {
          name: 'selectedCharacter',
          characterId: mode.characterId,
          tileX: x,
          tileY: y,
          path: characterPath
        }
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
  clearPath: (id: string) => {
    set((state) => {
      const char = selectCharacter(state, id)
      if (!char) return state
      return {
        characters: new Map(selectCharacters(state)).set(id, {
          ...char,
          path: null
        })
      }
    })
  },
  executeSelectedCharacterPath: async () => {
    const mode = selectMode(get())
    const canExecutePath = mode.name === 'selectedCharacter'
    if (!canExecutePath) {
      return
    }
    const { characterId } = mode
    const selectedCharacterPath = mode.path
    if (!selectedCharacterPath) {
      return
    }
    set(() => {
      return { mode: { name: 'executing', characterId } }
    })
    get().setPath(characterId, selectedCharacterPath)
    await executePath(characterId, get, set)
    set(() => {
      return { mode: { name: 'selectedCharacter', characterId } }
    })
  },
  executeAiCharacterPath: async (id: string) => {
    const mode = selectMode(get())
    const canExecutePath = mode.name === 'aiTurn'
    if (!canExecutePath) {
      return
    }
    executePath(id, get, set)
  }
}))

export { useStore }
