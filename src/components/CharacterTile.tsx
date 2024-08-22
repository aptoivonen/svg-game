type CharacterProps = {
  useId: string
  x: number
  y: number
  tileWidth: number
  tileHeight: number
}

function Character({ useId, x, y, tileWidth, tileHeight }: CharacterProps) {
  const calcX = x * tileWidth
  const calcY = y * tileHeight
  return (
    <use href={`#${useId}`} x={calcX} y={calcY} className="fill-red-500"></use>
  )
}

export default Character
