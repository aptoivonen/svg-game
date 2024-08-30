import { createContext, useContext } from 'react'
import { useTileSize } from '@/components/Svg'

const PATH_SEGMENTS_PROTO_ID = 'pathSegmentsProto'

const ProtoIdContext = createContext<string>(PATH_SEGMENTS_PROTO_ID)
export const usePathProtoId = () => useContext(ProtoIdContext)

type PathSegmentsProps = {
  children: React.ReactNode
}

function PathSegments({ children }: PathSegmentsProps) {
  const [tileWidth, tileHeight] = useTileSize()

  return (
    <ProtoIdContext.Provider value={PATH_SEGMENTS_PROTO_ID}>
      <g id="pathSegments">
        <symbol
          width={tileWidth}
          height={tileHeight}
          id={PATH_SEGMENTS_PROTO_ID}
          viewBox="0 0 10 10"
        >
          <circle cx={5} cy={5} r={1}></circle>
        </symbol>
        {children}
      </g>
    </ProtoIdContext.Provider>
  )
}

export default PathSegments
