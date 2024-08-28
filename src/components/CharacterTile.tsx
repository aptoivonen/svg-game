import { motion } from 'framer-motion'
import { Owner } from '@/types/types'
import { useTileSize } from '@/components/Svg'
import { useCharacterProtoId } from '@/components/CharacterTiles'
import { CHARACTER_MOVE_DELAY_SECONDS } from '@/config'

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
    <motion.use
      href={`#${characterProtoId}`}
      animate={{ x: calcX, y: calcY }}
      initial={false}
      transition={{ duration: CHARACTER_MOVE_DELAY_SECONDS }}
      className={COLORS[owner]}
    ></motion.use>
  )
}

export default Character
