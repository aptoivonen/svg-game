import { useCallback, useState } from 'react'
import { useCharacter } from '@/store'

export default function useHighlightedCharacter() {
  const [highlightedCharacterId, setHighlightedCharacterId] = useState<
    string | null
  >(null)

  const highlightedCharacter =
    useCharacter(highlightedCharacterId || '') ?? null

  const clearHighlightedCharacterId = useCallback(
    () => setHighlightedCharacterId(null),
    []
  )

  return [
    setHighlightedCharacterId,
    clearHighlightedCharacterId,
    highlightedCharacter
  ] as const
}
