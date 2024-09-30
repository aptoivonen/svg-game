import { memo } from 'react'
import { TerrainSymbol } from '@/types'
import { TILE_DATA_TERRAIN, TILE_IMAGE_SIZE } from '@/config'
import { useImageProtoId } from './Tiles'

type TerrainTileProps = {
  x: number
  y: number
  terrainSymbol: TerrainSymbol
}

function TerrainTile({ x, y, terrainSymbol }: TerrainTileProps) {
  const imageProtoId = useImageProtoId()
  const imageId = `#${imageProtoId}`
  const clipPath = `url(#${TILE_DATA_TERRAIN[terrainSymbol].id})`
  const iconX = TILE_DATA_TERRAIN[terrainSymbol].x
  const iconY = TILE_DATA_TERRAIN[terrainSymbol].y

  const calcX = (x - iconX) * TILE_IMAGE_SIZE
  const calcY = (y - iconY) * TILE_IMAGE_SIZE

  return (
    <use
      href={imageId}
      clipPath={clipPath}
      x={calcX}
      y={calcY}
      id={`terrain-tile-${x}-${y}`}
      width={TILE_IMAGE_SIZE}
      height={TILE_IMAGE_SIZE}
    />
  )
}

export default memo(TerrainTile)
