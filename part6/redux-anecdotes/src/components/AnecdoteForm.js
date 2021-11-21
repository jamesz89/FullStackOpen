import React from "react";
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {
  displayNotification,
  hideNotification,
} from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const getId = () => (100000 * Math.random()).toFixed(0);

  const addNote = async (event) => {
    event.preventDefault()
    const newAnecdote = {
      content: event.target.anecdote.value,
      id: getId(),
      votes: 0
    } 
    event.target.anecdote.value = ''
    await anecdoteService.create(newAnecdote)
    dispatch(createAnecdote(newAnecdote))
    dispatch(displayNotification(`New anecdote added`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
  } 
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
