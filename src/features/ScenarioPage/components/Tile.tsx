import { memo } from 'react'
import { TerrainSymbol } from '@/types'
import { useTileSize } from './Svg'
import { TILE_DATA_TERRAIN } from '@/config'
import { useImageProtoId } from './Tiles'

type TileProps = {
  x: number
  y: number
  terrainSymbol: TerrainSymbol
  onMouseEnter: (x: number, y: number) => void
  onMouseLeave: () => void
  onClick: (x: number, y: number) => void
}

function Tile({
  x,
  y,
  terrainSymbol,
  onMouseEnter,
  onMouseLeave,
  onClick
}: TileProps) {
  const [tileWidth, tileHeight] = useTileSize()
  const imageProtoId = useImageProtoId()
  const imageId = `#${imageProtoId}`
  const clipPath = `url(#${TILE_DATA_TERRAIN[terrainSymbol].id})`
  const calcX = (x - TILE_DATA_TERRAIN[terrainSymbol].indexX) * tileWidth
  const calcY = (y - TILE_DATA_TERRAIN[terrainSymbol].indexY) * tileHeight

  function handleMouseEnter() {
    onMouseEnter(x, y)
  }

  function handleClick() {
    onClick(x, y)
  }

  return (
    <use
      href={imageId}
      clipPath={clipPath}
      x={calcX}
      y={calcY}
      width={tileWidth}
      height={tileHeight}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={handleClick}
    ></use>
  )
}

export default memo(Tile)
