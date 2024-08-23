import { Owner } from '@/types/types'
import { useTileSize } from '@/components/Svg'
import { useCharacterProtoId } from '@/components/CharacterTiles'

type CharacterProps = {
  x: number
  y: number
  owner: Owner
}

const COLORS: Record<Owner, string> = {
  ai: 'fill-red-500',
  player: 'fill-cyan-600'
}

function Character({ x, y, owner }: CharacterProps) {
  const [tileWidth, tileHeight] = useTileSize()
  const characterProtoId = useCharacterProtoId()

  const calcX = x * tileWidth
  const calcY = y * tileHeight
  return (
    <use
      href={`#${characterProtoId}`}
      x={calcX}
      y={calcY}
      className={COLORS[owner]}
    ></use>
  )
}

export default Character
