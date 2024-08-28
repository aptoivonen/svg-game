import { useEffect } from 'react'
import { useStore } from '@/store'
import { ScenarioData } from '@/types'

export default function useInit(scenarioData: ScenarioData) {
  const { init } = useStore()
  useEffect(() => {
    init(scenarioData)
  }, [scenarioData, init])
}
