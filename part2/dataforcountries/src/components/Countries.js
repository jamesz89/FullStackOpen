import React from 'react'
import Country from './Country'

const Countries = (props) => {
  console.log('Countries props...', props)
  if (!props.value.length) return null

  if (props.value.length > 10)
    return (
      <div>
        <p>Too many matches, please be more specific</p>
      </div>
    )
  if (props.value.length >= 2 && props.value.length <= 10)
    return (
      <div>
        <ul>
          {props.value.map(country => {
            return <Country key={country.alpha2Code} value={country} />
          })}
        </ul>
      </div>
    )
  if (props.value.length === 1)
    return (
      <div>
        {props.value.map(country => {
          return (
            <div key={country.alpha2Code}>
              <h1>{country.name}</h1>
              <p>Capital: {country.capital}</p>
              <p>Population: {country.population.toLocaleString('de-DE')}</p>
              <h2>Languages</h2>
              <ul>
                {country.languages.map(item => {
                  return <li key={item.name}>{item.name}</li>
                })}
              </ul>
              <img src={country.flag} width='200' />
            </div>
          )
        })}
      </div>
    )
}

export default Countries