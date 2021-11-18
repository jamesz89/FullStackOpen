import React from "react";
import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import {
  displayNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
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
