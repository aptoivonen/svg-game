import { create } from 'zustand'
import { initTerrain, initCharacters } from './helpers'
import type { Store } from '@/types'
import scenario from '@/data/scenario1.json'

const useStore = create<Store>((set) => ({
  grid: initTerrain(scenario.grid),
  characters: initCharacters(scenario.characters),
  setGrid: () => set((state) => state)
}))

const selectGrid = (state: Store) => state.grid
const selectGridWidth = (state: Store) => selectGrid(state)[0].length
const selectGridHeight = (state: Store) => selectGrid(state).length

const useGrid = () => useStore(selectGrid)
const useGridWidth = () => useStore(selectGridWidth)
const useGridHeight = () => useStore(selectGridHeight)

export { useStore, useGrid, useGridWidth, useGridHeight }
