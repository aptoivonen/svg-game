import { memo, useCallback } from 'react'
import { useTileSize } from './Svg'

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
  const [tileWidth, tileHeight] = useTileSize()
  const handleMouseEnter = useCallback(
    () => onMouseEnter(x, y),
    [onMouseEnter, x, y]
  )

  return (
    <rect
      id={id}
      x={x * tileWidth}
      y={y * tileHeight}
      width={tileWidth}
      height={tileHeight}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="fill-transparent"
    />
  )
}

export default memo(PointerTile)
