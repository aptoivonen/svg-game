import { useViewboxSize } from '@/components/App'
import { useGridWidth } from '@/store'

type SvgProps = {
  tileCssSize: [number, number]
  children: React.ReactNode
}

function Svg({ tileCssSize, children }: SvgProps) {
  const [tileCssWidth] = tileCssSize
  const gridWidth = useGridWidth()
  const [viewBoxWidth, viewBoxHeight] = useViewboxSize()
  const svgCssWidth = tileCssWidth * gridWidth
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
