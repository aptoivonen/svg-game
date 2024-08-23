import { useViewboxSize } from '@/components/App'

type SvgProps = {
  outerWidth: number
  children: React.ReactNode
}

function Svg({ outerWidth, children }: SvgProps) {
  const [viewBoxWidth, viewBoxHeight] = useViewboxSize()
  return (
    <svg
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      width={`${outerWidth}px`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {children}
    </svg>
  )
}

export default Svg
