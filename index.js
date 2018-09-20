const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')


app.use(bodyParser.json())
morgan.token('message', function (req, res) {
  return JSON.stringify(req.body, res.body)
  }
)
app.use(morgan(':method :url :message :response-time ms'))




let persons = [
  {
    "name": "sfhd",
    "number": "233",
    "id": 1
  },
  {
    "name": "sfd",
    "number": "233",
    "id": 15
  },
  {
    "name": "Pepe",
    "number": "",
    "id": 16
  },
  {
    "name": "heyy",
    "number": "2",
    "id": 19
  }
]

  const CreateId = (idArray) => {
    if(idArray.length === 0) {return 0}
    return(Math.max(...idArray)) + 1
  }

  app.post('/api/persons', (req, res) => {
    const body = req.body

    const CondErrorMsg = (condition, status, msg) => {
      if(condition){
        return res.status(status).json({error: msg})
      }
    }

    if (body.name === "" || body.name === undefined) {
      return res.status(400).json({error: 'name missing'})
    } else if (body.number === "" || body.number === undefined) {
      return res.status(400).json({error: 'number missing'})
    } else if (persons.map(e => e.name.toLowerCase()).includes(body.name.toLowerCase())) {
      return res.status(400).json({error: 'name: "' + body.name + '" already exists'})
    }

    const person = {
      name: body.name,
      number: Number(body.number),
      date: new Date(),
      id: CreateId(persons.map(e => e.id))
      
    }
    
    persons = persons.concat(person)
    res.json(person)
  })

  app.get('/info', (req, res) => {
    const info = '<div>puhelinluettelossa on ' + persons.length + ' numeroa</div><div>' + new Date() + '</div>'
    res.send(info)
  })

  
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const note = persons.find(note => note.id === id)

    note ? res.json(note) : res.status(404).end()
  })

  app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(note => note.id !== id)

    res.status(204).end()
  })

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)