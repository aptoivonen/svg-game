import { Character } from '@/types'

type CharacterInfoBoxProps = {
  character: Character
}

function CharacterInfoBox({ character }: CharacterInfoBoxProps) {
  return (
    <div className="absolute bottom-1 right-1 z-10 h-[250px] w-[150px] bg-[rgba(0,0,0,0.7)] p-4 text-white">
      <p>Id: {character.id}</p>
      <p>Pos: {`(${character.position[0]}, ${character.position[1]})`}</p>
      <p>Owner: {character.owner}</p>
    </div>
  )
}

export default CharacterInfoBox
