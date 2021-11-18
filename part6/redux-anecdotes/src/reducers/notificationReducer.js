const initialState = 'Testing reducer';

const notificationReducer = (state = initialState, action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "SET_NOTIFICATION": {
      const newState = action.message;
      return newState;
    }
    default:
      return state;
  }
};

export default notificationReducer;
