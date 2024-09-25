import { memo } from 'react'
import { useTileSize, useViewboxSize } from './Svg'
import { useGridHeight, useGridWidth } from '@/store'

function GridLines() {
  const gridWidth = useGridWidth()
  const gridHeight = useGridHeight()
  const [tileWidth, tileHeight] = useTileSize()
  const [viewBoxWidth, viewBoxHeight] = useViewboxSize()

  let pathString = ''
  for (let x = 0; x <= gridWidth; x++) {
    pathString = pathString.concat(`M ${tileWidth * x} 0 v ${viewBoxHeight}`)
  }
  for (let y = 0; y <= gridHeight; y++) {
    pathString = pathString.concat(`M 0 ${tileHeight * y} h ${viewBoxWidth}`)
  }
  return (
    <g id="gridLines">
      <path
        d={pathString}
        className="fill-none stroke-[rgba(255,_255,_255,_0.2)] stroke-[0.5]"
      ></path>
    </g>
  )
}

export default memo(GridLines)
