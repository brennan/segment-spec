'use strict'

const Ajv = require('ajv')
const schemas = require('./schemas.js')

const ajv = new Ajv({allErrors: true})

for (let schema in schemas.events) {
  ajv.addSchema(schema)
}

for (let schema in schemas.fields) {
  ajv.addSchema(schema)
}

module.exports = ajv
