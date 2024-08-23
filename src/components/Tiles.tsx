import { createContext, memo, useContext } from 'react'
import { useTileSize } from '@/components/Svg'

const TILE_PROTO_ID = 'tileProto'

const ProtoIdContext = createContext<string>(TILE_PROTO_ID)
export const useTileProtoId = () => useContext(ProtoIdContext)

type TilesProps = {
  children: React.ReactNode
}

function Tiles({ children }: TilesProps) {
  const [tileWidth, tileHeight] = useTileSize()
  return (
    <ProtoIdContext.Provider value={TILE_PROTO_ID}>
      <g id="tiles">
        <symbol
          width={tileWidth}
          height={tileHeight}
          id={TILE_PROTO_ID}
          viewBox="0 0 1 1"
        >
          <rect width={1} height={1} x={0} y={0}></rect>
        </symbol>
        {children}
      </g>
    </ProtoIdContext.Provider>
  )
}

export default memo(Tiles)
