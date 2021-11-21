export const displayNotification = (data) => {
  return {
    type: 'SET_NOTIFICATION',
    data
  }
}

export const hideNotification = (data) => {
  return {
    type: 'CLEAR_NOTIFICATION',
    data
  }
}

const notificationReducer = (state = {message: '', visibility: false}, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      return action.data;
    }
    case 'CLEAR_NOTIFICATION': {
      return action.data
    }
    default:
      return state;
  }
};

export default notificationReducer;
