const notificationReducer = (
  state = { id: 0, message: "", visibility: false },
  action
) => {
  switch (action.type) {
    case "SET_NOTIFICATION": {
      return action.data;
    }
    case "CLEAR_NOTIFICATION": {
      if (state.id === action.data.id) {
        return state
      }
      return action.data
    }
    default:
      return state;
  }
};

const showNotification = (id, text) => {
  return {
    type: "SET_NOTIFICATION",
    data: {
      id,
      message: text,
      visibility: true,
    },
  };
};

const hideNotification = (id) => {
  return {
    type: "CLEAR_NOTIFICATION",
    data: {
      id,
      message: "",
      visibility: false,
    },
  };
};

let nextNotificationId = 0;

export const setNotification = (text, time) => {
  const id = nextNotificationId++
  return (dispatch) => {
    dispatch(showNotification(id, text));

    setTimeout(() => {
      dispatch(hideNotification(id));
    }, 1000 * time);
  };
};

export default notificationReducer;
