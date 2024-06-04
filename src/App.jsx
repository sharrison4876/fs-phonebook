import { useState, useEffect } from 'react'
import ContactForm from './components/ContactForm'
import Filter from './components/Filter'
import Persons from './components/Persons'
import personsService from './services/persons'
import Notification from './components/Notification'
import axios from 'axios'


const App = () => {
  const [persons, setPersons] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personsService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState(0)
  const [searchName, setSearchName] = useState('')

  return (
    <div>
      <Notification message={errorMessage}/>
      <Filter searchName={searchName} setSearchName={setSearchName}/>
      <ContactForm newName={newName} setNewName={setNewName} setNewNumber={setNewNumber} newNumber={newNumber} persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage}/>
      <h2>Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} searchName={searchName}/>
    </div>
  )
}

export default App