require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const databaseConfig = require('./config/database')
const APIRoutes = require('./routes')
const Youch = require('youch')
const validate = require('express-validation')
const Sentry = require('@sentry/node')
const sentryConfig = require('./config/sentry')

class App {
  constructor () {
    this.express = express()

    this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  sentry () {
    Sentry.init(sentryConfig)
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true
    })
  }

  middlewares () {
    this.express.use(Sentry.Handlers.requestHandler())

    this.express.use(express.json())
  }

  routes () {
    this.express.use('/', APIRoutes)
  }

  exception () {
    // if (process.env.NODE_ENV === 'production') {
    this.express.use(Sentry.Handlers.errorHandler())
    // }

    this.express.use(async (err, req, res, next) => {
      if (err instanceof validate.ValidationError) {
        return res.status(err.status).json(err)
      }

      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err)

        return res.json(await youch.toJSON())
      }

      return res
        .status(err.status || 500)
        .json({ error: 'Internal server error' })
    })
  }
}

module.exports = new App().express
