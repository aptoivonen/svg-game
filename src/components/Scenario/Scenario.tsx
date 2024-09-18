import { useCallback } from 'react'
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch'
import {
  useAiCharactersList,
  useCharacter,
  useGrid,
  useMode,
  usePlayerCharactersList,
  useStore
} from '@/store'
import {
  Svg,
  Background,
  Tiles,
  Tile,
  GridLines,
  CharacterTiles,
  CharacterTile,
  CharacterInfoBox,
  SelectedCharacterPanel,
  CharacterPath
} from '@/components'
import { map2D } from '@/utils'
import { ScenarioData } from '@/types'
import { TILE_CSS, DEBUG } from '@/config'
import useInit from './useInit'
import useInitialPosition from './useInitialPosition'
import useHighlightedCharacter from './useHighlightedCharacter'
import useKeyboardShortcut from '@/hooks/useKeyboardShortcut'

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
  const mode = useMode()
  const selectedCharacter = useCharacter(
    mode.name === 'selectedCharacter' ? mode.characterId : ''
  )
  const selectedCharacterPath =
    mode.name === 'selectedCharacter' && selectedCharacter && mode.path
  const hasSelectedCharacter = !!selectedCharacter
  const hasSelectedCharacterPath = !!selectedCharacterPath

  const cancel = useStore((state) => state.cancel)
  const selectCharacter = useStore((state) => state.selectCharacter)
  const enterTile = useStore((state) => state.enterTile)
  const leaveTile = useStore((state) => state.leaveTile)
  const executeSelectedCharacterPath = useStore(
    (state) => state.executeSelectedCharacterPath
  )

  const onEscapePressed = useCallback(() => {
    cancel()
  }, [cancel])
  useKeyboardShortcut({ key: 'Escape', onKeyPressed: onEscapePressed })

  const handleMouseEnterCharacter = useCallback(
    (characterId: string) => {
      setHoveredCharacterId(characterId)
    },
    [setHoveredCharacterId]
  )

  const handleMouseLeaveCharacter = useCallback(() => {
    clearHoveredCharacterId()
  }, [clearHoveredCharacterId])

  const handleMouseEnterPlayerCharacter = useCallback(
    (characterId: string) => {
      handleMouseEnterCharacter(characterId)
    },
    [handleMouseEnterCharacter]
  )

  const handleMouseLeavePlayerCharacter = useCallback(() => {
    handleMouseLeaveCharacter()
  }, [handleMouseLeaveCharacter])

  const handleMouseEnterAiCharacter = useCallback(
    (characterId: string, x: number, y: number) => {
      handleMouseEnterCharacter(characterId)
      enterTile(x, y)
    },
    [handleMouseEnterCharacter, enterTile]
  )

  const handleMouseLeaveAiCharacter = useCallback(() => {
    handleMouseLeaveCharacter()
    leaveTile()
  }, [handleMouseLeaveCharacter, leaveTile])

  const handleClickPlayerCharacter = useCallback(
    (characterId: string) => {
      selectCharacter(characterId)
    },
    [selectCharacter]
  )

  const handleClickAiCharacter = useCallback(() => {
    executeSelectedCharacterPath()
  }, [executeSelectedCharacterPath])

  const handleMouseEnterTile = useCallback(
    (x: number, y: number) => {
      enterTile(x, y)
    },
    [enterTile]
  )

  const handleMouseLeaveTile = useCallback(() => {
    leaveTile()
  }, [leaveTile])

  const handleClickTile = useCallback(() => {
    executeSelectedCharacterPath()
  }, [executeSelectedCharacterPath])

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
                  onMouseEnter={handleMouseEnterTile}
                  onMouseLeave={handleMouseLeaveTile}
                  onClick={handleClickTile}
                ></Tile>
              ))}
            </Tiles>
            <GridLines />
            {DEBUG && (
              <g id="aiCharacterPaths">
                {aiCharacters.map((char) => (
                  <CharacterPath
                    key={char.id}
                    characterPosition={char.position}
                    path={char.path}
                    owner="ai"
                  />
                ))}
              </g>
            )}
            {hasSelectedCharacterPath && (
              <g id="characterPath">
                <CharacterPath
                  characterPosition={selectedCharacter.position}
                  path={selectedCharacterPath}
                />
              </g>
            )}
            <CharacterTiles>
              {playerCharacters.map((char) => (
                <CharacterTile
                  key={char.id}
                  id={char.id}
                  x={char.position[0]}
                  y={char.position[1]}
                  owner={char.owner}
                  onMouseEnter={handleMouseEnterPlayerCharacter}
                  onMouseLeave={handleMouseLeavePlayerCharacter}
                  onClick={handleClickPlayerCharacter}
                />
              ))}
              {aiCharacters.map((char) => (
                <CharacterTile
                  key={char.id}
                  id={char.id}
                  x={char.position[0]}
                  y={char.position[1]}
                  owner={char.owner}
                  onMouseEnter={handleMouseEnterAiCharacter}
                  onMouseLeave={handleMouseLeaveAiCharacter}
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
