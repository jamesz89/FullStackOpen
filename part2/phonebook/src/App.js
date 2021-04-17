import React, { useEffect, useState } from 'react'

import personService from './services/personService'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const initialValues = {
    name: "",
    number: ""
  }
  const [values, setValues] = useState(initialValues)
  const [filter, setfilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })

  }, [])

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setfilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: values.name,
      number: values.number
    }
    persons.some(person =>
      person.name.toLowerCase() === values.name.toLowerCase())
      ? window.alert(`${values.name} is already added to phonebook`)
      : personService
        .create(personObj)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    setValues({
      name: '',
      number: ''
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter
        value={filter}
        onChange={handleFilter}
      />
      <h2>Add new</h2>
      <PersonForm
        onSubmit={addPerson}
        value={values}
        onChange={handleInputChange}
      />
      <h2>Numbers</h2>
      {persons.filter(person =>
        person.name.toLowerCase().includes(filter.toLowerCase())).map(filteredPersons => {
          return (
            <Person
              key={filteredPersons.name}
              person={filteredPersons}
            />
          )
        })}
    </div>
  )
}

export default App