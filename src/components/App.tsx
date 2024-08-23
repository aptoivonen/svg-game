import { useCharactersList, useGrid } from '@/store'
import Svg from '@/components/Svg'
import Background from '@/components/Background'
import Tiles from '@/components/Tiles'
import Tile from '@/components/Tile'
import GridLines from '@/components/GridLines'
import CharacterTiles from '@/components/CharacterTiles'
import CharacterTile from '@/components/CharacterTile'
import { map2D } from '@/utils'

const TILE_CSS = {
  WIDTH: 40,
  HEIGHT: 40
}

const tileCssSize: [number, number] = [TILE_CSS.WIDTH, TILE_CSS.HEIGHT]

function App() {
  const grid = useGrid()
  const characters = useCharactersList()

  const tileUseId = 'tileProto'
  const characterUseId = 'characterProto'

  return (
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
  )
}

export default App
