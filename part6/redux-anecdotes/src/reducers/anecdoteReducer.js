import anecdoteService from '../services/anecdotes'

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

const getId = () => (100000 * Math.random()).toFixed(0)

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    })
  };
}
  
export const createAnecdote = (content) => {
  return async dispatch => {
    const data = await anecdoteService.create({content, id: getId(), votes: 0})
    dispatch({
      type: 'ADD_ANECDOTE',
      data
    })
  }
};

export const voteAnecdote = (id) => {
  return {
    type: "VOTE",
    id,
  };
};


export default anecdoteReducer;