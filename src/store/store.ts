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
  getHasMovementActionPoint,
  getMaxMovementPoints,
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
  setCharacterProp,
  setSelectStartingPlayerCharacter,
  incrementNumberOfTurns
} from './helpers'
import { isEqual, last, path } from '@/utils'

export type Store = {
  name: string
  numberOfTurns: number
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
  startPlayerTurn: () => void
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
      isStartOfTurn?: boolean
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
  numberOfTurns: 0,
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

      const resultModePartialWithoutPath = {
        name: 'selectedCharacter',
        characterId: mode.characterId,
        tileX: x,
        tileY: y
      } as const

      // No movement action points left => don't show a path
      if (!getHasMovementActionPoint(characterToMove))
        return {
          mode: resultModePartialWithoutPath
        }

      const maxMovementPoints = getMaxMovementPoints(characterToMove)
      const characterPath = path({
        targetPosition,
        characterToMove,
        maxMovementPoints,
        grid,
        terrainFeatureGrid,
        charactersList
      })

      // hovering outside a path's length => don't show a path
      if (
        characterPath.length === 0 ||
        !isEqual(last(characterPath).position, [x, y])
      ) {
        return {
          mode: resultModePartialWithoutPath
        }
      }

      return {
        mode: { ...resultModePartialWithoutPath, path: characterPath }
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
  },
  startPlayerTurn: () => {
    incrementNumberOfTurns(set)
    setSelectStartingPlayerCharacter(set)
  }
}))

export { useStore }
