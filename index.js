require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
var morgan = require('morgan')
const Person = require('./models/person')



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


app.get('/', (request, response) => {
    response.send('<h1>Welcome to the Phonebook!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)
    })
})

app.get('/info', (request, response) => {
  
  const date = Date();
  Person.find({}).then(persons => {
    let count = Object.keys(persons).length
    response.send('<p>Phonebook has info for ' + count + ' people</p><p><br /> ' + date + '</p>')
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if(person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(person => {
    response.status(204).end()
  })
  .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if(body.name === undefined || body.number === undefined){
    return response.status(400).json({
      error: 'Name and/or number is missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
    important: body.important || false
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
  .catch(error => next(error))
  
})

app.put('/api/persons/:id', (request, response, next) => {
  const { name, number, important } = request.body

  Person.findByIdAndUpdate(
    request.params.id, 
    { name, number, important }, 
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPerson => {
      response.json(updatedPerson)
    }) 
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})