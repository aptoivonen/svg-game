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
import Characters from '@/components/Characters'
import CharacterTile from '@/components/CharacterTile'
import { map2D } from '@/utils'

const TILE = {
  WIDTH: 10,
  HEIGHT: 10
}
const SVG_WIDTH_MULTIPLIER = 4

function App() {
  const gridWidth = useGridWidth()
  const gridHeight = useGridHeight()
  const grid = useGrid()
  const characters = useCharactersList()

  const viewBoxWidth = gridWidth * TILE.WIDTH
  const viewBoxHeight = gridHeight * TILE.HEIGHT
  const outerWidth = SVG_WIDTH_MULTIPLIER * viewBoxWidth

  const tileUseId = 'tileProto'
  const characterUseId = 'characterProto'

  return (
    <Svg
      viewBoxWidth={viewBoxWidth}
      viewBoxHeight={viewBoxHeight}
      outerWidth={outerWidth}
    >
      <Background viewBoxWidth={viewBoxWidth} viewBoxHeight={viewBoxHeight} />
      <Tiles useId={tileUseId} tileWidth={TILE.WIDTH} tileHeight={TILE.HEIGHT}>
        {map2D(grid, (terrainSymbol, x, y) => (
          <Tile
            key={`${x}-${y}`}
            useId={tileUseId}
            tileWidth={TILE.WIDTH}
            tileHeight={TILE.HEIGHT}
            terrainSymbol={terrainSymbol}
            x={x}
            y={y}
          ></Tile>
        ))}
      </Tiles>
      <GridLines
        tileWidth={TILE.WIDTH}
        tileHeight={TILE.HEIGHT}
        viewBoxWidth={viewBoxWidth}
        viewBoxHeight={viewBoxHeight}
        gridWidth={gridWidth}
        gridHeight={gridHeight}
      />
      <Characters
        useId={characterUseId}
        tileWidth={TILE.WIDTH}
        tileHeight={TILE.HEIGHT}
      >
        {characters.map((char) => (
          <CharacterTile
            key={char.id}
            useId={characterUseId}
            tileWidth={TILE.WIDTH}
            tileHeight={TILE.HEIGHT}
            x={char.position[0]}
            y={char.position[1]}
          />
        ))}
      </Characters>
    </Svg>
  )
}

export default App
