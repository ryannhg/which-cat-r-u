const mongoose = require('mongoose')
const models = require('../src/models')
const config = require('../src/config')

const cats = [
  { name: 'Dave', description: 'Pure evil.' }
]

mongoose.connect(config.mongo, { useNewUrlParser: true })
  .then(_ => Promise.all(
    cats.map(cat => models.Cat.create(cat))
  ))
  .then(_ => console.log('Cats created!'))
  .catch(console.error)
  .then(_ => process.exit(0))
