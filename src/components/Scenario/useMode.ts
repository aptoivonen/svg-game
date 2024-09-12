import { Reducer, useReducer } from 'react'

type ModeState =
  | {
      name: 'initial'
    }
  | {
      name: 'selectedCharacter'
      characterId: string
    }

type ModeAction =
  | {
      type: 'cancel'
    }
  | {
      type: 'selectCharacter'
      characterId: string
    }

const modeReducer: Reducer<ModeState, ModeAction> = (state, action) => {
  switch (state.name) {
    case 'initial':
      if (action.type === 'selectCharacter') {
        return { name: 'selectedCharacter', characterId: action.characterId }
      }
      break
    case 'selectedCharacter':
      if (action.type === 'selectCharacter') {
        return action.characterId === state.characterId
          ? { name: 'initial' }
          : { name: 'selectedCharacter', characterId: action.characterId }
      }
      if (action.type === 'cancel') {
        return { name: 'initial' }
      }
      break
  }
  return state
}

const initialMode: ModeState = { name: 'initial' }

const useMode = () => useReducer(modeReducer, initialMode)

export default useMode
