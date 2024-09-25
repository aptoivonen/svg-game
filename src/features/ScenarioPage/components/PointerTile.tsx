import { useTileSize } from './Svg'

type PointerTileProps = {
  x: number
  y: number
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

export default function PointerTile({
  x,
  y,
  onMouseEnter,
  onMouseLeave,
  onClick
}: PointerTileProps) {
  const [tileWidth, tileHeight] = useTileSize()

  return (
    <rect
      key={`${x}-${y}`}
      x={x * tileWidth}
      y={y * tileHeight}
      width={tileWidth}
      height={tileHeight}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className="fill-transparent"
    />
  )
}
