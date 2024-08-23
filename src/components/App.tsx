import {
  useCharactersList,
  useGrid,
  useGridHeight,
  useGridWidth
} from '@/store'
import Svg from '@/components/Svg'
import Background from '@/components/Background'
import Tiles from '@/components/Tiles'
import Tile from '@/components/Tile'
import GridLines from '@/components/GridLines'
import CharacterTiles from '@/components/CharacterTiles'
import CharacterTile from '@/components/CharacterTile'
import { map2D } from '@/utils'
import { createContext, useContext, useMemo } from 'react'

const TILE = {
  WIDTH: 10,
  HEIGHT: 10
}
const TILE_CSS = {
  WIDTH: 40,
  HEIGHT: 40
}

const tileSize: [number, number] = [TILE.WIDTH, TILE.HEIGHT]
const tileCssSize: [number, number] = [TILE_CSS.WIDTH, TILE_CSS.HEIGHT]

const TileSizeContext = createContext<[number, number]>(tileSize)
export const useTileSize = () => useContext(TileSizeContext)

const ViewboxSizeContext = createContext<[number, number]>([0, 0])
export const useViewboxSize = () => useContext(ViewboxSizeContext)

function App() {
  const gridWidth = useGridWidth()
  const gridHeight = useGridHeight()
  const grid = useGrid()
  const characters = useCharactersList()

  const viewBoxWidth = gridWidth * TILE.WIDTH
  const viewBoxHeight = gridHeight * TILE.HEIGHT
  const viewBoxSize: [number, number] = useMemo(
    () => [viewBoxWidth, viewBoxHeight],
    [viewBoxWidth, viewBoxHeight]
  )

  const tileUseId = 'tileProto'
  const characterUseId = 'characterProto'

  return (
    <TileSizeContext.Provider value={tileSize}>
      <ViewboxSizeContext.Provider value={viewBoxSize}>
        <Svg tileCssSize={tileCssSize}>
          <Background />
          <Tiles useId={tileUseId}>
            {map2D(grid, (terrainSymbol, x, y) => (
              <Tile
                key={`${x}-${y}`}
                useId={tileUseId}
                terrainSymbol={terrainSymbol}
                x={x}
                y={y}
              ></Tile>
            ))}
          </Tiles>
          <GridLines />
          <CharacterTiles useId={characterUseId}>
            {characters.map((char) => (
              <CharacterTile
                key={char.id}
                useId={characterUseId}
                x={char.position[0]}
                y={char.position[1]}
                owner={char.owner}
              />
            ))}
          </CharacterTiles>
        </Svg>
      </ViewboxSizeContext.Provider>
    </TileSizeContext.Provider>
  )
}

export default App
