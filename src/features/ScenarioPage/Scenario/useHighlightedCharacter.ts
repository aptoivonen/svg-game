import { useCallback, useState } from 'react'
import { useCharacter } from '@/store'

export default function useHighlightedCharacter() {
  const [highlightedCharacterId, setHighlightedCharacterId] = useState<
    string | null
  >(null)

  const highlightedCharacter =
    useCharacter(highlightedCharacterId || '') ?? null
  const hashighlightedCharacter = !!highlightedCharacter

  const clearHighlightedCharacterId = useCallback(
    () => setHighlightedCharacterId(null),
    []
  )

  return hashighlightedCharacter
    ? ([
        setHighlightedCharacterId,
        clearHighlightedCharacterId,
        true,
        highlightedCharacter
      ] as const)
    : ([
        setHighlightedCharacterId,
        clearHighlightedCharacterId,
        false,
        null
      ] as const)
}
