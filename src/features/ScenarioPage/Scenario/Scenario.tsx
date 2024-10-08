import { useCallback, useMemo } from 'react'
import {
  useAiCharactersList,
  useGrid,
  useGridHeight,
  useGridWidth,
  useIsPlayerTurn,
  useMode,
  usePlayerCharactersList,
  useStore,
  useTerrainFeatureGrid
} from '@/store'
import {
  Svg,
  Background,
  Tiles,
  TerrainTile,
  TerrainEdgeTile,
  TerrainFeatureTile,
  PointerTile,
  CharacterTiles,
  CharacterTile,
  CharacterInfoBox,
  SelectedCharacterPanel,
  SelectedCharacterHighlight,
  CharacterPath,
  ZoomPanPinchWrapper,
  TriggerCenterOnSelectedCharacter,
  EndOfTurnButton
} from '../components'
import FullScreenMessage from '@/components/FullScreenMessage'
import { map2D } from '@/utils'
import { ScenarioData } from '@/types'
import { DEBUG } from '@/config'
import useInit from './useInit'
import useHighlightedCharacter from './useHighlightedCharacter'
import useKeyboardShortcut from '@/hooks/useKeyboardShortcut'
import useSelectedCharacter from './useSelectedCharacter'

type ScenarioProps = {
  scenarioData: ScenarioData
}

function Scenario({ scenarioData }: ScenarioProps) {
  const isInitialized = useInit(scenarioData)
  const grid = useGrid()
  const gridWidth = useGridWidth()
  const gridHeight = useGridHeight()
  const terrainFeatureGrid = useTerrainFeatureGrid()
  const playerCharacters = usePlayerCharactersList()
  const aiCharacters = useAiCharactersList()
  const [
    setHoveredCharacterId,
    clearHoveredCharacterId,
    hasHoveredCharacter,
    hoveredCharacter
  ] = useHighlightedCharacter()
  const mode = useMode()
  const [
    selectedCharacter,
    selectedCharacterPath,
    hasSelectedCharacter,
    hasSelectedCharacterPath
  ] = useSelectedCharacter()
  const isShowSelectedCharacterHighlight =
    hasSelectedCharacter && mode.name === 'selectedCharacter'
  const isPlayerTurn = useIsPlayerTurn()

  const cancel = useStore((state) => state.cancel)
  const selectCharacter = useStore((state) => state.selectCharacter)
  const enterTile = useStore((state) => state.enterTile)
  const leaveTile = useStore((state) => state.leaveTile)
  const executeSelectedCharacterPath = useStore(
    (state) => state.executeSelectedCharacterPath
  )
  const endPlayerTurn = useStore((state) => state.endPlayerTurn)

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

  const handleClickEndOfTurn = useCallback(() => {
    endPlayerTurn()
  }, [endPlayerTurn])

  // memoize renders for perf gains
  const renderTiles = useMemo(
    () =>
      map2D(grid, (terrainSymbol, x, y) => (
        <TerrainTile
          key={`terrain-tile-${x}-${y}`}
          terrainSymbol={terrainSymbol}
          x={x}
          y={y}
        ></TerrainTile>
      )),
    [grid]
  )

  const renderTerrainEdgeTiles = useMemo(
    () =>
      map2D(grid, (terrainSymbol, x, y) => (
        <TerrainEdgeTile
          key={`terrain-edge-tile-${x}-${y}`}
          terrainSymbol={terrainSymbol}
          grid={grid}
          x={x}
          y={y}
        ></TerrainEdgeTile>
      )),
    [grid]
  )

  const renderTerrainFeatureTiles = useMemo(
    () =>
      map2D(grid, (_, x, y) => (
        <TerrainFeatureTile
          key={`terrain-feature-tile-${x}-${y}`}
          terrainFeatureGrid={terrainFeatureGrid}
          x={x}
          y={y}
        ></TerrainFeatureTile>
      )),
    [grid, terrainFeatureGrid]
  )

  const renderPointerTiles = useMemo(
    () =>
      map2D(grid, (_, x, y) => (
        <PointerTile
          key={`${x}-${y}`}
          id={`${x}-${y}`}
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
    return <FullScreenMessage>Waiting to initialize scenario</FullScreenMessage>
  }

  return (
    <div className="relative h-full overflow-hidden">
      <ZoomPanPinchWrapper>
        <TriggerCenterOnSelectedCharacter />
        <Svg gridWidth={gridWidth} gridHeight={gridHeight}>
          <Background />
          <Tiles>
            <g id="terrain-tiles">{renderTiles}</g>
            <g id="terrain-edge-tiles">{renderTerrainEdgeTiles}</g>
            <g id="terrain-feature-tiles">{renderTerrainFeatureTiles}</g>
          </Tiles>
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
            <SelectedCharacterHighlight position={selectedCharacter.position} />
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
      </ZoomPanPinchWrapper>
      {hasHoveredCharacter && (
        <CharacterInfoBox
          className="absolute right-1 top-1"
          character={hoveredCharacter}
        />
      )}
      <SelectedCharacterPanel
        className="absolute bottom-0 left-1/2"
        character={selectedCharacter}
      />
      <EndOfTurnButton
        className="absolute bottom-1 right-1"
        onClick={handleClickEndOfTurn}
        isPlayerTurn={isPlayerTurn}
      />
    </div>
  )
}

export default Scenario
