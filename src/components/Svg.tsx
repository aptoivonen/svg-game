import { createContext, useContext, useMemo } from 'react'
import { useGridHeight, useGridWidth } from '@/store'

const TILE = {
  WIDTH: 10,
  HEIGHT: 10
}

const tileSize: [number, number] = [TILE.WIDTH, TILE.HEIGHT]

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
  const viewBoxWidth = gridWidth * TILE.WIDTH
  const viewBoxHeight = gridHeight * TILE.HEIGHT
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
