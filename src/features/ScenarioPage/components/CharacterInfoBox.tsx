import { Character } from '@/types'
import clsx from 'clsx'

type CharacterInfoBoxProps = {
  character: Character
  className?: React.ComponentProps<'div'>['className']
}

function CharacterInfoBox({ character, className }: CharacterInfoBoxProps) {
  return (
    <div
      className={clsx(
        className,
        'z-10 h-[250px] w-[150px] bg-[rgba(0,0,0,0.7)] p-4 text-white'
      )}
    >
      <p className="text-lg">{character.name}</p>
      <p>Id: {character.id}</p>
      <p>Pos: {`(${character.position[0]}, ${character.position[1]})`}</p>
      <p>Owner: {character.owner}</p>
    </div>
  )
}

export default CharacterInfoBox
