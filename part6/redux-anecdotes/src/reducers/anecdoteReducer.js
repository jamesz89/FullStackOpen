export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes,
  };
};

export const createAnecdote = (data) => {
  return {
    type: "ADD_ANECDOTE",
    data
  };
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    id,
  };
};

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES": {
      return action.data;
    }
    case "ADD_ANECDOTE": {
      const newAnecdote = {
        content: action.data.content,
        id: action.data.id,
        votes: action.data.votes,
      };
      return state.concat(newAnecdote);
    }
    case "VOTE": {
      const id = action.id;
      const anecdoteToVote = state.find((a) => a.id === id);
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1,
      };
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      );
    }
    default:
      return state;
  }
};

export default anecdoteReducer;
