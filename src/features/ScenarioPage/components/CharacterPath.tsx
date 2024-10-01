import { Owner, Path, Position } from '@/types'
import ActionPointsLeftIcon from './ActionPointsLeftIcon'
import { TILE_IMAGE_SIZE } from '@/features/ScenarioPage/constants'

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
  if (!path) return null
  if (path.length === 0) return null

  const [characterPositionX, characterPositionY] = characterPosition
  const positions = path.map((segment) => segment.position)
  const pathString =
    `M ${TILE_IMAGE_SIZE * characterPositionX + TILE_IMAGE_SIZE / 2} ${
      TILE_IMAGE_SIZE * characterPositionY + TILE_IMAGE_SIZE / 2
    } ` +
    positions
      .map(
        ([x, y]) =>
          `L ${TILE_IMAGE_SIZE * x + TILE_IMAGE_SIZE / 2} ${
            TILE_IMAGE_SIZE * y + TILE_IMAGE_SIZE / 2
          }`
      )
      .join(' ')

  const [lastPositionX, lastPositionY] = positions[positions.length - 1]
  const calcPathEndHightLightX = TILE_IMAGE_SIZE * lastPositionX
  const calcPathEndHightLightY = TILE_IMAGE_SIZE * lastPositionY
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
        width={TILE_IMAGE_SIZE}
        height={TILE_IMAGE_SIZE}
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
          tileSize={TILE_IMAGE_SIZE}
        />
      )}
    </g>
  )
}

export default CharacterPath
