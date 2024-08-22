import { Owner } from '@/types'

type CharacterProps = {
  useId: string
  x: number
  y: number
  owner: Owner
  tileWidth: number
  tileHeight: number
}

const COLORS: Record<Owner, string> = {
  ai: 'fill-red-500',
  player: 'fill-cyan-600'
}

function Character({
  useId,
  x,
  y,
  tileWidth,
  tileHeight,
  owner
}: CharacterProps) {
  const calcX = x * tileWidth
  const calcY = y * tileHeight
  return (
    <use href={`#${useId}`} x={calcX} y={calcY} className={COLORS[owner]}></use>
  )
}

export default Character
