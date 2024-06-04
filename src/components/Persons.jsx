import React from 'react'
import Note from './Note'
import personsService from '../services/persons'


const Persons = ({ persons, searchName, setPersons }) => {
    const searchNames = searchName
    ? persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
    : persons
    

    const toggleImportanceOf = (id) => {
      const person = persons.find(person => person.id === id)
      const changedPerson = { ...person, important: !person.important }

      personsService
        .update(id, changedPerson)
        .then(returnedPeron => {
          setPersons(persons.map(person => person.id !== id ? person: returnedPeron))
        })
        .catch(error => {
          alert(
            `the person '${person.name}' was already deleted from the server`
          )
          setPersons(persons.filter(person => person.id !== id))
        })

    }

    const removePerson = (id) => {
      
        const person = persons.find(person => person.id === id)
        console.log(person)
        if(window.confirm(`Are you sure you want to delete ${person.name}?`)){
          personsService
            .remove(id, person)
            .then (
              alert(`${person.name} has been deleted`)
            )
            setPersons(persons.filter(person => person.id !== id))
          }
      
       }

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
    
        {
          searchNames.map(person =>
         
            <Note key={person.id} person={person} toggleImportance={() => toggleImportanceOf(person.id)} removePerson={() => removePerson(person.id)}/>
           
          )
        }
    </div>
  )
}

export default Persons