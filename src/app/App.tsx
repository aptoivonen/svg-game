import ScenarioPage from '@/features/ScenarioPage'
import scenario1json from '@/data/scenario1.json'
import { ScenarioDataSchema } from '@/types'

const scenario1Data = ScenarioDataSchema.safeParse(scenario1json)
const { success: isSuccess } = scenario1Data

function App() {
  if (isSuccess) {
    return <ScenarioPage scenarioData={scenario1Data.data} />
  }
  return <div>Failed to validate scenario</div>
}

export default App
