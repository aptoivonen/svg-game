import { createContext, useContext } from 'react'
import { useGridHeight, useGridWidth } from '@/store'
import { TILE_CSS_SIZE, TILE_IMAGE_SIZE } from '@/config'

const tileSize: [number, number] = [TILE_IMAGE_SIZE, TILE_IMAGE_SIZE]

const TileSizeContext = createContext<[number, number]>(tileSize)
export const useTileSize = () => useContext(TileSizeContext)

type SvgProps = {
  children: React.ReactNode
}

function Svg({ children }: SvgProps) {
  const gridWidth = useGridWidth()
  const gridHeight = useGridHeight()
  const svgCssWidth = TILE_CSS_SIZE * gridWidth
  const viewBoxWidth = gridWidth * TILE_IMAGE_SIZE
  const viewBoxHeight = gridHeight * TILE_IMAGE_SIZE

  return (
    <TileSizeContext.Provider value={tileSize}>
      <svg
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        width={`${svgCssWidth}px`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {children}
      </svg>
    </TileSizeContext.Provider>
  )
}

export default Svg
