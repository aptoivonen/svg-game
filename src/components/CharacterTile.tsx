import { Owner } from '@/types'
import { useTileSize } from '@/components/App'

type CharacterProps = {
  useId: string
  x: number
  y: number
  owner: Owner
}

const COLORS: Record<Owner, string> = {
  ai: 'fill-red-500',
  player: 'fill-cyan-600'
}

function Character({ useId, x, y, owner }: CharacterProps) {
  const [tileWidth, tileHeight] = useTileSize()

  const calcX = x * tileWidth
  const calcY = y * tileHeight
  return (
    <use href={`#${useId}`} x={calcX} y={calcY} className={COLORS[owner]}></use>
  )
}

export default Character
