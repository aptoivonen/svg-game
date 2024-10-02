import { memo } from 'react'
import { TerrainSymbol } from '@/types'
import { useImageProtoId } from '../Tiles'
import calculateTerrainEdgeIndeces from './calculateTerrainEdgeIndeces'
import { TILE_IMAGE_SIZE } from '@/features/ScenarioPage/constants'

type TerrainEdgeTileProps = {
  x: number
  y: number
  terrainSymbol: TerrainSymbol
  grid: TerrainSymbol[][]
}

function TerrainEdgeTile({ x, y, terrainSymbol, grid }: TerrainEdgeTileProps) {
  const imageProtoId = useImageProtoId()
  const imageId = `#${imageProtoId}`

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
  const calcEdgeX = (x - terrainEdgeX) * TILE_IMAGE_SIZE
  const calcEdgeY = (y - terrainEdgeY) * TILE_IMAGE_SIZE

  return (
    hasTerrainEdge && (
      <use
        href={imageId}
        clipPath={edgeClipPath}
        x={calcEdgeX}
        y={calcEdgeY}
        id={`edge-tile-${x}-${y}`}
        width={TILE_IMAGE_SIZE}
        height={TILE_IMAGE_SIZE}
      />
    )
  )
}

export default memo(TerrainEdgeTile)
