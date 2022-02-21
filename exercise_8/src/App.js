import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
  // const [persons, setPersons] = useState([
  //   {
  //     name: 'Arto Hellas',
  //     number: '040-1234567',
  //     id: 1
  //   }
  // ])

  //hardcode data for testing
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterPersons, setFilterPersons] = useState('')

  const addContact = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name !== newName)) {
      const contactObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(contactObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
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
      <Persons showPersons={showPersons}/>
      
      {/* <div>debug: {newName}</div> */}
      {/* <div>debug: {newNumber}</div> */}
      {/* <div>debug: {filterPersons}</div> */}
    </div>
  )
}

export default App;
