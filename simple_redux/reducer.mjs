export const initialState = {
  count: 0
}

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'plus':
      return {
        ...state,
        count: state.count + 1
      }
      break;
    case 'subtract':
      return {
        ...state,
        count: state.count - 1
      }
      break;
    default:
      return initialState
  }
} 