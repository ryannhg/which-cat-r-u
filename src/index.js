const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const models = require('./models')
const config = require('./config')

// Connect to the database
const connectToDatabase = () =>
  mongoose.connect(config.mongo, { useNewUrlParser: true, useCreateIndex: true })

const site = {
  title: 'Which Cat R U?'
}

const pages = {
  homepage: {
    title: 'I hate doogs!'
  },
  cats: {
    title: 'Cats'
  }
}

const layout = (body) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="/public/main.css"></link>
  <title>${site.title}</title>
</head>
<body>
  <header>
    <a href="/">Home</a>
    <a href="/cats">Our cats</a>
  </header>
  ${body}
</body>
</html>
`

const getAllCats = () =>
  models.Cat.find()
    .sort('name')
    .lean()
    .exec()

const startWebServer = () => {
  const app = express()

  app.use('/public', express.static(path.join(__dirname, 'public')))

  app.get('/', (req, res) => res.send(layout(`<h1>${pages.homepage.title}</h1>`)))
  app.get('/cats', (req, res, next) =>
    getAllCats()
      .then(cats => res.send(layout(`
        <h1>${pages.cats.title}</h1>
        <h2>Here they are</h2>
        <ul>
          ${cats.map(cat => `<li>
            <h3>${cat.name}</h3>
            <p>${cat.description}</p>
          </li>`).join('')}
        </ul>
`)))
      .catch(next)
  )
  app.get('/api/cats', (req, res, next) =>
    getAllCats()
      .then(cats => res.json(cats))
      .catch(next)
  )

  app.listen(config.port, _ => console.log(`Ready at http://localhost:${config.port}`))
}

const start = () =>
  connectToDatabase()
    .then(startWebServer)
    .catch(console.error)

start()
