import { motion } from 'framer-motion'
import { ActionPointIcon } from '@/components'
import { Character, Owner } from '@/types'
import { useTileSize } from './Svg'
import { useCharacterProtoId } from './CharacterTiles'
import { CHARACTER_MOVE_DELAY_SECONDS } from '@/config'

type CharacterProps = {
  character: Character
  onMouseEnter: (id: string, x: number, y: number) => void
  onMouseLeave: () => void
  onClick: (id: string) => void
}

const COLORS: Record<Owner, string> = {
  ai: 'fill-red-500',
  player: 'fill-cyan-600'
}

function CharacterTile({
  character,
  onMouseEnter,
  onMouseLeave,
  onClick
}: CharacterProps) {
  const [tileWidth, tileHeight] = useTileSize()
  const characterProtoId = useCharacterProtoId()

  const [x, y] = character.position
  const { id, owner, currentActionPoints } = character
  const calcX = x * tileWidth
  const calcY = y * tileHeight
  const actionPointIconSize = tileWidth / 5
  const icon1X = tileWidth / 2 - 1.5 * actionPointIconSize
  const icon2X = tileWidth / 2 - 0.5 * actionPointIconSize
  const icon3X = tileWidth / 2 + 0.5 * actionPointIconSize
  const iconY = tileHeight - actionPointIconSize

  function handleMouseEnter(): void {
    onMouseEnter(id, x, y)
  }

  function handleMouseLeave(): void {
    onMouseLeave()
  }

  function handleClick(): void {
    onClick(id)
  }

  return (
    <motion.g
      animate={{ x: calcX, y: calcY }}
      width={tileWidth}
      height={tileHeight}
      initial={false}
      transition={{ duration: CHARACTER_MOVE_DELAY_SECONDS, ease: 'linear' }}
    >
      <use
        id={id}
        href={`#${characterProtoId}`}
        x={0}
        y={0}
        className={COLORS[owner]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      ></use>
      {owner === 'player' && currentActionPoints >= 1 && (
        <ActionPointIcon
          x={icon1X}
          y={iconY}
          width={actionPointIconSize}
          height={actionPointIconSize}
        />
      )}
      {owner === 'player' && currentActionPoints >= 2 && (
        <ActionPointIcon
          x={icon2X}
          y={iconY}
          width={actionPointIconSize}
          height={actionPointIconSize}
        />
      )}
      {owner === 'player' && currentActionPoints >= 3 && (
        <ActionPointIcon
          x={icon3X}
          y={iconY}
          width={actionPointIconSize}
          height={actionPointIconSize}
        />
      )}
    </motion.g>
  )
}

export default CharacterTile
