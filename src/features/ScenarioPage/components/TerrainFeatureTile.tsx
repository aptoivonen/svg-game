import { memo } from 'react'
import { TerrainFeatureSymbol } from '@/types'
import { useTileSize } from './Svg'
import { TILE_DATA_TERRAIN_FEATURES } from '@/config'
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
  const [tileWidth, tileHeight] = useTileSize()
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
  const calcTerrainFeatureX = (x - terrainFeatureX) * tileWidth
  const calcTerrainFeatureY = (y - terrainFeatureY) * tileWidth
  const terrainFeatureClipPath = `url(#${terrainFeatureId})`

  return (
    hasTerrainFeature && (
      <use
        href={imageId}
        clipPath={terrainFeatureClipPath}
        x={calcTerrainFeatureX}
        y={calcTerrainFeatureY}
        id={`feature-tile-${x}-${y}`}
        width={tileWidth}
        height={tileHeight}
      />
    )
  )
}

export default memo(TerrainFeatureTile)
