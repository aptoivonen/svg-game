import { useCharacter, useMode } from '@/store'
import { Character, Path } from '@/types'

function useSelectedCharacter():
  | readonly [Character, Path]
  | readonly [Character, null]
  | readonly [null, null] {
  const mode = useMode()
  const canHaveSelectedCharacter =
    mode.name === 'selectedCharacter' || mode.name === 'executing'
  const characterId = canHaveSelectedCharacter ? mode.characterId : ''
  const selectedCharacter = useCharacter(characterId) ?? null

  if (!selectedCharacter) return [null, null] as const

  const canHavePath = !!selectedCharacter && mode.name === 'selectedCharacter'
  const selectedCharacterPath = canHavePath
    ? mode.path
      ? mode.path
      : null
    : null

  return [selectedCharacter, selectedCharacterPath] as const
}

export default useSelectedCharacter
