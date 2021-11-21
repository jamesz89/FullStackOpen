import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { useDispatch } from "react-redux";
import {
  displayNotification,
  hideNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();
  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
    dispatch(
      displayNotification({
        message: "A new anecdote has been added",
        visibility: true,
      })
    );
    setTimeout(() => {
      dispatch(hideNotification({ message: "", visibility: false }));
    }, 5000);
  };
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
