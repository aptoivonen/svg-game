import { Character } from '@/types'

type SelectedCharacterPanelProps = {
  character: Character
}

function SelectedCharacterPanel({ character }: SelectedCharacterPanelProps) {
  return (
    <div className="absolute bottom-1 left-1/2 z-10 h-[250px] w-[600px] -translate-x-1/2 bg-[rgba(0,0,0,0.7)] p-4 text-white">
      <p>{character.name}</p>
    </div>
  )
}

export default SelectedCharacterPanel
