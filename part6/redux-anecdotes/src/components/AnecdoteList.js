import React, { useEffect } from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  displayNotification,
  hideNotification,
} from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'
import { initializeAnecdotes } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch (initializeAnecdotes(anecdotes)))
  }, [dispatch])

  const vote = (id, content) => {
    dispatch(voteAnecdote(id));
    dispatch(displayNotification(`You have upvoted '${content}'`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
