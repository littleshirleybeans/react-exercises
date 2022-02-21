import React, { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import noteService from './services/persons'

// 2.15 - 2.18

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState('')

  useEffect(() => {
    // console.log('effect')
    
    noteService
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

      noteService
        .create(contactObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      
    } else {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirm) {
        const samePerson = persons.find(person => person.name === newName)
        const changedPerson = {...samePerson, number: newNumber}

        noteService
        .update(samePerson.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id === samePerson.id ? returnedPerson : person))
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
    const person = persons.find(person => person.id === Number(event.target.id))
    // console.log(person)
    const confirm = window.confirm(`Are you sure to delete ${person.name}?`)
    if (confirm) {
      noteService.remove(event.target.id)
      setPersons(persons.filter(person => person.id !== Number(event.target.id)))
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
      <Persons showPersons={showPersons} handlePersonDelete={handlePersonDelete}/>
      
      {/* <div>debug: {newName}</div> */}
      {/* <div>debug: {newNumber}</div> */}
      {/* <div>debug: {filterPersons}</div> */}
    </div>
  )
}

export default App;
