import { memo } from 'react'
import { TerrainFeatureSymbol, TerrainSymbol } from '@/types'
import { useTileSize } from '../Svg'
import {
  TILE_DATA_TERRAIN,
  TILE_DATA_TERRAIN_FEATURES,
  TILE_OFFSET
} from '@/config'
import { useImageProtoId } from '../Tiles'
import calculateTerrainEdgeIndeces from './calculateTerrainEdgeIndeces'

type TileProps = {
  x: number
  y: number
  terrainSymbol: TerrainSymbol
  terrainFeatureSymbol: TerrainFeatureSymbol
  grid: TerrainSymbol[][]
}

function Tile({ x, y, terrainSymbol, terrainFeatureSymbol, grid }: TileProps) {
  const [tileWidth, tileHeight] = useTileSize()
  const imageProtoId = useImageProtoId()
  const imageId = `#${imageProtoId}`
  const clipPath = `url(#${TILE_DATA_TERRAIN[terrainSymbol].id})`
  const iconX = TILE_DATA_TERRAIN[terrainSymbol].x
  const iconY = TILE_DATA_TERRAIN[terrainSymbol].y
  const offset = TILE_OFFSET

  const calcX = (x - iconX) * tileWidth + offset * x
  const calcY = (y - iconY) * tileHeight + offset * y
  const terrainEdge = calculateTerrainEdgeIndeces({
    x,
    y,
    terrainSymbol,
    grid
  })

  const hasTerrainEdge = !!terrainEdge
  const {
    x: terrainEdgeX,
    y: terrainEdgeY,
    id: terrainEdgeId
  } = terrainEdge ?? { x: 0, y: 0, id: '' }
  const edgeClipPath = `url(#${terrainEdgeId})`
  const calcEdgeX = (x - terrainEdgeX) * tileWidth + offset * x
  const calcEdgeY = (y - terrainEdgeY) * tileWidth + offset * y

  const hasTerrainFeature =
    TILE_DATA_TERRAIN_FEATURES[terrainFeatureSymbol].id !== ''
  const {
    x: terrainFeatureX,
    y: terrainFeatureY,
    id: terrainFeatureId
  } = TILE_DATA_TERRAIN_FEATURES[terrainFeatureSymbol]
  const calcTerrainFeatureX = (x - terrainFeatureX) * tileWidth + offset * x
  const calcTerrainFeatureY = (y - terrainFeatureY) * tileWidth + offset * y
  const terrainFeatureClipPath = `url(#${terrainFeatureId})`

  return (
    <>
      <use
        href={imageId}
        clipPath={clipPath}
        x={calcX}
        y={calcY}
        width={tileWidth}
        height={tileHeight}
      />
      {hasTerrainEdge && (
        <use
          href={imageId}
          clipPath={edgeClipPath}
          x={calcEdgeX}
          y={calcEdgeY}
          width={tileWidth}
          height={tileHeight}
        />
      )}
      {hasTerrainFeature && (
        <use
          href={imageId}
          clipPath={terrainFeatureClipPath}
          x={calcTerrainFeatureX}
          y={calcTerrainFeatureY}
          width={tileWidth}
          height={tileHeight}
        />
      )}
    </>
  )
}

export default memo(Tile)
