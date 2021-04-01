import { useState } from 'react'

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good + (neutral * 0) + (bad * -1)) / all
  const positive = (good / all) * 100 + '%'

  if (all !== 0) {

    return (
      <div>
        <h1>Statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive}</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <h2>No feedback given</h2>
    </div>
  )
}

const App = () => {
  //Save clicks of each of button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
