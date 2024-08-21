type TilesProps = {
  useId: string
  tileWidth: number
  tileHeight: number
  children: React.ReactNode
}

function Tiles({ useId, tileWidth, tileHeight, children }: TilesProps) {
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

export default Tiles
