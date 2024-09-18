import { motion } from 'framer-motion'
import { Owner } from '@/types'
import { useTileSize } from './Svg'
import { useCharacterProtoId } from './CharacterTiles'
import { CHARACTER_MOVE_DELAY_SECONDS } from '@/config'
import ActionPointIcon from './ActionPointIcon'

type CharacterProps = {
  id: string
  x: number
  y: number
  owner: Owner
  currentActionPoints: number
  onMouseEnter: (id: string, x: number, y: number) => void
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
  currentActionPoints,
  onMouseEnter,
  onMouseLeave,
  onClick
}: CharacterProps) {
  const [tileWidth, tileHeight] = useTileSize()
  const characterProtoId = useCharacterProtoId()

  const calcX = x * tileWidth
  const calcY = y * tileHeight
  const actionPointIconSize = tileWidth / 5
  const icon1X = calcX + tileWidth / 2 - 1.5 * actionPointIconSize
  const icon2X = calcX + tileWidth / 2 - 0.5 * actionPointIconSize
  const icon3X = calcX + tileWidth / 2 + 0.5 * actionPointIconSize
  const iconY = calcY + tileHeight - actionPointIconSize

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
    <>
      <motion.use
        id={id}
        href={`#${characterProtoId}`}
        animate={{ x: calcX, y: calcY }}
        initial={false}
        transition={{ duration: CHARACTER_MOVE_DELAY_SECONDS, ease: 'linear' }}
        className={COLORS[owner]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      ></motion.use>
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
    </>
  )
}

export default CharacterTile
