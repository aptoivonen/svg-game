import { Position } from '@/types'
import { useTileSize } from './Svg'

type SelectedCharacterHighlightProps = {
  position: Position
}

function SelectedCharacterHighlight({
  position
}: SelectedCharacterHighlightProps) {
  const [tileWidth, tileHeight] = useTileSize()
  const [x, y] = position
  const calcX = tileWidth * x
  const calcY = tileHeight * y

  return (
    <rect
      x={calcX}
      y={calcY}
      width={tileWidth}
      height={tileHeight}
      className="fill-none stroke-yellow-300 stroke-[3]"
    ></rect>
  )
}

export default SelectedCharacterHighlight
