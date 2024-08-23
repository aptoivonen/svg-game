import { TerrainSymbol } from '@/types'
import { memo } from 'react'
import { useTileSize } from '@/components/Svg'
import { useTileProtoId } from '@/components/Tiles'

const TILE_CLASSES: Record<TerrainSymbol, string> = {
  '.': 'fill-[#6bb00c]',
  f: 'fill-[#256317]',
  w: 'fill-[#358ec9]'
}
const ERROR_NO_TERRAIN_CLASS = 'fill-red-500'

type TileProps = {
  x: number
  y: number
  terrainSymbol: TerrainSymbol
}

function Tile({ x, y, terrainSymbol }: TileProps) {
  const [tileWidth, tileHeight] = useTileSize()
  const calcX = x * tileWidth
  const calcY = y * tileHeight
  const tileProtoId = useTileProtoId()
  return (
    <use
      href={`#${tileProtoId}`}
      x={calcX}
      y={calcY}
      className={TILE_CLASSES[terrainSymbol] ?? ERROR_NO_TERRAIN_CLASS}
    ></use>
  )
}

export default memo(Tile)
