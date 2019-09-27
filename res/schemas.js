'use strict'

const refParser = require('json-schema-ref-parser')
const parser = new refParser()

const compiledJsonSchemas = {
  events: {},
  fields: {}
}

const eventsDefinitions = {
  track: 'schema/events/track.yaml'
}

const fieldsDefinitions = {
  address: 'schema/fields/address.json',
  app: 'schema/fields/app.json',
  campaign: 'schema/fields/campaign.json',
  common: 'schema/fields/common.json',
  company: 'schema/fields/common.json',
  context: 'schema/fields/context.json',
  device: 'schema/fields/device.json',
  library: 'schema/fields/library.json',
  location: 'schema/fields/location.json',
  network: 'schema/fields/network.json',
  order: 'schema/fields/order.json',
  os: 'schema/fields/os.json',
  page: 'schema/fields/page.json',
  product: 'schema/fields/product.json',
  referrer: 'schema/fields/referrer.json',
  screen: 'schema/fields/screen.json',
  traits: 'schema/fields/traits.json',
  "user-agent": 'schema/fields/user-agent.json'
}

async function compileJsonSchemas() {
  for (let definition in eventsDefinitions) {
    await parser.dereference(eventsDefinitions[definition], (err, schema) => {
      if (err) {
        console.log('Schema dereferencing error.')
      }
      compiledJsonSchemas.events[definition] = schema
    })
  }

  for (let definition in fieldsDefinitions) {
    await parser.dereference(fieldsDefinitions[definition], (err, schema) => {
      if (err) {
        console.log('Schema dereferencing error.')
      }
      compiledJsonSchemas.fields[definition] = schema
    })
  }
}

compileJsonSchemas()

module.exports = compiledJsonSchemas
