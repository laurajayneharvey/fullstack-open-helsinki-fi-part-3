const express = require('express')
const app = express()

app.use(express.json())

const PORT = 3001
app.listen(PORT)

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

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people</br>${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
  const person = persons.find(person => person.id === Number(request.params.id))

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  persons = persons.filter(person => person.id !== Number(request.params.id))

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  let error = ''
  if (!body.name) {
    error = 'name missing'
  } else if (!body.number) {
    error = 'number missing'
  } else if (persons.find(person => person.name.toLowerCase() === body.name.toLowerCase())) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  if (error) {
    return response.status(400).json({ 
      error 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10_000)
  }

  persons = persons.concat(person)

  response.json(person)
})