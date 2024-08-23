import { useViewboxSize } from '@/components/App'

function Background() {
  const [viewBoxWidth, viewBoxHeight] = useViewboxSize()

  return <rect width={viewBoxWidth} height={viewBoxHeight} fill="#ccc"></rect>
}

export default Background
