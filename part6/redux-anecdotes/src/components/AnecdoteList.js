import React, { useEffect } from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { initializeAnecdotes } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(({filter, anecdotes}) => {
    const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes)
    return sortedAnecdotes.filter(anecdote => anecdote.content.toLowerCase().indexOf(filter.toLowerCase()) > -1)
  })

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(setNotification(`You have upvoted "${anecdote.content}"`, 5));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
