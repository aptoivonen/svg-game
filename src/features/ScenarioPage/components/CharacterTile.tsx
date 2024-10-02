import { motion } from 'framer-motion'
import { ActionPointIcon } from '@/components'
import { Character, Owner } from '@/types'
import { useCharacterProtoId } from './CharacterTiles'
import {
  CHARACTER_MOVE_DELAY_SECONDS,
  TILE_IMAGE_SIZE
} from '@/features/ScenarioPage/constants'

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

function calculateIconX(index: number, actionPointIconSize: number) {
  return TILE_IMAGE_SIZE / 2 + (-1.5 + index) * actionPointIconSize
}

function CharacterTile({
  character,
  onMouseEnter,
  onMouseLeave,
  onClick
}: CharacterProps) {
  const characterProtoId = useCharacterProtoId()

  const [x, y] = character.position
  const { id, owner, currentActionPoints } = character
  const calcX = x * TILE_IMAGE_SIZE
  const calcY = y * TILE_IMAGE_SIZE
  const actionPointIconSize = TILE_IMAGE_SIZE / 5
  const iconY = TILE_IMAGE_SIZE - actionPointIconSize

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
      width={TILE_IMAGE_SIZE}
      height={TILE_IMAGE_SIZE}
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
      {owner === 'player' &&
        Array.from({ length: currentActionPoints }, (_, i) => (
          <ActionPointIcon
            key={i}
            x={calculateIconX(i, actionPointIconSize)}
            y={iconY}
            width={actionPointIconSize}
            height={actionPointIconSize}
          />
        ))}
    </motion.g>
  )
}

export default CharacterTile
