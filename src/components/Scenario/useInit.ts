import { useEffect, useState } from 'react'
import { useStore } from '@/store'
import { ScenarioData } from '@/types'

export default function useInit(scenarioData: ScenarioData) {
  const [isInitialized, setIsInitialized] = useState(false)

  const { init } = useStore()
  useEffect(() => {
    init(scenarioData)
    setIsInitialized(true)
  }, [scenarioData, init])
  return isInitialized
}
