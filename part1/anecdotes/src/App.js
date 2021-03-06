import React, { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  const mostVotedAnecdoteIndex = votes.indexOf(Math.max(...votes))

  const getRandomAnecdote = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length - 0)) + 0)
  }

  const voteCurrentAnecdote = () => {
    const currentState = [...votes]
    currentState[selected] +=  1
    setVotes(currentState)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br />
      Has {votes[selected]} votes
      <br />
      <Button handleClick={voteCurrentAnecdote} text='Vote' />
      <Button handleClick={getRandomAnecdote} text='Next anecdote' />
      
      <h1>Anecdote with most votes</h1>
      {anecdotes[mostVotedAnecdoteIndex]}
      <br />
      Has {votes[mostVotedAnecdoteIndex]} votes
    </div>
  )
}

export default App