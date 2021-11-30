const togglableReducer = (state = false, action) => {
  switch (action.type) {
  case 'SET_VISIBILITY': {
    return action.visibility
  }
  default:
    return state
  }
}

export const showElement = () => {
  return {
    type: 'SET_VISIBILITY',
    visibility: true
  }
}

export const hideElement = () => {
  return {
    type: 'SET_VISIBILITY',
    visibility: false
  }
}

export default togglableReducer