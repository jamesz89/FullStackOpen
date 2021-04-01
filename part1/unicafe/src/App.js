import { useState } from 'react'

const Title = ({text}) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (good + (neutral * 0) + (bad * -1)) / all
  const positive = (good / all) * 100 + '%'

  if (all !== 0) {

    return (
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <Statistic text='all' value={all} />
          <Statistic text='average' value={average} />
          <Statistic text='positive' value={positive} />
        </tbody>
      </table>
    )
  }
  return (
    <div>
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
      <Title text='Give deedback' />
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <Title text='Statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
