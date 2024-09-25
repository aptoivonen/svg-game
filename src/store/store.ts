import { create } from 'zustand'
import type {
  Character,
  Path,
  Position,
  ScenarioData,
  TerrainFeatureSymbol,
  TerrainSymbol
} from '@/types'
import {
  selectCharacter,
  selectCharactersList,
  selectGrid,
  selectMode,
  selectTerrainFeatureGrid
} from './selectors'
import {
  initTerrain,
  initCharacters,
  executePath,
  initTerrainFeatureGrid,
  setCharacterProp
} from './helpers'
import { path } from '@/utils'

export type Store = {
  name: string
  grid: TerrainSymbol[][]
  terrainFeatureGrid: TerrainFeatureSymbol[][]
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
  terrainFeatureGrid: [[]],
  mode: { name: 'viewing' },
  characters: new Map(),
  init: (scenarioData: ScenarioData) =>
    set(() => ({
      name: scenarioData.name,
      grid: initTerrain(scenarioData.grid),
      terrainFeatureGrid: initTerrainFeatureGrid(
        scenarioData.terrainFeatureGrid
      ),
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
      const terrainFeatureGrid = selectTerrainFeatureGrid(state)
      const charactersList = selectCharactersList(state)
      const maxMovementPoints = 2 * 100 * characterToMove.movementPoints
      // TODO: fix max movement points
      const characterPath = path({
        targetPosition,
        characterToMove,
        maxMovementPoints,
        grid,
        terrainFeatureGrid,
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
    setCharacterProp(id, { path }, set)
  },
  clearPath: (id: string) => {
    setCharacterProp(id, { path: null }, set)
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
    set(() => ({ mode: { name: 'executing', characterId } }))
    get().setPath(characterId, selectedCharacterPath)
    await executePath(characterId, get, set)
    set(() => ({ mode: { name: 'selectedCharacter', characterId } }))
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
