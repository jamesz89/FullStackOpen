import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOG_IN': {
    return action.user
  }
  case 'LOG_OUT': {
    return null
  }
  default:
    return state
  }
}

export const login = (user) => {
  return async dispatch => {
    await blogService.setToken(user.token)
    dispatch({
      type: 'LOG_IN',
      user
    })
  }
}

export const logout = () => {
  return dispatch => {
    dispatch({
      type: 'LOG_OUT',
    })
  }
}

export default userReducer