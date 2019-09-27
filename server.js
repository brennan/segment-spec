'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const validator = require('./res/validator')
const schemas = require('./res/schemas')

const app = express()
const port = process.env.PORT || '8080'

// Middlewares

app.use(bodyParser.json())

// Routes

app.get('/', (req, res) => {
  res.send('this page is working!')
})

app.get('/all', (req, res) => {
  res.send(schemas)
})

app.get('/schema/events/:event', (req, res) => {
  const event = req.params.event

  if (!schemas.events[event]) {
    res.send(`${event} is not a valid Segment event type.`)
  } else {
    res.send(schemas.events[event])
  }
})

app.post('/echo', (req, res) => {
  res.send(req.body)
})

// Validate Segment events
// TO DO: Should this endpoint be its own API?

app.post('/validate', (req, res) => {
  const type = req.body.type
  const validate = validator.compile(schemas.events[type])
  const valid = validate(req.body)

  if (!valid) {
    res.send(JSON.stringify(validate.errors.map(err => {
      return {
        path: err.dataPath,
        message: err.message
      }
    })))
  } else {
    res.send(`${type} is a valid Segment event!`)
  }
})

app.get('/spec', (req, res) => {
  res.sendFile(__dirname + '/openapi/index.html')
})

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
})
