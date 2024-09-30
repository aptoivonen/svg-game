import { memo } from 'react'
import { TerrainFeatureSymbol } from '@/types'
import { TILE_DATA_TERRAIN_FEATURES, TILE_IMAGE_SIZE } from '@/config'
import { useImageProtoId } from './Tiles'
import { getTerrainFeatureSymbol } from '@/store'

type TerrainFeatureTileProps = {
  x: number
  y: number
  terrainFeatureGrid: TerrainFeatureSymbol[][]
}

function TerrainFeatureTile({
  x,
  y,
  terrainFeatureGrid
}: TerrainFeatureTileProps) {
  const imageProtoId = useImageProtoId()
  const imageId = `#${imageProtoId}`

  const terrainFeatureSymbol = getTerrainFeatureSymbol(x, y, terrainFeatureGrid)
  const hasTerrainFeature =
    TILE_DATA_TERRAIN_FEATURES[terrainFeatureSymbol].id !== ''
  const {
    x: terrainFeatureX,
    y: terrainFeatureY,
    id: terrainFeatureId
  } = TILE_DATA_TERRAIN_FEATURES[terrainFeatureSymbol]
  const calcTerrainFeatureX = (x - terrainFeatureX) * TILE_IMAGE_SIZE
  const calcTerrainFeatureY = (y - terrainFeatureY) * TILE_IMAGE_SIZE
  const terrainFeatureClipPath = `url(#${terrainFeatureId})`

  return (
    hasTerrainFeature && (
      <use
        href={imageId}
        clipPath={terrainFeatureClipPath}
        x={calcTerrainFeatureX}
        y={calcTerrainFeatureY}
        id={`feature-tile-${x}-${y}`}
        width={TILE_IMAGE_SIZE}
        height={TILE_IMAGE_SIZE}
      />
    )
  )
}

export default memo(TerrainFeatureTile)
