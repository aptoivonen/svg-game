import ScenarioPage from '@/features/ScenarioPage'
import scenario1json from '@/data/scenario1.json'
import { ScenarioDataSchema } from '@/types'
import { fromError } from 'zod-validation-error'

const scenario1Data = ScenarioDataSchema.safeParse(scenario1json)
const { success: isSuccess, error } = scenario1Data
const { message: errorMessage } = fromError(error)

function App() {
  if (isSuccess) {
    return <ScenarioPage scenarioData={scenario1Data.data} />
  }
  return (
    <div className="grid h-full place-items-center text-xl text-white">
      <div className="max-w-xl">
        <p>Failed to validate scenario:</p>
        <p>{errorMessage}</p>
      </div>
    </div>
  )
}

export default App
