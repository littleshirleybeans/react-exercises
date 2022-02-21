import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'
import './index.css'
import Notification from './components/Notification'
import Footer from './components/Footer'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    // console.log('effect')
    noteService
      .getAll()
      .then(initialNotes => {
        // console.log('promise fulfilled')
        console.log(initialNotes)
        setNotes(initialNotes) // make the component rerender
      })
  }, [])
  // console.log('render', notes.length, 'notes')

  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        // console.log(response)
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
    
    // console.log("button clicked", event.target)
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes 
    : notes.filter(note => note.important === true)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNotes => {
        // console.log(response.data)
        // console.log(typeof returnedNotes)  // object
        setNotes(notes.map(note => note.id !== id ? note : returnedNotes))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(note => note.id !== id))
      })
    // console.log(`importance of ${id} needs to be toggled`)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
      <form onSubmit={addNote}>
          <input
            value={newNote}
            onChange={handleNoteChange}
          />
          <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )

}

export default App;
