import { Owner, Path, Position } from '@/types'
import { useTileSize } from './Svg'
import ActionPointsLeftIcon from './ActionPointsLeftIcon'

type CharacterPathProps = {
  characterPosition: Position
  path: Path | null
  movementPoints: number
  currentActionPoints: number
  owner?: Owner
}

const colorClass = {
  player: 'stroke-yellow-300',
  ai: 'stroke-red-300'
}

function CharacterPath({
  characterPosition,
  path,
  movementPoints,
  currentActionPoints,
  owner = 'player'
}: CharacterPathProps) {
  const [tileWidth, tileHeight] = useTileSize()

  if (!path) return null
  if (path.length === 0) return null

  const [characterPositionX, characterPositionY] = characterPosition
  const positions = path.map((segment) => segment.position)
  const pathString =
    `M ${tileWidth * characterPositionX + tileWidth / 2} ${
      tileHeight * characterPositionY + tileHeight / 2
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
  const calcPathEndHightLightX = tileWidth * lastPositionX
  const calcPathEndHightLightY = tileWidth * lastPositionY
  const stepRequiresSecondMovementPoint = path.find(
    (segment) => segment.pathCost > movementPoints * 100
  )
  const [secondMovementPointTileX, secondMovementPointTileY] =
    stepRequiresSecondMovementPoint?.position ?? [0, 0]
  const actionPointsLeftAfterSecondMovement = currentActionPoints - 1

  return (
    <g>
      <rect
        x={calcPathEndHightLightX}
        y={calcPathEndHightLightY}
        width={tileWidth}
        height={tileHeight}
        className={`${colorClass[owner]} fill-none stroke-[3]`}
      ></rect>
      <path
        d={pathString}
        className={`${colorClass[owner]} fill-none stroke-[3] [stroke-dasharray:6,6] [stroke-dashoffset:1]`}
      ></path>
      {!!stepRequiresSecondMovementPoint && (
        <ActionPointsLeftIcon
          x={secondMovementPointTileX}
          y={secondMovementPointTileY}
          actionPointsLeftAfterSecondMovement={
            actionPointsLeftAfterSecondMovement
          }
          tileSize={tileWidth}
        />
      )}
    </g>
  )
}

export default CharacterPath
