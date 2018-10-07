const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())




morgan.token('message-body', function (req, res) {
  return JSON.stringify(req.body, res.body)
}
)
app.use(morgan(':method :url :message-body :response-time ms'))



app.post('/api/persons', (req, res) => {
  const body = req.body

  if (body.name === '' || body.name === undefined) {
    return res.status(400).json({ error: 'name missing' })
  } else if (body.number === '' || body.number === undefined) {
    return res.status(400).json({ error: 'number missing' })
  }

  const person = new Person({
    name: body.name,
    number: Number(body.number)
  })

  person
    .save()
    .then(Person.format)
    .then(formattedPerson => {
      res.json(formattedPerson)
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'name already taken' })
    })
})

app.get('/info', (req, res) => {
  Person.find({})
    .then(persons => {
      const info = '<div>puhelinluettelossa on ' + persons.length + ' henkilön tiedot</div><div><p></p><p>' + new Date() + '</p></div>'
      res.send(info)
    })
})


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(persons => {
      res.json(persons.map(Person.format))
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if(person) {
        res.json(Person.format(person))
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      res.status(400).send({ error: 'malformatted id' })
    })
})

app.delete('/api/persons/:id', (req, res) => {
  Person
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => {
      console.log(error)
    })
})

app.put('/api/persons/:id', (req, res) => {
  const person = {
    name: req.body.name,
    number: req.body.number
  }

  Person
    .findByIdAndUpdate(req.params.id, person, { new: true } )
    .then(updatedPerson => {
      res.json(Person.format(updatedPerson))
    })
    .catch(error => {
      console.log(error, req.params.id)
      res.status(400).send({ error: 'malformatted id' })
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
