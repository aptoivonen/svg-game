import { useCharacter } from '@/store'
import { useState } from 'react'

export default function useHoveredCharacter() {
  const [hoveredCharacterId, setHoveredCharacterId] = useState<string | null>(
    null
  )
  const hoveredCharacter = useCharacter(hoveredCharacterId || '')
  const clearHoveredCharacterId = () => setHoveredCharacterId(null)

  return {
    setHoveredCharacterId,
    clearHoveredCharacterId,
    hoveredCharacter
  }
}
