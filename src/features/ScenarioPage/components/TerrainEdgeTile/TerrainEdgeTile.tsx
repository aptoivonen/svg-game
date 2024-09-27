import { memo } from 'react'
import { TerrainSymbol } from '@/types'
import { useTileSize } from '../Svg'
import { useImageProtoId } from '../Tiles'
import calculateTerrainEdgeIndeces from './calculateTerrainEdgeIndeces'
import { TILE_OFFSET } from '@/config'

type TerrainEdgeTileProps = {
  x: number
  y: number
  terrainSymbol: TerrainSymbol
  grid: TerrainSymbol[][]
}

function TerrainEdgeTile({ x, y, terrainSymbol, grid }: TerrainEdgeTileProps) {
  const [tileWidth, tileHeight] = useTileSize()
  const imageProtoId = useImageProtoId()
  const imageId = `#${imageProtoId}`
  const offset = TILE_OFFSET

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
  const calcEdgeX = (x - terrainEdgeX) * tileWidth + offset
  const calcEdgeY = (y - terrainEdgeY) * tileWidth + offset

  return (
    hasTerrainEdge && (
      <use
        href={imageId}
        clipPath={edgeClipPath}
        x={calcEdgeX}
        y={calcEdgeY}
        id={`edge-tile-${x}-${y}`}
        width={tileWidth}
        height={tileHeight}
      />
    )
  )
}

export default memo(TerrainEdgeTile)
