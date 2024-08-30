import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useCharactersList, useGrid } from '@/store'
import Svg from '@/components/Svg'
import Background from '@/components/Background'
import Tiles from '@/components/Tiles'
import Tile from '@/components/Tile'
import GridLines from '@/components/GridLines'
import CharacterTiles from '@/components/CharacterTiles'
import CharacterTile from '@/components/CharacterTile'
import CharacterInfoBox from '@/components/CharacterInfoBox'
import { map2D } from '@/utils'
import { ScenarioData } from '@/types'
import { TILE_CSS } from '@/config'
import useInit from './useInit'
import useInitialPosition from './useInitialPosition'
import useHoveredCharacter from './useHoveredCharacter'

const tileCssSize: [number, number] = [TILE_CSS.WIDTH, TILE_CSS.HEIGHT]

type ScenarioProps = {
  scenarioData: ScenarioData
}

function Scenario({ scenarioData }: ScenarioProps) {
  const isInitialized = useInit(scenarioData)
  const grid = useGrid()
  const characters = useCharactersList()
  const [initialX, initialY] = useInitialPosition()
  const { setHoveredCharacterId, clearHoveredCharacterId, hoveredCharacter } =
    useHoveredCharacter()
  const hasHoveredCharacter = !!hoveredCharacter

  function handleMouseEnterCharacter(characterId: string): void {
    setHoveredCharacterId(characterId)
  }

  function handleMouseLeaveCharacter(): void {
    clearHoveredCharacterId()
  }

  if (!isInitialized) {
    return <div>Waiting to initialize scenario</div>
  }

  return (
    <div className="relative h-full">
      {hasHoveredCharacter && <CharacterInfoBox character={hoveredCharacter} />}
      <TransformWrapper
        initialPositionX={initialX}
        initialPositionY={initialY}
        limitToBounds={false}
        minScale={0.5}
      >
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
                  id={char.id}
                  x={char.position[0]}
                  y={char.position[1]}
                  owner={char.owner}
                  onMouseEnter={handleMouseEnterCharacter}
                  onMouseLeave={handleMouseLeaveCharacter}
                />
              ))}
            </CharacterTiles>
          </Svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  )
}

export default Scenario
