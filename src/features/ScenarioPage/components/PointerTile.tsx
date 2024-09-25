import { memo, useCallback } from 'react'
import { useTileSize } from './Svg'

type PointerTileProps = {
  x: number
  y: number
  onMouseEnter: (x: number, y: number) => void
  onMouseLeave: () => void
  onClick: () => void
}

function PointerTile({
  x,
  y,
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
      key={`${x}-${y}`}
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
