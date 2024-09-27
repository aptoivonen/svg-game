import { useViewboxSize } from './Svg'

function Background() {
  const [viewBoxWidth, viewBoxHeight] = useViewboxSize()

  return <rect width={viewBoxWidth} height={viewBoxHeight} fill="black"></rect>
}

export default Background
