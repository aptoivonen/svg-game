import { useCharacter, useMode } from '@/store'
import { Character, Path } from '@/types'

function useSelectedCharacter():
  | readonly [
      selectedCharacter: Character,
      selectedCharacterPath: Path,
      hasSelectedCharacter: true,
      hasSelectedCharacterPath: true
    ]
  | readonly [
      selectedCharacter: Character,
      selectedCharacterPath: null,
      hasSelectedCharacter: true,
      hasSelectedCharacterPath: false
    ]
  | readonly [
      selectedCharacter: null,
      selectedCharacterPath: null,
      hasSelectedCharacter: false,
      hasSelectedCharacterPath: false
    ] {
  const mode = useMode()
  const canHaveSelectedCharacter =
    mode.name === 'selectedCharacter' || mode.name === 'executing'
  const characterId = canHaveSelectedCharacter ? mode.characterId : ''
  const selectedCharacter = useCharacter(characterId) ?? null

  if (!selectedCharacter) return [null, null, false, false] as const

  const canHavePath = !!selectedCharacter && mode.name === 'selectedCharacter'
  const selectedCharacterPath = canHavePath
    ? mode.path
      ? mode.path
      : null
    : null
  const hasSelectedCharacterPath = !!selectedCharacterPath

  return hasSelectedCharacterPath
    ? ([selectedCharacter, selectedCharacterPath, true, true] as const)
    : ([selectedCharacter, selectedCharacterPath, true, false] as const)
}

export default useSelectedCharacter
