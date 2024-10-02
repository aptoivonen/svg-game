import { TILE_IMAGE_SIZE } from '@/features/ScenarioPage/constants'
import { memo, useCallback } from 'react'

type PointerTileProps = {
  x: number
  y: number
  id: string
  onMouseEnter: (x: number, y: number) => void
  onMouseLeave: () => void
  onClick: () => void
}

function PointerTile({
  x,
  y,
  id,
  onMouseEnter,
  onMouseLeave,
  onClick
}: PointerTileProps) {
  const handleMouseEnter = useCallback(
    () => onMouseEnter(x, y),
    [onMouseEnter, x, y]
  )
  const calcX = x * TILE_IMAGE_SIZE
  const calcY = y * TILE_IMAGE_SIZE

  return (
    <rect
      id={id}
      x={calcX}
      y={calcY}
      width={TILE_IMAGE_SIZE}
      height={TILE_IMAGE_SIZE}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="fill-transparent"
    />
  )
}

export default memo(PointerTile)
