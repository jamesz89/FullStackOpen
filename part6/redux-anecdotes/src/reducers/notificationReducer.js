const initialState = '';

export const displayNotification = (message) => {
  return {
    type: 'SET_NOTIFICATION',
    message
  }
}

export const hideNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  }
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      return action.message;
    }
    case 'CLEAR_NOTIFICATION': {
      return ''
    }
    default:
      return state;
  }
};

export default notificationReducer;
