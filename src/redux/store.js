import { createStore } from 'redux'

const initialState = {
  loading: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.value
      }
      break;
    default:
      return state
  }
}

const store =  createStore(reducer)

export default store