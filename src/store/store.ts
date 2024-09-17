import { create } from 'zustand'
import type { Path, Position, ScenarioData, Store } from '@/types'
import {
  selectCharacter,
  selectCharacters,
  selectCharactersList,
  selectGrid,
  selectMode,
  selectPath
} from './selectors'
import { initTerrain, initCharacters } from './helpers'
import { path, wait } from '@/utils'
import { CHARACTER_MOVE_DELAY_SECONDS } from '@/config'

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
