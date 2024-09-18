import { Character } from '@/types'
import { ActionPointIcon } from '@/components'

type SelectedCharacterPanelProps = {
  character: Character
}

function SelectedCharacterPanel({ character }: SelectedCharacterPanelProps) {
  const { currentActionPoints } = character

  return (
    <div className="absolute bottom-0 left-1/2 z-10 h-[200px] w-[600px] -translate-x-1/2 bg-[rgba(0,0,0,0.7)] p-4 text-white">
      <p>{character.name}</p>
      <div className="flex h-[10px] gap-1">
        {currentActionPoints >= 1 && <ActionPointIcon />}
        {currentActionPoints >= 2 && <ActionPointIcon />}
        {currentActionPoints >= 3 && <ActionPointIcon />}
      </div>
    </div>
  )
}

export default SelectedCharacterPanel
