import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useCharactersList, useGrid } from '@/store'
import Svg from '@/components/Svg'
import Background from '@/components/Background'
import Tiles from '@/components/Tiles'
import Tile from '@/components/Tile'
import GridLines from '@/components/GridLines'
import CharacterTiles from '@/components/CharacterTiles'
import CharacterTile from '@/components/CharacterTile'
import { map2D } from '@/utils'
import { ScenarioData } from '@/types'
import { TILE_CSS } from '@/config'
import useInit from './useInit'

const tileCssSize: [number, number] = [TILE_CSS.WIDTH, TILE_CSS.HEIGHT]

type ScenarioProps = {
  scenarioData: ScenarioData
}

function Scenario({ scenarioData }: ScenarioProps) {
  useInit(scenarioData)
  const grid = useGrid()
  const characters = useCharactersList()

  return (
    <TransformWrapper initialPositionX={0} initialPositionY={0}>
      <TransformComponent wrapperStyle={{ height: '100%', width: '100%' }}>
        <Svg tileCssSize={tileCssSize}>
          <Background />
          <Tiles>
            {map2D(grid, (terrainSymbol, x, y) => (
              <Tile
                key={`${x}-${y}`}
                terrainSymbol={terrainSymbol}
                x={x}
                y={y}
              ></Tile>
            ))}
          </Tiles>
          <GridLines />
          <CharacterTiles>
            {characters.map((char) => (
              <CharacterTile
                key={char.id}
                x={char.position[0]}
                y={char.position[1]}
                owner={char.owner}
              />
            ))}
          </CharacterTiles>
        </Svg>
      </TransformComponent>
    </TransformWrapper>
  )
}

export default Scenario
