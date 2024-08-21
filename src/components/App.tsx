import { useGridHeight, useGridWidth } from '@/store'
import Svg from '@/components/Svg'

const TILE = {
  WIDTH: 10,
  HEIGHT: 10
}

function App() {
  const gridWidth = useGridWidth()
  const gridHeight = useGridHeight()

  return (
    <Svg
      gridWidth={gridWidth}
      gridHeight={gridHeight}
      tileWidth={TILE.WIDTH}
      tileHeight={TILE.HEIGHT}
    >
      <></>
    </Svg>
  )
}

export default App
