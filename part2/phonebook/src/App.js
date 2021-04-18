import React, { useEffect, useState } from 'react'

import personService from './services/personService'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const initialValues = {
    name: "",
    number: ""
  }
  const [values, setValues] = useState(initialValues)
  const [filter, setfilter] = useState('')
  const [message, setMessage] = useState('')

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
        setPersons(persons.concat(returnedPerson))
      )
    displayMessage('New contact added')
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
    displayMessage(`${values.name}'s phone number has been updated to ${values.number}`)
    setValues({
      name: '',
      number: ''
    })
  }

  const deletePerson = personToDelete => {
    if (window.confirm(`Do you want to delete ${personToDelete.name}?`)) {
      personService.remove(personToDelete.id)
      setPersons(persons.filter(person => person.id !== personToDelete.id))
      displayMessage(`${personToDelete.name} has beed removed from the phonebook`)
    }
  }

  const displayMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
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