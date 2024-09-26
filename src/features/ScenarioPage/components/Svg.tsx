import { createContext, useContext, useMemo } from 'react'
import { useGridHeight, useGridWidth } from '@/store'
import { TILE_IMAGE_SIZE, TILE_OFFSET } from '@/config'

const tileSize: [number, number] = [TILE_IMAGE_SIZE, TILE_IMAGE_SIZE]

const TileSizeContext = createContext<[number, number]>(tileSize)
export const useTileSize = () => useContext(TileSizeContext)

const ViewboxSizeContext = createContext<[number, number]>([0, 0])
export const useViewboxSize = () => useContext(ViewboxSizeContext)

type SvgProps = {
  tileCssSize: [number, number]
  children: React.ReactNode
}

function Svg({ tileCssSize, children }: SvgProps) {
  const [tileCssWidth] = tileCssSize
  const gridWidth = useGridWidth()
  const gridHeight = useGridHeight()
  const svgCssWidth = tileCssWidth * gridWidth
  const offset = TILE_OFFSET
  const viewBoxWidth = gridWidth * TILE_IMAGE_SIZE + offset * gridWidth
  const viewBoxHeight = gridHeight * TILE_IMAGE_SIZE + offset * gridHeight
  const viewBoxSize: [number, number] = useMemo(
    () => [viewBoxWidth, viewBoxHeight],
    [viewBoxWidth, viewBoxHeight]
  )
  return (
    <TileSizeContext.Provider value={tileSize}>
      <ViewboxSizeContext.Provider value={viewBoxSize}>
        <svg
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          width={`${svgCssWidth}px`}
          xmlns="http://www.w3.org/2000/svg"
        >
          {children}
        </svg>
      </ViewboxSizeContext.Provider>
    </TileSizeContext.Provider>
  )
}

export default Svg
