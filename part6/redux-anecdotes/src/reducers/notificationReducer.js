const notificationReducer = (
  state = { message: "", visibility: false },
  action
) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      return action.data;
    }
    case "CLEAR_NOTIFICATION": {
      return action.data;
    }
    default:
      return state;
  }
};

const showNotification = (text) => {
  return {
    type: "SET_NOTIFICATION",
    data: {
      message: text,
      visibility: true,
    },
  };
};

const hideNotification = () => {
  return {
        type: 'CLEAR_NOTIFICATION',
        data: {
          message: '',
          visibility: false
        }
      }
}

export const setNotification = (text, time) => {
  return dispatch => {
    dispatch(showNotification(text))

    setTimeout(() => {
      dispatch(hideNotification())
    }, (1000*time))
  }
};

export default notificationReducer;
