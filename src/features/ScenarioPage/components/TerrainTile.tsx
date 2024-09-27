import { memo } from 'react'
import { TerrainSymbol } from '@/types'
import { useTileSize } from './Svg'
import { TILE_DATA_TERRAIN } from '@/config'
import { useImageProtoId } from './Tiles'

type TerrainTileProps = {
  x: number
  y: number
  terrainSymbol: TerrainSymbol
}

function TerrainTile({ x, y, terrainSymbol }: TerrainTileProps) {
  const [tileWidth, tileHeight] = useTileSize()
  const imageProtoId = useImageProtoId()
  const imageId = `#${imageProtoId}`
  const clipPath = `url(#${TILE_DATA_TERRAIN[terrainSymbol].id})`
  const iconX = TILE_DATA_TERRAIN[terrainSymbol].x
  const iconY = TILE_DATA_TERRAIN[terrainSymbol].y

  const calcX = (x - iconX) * tileWidth
  const calcY = (y - iconY) * tileHeight

  return (
    <use
      href={imageId}
      clipPath={clipPath}
      x={calcX}
      y={calcY}
      id={`terrain-tile-${x}-${y}`}
      width={tileWidth}
      height={tileHeight}
    />
  )
}

export default memo(TerrainTile)
