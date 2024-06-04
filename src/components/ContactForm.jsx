import axios from 'axios'
import React from 'react'
import personsService from '../services/persons'

const ContactForm = (props) => {

    const addContact = (event) => {
        event.preventDefault()
        const contactObject = {
            name: props.newName,
            number: props.newNumber
        }
        const nameExists = props.persons.some(person => person.name === props.newName)
        console.log('Name exists:', nameExists)
        if(nameExists) {
          if(window.confirm(`${contactObject.name} already exists. Would you like to replace their number with a new one?`)){
            const personToUpdate = props.persons.find(p => p.name === props.newName)
            console.log('Person to update:', personToUpdate);
            personToUpdate.number = props.newNumber;
            personsService.update(personToUpdate.id, personToUpdate)
            .then(() => {
              props.setNewNumber('') // Ensure this is the correct default value as a string
            })
          }
        } else {
          personsService
          .create(contactObject)
          .then(returnedPerson => {
            props.setPersons(props.persons.concat(returnedPerson))
            props.setNewName('')
            props.setNewNumber(0)
            props.setErrorMessage('Successfully Added User: ' + props.newName)
            setTimeout(() => {
              props.setErrorMessage(null)
            }, 5000)
          })
        }
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        props.setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        props.setNewNumber(event.target.value)
    }
    
  return (
    <>
      <h2>Add New</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input 
                  className="input input-bordered w-full max-w-xs"
                  value={props.newName} 
                  onChange={handleNameChange}
                  />
        </div>
        <div>
          phone number: <input 
                  className="input input-bordered w-full max-w-xs"
                  value={props.newNumber} 
                  onChange={handleNumberChange}
                  />
        </div>
        <div>
          <button type="submit" className='btn btn-primary'>add</button>
        </div>
      </form>
    </>
  )
}

export default ContactForm