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

  return (
    <rect
      x={tileWidth * x}
      y={tileHeight * y}
      width={tileWidth}
      height={tileHeight}
      className="fill-none stroke-yellow-300 stroke-[3]"
    ></rect>
  )
}

export default SelectedCharacterHighlight
