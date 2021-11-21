import React, { useEffect } from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { useSelector, useDispatch } from "react-redux";
import {
  displayNotification,
  hideNotification,
} from "../reducers/notificationReducer";
import { initializeAnecdotes } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.anecdotes.sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote));
    dispatch(
      displayNotification({
        message: `You have upvoted "${anecdote.content}"`,
        visibility: true,
      })
    );
    setTimeout(() => {
      dispatch(hideNotification({ message: "", visibility: false }));
    }, 5000);
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
