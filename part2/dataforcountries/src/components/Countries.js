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
            return <li key={country.alpha2Code}>{country.name}</li>
          })}
        </ul>
      </div>
    )
  if (props.value.length === 1)
    return (
      <div>
        {props.value.map(country => {
          return (<Country key={country.alpha2Code} value={country} />
          )
        })}
      </div>
    )
}

export default Countries