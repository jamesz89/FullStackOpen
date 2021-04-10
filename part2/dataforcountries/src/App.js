import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  return (
    <div>
      Find countries <input value={filter} onChange={handleChange} />

      {countries.filter(country => {
        if (!filter) return true
        if (country.name.toLowerCase().includes(filter.toLowerCase())) return true
      }).map(matchingCountry => {
        return (
        <p key={matchingCountry.name}>{matchingCountry.name}</p>
        )
      })
      }
    </div>
  );
}

export default App;
