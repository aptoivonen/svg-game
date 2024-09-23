import { createContext, memo, useContext } from 'react'
import image from '@/assets/tileset.png'
import {
  TILE_DATA_EDGES,
  TILE_DATA_TERRAIN,
  TILE_IMAGE_SIZE,
  TILESET_IMAGE_DIMENSIONS
} from '@/config'

const IMAGE_PROTO_ID = 'imageProto'
const ProtoIdContext = createContext<string>(IMAGE_PROTO_ID)
export const useImageProtoId = () => useContext(ProtoIdContext)

type TilesProps = {
  children: React.ReactNode
}

function Tiles({ children }: TilesProps) {
  return (
    <ProtoIdContext.Provider value={IMAGE_PROTO_ID}>
      <g id="tiles">
        <defs>
          <image
            id={IMAGE_PROTO_ID}
            href={image}
            width={TILESET_IMAGE_DIMENSIONS.WIDTH}
            height={TILESET_IMAGE_DIMENSIONS.HEIGHT}
          />
          {Object.values(TILE_DATA_TERRAIN).map((tileData) => (
            <clipPath key={tileData.id} id={tileData.id}>
              <rect
                x={tileData.x * TILE_IMAGE_SIZE}
                y={tileData.y * TILE_IMAGE_SIZE}
                width={TILE_IMAGE_SIZE}
                height={TILE_IMAGE_SIZE}
              />
            </clipPath>
          ))}
          {Object.entries(TILE_DATA_EDGES).map(([id, tileData]) => (
            <clipPath key={id} id={id}>
              <rect
                x={tileData.x * TILE_IMAGE_SIZE}
                y={tileData.y * TILE_IMAGE_SIZE}
                width={TILE_IMAGE_SIZE}
                height={TILE_IMAGE_SIZE}
              />
            </clipPath>
          ))}
        </defs>
        {children}
      </g>
    </ProtoIdContext.Provider>
  )
}

export default memo(Tiles)
