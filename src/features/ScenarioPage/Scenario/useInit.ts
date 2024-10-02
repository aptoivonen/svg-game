import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { ScenarioData } from '@/types'

export default function useInit(scenarioData: ScenarioData) {
  const [isInitialized, setIsInitialized] = useState(false)

  const init = useStore((state) => state.init)
  const startPlayerTurn = useStore((state) => state.startPlayerTurn)
  useEffect(() => {
    init(scenarioData)
    startPlayerTurn()
    setIsInitialized(true)
  }, [scenarioData, init, startPlayerTurn])
  return isInitialized
}
