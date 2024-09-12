import { motion } from 'framer-motion'
import { Owner } from '@/types'
import { useTileSize } from '@/components/Svg'
import { useCharacterProtoId } from '@/components/CharacterTiles'
import { CHARACTER_MOVE_DELAY_SECONDS } from '@/config'

type CharacterProps = {
  id: string
  x: number
  y: number
  owner: Owner
  onMouseEnter: (id: string) => void
  onMouseLeave: () => void
  onClick: (id: string) => void
}

const COLORS: Record<Owner, string> = {
  ai: 'fill-red-500',
  player: 'fill-cyan-600'
}

function CharacterTile({
  id,
  x,
  y,
  owner,
  onMouseEnter,
  onMouseLeave,
  onClick
}: CharacterProps) {
  const [tileWidth, tileHeight] = useTileSize()
  const characterProtoId = useCharacterProtoId()

  const calcX = x * tileWidth
  const calcY = y * tileHeight

  function handleMouseEnter(): void {
    onMouseEnter(id)
  }

  function handleMouseLeave(): void {
    onMouseLeave()
  }

  function handleClick(): void {
    onClick(id)
  }

  return (
    <motion.use
      id={id}
      href={`#${characterProtoId}`}
      animate={{ x: calcX, y: calcY }}
      initial={false}
      transition={{ duration: CHARACTER_MOVE_DELAY_SECONDS }}
      className={COLORS[owner]}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    ></motion.use>
  )
}

export default CharacterTile
