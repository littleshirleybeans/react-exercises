import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState('')
  const [message, setMessage] = useState('No message at the moment...')
  const [error, setError] = useState(false)

  useEffect(() => {
    // console.log('effect')

    personService
      .getAll()
      .then(initialPersons => {
        // console.log('promose fulfilled')
        // console.log(initialPersons)
        setPersons(initialPersons)
      })
  }, [])
  // console.log('render', persons.length, 'persons')

  const addContact = (event) => {
    event.preventDefault()
    if (persons.every(person => person.name !== newName)) {
      const contactObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personService
        .create(contactObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setError(false)
          setMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
        .catch(error => {
          console.log(error.response.data.error)
          setMessage(
            `${error.response.data.error}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
          setError(true)
          setNewName('')
          setNewNumber('')
        })

    } else {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        const samePerson = persons.find(person => person.name === newName)
        const changedPerson = { ...samePerson, number: newNumber }

        personService
          .update(samePerson.id, changedPerson)
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.map(person => person.id === samePerson.id ? returnedPerson : person))
            setNewName('')
            setNewNumber('')
            setError(false)
            setMessage(
              `Updated ${returnedPerson.name}'s number`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            // console.log(error.response.data.error)
            if (error.response.data.error) {
              setMessage(
                `${error.response.data.error}`
              )
            } else {
              setMessage(
                `Information of ${samePerson.name} has already been removed from server`
              )
              setPersons(persons.filter(person => person.name !== newName))
            }
            
            setTimeout(() => {
              setMessage(null)
            }, 5000)
            setError(true)
            setNewName('')
            setNewNumber('')
          })
      }

    }

  }

  const handleFilterChange = (event) => {
    setFilterPersons(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handlePersonDelete = (event) => {
    // console.log(event.target.id)
    // note that person.id is number while event.target.id (button's id) is string!
    const person = persons.find(person => person.id === event.target.id)
    // console.log(person)

    const confirm = window.confirm(`Are you sure you want to delete ${person.name}?`)
    if (confirm) {
      personService.remove(event.target.id)
        .then(noResponse => {
          setPersons(persons.filter(person => person.id !== event.target.id))
          setError(false)
          // It doesn't seem to work with 5s delay if without `then()`
          setMessage(
            `Deleted ${person.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })

    }
  }

  const showPersons = filterPersons
    ? persons.filter(person =>
      person.name.toLowerCase().includes(filterPersons.toLowerCase())
    )
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter filterPersons={filterPersons} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addContact={addContact}
      />
      <h2>Numbers</h2>
      <Persons showPersons={showPersons} handlePersonDelete={handlePersonDelete} />

      {/* <div>debug: {newName}</div> */}
      {/* <div>debug: {newNumber}</div> */}
      {/* <div>debug: {filterPersons}</div> */}
    </div>
  )
}

export default App;
