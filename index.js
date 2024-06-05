const express = require('express')
const cors = require('cors')
const app = express()
var morgan = require('morgan')



/*
const requestLogger = (request, response, next) => {
  console.log('Method: ', request.method)
  console.log('Path: ', request.path)
  console.log('Body: ', request.body)
  console.log('---')
  next()
}*/

app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.use(express.static('dist'))

let persons = [
    { 
        "id": 1,
        "name": "Arto Hellas", 
        "number": "040-123456"
      },
      { 
        "id": 2,
        "name": "Ada Lovelace", 
        "number": "39-44-5323523"
      },
      { 
        "id": 3,
        "name": "Dan Abramov", 
        "number": "12-43-234345"
      },
      { 
        "id": 4,
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122"
      }
]

app.get('/', (request, response) => {
    response.send('<h1>Welcome to the Phonebook!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/info', (request, response) => {
  let count = Object.keys(persons).length
  const date = Date();
  response.send('<p>Phonebook has info for ' + count + ' people</p><p><br /> ' + date + '</p>')
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)

    const person = persons.find(person => person.id === id)
    if(person) {
      response.json(person)
    }
    else {
      response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)
  
  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'Name and/or number is missing'
    })
  }

  console.log(body.name)
  const existingPerson = persons.find(person => person.name === body.name) || false
  console.log(existingPerson)
  console.log('Name exists: ', body.name === existingPerson.name)

  if(body.name === existingPerson.name) {
    return response.status(400).json({
      error: 'Name already exists in phonebook'
    })
  }

  const person = {
    name: body.name,
    number: Number(body.number),
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(persons)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})