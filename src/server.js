const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const APIRoutes = require('./routes')
class App {
  constructor () {
    this.express = express()

    this.database()
    this.middlewares()
    this.routes()
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  middlewares () {
    this.express.use(express.json())
  }

  routes () {
    this.express.use('/', APIRoutes)
  }
}

module.exports = new App().express
