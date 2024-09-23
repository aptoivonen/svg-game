import { Owner, Path, Position } from '@/types'
import { useTileSize } from './Svg'

type CharacterPathProps = {
  characterPosition: Position
  path: Path | null
  owner?: Owner
}

const colorClass = {
  player: 'stroke-yellow-300',
  ai: 'stroke-red-300'
}

function CharacterPath({
  characterPosition,
  path,
  owner = 'player'
}: CharacterPathProps) {
  const [tileWidth, tileHeight] = useTileSize()

  if (!path) return null
  if (path.length === 0) return null

  const positions = path.map((segment) => segment.position)
  const pathString =
    `M ${tileWidth * characterPosition[0] + tileWidth / 2} ${
      tileHeight * characterPosition[1] + tileHeight / 2
    } ` +
    positions
      .map(
        ([x, y]) =>
          `L ${tileWidth * x + tileWidth / 2} ${
            tileHeight * y + tileHeight / 2
          }`
      )
      .join(' ')

  const [lastPositionX, lastPositionY] = positions[positions.length - 1]

  return (
    <g>
      <rect
        x={tileWidth * lastPositionX}
        y={tileHeight * lastPositionY}
        width={tileWidth}
        height={tileHeight}
        className={`${colorClass[owner]} fill-none stroke-[3]`}
      ></rect>
      <path
        d={pathString}
        className={`${colorClass[owner]} fill-none stroke-[0.5] [stroke-dasharray:1,1] [stroke-dashoffset:1]`}
      ></path>
    </g>
  )
}

export default CharacterPath
