const express = require('express')
const mongoose = require('mongoose')
const databaseCfg = require('./config/database')

class App {
  constructor() {
    this.express = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  database() {
    mongoose.connect(databaseCfg.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
    })
  }

  middlewares() {
    this.express.use(express.json())
  }

  routes() {
    this.express.use('/', (req, res) => {
      return res.send('hello')
    })
  }
}

module.exports = new App().express
