import { memo } from 'react'
import { TerrainSymbol } from '@/types'
import { useTileSize } from '../Svg'
import { TILE_DATA_TERRAIN } from '@/config'
import { useImageProtoId } from '../Tiles'
import calculateTerrainEdgeIndeces from './calculateTerrainEdgeIndeces'

type TileProps = {
  x: number
  y: number
  terrainSymbol: TerrainSymbol
  grid: TerrainSymbol[][]
  onMouseEnter: (x: number, y: number) => void
  onMouseLeave: () => void
  onClick: (x: number, y: number) => void
}

function Tile({
  x,
  y,
  terrainSymbol,
  grid,
  onMouseEnter,
  onMouseLeave,
  onClick
}: TileProps) {
  const [tileWidth, tileHeight] = useTileSize()
  const imageProtoId = useImageProtoId()
  const imageId = `#${imageProtoId}`
  const clipPath = `url(#${TILE_DATA_TERRAIN[terrainSymbol].id})`
  const iconX = TILE_DATA_TERRAIN[terrainSymbol].x
  const iconY = TILE_DATA_TERRAIN[terrainSymbol].y
  const calcX = (x - iconX) * tileWidth
  const calcY = (y - iconY) * tileHeight
  const terrainEdge = calculateTerrainEdgeIndeces({
    x,
    y,
    terrainSymbol,
    grid
  })
  const {
    x: terrainEdgeX,
    y: terrainEdgeY,
    id: terrainEdgeId
  } = terrainEdge ?? { x: 0, y: 0, id: '' }
  const edgeClipPath = `url(#${terrainEdgeId})`
  const calcEdgeX = (x - terrainEdgeX) * tileWidth
  const calcEdgeY = (y - terrainEdgeY) * tileWidth

  function handleMouseEnter() {
    onMouseEnter(x, y)
  }

  function handleClick() {
    onClick(x, y)
  }

  return (
    <>
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
      />
      {!!terrainEdge && (
        <use
          href={imageId}
          clipPath={edgeClipPath}
          x={calcEdgeX}
          y={calcEdgeY}
          width={tileWidth}
          height={tileHeight}
          className="pointer-events-none"
        />
      )}
    </>
  )
}

export default memo(Tile)
