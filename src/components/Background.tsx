import { useViewboxSize } from '@/components/Svg'

function Background() {
  const [viewBoxWidth, viewBoxHeight] = useViewboxSize()

  return <rect width={viewBoxWidth} height={viewBoxHeight} fill="#ccc"></rect>
}

export default Background
