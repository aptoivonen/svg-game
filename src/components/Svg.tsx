const SVG_WIDTH_MULTIPLIER = 4

type SvgProps = {
  gridWidth: number
  gridHeight: number
  tileWidth: number
  tileHeight: number
  children: React.ReactNode
}

function Svg({
  gridWidth,
  gridHeight,
  tileWidth,
  tileHeight,
  children
}: SvgProps) {
  const viewBoxWidth = gridWidth * tileWidth
  const viewBoxHeight = gridHeight * tileHeight
  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width={`${SVG_WIDTH_MULTIPLIER * viewBoxWidth}px`}
    >
      {children}
    </svg>
  )
}

export default Svg
