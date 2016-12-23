import {ErrorConstants} from '../actions/error_actions'

const initialState = Object.freeze({
  hasError: false
})

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ErrorConstants.RECEIVE_ERROR:
      return {
        ...state,
        hasError: true,
        message: action.error.message || action.error,
        stack: action.error.stack
      }
    default:
      return state
  }
}

export default errorReducer
