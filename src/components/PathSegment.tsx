import { usePathProtoId } from './PathSegments'
import { useTileSize } from './Svg'

type PathSegmentProps = {
  x: number
  y: number
}

function PathSegment({ x, y }: PathSegmentProps) {
  const [tileWidth, tileHeight] = useTileSize()
  const calcX = x * tileWidth
  const calcY = y * tileHeight
  const pathProtoId = usePathProtoId()
  return (
    <use
      href={`#${pathProtoId}`}
      x={calcX}
      y={calcY}
      className="pointer-events-none fill-white"
    ></use>
  )
}

export default PathSegment
