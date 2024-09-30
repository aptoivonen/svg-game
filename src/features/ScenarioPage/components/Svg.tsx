import { TILE_CSS_SIZE, TILE_IMAGE_SIZE } from '@/config'

type SvgProps = {
  gridWidth: number
  gridHeight: number
  children: React.ReactNode
}

function Svg({ gridWidth, gridHeight, children }: SvgProps) {
  const svgCssWidth = TILE_CSS_SIZE * gridWidth
  const viewBoxWidth = gridWidth * TILE_IMAGE_SIZE
  const viewBoxHeight = gridHeight * TILE_IMAGE_SIZE

  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width={`${svgCssWidth}px`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

export default Svg
