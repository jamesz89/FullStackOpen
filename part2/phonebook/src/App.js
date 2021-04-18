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

  const checkPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => values.name.toLowerCase() === person.name.toLowerCase())
    if (existingPerson) {
      updatePerson(existingPerson.id)
    } else {
      addPerson()
    }
  }

  const addPerson = () => {
    const personObj = {
      name: values.name,
      number: values.number
    }
    personService
      .create(personObj)
      .then(returnedPerson =>
        setPersons(persons.concat(returnedPerson)))

    setValues({
      name: '',
      number: ''
    })
  }

  const updatePerson = (id) => {
    personService
      .update(id, values)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })

    setValues({
      name: '',
      number: ''
    })
  }

  const deletePerson = personToDelete => {
    if (window.confirm(`Do you want to delete ${personToDelete.name}?`)) {
      personService.remove(personToDelete.id)
      setPersons(persons.filter(person => person.id !== personToDelete.id))
    }
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
        onSubmit={checkPerson}
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
              handleClick={deletePerson}
            />
          )
        })}
    </div>
  )
}

export default App