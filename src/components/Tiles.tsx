import { memo } from 'react'
import { useTileSize } from '@/components/App'

type TilesProps = {
  useId: string
  children: React.ReactNode
}

function Tiles({ useId, children }: TilesProps) {
  const [tileWidth, tileHeight] = useTileSize()
  return (
    <g id="tiles">
      <symbol
        width={tileWidth}
        height={tileHeight}
        id={useId}
        viewBox="0 0 1 1"
      >
        <rect width={1} height={1} x={0} y={0}></rect>
      </symbol>
      {children}
    </g>
  )
}

export default memo(Tiles)
