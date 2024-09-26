import { useCallback, useMemo } from 'react'
import {
  getTerrainFeatureSymbol,
  useAiCharactersList,
  useGrid,
  useMode,
  usePlayerCharactersList,
  useStore,
  useTerrainFeatureGrid
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
  CharacterPath,
  ZoomPanPinchWrapper,
  ZoomPanPinchComponent
} from '../components'
import { map2D } from '@/utils'
import { ScenarioData } from '@/types'
import { TILE_CSS, DEBUG } from '@/config'
import useInit from './useInit'
import useInitialPosition from './useInitialPosition'
import useHighlightedCharacter from './useHighlightedCharacter'
import useKeyboardShortcut from '@/hooks/useKeyboardShortcut'
import SelectedCharacterHighlight from '../components/SelectedCharacterHighlight'
import PointerTile from '../components/PointerTile'
import useSelectedCharacter from './useSelectedCharacter'

const tileCssSize: [number, number] = [TILE_CSS.WIDTH, TILE_CSS.HEIGHT]

type ScenarioProps = {
  scenarioData: ScenarioData
}

function Scenario({ scenarioData }: ScenarioProps) {
  const isInitialized = useInit(scenarioData)
  const grid = useGrid()
  const terrainFeatureGrid = useTerrainFeatureGrid()
  const playerCharacters = usePlayerCharactersList()
  const aiCharacters = useAiCharactersList()
  const [initialX, initialY] = useInitialPosition()
  const [setHoveredCharacterId, clearHoveredCharacterId, hoveredCharacter] =
    useHighlightedCharacter()
  const hasHoveredCharacter = !!hoveredCharacter
  const mode = useMode()
  const [selectedCharacter, selectedCharacterPath] = useSelectedCharacter()
  const hasSelectedCharacter = !!selectedCharacter
  const hasSelectedCharacterPath = !!selectedCharacterPath
  const isShowSelectedCharacterHighlight =
    hasSelectedCharacter && mode.name === 'selectedCharacter'

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

  // memoize for perf gains
  const renderTiles = useMemo(
    () =>
      map2D(grid, (terrainSymbol, x, y) => (
        <Tile
          key={`${x}-${y}`}
          terrainSymbol={terrainSymbol}
          terrainFeatureSymbol={getTerrainFeatureSymbol(
            x,
            y,
            terrainFeatureGrid
          )}
          grid={grid}
          x={x}
          y={y}
        ></Tile>
      )),
    [grid, terrainFeatureGrid]
  )

  // memoize for perf gains
  const renderPointerTiles = useMemo(
    () =>
      map2D(grid, (_, x, y) => (
        <PointerTile
          key={`${x}-${y}`}
          x={x}
          y={y}
          onMouseEnter={handleMouseEnterTile}
          onMouseLeave={handleMouseLeaveTile}
          onClick={handleClickTile}
        />
      )),
    [grid, handleMouseEnterTile, handleMouseLeaveTile, handleClickTile]
  )

  if (!isInitialized) {
    return <p className="text-white">Waiting to initialize scenario</p>
  }

  return (
    <div className="relative h-full overflow-hidden">
      {hasHoveredCharacter && <CharacterInfoBox character={hoveredCharacter} />}
      <SelectedCharacterPanel character={selectedCharacter} />
      <ZoomPanPinchWrapper
        initialPositionX={initialX}
        initialPositionY={initialY}
      >
        <ZoomPanPinchComponent>
          <Svg tileCssSize={tileCssSize}>
            <Background />
            <Tiles>{renderTiles}</Tiles>
            <GridLines />
            {DEBUG && (
              <g id="aiCharacterPaths">
                {aiCharacters.map((char) => (
                  <CharacterPath
                    key={char.id}
                    characterPosition={char.position}
                    path={char.path}
                    movementPoints={char.movementPoints}
                    currentActionPoints={char.currentActionPoints}
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
                  movementPoints={selectedCharacter.movementPoints}
                  currentActionPoints={selectedCharacter.currentActionPoints}
                />
              </g>
            )}
            {isShowSelectedCharacterHighlight && (
              <SelectedCharacterHighlight
                position={selectedCharacter.position}
              />
            )}
            <g id="pointerTiles">{renderPointerTiles}</g>
            <CharacterTiles>
              {playerCharacters.map((char) => (
                <CharacterTile
                  key={char.id}
                  character={char}
                  onMouseEnter={handleMouseEnterPlayerCharacter}
                  onMouseLeave={handleMouseLeavePlayerCharacter}
                  onClick={handleClickPlayerCharacter}
                />
              ))}
              {aiCharacters.map((char) => (
                <CharacterTile
                  key={char.id}
                  character={char}
                  onMouseEnter={handleMouseEnterAiCharacter}
                  onMouseLeave={handleMouseLeaveAiCharacter}
                  onClick={handleClickAiCharacter}
                />
              ))}
            </CharacterTiles>
          </Svg>
        </ZoomPanPinchComponent>
      </ZoomPanPinchWrapper>
    </div>
  )
}

export default Scenario
