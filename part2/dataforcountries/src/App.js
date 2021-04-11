import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleChange = (event) => {
    setFilter(event.target.value)
    setFilteredCountries(countries.filter(country => {
      if (!filter) return true
      if (country.name.toLowerCase().includes(filter.toLowerCase())) return true
    }))
  }

  return (
    <div>
      Search countries <input type='text' value={filter} onChange={handleChange} />
      <Countries value={filteredCountries} />
    </div>
  );
}

export default App;
