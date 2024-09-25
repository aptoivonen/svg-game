import { ActionPointIcon } from '@/components'

type ActionPointsLeftIconProps = {
  x: number
  y: number
  actionPointsLeftAfterSecondMovement: number
  tileSize: number
}

export default function ActionPointsLeftIcon({
  x,
  y,
  actionPointsLeftAfterSecondMovement,
  tileSize
}: ActionPointsLeftIconProps) {
  const actionPointIconSize = 0.2 * tileSize
  const [actionPointIconX, actionPointIconY] = [
    tileSize * x + tileSize / 2 - actionPointIconSize * 1.5,
    tileSize * y + tileSize / 2 - actionPointIconSize * 0.5
  ]
  const iconWidth = actionPointIconSize * 3
  const iconHeight = actionPointIconSize

  return (
    <svg
      x={actionPointIconX}
      y={actionPointIconY}
      width={iconWidth}
      height={iconHeight}
    >
      <rect
        x={iconWidth / 6}
        y={0}
        width={(iconWidth * 2) / 3}
        height={iconHeight}
        className="fill-black"
      ></rect>
      <circle
        cx={iconWidth / 6}
        cy={iconHeight / 2}
        r={iconHeight / 2}
        className="fill-black"
      ></circle>
      <circle
        cx={(iconWidth * 5) / 6}
        cy={iconHeight / 2}
        r={iconHeight / 2}
        className="fill-black"
      ></circle>
      {actionPointsLeftAfterSecondMovement > 0 && (
        <ActionPointIcon
          x={0}
          y={0}
          width={actionPointIconSize}
          height={actionPointIconSize}
        />
      )}
      {actionPointsLeftAfterSecondMovement > 1 && (
        <ActionPointIcon
          x={actionPointIconSize}
          y={0}
          width={actionPointIconSize}
          height={actionPointIconSize}
        />
      )}
    </svg>
  )
}
