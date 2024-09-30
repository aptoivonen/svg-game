import { TILE_IMAGE_SIZE } from '@/config'
import { Position } from '@/types'

type SelectedCharacterHighlightProps = {
  position: Position
}

function SelectedCharacterHighlight({
  position
}: SelectedCharacterHighlightProps) {
  const [x, y] = position
  const calcX = TILE_IMAGE_SIZE * x
  const calcY = TILE_IMAGE_SIZE * y

  return (
    <rect
      x={calcX}
      y={calcY}
      width={TILE_IMAGE_SIZE}
      height={TILE_IMAGE_SIZE}
      className="fill-none stroke-yellow-300 stroke-[3]"
    ></rect>
  )
}

export default SelectedCharacterHighlight
