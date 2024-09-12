import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import { useAiCharactersList, useGrid, usePlayerCharactersList } from '@/store'
import Svg from '@/components/Svg'
import Background from '@/components/Background'
import Tiles from '@/components/Tiles'
import Tile from '@/components/Tile'
import GridLines from '@/components/GridLines'
import CharacterTiles from '@/components/CharacterTiles'
import CharacterTile from '@/components/CharacterTile'
import CharacterInfoBox from '@/components/CharacterInfoBox'
import PathSegments from '@/components/PathSegments'
import PathSegment from '@/components/PathSegment'
import SelectedCharacterPanel from '@/components/SelectedCharacterPanel'
import { map2D } from '@/utils'
import { ScenarioData } from '@/types'
import { TILE_CSS, DEBUG } from '@/config'
import useInit from './useInit'
import useInitialPosition from './useInitialPosition'
import pathToIdPath from './pathToIdPath'
import useHighlightedCharacter from './useHighlightedCharacter'

const tileCssSize: [number, number] = [TILE_CSS.WIDTH, TILE_CSS.HEIGHT]

type ScenarioProps = {
  scenarioData: ScenarioData
}

function Scenario({ scenarioData }: ScenarioProps) {
  const isInitialized = useInit(scenarioData)
  const grid = useGrid()
  const playerCharacters = usePlayerCharactersList()
  const aiCharacters = useAiCharactersList()
  const [initialX, initialY] = useInitialPosition()
  const [setHoveredCharacterId, clearHoveredCharacterId, hoveredCharacter] =
    useHighlightedCharacter()
  const hasHoveredCharacter = !!hoveredCharacter
  const [setSelectedCharacterId, clearSelectedCharacterId, selectedCharacter] =
    useHighlightedCharacter()
  const hasSelectedCharacter = !!selectedCharacter

  function handleMouseEnterCharacter(characterId: string): void {
    setHoveredCharacterId(characterId)
  }

  function handleMouseLeaveCharacter(): void {
    clearHoveredCharacterId()
  }

  function handleClickCharacter(characterId: string): void {
    if (selectedCharacter?.id === characterId) {
      clearSelectedCharacterId()
      return
    }
    setSelectedCharacterId(characterId)
  }

  function handleClickAiCharacter(characterId: string): void {
    console.log('Click ai character ' + characterId)
  }

  if (!isInitialized) {
    return <div>Waiting to initialize scenario</div>
  }

  return (
    <div className="relative h-full">
      {hasHoveredCharacter && <CharacterInfoBox character={hoveredCharacter} />}
      {hasSelectedCharacter && (
        <SelectedCharacterPanel character={selectedCharacter} />
      )}
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
            {DEBUG && (
              <>
                <PathSegments>
                  {playerCharacters
                    .map(pathToIdPath)
                    .flat()
                    .map((pathSegment) => (
                      <PathSegment
                        key={pathSegment.id}
                        x={pathSegment.position[0]}
                        y={pathSegment.position[1]}
                      />
                    ))}
                </PathSegments>
                <PathSegments>
                  {aiCharacters
                    .map(pathToIdPath)
                    .flat()
                    .map((pathSegment) => (
                      <PathSegment
                        key={pathSegment.id}
                        x={pathSegment.position[0]}
                        y={pathSegment.position[1]}
                      />
                    ))}
                </PathSegments>
              </>
            )}
            <CharacterTiles>
              {playerCharacters.map((char) => (
                <CharacterTile
                  key={char.id}
                  id={char.id}
                  x={char.position[0]}
                  y={char.position[1]}
                  owner={char.owner}
                  onMouseEnter={handleMouseEnterCharacter}
                  onMouseLeave={handleMouseLeaveCharacter}
                  onClick={handleClickCharacter}
                />
              ))}
            </CharacterTiles>
            <CharacterTiles>
              {aiCharacters.map((char) => (
                <CharacterTile
                  key={char.id}
                  id={char.id}
                  x={char.position[0]}
                  y={char.position[1]}
                  owner={char.owner}
                  onMouseEnter={handleMouseEnterCharacter}
                  onMouseLeave={handleMouseLeaveCharacter}
                  onClick={handleClickAiCharacter}
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
