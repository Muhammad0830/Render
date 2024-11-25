import { useState, useEffect } from 'react'
import axios from 'axios'
import { useMemo } from 'react'

import Form from './components/Form'
import Persons from './components/Persons'
import Phonebook from './components/Phonebook'
import Notification from './components/Notification'
import ErrorHandling from './components/ErrorHandling'
import personService from './services/persons'
import ErrorMessage from './components/ErrorHandling'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilterName] = useState('')
  const [notificationAdded, setNotificationAdded] = useState(null)
  const [notificationChanged, setNotificationChanged] = useState(null)
  const [notificationDelete, setNotificationDelete] = useState(null)
  const [notificationError, setNotificationError] = useState(null)
  const filteredItems = persons.filter(person =>
      person.name.toLowerCase().startsWith(filterName.toLowerCase())
    );

  const handleError = (userName, id) => {
    setNotificationError(
      `the user '${userName}' was already removed from server`
    )
    setTimeout(() => {
      setNotificationError(null)
    }, 5000)
    setPersons(persons.filter(n => n.id !== id))
  }

  useEffect(() => {
    personService
      .getAll()
      .then(initialPerson => {
        setPersons(initialPerson)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const handleDelete = (id) => {
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(p => p.id === id)
    const changedPerson = { ...person  }

    personService
      .deletePerson(id)
      .then(returnedPerson => {
        setPersons(persons.filter(p => p.id !== id))
        setNotificationDelete(`the user "${person.name}" has deleted successfully`)
        setTimeout(() => {
          setNotificationDelete(null);
        }, 5000)
      }).catch((error) => handleError(person.name, id))
  }

  const handleNewName = (e) => {
    console.log(e.target.value)
    setNewName(e.target.value)
  }

  const handleNewNumber = (e) => {
    console.log(e.target.value)
    setNewNumber(e.target.value)
  }

  const handleFilterName = (e) => {
    setFilterName(e.target.value)
    console.log(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()

    const newPersonObject = {
      name: newName,
      number: newNumber,
      // important: Math.random() < 0.5,
    }
    
    setNewName('')
    setNewNumber('')

    const foundPerson = persons.find(p => p.name == newName)
    
    if(foundPerson){
      if(confirm('the name you wrote is already added, update the number?')){
        const id = foundPerson.id
        personService
          .update(id, newPersonObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === id ? returnedPerson : person))
            setNotificationChanged(`the number of the user "${newName}" has changed successfully`);
            setTimeout(() => {
              setNotificationChanged(null)
            }, 5000);
          }).catch((error) => handleError(newName, id))
      } else{
        setPersons(persons)
      }
    } else {
      personService
        .create(newPersonObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNotificationAdded(`the user "${newName}" has added successfully`)
          setTimeout(() => {
            setNotificationAdded(null)
          }, 5000)
        })
    }
  }
  console.log(persons)
  console.log(filteredItems)

  return (
    <div>
      < Notification message={notificationAdded} />
      < Notification message={notificationChanged} />
      < Notification message={notificationDelete} />
      < ErrorMessage message={notificationError} />
      <h2>Phonebook</h2>
      <Phonebook filterName={filterName} handleFilterName={handleFilterName} />
      <h3>add a new</h3>
      <Form addPerson={addPerson} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h3>Numbers</h3>
      <div>
        {filteredItems.map(person => 
            <Persons 
              key={person.id}
              personName={person.name} 
              personNumber={person.number} 
              handleDelete={() => handleDelete(person.id)}/>
          )}
      </div>
    </div>
  )
}

export default App